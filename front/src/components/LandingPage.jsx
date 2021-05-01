import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "./Datatable";
import axios from "axios";
import Layout from "./Layout";
import { SERVER_URL } from "../utils/common";
import EmptyList from "./EmptyList";
export default function LandingPage() {
  const [Invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get(SERVER_URL).then(({ data }) => {
      setInvoices(data);
    });
  }, []);

  function deleteInvoice(id) {
    axios.delete(`${SERVER_URL}${id}`).then(({ data }) => {
      setInvoices(data);
    });
  }

  return (
    <Layout>
      <div className="d-flex justify-content-between mb-3">
        {Invoices.length > 0 ? (
          <>
            <h4 className="mb-4">{"My Invoices"}</h4>
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
          <EmptyList text={"No invoices found"} />
          <Link
            className="mt-3 justify-content-center align-self-center"
            to="/invoice"
          >
            {"+ Create A new Invoice"}
          </Link>
        </div>
      )}
    </Layout>
  );
}
