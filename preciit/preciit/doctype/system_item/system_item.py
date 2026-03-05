# Copyright (c) 2026, Precihole Group and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname

class SystemItem(Document):
	pass

    # def validate(self):
    #     self.validate_system_items()
    #     self.validate_duplicate_assignment()

    # # -----------------------------------------------------
    # # VALIDATE ALL SYSTEM ITEMS
    # # -----------------------------------------------------

    # def validate_system_items(self):

    #     if not self.assigned_device:
    #         frappe.throw("At least one System Item is required.")

    #     for row in self.assigned_device:

    #         if not row.system_item:
    #             frappe.throw("System Item is missing in assigned_device row.")

    #         item_data = frappe.db.get_value(
    #             "System Item",
    #             row.system_item,
    #             ["docstatus", "item_status"],
    #             as_dict=True
    #         )

    #         if not item_data:
    #             frappe.throw(f"System Item {row.system_item} not found.")

    #         if item_data.docstatus != 1:
    #             frappe.throw(
    #                 f"System Item {row.system_item} must be Submitted before allocation."
    #             )

    #         if item_data.item_status == "Allocated":
    #             frappe.throw(
    #                 f"System Item {row.system_item} is already allocated."
    #             )

    #         if item_data.item_status not in ["Available", "Deallocated"]:
    #             frappe.throw(
    #                 f"System Item {row.system_item} must be Available or Deallocated. "
    #                 f"Current Status: {item_data.item_status}"
    #             )

    # # -----------------------------------------------------
    # # DUPLICATE CHECK
    # # -----------------------------------------------------

    # def validate_duplicate_assignment(self):

    #     for row in self.assigned_device:

    #         existing = frappe.db.exists(
    #             "Asset Allocation",
    #             {
    #                 "docstatus": 1,
    #                 "name": ["!=", self.name]
    #             }
    #         )

    #         # Optional: add deeper duplicate check if needed

    # # -----------------------------------------------------
    # # ON SUBMIT
    # # -----------------------------------------------------

    # def on_update(self):
    #     for row in self.assigned_device:
    #         frappe.db.set_value(
    #             "System Item",
    #             row.system_item,
    #             {
    #                 "item_status": "Allocated"
    #             }
    #         )
