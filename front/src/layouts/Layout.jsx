import React from "react";
import Divider from "../components/Divider";
import Breadcrumb from "../components/Breadcrumb";
export default function Layout({ children }) {
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h2 className="display-4 text-muted mb-5">Invoice Generator</h2>
      </div>
      <Divider />
      <Breadcrumb />
      <div className="d-flex flex-column justify-content-center">
        {children}
      </div>
    </>
  );
}
