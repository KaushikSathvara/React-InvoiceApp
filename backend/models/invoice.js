const mongoose = require('mongoose');
const ItemModel = require('./item');

const { Schema } = mongoose;

// create a schema
const InvoiceSchema = new Schema({
    invoice_no: {
        unique: true,
        type: String
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    updatedAt: Date,
    total: Number,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});

// create the model
const InvoiceModel = mongoose.model('Invoice', InvoiceSchema);

// export the model
module.exports = InvoiceModel;