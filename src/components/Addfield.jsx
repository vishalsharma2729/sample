import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Addfield({ next, prev }) {
  const dispatch = useDispatch();
  let [fielddata, setfielddata] = useState([
    {
      pname: "",
      qty: "",
      price: "",
      total: "",
    },
  ]);

  let [taxs, settaxs] = useState({
    allproduct: "",
    subtotal: "",
    tax: "",
    grandtotal: "",
  });

  const updateSubtotal = () => {
    let totalRate = fielddata.reduce((acc, curr) => acc + (curr.total || 0), 0);
    let totaltax = totalRate * 0.18;

    let grandtotalamt = totalRate + totaltax;
    settaxs({
      ...taxs,
      subtotal: totalRate.toFixed(2),
      tax: totaltax.toFixed(2),
      grandtotal: grandtotalamt.toFixed(2),
    });
  };

  const Addproduct = () => {
    let totalpname = fielddata.reduce(
      (acc, curr) => acc + "," + (curr.pname || ","),
      ""
    );
    let products = totalpname.split(",");

    settaxs((prevTaxs) => ({
      ...prevTaxs,
      allproduct: [...prevTaxs.allproduct, ...products],
    }));
  };

  const senddata = () => {
    let { allproduct, subtotal, tax, grandtotal } = taxs;
    if (
      allproduct !== "" &&
      subtotal !== "" &&
      tax !== "" &&
      grandtotal !== ""
    ) {
      dispatch({
        type: "addtaxes",
        payload: [taxs],
      });
    }
    setTimeout(() => {
      setfielddata([
        {
          pname: "",
          qty: "",
          price: "",
          total: "",
        },
      ]);

      settaxs({
        allproduct: "",
        subtotal: "",
        tax: "",
        grandtotal: "",
      });
    }, 3000);
  };

  const calculating = (event, index) => {
    if (event.key === "Enter") {
      let cal = fielddata[index];
      let updatedData = [...fielddata];
      updatedData[index] = { ...cal, total: cal.qty * cal.price };
      setfielddata(updatedData);
      updateSubtotal();
    }
  };

  const inputchange = (event, index) => {
    let { name, value } = event.target;
    const newfield = [...fielddata];
    newfield[index][name] = value;
    setfielddata(newfield);
  };

  const addingfield = () => {
    setfielddata([
      ...fielddata,
      {
        pname: "",
        qty: "",
        price: "",
        total: "",
      },
    ]);
  };

  const removefield = (index) => {
    const newfield = [...fielddata];
    newfield.splice(index, 1);
    setfielddata(newfield);
  };

  return (
    <div>
      {fielddata.map((val, index) => (
        <div key={index} className="billing">
          <div>
            <p>Product name</p>
            <input
              className="form-control"
              type="text"
              name="pname"
              onChange={(e) => inputchange(e, index)}
              value={val.pname || ""}
              onKeyDown={next}
              onKeyUp={prev}
              placeholder="Product name"
            />
          </div>
          <div>
            <p>Product Qty</p>
            <input
              className="form-control"
              type="number"
              name="qty"
              onChange={(e) => inputchange(e, index)}
              value={val.qty || ""}
              onKeyDown={next}
              onKeyUp={prev}
              placeholder="Product qty"
            />
          </div>
          <div>
            <p>Price (press enter twice)</p>
            <input
              className="form-control"
              type="number"
              name="price"
              id="price"
              onChange={(e) => inputchange(e, index)}
              onKeyUp={(e) => calculating(e, index)}
              value={val.price || ""}
              placeholder="Enter price"
            />
          </div>
          <div>
            <p>Total amount</p>
            <input
              className="form-control"
              type="number"
              readOnly
              name="total"
              value={val.total}
              placeholder="Total"
            />
          </div>
          {index == 0 ? (
            ""
          ) : (
            <div>
              <p>Action</p>
              <button className="removebtn" onClick={() => removefield(index)}>
                Remove
              </button>
            </div>
          )}
        </div>
      ))}
      <div className="arrang">
        <div className="btn">
          <button className="button" onClick={addingfield}>
            Add Field
          </button>
        </div>
        <br />
        <br />
        <div className="btn">
          <button className="button" onClick={Addproduct}>
            calculate
          </button>
        </div>
      </div>

      <div className="tax">
        <div>
          <label>Subtotal</label> &ensp;
          <input
            className="tax-inp"
            type="number"
            name="subtotal"
            readOnly
            value={taxs.subtotal}
            placeholder="Subtotal"
          />
        </div>
        <div>
          <label>Tax 18%</label> &ensp;
          <input
            className="tax-inp"
            type="number"
            name="tax"
            readOnly
            value={taxs.tax}
            placeholder="Tax"
          />
        </div>
        <div>
          <label>Grandtotal</label> &ensp;
          <input
            className="tax-inp"
            type="number"
            name="grandtotal"
            readOnly
            value={taxs.grandtotal}
            placeholder="Grandtotal"
          />
        </div>
        <div className="btn">
          <button className="button" id="generate" onClick={senddata}>
            Generate bill
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}
