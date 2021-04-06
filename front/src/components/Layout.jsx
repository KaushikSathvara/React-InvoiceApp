import React from "react";
import Divider from "./Divider";

export default function Layout(props) {
  return (
    <>
      <h2 className="display-4 text-muted mb-5">Invoice Generator</h2>
      <Divider />
      {props.children}
    </>
  );
}
