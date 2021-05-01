import React from "react";
import Divider from "../components/Divider";
// import { BG_PRIMARY } from "../utils/common";
import BG_PRIMARY from "../assets/images/bg_primary.jpg";
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
