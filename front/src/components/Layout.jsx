import React from "react";
import Divider from "./Divider";

export default function Layout(props) {
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h2 className="display-4 text-muted mb-5">Invoice Generator</h2>
      </div>
      <Divider />
      {props.children}
    </>
  );
}
