# Copyright (c) 2026, Precihole Group and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class AssetDeallocate(Document):

    def on_submit(self):

        if not self.deallocation_device:
            return

        for row in self.deallocation_device:

            if not row.asset:
                continue

            frappe.db.set_value(
                "System Item",   # <-- confirm this doctype name
                row.asset,       # <-- correct field (must be the document name)
                "item_status",
                "Available",
                update_modified=False,
				ignore_version=True
            )