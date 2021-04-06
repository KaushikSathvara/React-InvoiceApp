import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { v4 as uuidv4 } from 'uuid';
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

export default function InvoicePage(props) {
  const [InvoiceData, setInvoiceData] = useState({
    invoice_no: uuidv4(),
    items: [],
    total: 0
  });

  const histroy = useHistory()

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery()

  useEffect(() => {
    if (query.get('invoice_no')) {
      axios.get(`http://localhost:8080/${query.get('invoice_no')}`).then(({ data }) => {
        console.log("GOT Items", data.items);
        setInvoiceData({
          invoice_no: data.invoice_no,
          items: data.items,
          total: data.total
        })
      });
    }
  }, [])

  async function generateInvoice() {
    console.log(`Generating Invoice for ${JSON.stringify(InvoiceData)}`);
    const res = await axios.post('http://localhost:8080/', InvoiceData);
    histroy.push('/')
  }

  function calculateTotal(items) {
    var _total = 0;
    items.forEach(i => _total += parseInt(i.rate))
    console.log("_total:", _total);
    return _total;
  }

  function onRowUpdate(items) {
    var _total = calculateTotal(items);
    setInvoiceData({ ...InvoiceData, items, total: _total })
  }


  return (
    <div>
      <h4 className="display-4 mb-4">
        {InvoiceData ? `Inovoice #${InvoiceData.invoice_no}` : "Create a new Invoice"}
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
          <ItemList onRowUpdate={onRowUpdate} inputItems={[{ item: "sa", description: "12", qty: 0, rate: 0 }]} />
        </tbody>
      </table>
      <h3>Total: {InvoiceData.total}</h3>
      <button className='btn btn-lg btn-info' onClick={generateInvoice}>Generate Invoice</button>
      <div className="mt-4">
        <Link to="/">Back to Dashboard</Link>
      </div>
    </div>
  );
}
