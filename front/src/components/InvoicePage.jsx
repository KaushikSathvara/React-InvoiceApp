import React, { useEffect, useState } from "react";
import ItemRow from "./ItemRow";

export default function InvoicePage(props) {
  const [InvoiceData, setInvoiceData] = useState({});
  const [Items, setItems] = useState([]);
  const [CurrentId, setCurrentId] = useState(0);

  function addRow(e) {
    setItems((prev) => [
      ...prev,
      <ItemRow onAdd={addRow} onRemove={removeRow} />,
    ]);
  }

  function removeRow(e) {}

  useEffect(() => {
    setItems([...Items, <ItemRow onAdd={addRow} onRemove={removeRow} />]);
  }, []);

  return (
    <div>
      <h4 className="display-4 mb-4">
        {InvoiceData ? `Inovoice #${InvoiceData.id}` : "Create a new Invoice"}
      </h4>
      <table className="table table-borderless">
        <thead>
          <tr>
            <td>Sr No</td>
            <td>Item</td>
            <td>Description</td>
            <td>Tax</td>
            <td>Qty</td>
            <td>Add</td>
          </tr>
        </thead>
        <tbody>{Items}</tbody>
      </table>
    </div>
  );
}
