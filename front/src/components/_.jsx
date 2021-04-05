import React, { useEffect, useState } from "react";

export default function InvoicePage(props) {
  const [InvoiceData, setInvoiceData] = useState({});

  useEffect(() => {
    var _data = {
      id: 2,
      item: "james2",
      description: "some james call",
      qty: 194,
      tax: 18,
      total: 100,
    };
    setInvoiceData(_data);
  }, []);

  return (
    <div>
      <h3>
        {InvoiceData
          ? `Update Inovoice ${InvoiceData.id}`
          : "Create a new Invoice"}
      </h3>
      <div>
        <form>
          <div className="form-group">
            <label for="item-name">Item Name</label>
            <input
              type="text"
              className="form-control"
              id="item-name"
              placeholder="Enter Item Name"
            />
          </div>
          <div className="form-group">
            <label for="item-description">Item Description</label>
            <input
              type="text"
              className="form-control"
              id="item-description"
              placeholder="Enter Item Description"
            />
          </div>
          <div className="form-group">
            <label for="item-qty">Qty</label>
            <input
              type="text"
              className="form-control"
              id="item-qty"
              placeholder="Enter Item qty"
            />
          </div>
          <div className="form-group">
            <label for="item-qty">Qty</label>
            <input
              type="text"
              className="form-control"
              id="item-qty"
              placeholder="Enter Item qty"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add more +
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
