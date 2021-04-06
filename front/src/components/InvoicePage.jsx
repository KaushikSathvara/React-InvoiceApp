import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { v4 as uuidv4 } from "uuid";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

export default function InvoicePage(props) {
  const [InvoiceData, setInvoiceData] = useState({
    invoice_no: uuidv4(),
    items: [{}],
    total: 0,
  });

  const [isNew, setisNew] = useState(true);
  const histroy = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  useEffect(() => {
    if (query.get("invoice_no")) {
      axios
        .get(`http://localhost:8080/${query.get("invoice_no")}`)
        .then(({ data }) => {
          setisNew(false);

          var _items = data.items.map((item) => ({
            item: item.item,
            description: item.description,
            qty: item.qty,
            rate: item.rate,
          }));

          setInvoiceData({
            invoice_no: data.invoice_no,
            items: _items,
            total: data.total,
          });
        });
    }
  }, []);

  async function generateInvoice() {
    console.log(`Generating Invoice for ${JSON.stringify(InvoiceData)}`);
    if (!isNew) {
      const res = await axios
        .patch(`http://localhost:8080/${InvoiceData.invoice_no}`, InvoiceData)
        .then((res) => {
          console.log(res);
        });
    } else {
      const res = await axios.post("http://localhost:8080/", InvoiceData);
    }
    histroy.push("/");
  }

  function calculateTotal(items) {
    var _total = 0;
    items.forEach((i) => (_total += parseInt(i.rate)));
    console.log("_total:", _total);
    return _total;
  }

  function onRowUpdate(items) {
    var _total = calculateTotal(items);
    setInvoiceData({ ...InvoiceData, items, total: _total });
  }

  return (
    <div>
      <h4 className="display-4 mb-4">
        {!isNew
          ? `Inovoice #${InvoiceData.invoice_no}`
          : "Create a new Invoice"}
      </h4>
      <table className="table table-borderless">
        <thead>
          <tr>
            <td>Sr No</td>
            <td>Item</td>
            <td>Description</td>
            <td>Qty</td>
            <td>Tax(Rate)</td>
          </tr>
        </thead>
        <tbody>
          {!isNew && InvoiceData.items.length > 0 ? (
            <ItemList
              onRowUpdate={onRowUpdate}
              inputItems={[...InvoiceData.items]}
            />
          ) : (
            <ItemList onRowUpdate={onRowUpdate} inputItems={[{}]} />
          )}
        </tbody>
      </table>
      <h3>Total: {InvoiceData.total}</h3>
      <button className="btn btn-lg btn-info" onClick={generateInvoice}>
        {isNew ? "Generate Invoice" : "Update Invoice"}
      </button>
      <div className="mt-4">
        <Link to="/">Back to Dashboard</Link>
      </div>
    </div>
  );
}
