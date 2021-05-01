import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { v4 as uuidv4 } from "uuid";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Divider from "./Divider";
import Layout from "../layouts/Layout";
import { SERVER_URL } from "../utils/common";

export default function InvoicePage(props) {
  const [InvoiceData, setInvoiceData] = useState({
    invoice_no: "INV-" + uuidv4(),
    items: [],
    total: 0,
  });
  const [isLoading, setisLoading] = useState(false);
  const [Items, setItems] = useState([]);
  const [FinalInvoiceData, setFinalInvoiceData] = useState({});

  const [isNew, setisNew] = useState(true);
  const histroy = useHistory();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  useEffect(() => {
    if (query.get("invoice_no")) {
      setisNew(false);
      axios.get(`${SERVER_URL}${query.get("invoice_no")}`).then(({ data }) => {
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
            histroy.push("/");
          });
      } else {
        await axios
          .post(SERVER_URL, {
            ...FinalInvoiceData,
            items: Items,
          })
          .then((_) => {
            setisLoading(false);
            histroy.push("/");
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
            <th>{"#"}</th>
            <th>{"Name"}</th>
            <th>{"Description"}</th>
            <th>{"Qty"}</th>
            <th>{"Rate (With Tax in ₹)"}</th>
            <th>{"Action"}</th>
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
          Total ₹: {FinalInvoiceData.total}
        </h3>
        <button
          className="align-self-end btn btn-info"
          onClick={generateInvoice}
          disabled={isLoading || !Items.length > 0}
        >
          {isNew ? "Generate Invoice" : "Update Invoice"}
        </button>
      </div>
      <div className="mt-4">
        <Link to="/">{"Back to Dashboard"}</Link>
      </div>
    </Layout>
  );
}
