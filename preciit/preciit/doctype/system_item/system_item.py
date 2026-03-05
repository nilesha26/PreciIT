# Copyright (c) 2026, Precihole Group and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname


class SystemItem(Document):

    def autoname(self):

        # Company Short Codes
        company_map = {
            "Precihole Sports": "PSPL",
            "Precihole Machine Tool": "PMTPL"
        }

        company_code = company_map.get(self.company, "COMP")

        # Device type first 3 letters
        device_code = (self.device_type or "")[:3].upper()

        prefix = f"{company_code}-{device_code}-"

        self.name = make_autoname(prefix + ".####")