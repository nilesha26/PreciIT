# Copyright (c) 2026, Precihole Group and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname


class SoftwareConfiguration(Document):
	def autoname(self):
		prefix = self.item.replace(" ", "").upper()
		self.name = make_autoname(f"{prefix}-.##")