import React, { useEffect, useState } from "react";
import InvoicePill from "./Chip";
import { INVOICE_STATUS_OVERDUE, INVOICE_STATUS_PAID } from "../utils/common";
export default function InvoiceStatus({ total }) {

  if (total > 10) {
    return <InvoicePill text={INVOICE_STATUS_PAID} />;
  }
  else if (total < 10) {
    return <InvoicePill text={INVOICE_STATUS_OVERDUE} />;
  }
  else {
    return <InvoicePill text={"INVOICE_STATUS_OVERDUE"} />;
  }
}

