import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "./Datatable";
import axios from "axios";
import Layout from "../layouts/Layout";
import { SERVER_URL } from "../utils/common";
import EmptyList from "./EmptyList";
import Spinner from "./Spinner";
export default function LandingPage() {
  const [Invoices, setInvoices] = useState([]);
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    setSpinner(true)
    axios.get(SERVER_URL).then(({ data }) => {
      setSpinner(false)
      setInvoices(data);
    });
  }, []);

  function deleteInvoice(id) {
    setSpinner(true)
    axios.delete(`${SERVER_URL}${id}`).then(({ data }) => {
      setSpinner(false)
      setInvoices(data);
    });
  }

  return (
    <Layout>
      {spinner ? <Spinner /> : <></>}
      {Invoices.length > 0 ? (
        <>
          <div className="d-flex justify-content-between mb-3">
            <span style={{ fontSize: "28px" }} className="text-secondary justify-content-center align-self-center">{"My Invoices"}</span>
            <Link
              className="justify-content-center align-self-center"
              to="/invoice"
            >
              {"+ Create A new Invoice"}
            </Link>
          </div>
          <Datatable invoices={Invoices} onDelete={deleteInvoice} />
        </>
      ) : (
        <EmptyList text={"No invoices found"} >
          <Link
            className="mt-3 justify-content-center align-self-center"
            to="/invoice"
          >
            {"+ Create A new Invoice"}
          </Link>
        </EmptyList>
      )}
    </Layout>
  );
}
