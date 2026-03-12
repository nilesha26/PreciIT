import frappe
from frappe.model.document import Document


class AssetDeallocate(Document):

    def on_submit(self):

        if not self.deallocation_device:
            return

        for row in self.deallocation_device:

            if not row.asset:
                continue

            # Update Asset Status
            frappe.db.set_value(
                "Asset Item",
                row.asset,
                "item_status",
                "Available",
                update_modified=False
            )

            

