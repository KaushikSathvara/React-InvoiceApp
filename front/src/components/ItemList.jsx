import React, { useEffect, useState } from "react";

export default function ItemList({ onRowUpdate, inputItems }) {
  const [inputList, setInputList] = useState([...inputItems]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { item: "", description: "", qty: 0, rate: 0 },
    ]);
  };

  useEffect(() => {
    onRowUpdate(inputList);
  }, [inputList]);

  return (
    <>
      {inputList.map((x, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>
            <input
              name="item"
              placeholder="Item Name"
              value={x.item}
              onChange={(e) => handleInputChange(e, i)}
            />
          </td>
          <td>
            <input
              className="ml10"
              name="description"
              placeholder="Item Description"
              value={x.description}
              onChange={(e) => handleInputChange(e, i)}
            />
          </td>
          <td>
            <input
              className="ml10"
              name="qty"
              type="Number"
              placeholder="Item Qty"
              value={x.qty}
              onChange={(e) => handleInputChange(e, i)}
            />
          </td>
          <td>
            <input
              className="ml10"
              type="Number"
              name="rate"
              placeholder="Item Tax Rate"
              value={x.rate}
              onChange={(e) => handleInputChange(e, i)}
            />
          </td>
          <td className="flex-column">
            {inputList.length > 1 ? (
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveClick(i)}
              >
                Remove
              </button>
            ) : (
              <></>
            )}
          </td>
          <td>
            {inputList.length - 1 === i ? (
              <button className="btn btn-info" onClick={handleAddClick}>
                Add
              </button>
            ) : (
              <></>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}
