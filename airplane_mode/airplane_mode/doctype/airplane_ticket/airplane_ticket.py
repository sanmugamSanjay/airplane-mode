# Copyright (c) 2024, Sanjay and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import random


class AirplaneTicket(Document):
	def on_submit(self):
		if self.status != "Boarded":
			frappe.throw("Status not equlat to boarded")
	# def before_save(self):
	# 	d=random.randint(1,100)
	# 	rd =random.choice(['A','B','C','D','E'])
    #     self.seat = ""+d+rd
	def before_insert(self):
		d = random.randint(1, 100)
		
		rd = random.choice(['A', 'B', 'C', 'D', 'E'])
		
		self.seat = f"{d}{rd}"

