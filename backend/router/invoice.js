const express = require('express');
const InvoiceModel = require("../models/invoice");
const ItemModel = require('../models/item');

const invoiceRouter = express.Router();

invoiceRouter.get('/', async (req, res) => {
    try {
        const Invoices = await InvoiceModel.find().populate('items')
        res.status(200).send(Invoices)
    } catch (error) {
        res.status(400).send({ status: 400, ...error })
    }
});

invoiceRouter.post('/', async (req, res) => {
    try {
        items = []
        for (const item of req.body.items) {
            var Item = await ItemModel.create(item)
            items.push(Item._id)
        }
        var Invoice = await InvoiceModel.create(
            {
                invoice_no: req.body.invoice_no,
                total: req.body.total,
                items
            }
        );
        var response = await Invoice.populate("items").execPopulate()
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(JSON.stringify(error))
    }
});

invoiceRouter.get('/:id', async (req, res) => {
    try {
        const invoice = await InvoiceModel.findOne({
            invoice_no: req.params.id
        }).populate('items')
        res.status(200).send(invoice)
    } catch (error) {
        res.status(500).send("Something went wrong :", error)
    }
});

invoiceRouter.delete('/:id', async (req, res) => {
    try {
        const invoice = await InvoiceModel.findOneAndDelete({
            invoice_no: req.params.id
        })
        res.status(200).send(await InvoiceModel.find())
    } catch (error) {
        res.status(500).send("Something went wrong :", error)
    }
});

invoiceRouter.patch('/:id', async (req, res) => {
    console.log(req.body);
    try {
        const invoice = await InvoiceModel.findOneAndUpdate({
            invoice_no: req.params.id
        }, {
            ...req.body,
            updatedAt: new Date()
        })
        res.status(200).send(await InvoiceModel.find())
    } catch (error) {
        res.status(500).send("Something went wrong :", error)
    }
});


module.exports = { invoiceRouter }