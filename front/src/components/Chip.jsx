import React, { useEffect, useState } from "react";
import { INVOICE_STATUS_OVERDUE, INVOICE_STATUS_PAID } from "../utils/common";

export default function InvoicePill({ text }) {
  switch (text) {
    case INVOICE_STATUS_OVERDUE:
      return <span className="badge bg-danger rounded-pill">{INVOICE_STATUS_OVERDUE}</span>
    case INVOICE_STATUS_PAID:
      return <span className="badge rounded-pill bg-primary">{INVOICE_STATUS_PAID}</span>
    default:
      return <span className="badge">{"-"}</span>
  }
}
