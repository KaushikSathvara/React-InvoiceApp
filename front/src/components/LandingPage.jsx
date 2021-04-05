import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import rawData from "../data/invoices.json";
import Datatable from "./Datatable";

export default function LandingPage() {
  const [Invoices, setInvoices] = useState([]);

  useEffect(() => {
    setInvoices(rawData);
  }, []);

  return (
    <>
      <div className="display-4 mb-4">List of Invoices</div>
      <Datatable invoices={Invoices} />
      <Link to="/create">Create A new Invoice</Link>
    </>
  );
}
