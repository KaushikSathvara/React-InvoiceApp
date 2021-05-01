import React, { useEffect, useState } from "react";
import { INVOICE_STATUS_OVERDUE, INVOICE_STATUS_PAID } from "../utils/common";

export default function InvoicePill({ text }) {
  switch (text) {
    case INVOICE_STATUS_OVERDUE:
      return <span className="badge badge-danger badge-pill">{INVOICE_STATUS_OVERDUE}</span>
    case INVOICE_STATUS_PAID:
      return <span className="badge badge-pill badge-success">{INVOICE_STATUS_PAID}</span>
    default:
      return <span className="badge">{"-"}</span>
  }
}
