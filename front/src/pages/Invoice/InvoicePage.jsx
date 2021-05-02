import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";
import Divider from "../../components/Divider";
import Layout from "../../layouts/Layout";
import { SERVER_URL } from "../../utils/common";
import { useHistory, useLocation } from 'react-router'
import qs from "querystring";

const table_columns = [
  { name: "#" },
  { name: "Name" },
  { name: "Description" },
  { name: "Qty" },
  { name: "Rate (With Tax in ₹)" },
  { name: "Action" },
]


export default function InvoicePage() {
  const [InvoiceData, setInvoiceData] = useState({
    invoice_no: "INV-" + uuidv4(),
    items: [],
    total: 0,
  });
  const [isLoading, setisLoading] = useState(false);
  const [Items, setItems] = useState([]);
  const [FinalInvoiceData, setFinalInvoiceData] = useState({});
  const [isNew, setisNew] = useState(true);
  const history = useHistory()

  useEffect(() => {
    var invoice_no = qs.parse(history.location.search)['?invoice_no']
    if (invoice_no) {
      setisNew(false);
      axios.get(`${SERVER_URL}${invoice_no}`).then(({ data }) => {
        setInvoiceData({
          invoice_no: data.invoice_no,
          items: data.items,
          total: data.total,
        });
      });
    }
  }, []);

  async function generateInvoice() {
    // Checking if items have valid fields values or not
    if (Items.length > 0) {
      setisLoading(true);
      if (!isNew) {
        await axios
          .patch(`${SERVER_URL}${FinalInvoiceData.invoice_no}`, {
            ...FinalInvoiceData,
            items: Items,
          })
          .then((res) => {
            setisLoading(false);
            history.push("/");
          });
      } else {
        await axios
          .post(SERVER_URL, {
            ...FinalInvoiceData,
            items: Items,
          })
          .then((_) => {
            setisLoading(false);
            history.push("/");
          });
      }
    }
  }

  function calculateTotal(items) {
    var _total = 0;
    items.forEach((i) => (_total += parseInt(i.rate) * parseInt(i.qty)));
    return _total;
  }

  function onRowUpdate(items) {
    var _total = calculateTotal(items);
    var _items = items.filter((item) =>
      item.qty && item.item && item.rate && item.description ? item : undefined
    );
    setItems(_items);
    setFinalInvoiceData({ ...InvoiceData, items, total: _total });
  }

  return (
    <Layout>
      <div className="d-flex justify-content-between">
        <h4 className="mb-4">
          {!isNew ? "Update Invoice" : "Create a new Invoice"}
        </h4>
        <h5 className="text-muted">{`Invoice ID: ${InvoiceData.invoice_no}`}</h5>
      </div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {
              table_columns.map((column, index) => (
                <th key={index}>{column.name}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          <ItemList onRowUpdate={onRowUpdate} inputItems={InvoiceData.items} />
        </tbody>
        <caption className="text font-italic">
          {"*Items row should have all the values filled up"}
        </caption>
      </table>
      <Divider />
      <div className="d-flex justify-content-end flex-column mt-5">
        <h3 className="align-self-end font-weight-bold">
          {`Total ₹:  ${InvoiceData.total}`}
        </h3>
        <button
          className="align-self-end btn btn-info"
          onClick={generateInvoice}
          disabled={isLoading || !Items.length > 0}
        >
          {isNew ? "Generate Invoice" : "Update Invoice"}
        </button>
      </div>
      <Link to="/" className="mt-4">{"Back to Dashboard"}</Link>
    </Layout>
  );
}
