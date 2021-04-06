import React from "react";
import { useHistory } from "react-router";

export default function Datatable({ invoices, onDelete }) {
  const history = useHistory();

  function editInvoice(invoiceId) {
    history.push(`/invoice?invoice_no=${invoiceId}`);
    console.log(`Edit ${invoiceId}`);
  }

  function deleteInvoice(invoiceId) {
    onDelete(invoiceId);
    console.log(`Delete ${invoiceId}`);
  }

  return (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Total</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoice_no}>
              <td>{invoice.invoice_no}</td>
              <td>{invoice.total}</td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => editInvoice(invoice.invoice_no)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteInvoice(invoice.invoice_no)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
