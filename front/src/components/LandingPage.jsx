import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "./Datatable";
import axios from "axios";
import Layout from "./Layout";
export default function LandingPage() {
  const [Invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/").then(({ data }) => {
      setInvoices(data);
    });
  }, []);

  function deleteInvoice(id) {
    axios.delete(`http://localhost:8080/${id}`).then(({ data }) => {
      setInvoices(data);
    });
  }

  return (
    <Layout>
      <div className="d-flex justify-content-between mb-3">
        {Invoices.length > 0 ? (
          <>
            <h4 className="mb-4">{"List of Invoices"}</h4>
            <Link
              className="justify-content-center align-self-center"
              to="/invoice"
            >
              {"+ Create A new Invoice"}
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
      {Invoices.length > 0 ? (
        <Datatable invoices={Invoices} onDelete={deleteInvoice} />
      ) : (
        <div className="flex-column d-flex justify-content-center align-items-center">
          {"No invoices found 😔"}
          <br />
          <Link
            className="mt-2 justify-content-center align-self-center"
            to="/invoice"
          >
            {"+ Create A new Invoice"}
          </Link>
        </div>
      )}
    </Layout>
  );
}
