import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { v4 as uuidv4 } from "uuid";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Divider from "./Divider";

export default function InvoicePage(props) {
  const [InvoiceData, setInvoiceData] = useState({
    invoice_no: uuidv4(),
    items: [],
    total: 0,
  });

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
      axios
        .get(`http://localhost:8080/${query.get("invoice_no")}`)
        .then(({ data }) => {
          setInvoiceData({
            invoice_no: data.invoice_no,
            items: data.items,
            total: data.total,
          });
        });
    }
  }, []);

  async function generateInvoice() {
    console.log(`Generating Invoice for ${JSON.stringify(FinalInvoiceData)}`);
    if (!isNew) {
      const res = await axios
        .patch(
          `http://localhost:8080/${FinalInvoiceData.invoice_no}`,
          FinalInvoiceData
        )
        .then((res) => {
          console.log(res);
        });
    } else {
      const res = await axios.post("http://localhost:8080/", FinalInvoiceData);
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
    // setInvoiceData({ ...InvoiceData, items, total: _total });
    setFinalInvoiceData({ ...InvoiceData, items, total: _total });
  }

  return (
    <div>
      <h3 className="mb-4">
        {!isNew ? (
          <>
            Update Invoice<br></br>
            {`#${InvoiceData.invoice_no}`}
          </>
        ) : (
          <>
            Create a new Invoice<br></br>
            {`#${InvoiceData.invoice_no}`}
          </>
        )}
      </h3>
      <table className="table table-borderless">
        <thead className="thead-dark">
          <tr>
            <td>Sr No</td>
            <td>Item</td>
            <td>Description</td>
            <td>Qty</td>
            <td>Tax(Rate)</td>
          </tr>
        </thead>
        <tbody>
          <ItemList onRowUpdate={onRowUpdate} inputItems={InvoiceData.items} />
        </tbody>
      </table>
      <Divider />
      <div className="d-flex justify-content-end">
        <h3 className="align-self-end">Total: {InvoiceData.total}</h3>
      </div>
      <button className="btn btn-lg btn-info" onClick={generateInvoice}>
        {isNew ? "Generate Invoice" : "Update Invoice"}
      </button>
      <div className="mt-4">
        <Link to="/">Back to Dashboard</Link>
      </div>
    </div>
  );
}
