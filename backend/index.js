const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require('body-parser');
const InvoiceModel = require("./models/invoice");
const dotenv = require('dotenv');
dotenv.config();
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL, { useNewUrlParser: true });

const app = express();
const port = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: "*"
}))


app.get('/', async (req, res) => {
    try {
        const invoices = await InvoiceModel.find()
        res.status(200).send(invoices)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
});

app.post('/', async (req, res) => {
    try {
        const newInvoice = await InvoiceModel.create({ ...req.body, updatedAt: new Date() });
        res.status(200).send(newInvoice)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
});

app.get('/:id', async (req, res) => {
    try {
        const invoice = await InvoiceModel.findOne({
            invoice_no: req.params.id
        })
        res.status(200).send(invoice)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const invoice = await InvoiceModel.findOneAndDelete({
            invoice_no: req.params.id
        })
        res.status(200).send(await InvoiceModel.find())
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
});

app.patch('/:id', async (req, res) => {
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

app.listen(port);

console.log("App is running on ", port, " port");