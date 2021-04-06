const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
const { invoiceRouter } = require("./router/invoiceRouter");
dotenv.config();
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL, { useNewUrlParser: true });

const app = express();
const port = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.use('/', invoiceRouter);

app.listen(port);

console.log("App is running on ", port, " port");