// =============================
// SYSTEM ITEM (Parent)
// =============================
frappe.ui.form.on("Asset Item", {

	refresh(frm) {

		if (!frm.is_new() && frm.doc.docstatus == 1 ) {

			// Option 2
			frm.add_custom_button("Software Configuration", function () {

				frappe.new_doc("Software Configuration", {
					item: frm.doc.name,
                    device: frm.doc.device_type
				});

			}, "Actions");


			// Option 1
			frm.add_custom_button("Assign to Employee", function () {

				frappe.new_doc("Asset Allocation", {
					system_item: frm.doc.name
				});

			}, "Actions");

			
			frm.add_custom_button("Asset Deallocate", function () {

				frappe.new_doc("Asset Deallocate", {
					item: frm.doc.name,
				});

			}, "Actions");

            frm.add_custom_button("Asset Decommissioning", function () {
            frappe.new_doc("Asset Decommissioning", {}, (doc) => {
                           
                                let row = frappe.model.add_child(doc, "asset_decommissioning");
                                row.asset = frm.doc.name;   
                            frappe.ui.form.refresh_field("asset_decommissioning");
                        });

			}, "Actions");

		}

		toggle_device_type_fields(frm);
	},

	device_type(frm) {
		toggle_device_type_fields(frm);
	}
});

function toggle_device_type_fields(frm) {

	// Hide all first
	let fields = [
		"laptop_configuration",
		"desktop_configuration",
		"mobile_configuration",
		"tab_configuration",
		"phone_no"
	];

	fields.forEach(field => {
		frm.set_df_property(field, "hidden", 1);
	});

	// Show based on selection
	if (frm.doc.device_type === "Laptop") {
		frm.set_df_property("laptop_configuration", "hidden", 0);
	}

	else if (frm.doc.device_type === "Desktop") {
		frm.set_df_property("desktop_configuration", "hidden", 0);
	}

	else if (frm.doc.device_type === "Mobile") {
		frm.set_df_property("mobile_configuration", "hidden", 0);
		frm.set_df_property("phone_no", "hidden", 0);
	}

	else if (frm.doc.device_type === "Tab") {
		frm.set_df_property("tab_configuration", "hidden", 0);
		frm.set_df_property("phone_no", "hidden", 0);
	}
}



// =============================
// DESKTOP CONFIGURATION
// =============================
frappe.ui.form.on("Desktop Configuration", {

	component(frm, cdt, cdn) {
		toggle_desktop_fields(frm, cdt, cdn);
	},

	hdd_type(frm, cdt, cdn) {
		toggle_desktop_fields(frm, cdt, cdn);
	},

	form_render(frm, cdt, cdn) {
		toggle_desktop_fields(frm, cdt, cdn);
	}
});


function toggle_desktop_fields(frm, cdt, cdn) {

	let row = locals[cdt][cdn];

	let grid = frm.fields_dict["desktop_configuration"].grid;

	// Hide all fields first
	let all_fields = [
		"ssd_space",
		"hdd_space",
		"ram",
		"processor",
		"graphics",
		"screen_size",
		"make"
	];

	all_fields.forEach(field => {
		grid.update_docfield_property(field, "hidden", 1);
	});

	// Monitor logic
	if (row.component === "Monitor") {

		grid.update_docfield_property("screen_size", "hidden", 0);
		grid.update_docfield_property("make", "hidden", 0);
        grid.update_docfield_property("hdd_type", "hidden", 1);
	}

	// CPU logic
	if (row.component === "CPU") {

		grid.update_docfield_property("ram", "hidden", 0);
		grid.update_docfield_property("processor", "hidden", 0);
		grid.update_docfield_property("graphics", "hidden", 0);
        grid.update_docfield_property("hdd_type", "hidden", 0);

		if (row.hdd_type === "SSD") {
			grid.update_docfield_property("ssd_space", "hidden", 0);
		}

		if (row.hdd_type === "HDD") {
			grid.update_docfield_property("hdd_space", "hidden", 0);
		}

		if (row.hdd_type === "Both") {
			grid.update_docfield_property("ssd_space", "hidden", 0);
			grid.update_docfield_property("hdd_space", "hidden", 0);
		}
	}

	frm.refresh_field("desktop_configuration");
}



// =============================
// LAPTOP CONFIGURATION
// =============================
frappe.ui.form.on("Laptop Configuration", {

	hdd_type(frm, cdt, cdn) {
		toggle_laptop_storage(frm, cdt, cdn);
	},

	form_render(frm, cdt, cdn) {
		toggle_laptop_storage(frm, cdt, cdn);
	}
});


function toggle_laptop_storage(frm, cdt, cdn) {
	let row = locals[cdt][cdn];
	let grid = frm.fields_dict["laptop_configuration"].grid;
	// Hide first
	grid.update_docfield_property("ssd_space", "hidden", 1);
	grid.update_docfield_property("hdd_space", "hidden", 1);
	if (row.hdd_type === "SSD") {
		grid.update_docfield_property("ssd_space", "hidden", 0);
	}
	if (row.hdd_type === "HDD") {
		grid.update_docfield_property("hdd_space", "hidden", 0);
	}
	if (row.hdd_type === "Both") {
		grid.update_docfield_property("ssd_space", "hidden", 0);
		grid.update_docfield_property("hdd_space", "hidden", 0);
	}
	frm.refresh_field("laptop_configuration");
}