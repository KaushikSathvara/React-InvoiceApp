import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import rawData from "../data/invoices.json";
import Datatable from "./Datatable";
import axios from "axios";
export default function LandingPage() {
  const [Invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/").then(({ data }) => {
      setInvoices(data)
    })
  }, []);

  function deleteInvoice(id) {
    axios.delete(`http://localhost:8080/${id}`).then(({ data }) => {
      setInvoices(data)
    })
  }

  return (
    <>
      <div className="display-4 mb-4">List of Invoices</div>
      <Datatable invoices={Invoices} onDelete={deleteInvoice} />
      <Link to="/invoice">Create A new Invoice</Link>
    </>
  );
}
