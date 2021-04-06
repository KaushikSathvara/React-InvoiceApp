var InvoiceModel = require("../models/invoice")

const checkInvoiceExisted = async (id) => {
    var invoice = await InvoiceModel.findOne({
        invoice_id: id
    })
    if (invoice) {
        return true
    } else {
        return false
    }
}

module.exports = { checkInvoiceExisted }