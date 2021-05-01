import React from "react";
import Divider from "../components/Divider";

export default function Layout(props) {
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h2 className="display-4 text-muted mb-5">Invoice Generator</h2>
      </div>
      <Divider />
      <div className="d-flex flex-column justify-content-center">
        {props.children}
      </div>
    </>
  );
}
