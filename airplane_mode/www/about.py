import frappe

def get_context(context):
    params= frappe.form_dict.get("color")
    if "color" not in frappe.form_dict:
        context.favorite_color="black"
    else:
        context.favorite_color=params
    return context