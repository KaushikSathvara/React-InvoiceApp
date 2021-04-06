import React from "react";
import Divider from "./Divider";

export default function Layout(props) {
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h2 className="display-4 text-muted mb-5">Invoice Generator</h2>
        <span className="d-flex align-self-center">
          <button disabled className="btn btn-sm btn-info">
            {"Logout ?"}
          </button>
        </span>
      </div>
      <Divider />
      {props.children}
    </>
  );
}
