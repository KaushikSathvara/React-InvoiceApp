const express = require('express')
const InvoiceModel = require("../models/invoice");

const invoiceRouter = express.Router();

invoiceRouter.get('/', async (req, res) => {
    try {
        const invoices = await InvoiceModel.find()
        res.status(200).send(invoices)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
});

invoiceRouter.post('/', async (req, res) => {
    try {
        const newInvoice = await InvoiceModel.create({ ...req.body, updatedAt: new Date() });
        res.status(200).send(newInvoice)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
});

invoiceRouter.get('/:id', async (req, res) => {
    try {
        const invoice = await InvoiceModel.findOne({
            invoice_no: req.params.id
        })
        res.status(200).send(invoice)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
});

invoiceRouter.delete('/:id', async (req, res) => {
    try {
        const invoice = await InvoiceModel.findOneAndDelete({
            invoice_no: req.params.id
        })
        res.status(200).send(await InvoiceModel.find())
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
});

invoiceRouter.patch('/:id', async (req, res) => {
    try {
        const invoice = await InvoiceModel.findOneAndUpdate({
            invoice_no: req.params.id
        }, {
            ...req.body,
            updatedAt: new Date()
        })
        res.status(200).send(await InvoiceModel.find())
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
});


module.exports = { invoiceRouter }