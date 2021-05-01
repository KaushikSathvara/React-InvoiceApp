const mongoose = require('mongoose');

const { Schema } = mongoose;

// create a schema
const ItemSchema = new Schema({
    item: String,
    rate: Number,
    qty: Number,
    description: String,
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
const ItemModel = mongoose.model('Item', ItemSchema);

// export the model
module.exports = ItemModel;