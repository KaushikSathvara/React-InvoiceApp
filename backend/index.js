const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require('body-parser');
const InvoiceModel = require("./models/invoice");

mongoose.connect('mongodb+srv://kaushik:6xX2zkJdeBjyKQk@cluster0.4bpsk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true });

const app = express();
const port = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: "*"
}))


app.get('/', async (req, res, next) => {
    const invoices = await InvoiceModel.find()
    res.status(200).send(invoices)
});

app.post('/', async (req, res, next) => {
    const newInvoice = await InvoiceModel.create(req.body);
    res.status(200).send(newInvoice)
});

app.get('/:id', async (req, res, next) => {
    const invoice = await InvoiceModel.findOne({
        invoice_no: req.params.id
    })
    res.status(200).send(invoice)
});

app.delete('/:id', async (req, res, next) => {
    const invoice = await InvoiceModel.findOneAndDelete({
        invoice_no: req.params.id
    })
    res.status(200).send(await InvoiceModel.find())
});

app.listen(port);

console.log("App is running on ", port, " port");