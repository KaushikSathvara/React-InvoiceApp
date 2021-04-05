import React from "react";

export default function Datatable(props) {
  const { invoices } = props;

  function editInvoice(invoiceId) {
    console.log(`Edit ${invoiceId}`);
  }

  function deleteInvoice(invoiceId) {
    console.log(`Delete ${invoiceId}`);
  }

  return (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Description</th>
            {/* <th>Item</th>
            <th>Qty</th>
            <th>Tax</th> */}
            <th>Total</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{"Dummy Disk"}</td>
              {/* <td>{item.description}</td>
              <td>{item.item}</td>
              <td>{item.qty}</td>
              <td>{item.tax}</td> */}
              <td>{item.total}</td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => editInvoice(item.id)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteInvoice(item.id)}
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
