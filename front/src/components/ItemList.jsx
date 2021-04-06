import React, { useEffect, useState } from "react";

export default function ItemList({ onRowUpdate, inputItems }) {
  const [inputList, setInputList] = useState([...inputItems]);

  useEffect(() => {
    setInputList([
      ...inputItems,
      { item: "", description: "", qty: 0, rate: 0 },
    ]);
  }, [inputItems]);

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
    // Adding blank item on add button click
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
      {inputList.map((item, i) => (
        <tr
          key={i}
          className={inputList.length - 1 === i ? "" : "confirm-row"}
        >
          <td>{i + 1}</td>
          <td>
            <input
              name="item"
              className="form-control"
              placeholder="Item Name"
              value={item.item}
              onChange={(e) => handleInputChange(e, i)}
            />
          </td>
          <td>
            <input
              className="form-control"
              name="description"
              placeholder="Item Description"
              value={item.description}
              onChange={(e) => handleInputChange(e, i)}
            />
          </td>
          <td>
            <input
              className="form-control"
              name="qty"
              min={1}
              type="Number"
              placeholder="Item Qty"
              value={item.qty}
              onChange={(e) => handleInputChange(e, i)}
            />
          </td>
          <td>
            <input
              className="form-control"
              type="Number"
              min={1}
              name="rate"
              placeholder="Item Tax Rate"
              value={item.rate}
              onChange={(e) => handleInputChange(e, i)}
            />
          </td>
          <td colSpan={2}>
            <div className='d-flex'>
              {inputList.length > 1 ? (
                <><button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
              </button>
                </>
              ) : (
                <></>
              )}
              {inputList.length - 1 === i ? (
                <button className="btn btn-info btn-sm ml-2" onClick={handleAddClick}>
                  Add
                </button>
              ) : (
                <></>
              )}
            </div>
          </td>

        </tr>
      ))
      }
    </>
  );
}
