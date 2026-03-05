import frappe
from frappe.model.document import Document

class AssetAllocation(Document):

    def on_update(self):

        if not self.assigned_device:
            return

        for row in self.assigned_device:

            if not row.asset:
                continue

            frappe.db.set_value(
                "System Item",   
                row.asset,       
                "item_status",
                "Allocated",
                update_modified=False,
				ignore_version=False
            )