import React, { useEffect, useState } from "react";

export default function ItemRow(props) {
  const { submitRow } = props;
  const [RowData, setRowData] = useState({});
  const [AddVisible, setAddVisible] = useState(true);

  function onItemChange(e) {
    setRowData({ ...RowData, [e.target.name]: e.target.value });
  }

  function addLocalRow() {
    submitRow();
    setAddVisible(false);
  }

  function removeLocalRow() {}

  return (
    <tr>
      <td>{"1"}</td>
      <td>
        <input name="i_name" onChange={onItemChange} />
      </td>
      <td>
        <input name="i_description" onChange={onItemChange} />
      </td>
      <td>
        <input name="i_qty" onChange={onItemChange} />
      </td>
      <td>
        <input name="i_tax" onChange={onItemChange} />
      </td>
      <td>
        {AddVisible ? (
          <button onClick={addLocalRow}>Add</button>
        ) : (
          <button onClick={removeLocalRow}>Remove</button>
        )}
      </td>
    </tr>
  );
}
