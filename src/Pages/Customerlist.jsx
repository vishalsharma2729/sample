import React from "react";
import { useSelector } from "react-redux";

export default function Customerlist() {
  let tax = useSelector((state) => state.taxs);
  let customer = useSelector((state) => state.customer);

  let mergedata = [];
  if (tax.length === customer.length) {
    let mergedData = tax.map((taxItem, index) => ({
      ...taxItem,
      ...customer[index],
    }));

    mergedata.push(mergedData);
  }

  const customerlist = mergedata[0];
  return (
    <div className="customerpage">
      <h1 className="cusList">Customer List</h1>
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Date</th>
            <th>Client Name</th>
            <th>Address</th>
            <th>Phone No</th>
            <th>Product</th>
            <th>Subtotal</th>
            <th>Tax</th>
            <th>Grand Total</th>
          </tr>
        </thead>
        <tbody>
          {customerlist.length > 0
            ? customerlist.map((value, index) => (
                <tr key={index}>
                  <td>{value.invoice}</td>
                  <td>{value.date}</td>
                  <td>{value.cname}</td>
                  <td>{value.adress}</td>
                  <td>{value.contact}</td>
                  <td>
                    {value.allproduct.map((v, i) => (
                      <div key={i}>{v}</div>
                    ))}
                  </td>
                  <td>${value.subtotal}</td>
                  <td>${value.tax}</td>
                  <td>${value.grandtotal}</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
      <br />
      <br />
    </div>
  );
}
