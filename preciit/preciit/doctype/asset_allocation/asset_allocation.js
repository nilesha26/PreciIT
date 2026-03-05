// Copyright (c) 2026, Precihole Group and contributors
// For license information, please see license.txt

frappe.ui.form.on("Asset Allocation", {
    refresh(frm) {
        frm.add_custom_button("Asset Deallocate", () => {
            frappe.new_doc("Asset Deallocate", {}, (doc) => {
                doc.employee = doc.name;
                (frm.doc.assigned_device || []).forEach(r => {
                    let row = frappe.model.add_child(doc, "deallocation_device");
                    row.asset = r.asset;   
                });
                frappe.ui.form.refresh_field("deallocation_device");
            });

        }, "Actions");
        frm.add_custom_button("Asset Decommissioning", function () {
            frappe.new_doc("Asset Decommissioning", {}, (doc) => {
                           
                            (frm.doc.assigned_device || []).forEach(r => {
                                let row = frappe.model.add_child(doc, "asset_decommissioning");
                                row.asset = r.asset;   
                            });
                            frappe.ui.form.refresh_field("asset_decommissioning");
                        });

			}, "Actions");

    }
});