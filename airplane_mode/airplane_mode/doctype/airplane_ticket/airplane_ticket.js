// Copyright (c) 2024, Sanjay and contributors
// For license information, please see license.txt

frappe.ui.form.on("Airplane Ticket", {
	refresh(frm) {

	},
    validate: function(frm){
        console.log("check the add ons",frm.doc.add_ons)   
        if(frm.doc.add_ons.length > 0)
            {
                let unsaved_arr=[...frm.doc.add_ons].filter((item)=> item?.__unsaved);
                let db_ex_arr=[...frm.doc.add_ons].filter((item)=> item.__unsaved === undefined );
                err_name=""
                for(let item of unsaved_arr){
                    console.log("inside Loop",item.item)
                    if(db_ex_arr.some((data)=> data.item === item.item)){
                        frappe.validated=false
                        console.log("inside Loop 2",item.item)
                        frappe.msgprint(
                            msg='Item Already exist '+item.item,
                            title='Error',
                        )
                        break
                    }
                }
            } 
    },
    update_total_amount(frm){
        let total_add_on_amount=0
        for(let add_on of frm.doc.add_ons)
            total_add_on_amount=total_add_on_amount+add_on.amount

        let total_amount=frm.doc.flight_price + total_add_on_amount
        frm.set_value("total_amount",total_amount)

    },
    flight_price(frm){
        frm.trigger("update_total_amount")
    }
});

frappe.ui.form.on("Airplane Ticket Add-on Item", {
    validate(frm){
        console.log("check existing data",frm.name)
    },
    add_ons_add(frm,cdt,cdn){
        frm.trigger("update_total_amount")
    },
    add_ons_remove(frm,cdt,cdn){
        frm.trigger("update_total_amount")
    },
    amount(frm,cdt,cdn){
        frm.trigger("update_total_amount")
    }
});
