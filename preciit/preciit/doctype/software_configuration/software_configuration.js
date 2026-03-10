// Copyright (c) 2026, Precihole Group and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Software Configuration", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on("Software Configuration Item", {
	form_render(frm, cdt, cdn) {
		toggle_desktop_fields(frm, cdt, cdn);
	},
    software_component(frm, cdt, cdn) {
		toggle_desktop_fields(frm, cdt, cdn);
	}
});


function toggle_desktop_fields(frm, cdt, cdn) {

	let row = locals[cdt][cdn];

	let grid = frm.fields_dict["software_configuration"].grid;

	// Hide all fields first
	let all_fields = [
		"software_key",
		"status",
		"license_expiration",
		"map_drive"
	];

	all_fields.forEach(field => {
		grid.update_docfield_property(field, "hidden", 1);
		grid.update_docfield_property("map_drive", "hidden", 1);
	});

	// Monitor logic
	if (row.software_component === "BlackBox") {
		grid.update_docfield_property("software_key", "hidden", 1);
		grid.update_docfield_property("status", "hidden", 0);
        grid.update_docfield_property("license_expiration", "hidden", 1);
        grid.update_docfield_property("map_drive", "hidden", 0);
	}

	// CPU logic
	if (row.software_component === "Windows") {
		grid.update_docfield_property("software_key", "hidden", 0);
		grid.update_docfield_property("status", "hidden", 0);
        grid.update_docfield_property("license_expiration", "hidden", 0);
        grid.update_docfield_property("map_drive", "hidden", 1);
	}

	frm.refresh_field("software_configuration");
}
