const mongoose = require('mongoose');

const { Schema } = mongoose;

// create a schema
const InvoiceSchema = new Schema({
    invoice_no: { type: String, unique: true },
    items: [{
        qty: Number,
        rate: Number,
        description: String,
        item: String,
    }],
    updatedAt: Date,
    total: Number
});

// create the model
const InvoiceModel = mongoose.model('Invoice', InvoiceSchema);

// export the model
module.exports = InvoiceModel;