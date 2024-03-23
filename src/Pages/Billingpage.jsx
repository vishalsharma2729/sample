import React, { useEffect, useState } from "react";
import Addfield from "../components/Addfield";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Billingpage() {
  const customer = useSelector((state) => state.customer);
  let invoiceno = customer.length + 1;
  const dispatch = useDispatch();

  let initial = {
    invoice: "",
    cname: "",
    date: "",
    contact: "",
    adress: "",
  };

  let [billing, setbilling] = useState(initial);

  const inputchange = (event) => {
    let { name, value } = event.target;
    setbilling({
      ...billing,
      [name]: value,
    });
  };

  const next = (event) => {
    let inputs = document.querySelectorAll(".form-control");
    let focused = document.activeElement;
    if (event.key === "Enter") {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] === focused) {
          let nextIndex = (i + 1) % inputs.length;
          inputs[nextIndex].focus();
          break;
        }
      }
      if (billing.date === "") {
        const currentDate = new Date();
        const fullDate = currentDate.getDate();
        const fullMonth = currentDate.getMonth() + 1;
        const fullYear = currentDate.getFullYear();
        setbilling({
          ...billing,
          date: `${fullMonth}/${fullDate}/${fullYear}`,
          invoice: "01234" + invoiceno,
        });
      }
    }
  };

  const prev = (event) => {
    let inputs = document.querySelectorAll(".form-control");
    let focused = document.activeElement;
    if (event.key === "Backspace") {
      console.log(inputs.length);
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
          if (inputs[i] === focused) {
            let nextIndex = (i - 1) % inputs.length;
            inputs[nextIndex].focus();
            break;
          }
        }
      }
    }
  };

  const submit = () => {
    let { cname, invoice, date, contact, adress } = billing;
    if (
      cname !== "" &&
      invoice !== "" &&
      date !== "" &&
      contact !== "" &&
      adress !== ""
    ) {
      dispatch({
        type: "addcustomer",
        payload: [billing],
      });
      toast.success("Your bill is saved successfully");
    } else {
      toast.error("Please insert all input fields...");
    }
    setbilling(initial);
  };

  useEffect(() => {
    let inputs = document.querySelectorAll(".form-control");
    inputs[1].focus();
  }, []);

  return (
    <div className="container">
      <br />
      <h1 className="billPage">Billing page</h1>
      <marquee className="note">
        Note - (After fill all input field you press calculate then generate
        bill and last press submit button)
      </marquee>
      <br />
      <div className="bill">
        <div>
          <p>Invoice no:</p>
          <input
            className="form-control"
            type="number"
            name="invoice"
            readOnly
            value={billing.invoice}
            onKeyDown={next}
            placeholder="Invoice"
          />
        </div>
        <div>
          <p>Client name:</p>
          <input
            className="form-control"
            type="text"
            name="cname"
            onChange={inputchange}
            value={billing.cname}
            onKeyDown={next}
            placeholder="Client name"
          />
        </div>
        <div>
          <p>Billing Date:</p>
          <input
            className="form-control"
            type="text"
            readOnly
            value={billing.date}
            onKeyDown={next}
            onKeyUp={prev}
            placeholder="Billing date"
          />
        </div>
        <div>
          <p>Contact no:</p>
          <input
            className="form-control"
            type="number"
            name="contact"
            onChange={inputchange}
            value={billing.contact}
            onKeyDown={next}
            onKeyUp={prev}
            placeholder="contact no"
          />
        </div>
        <div>
          <p>Address:</p>
          <input
            className="form-control"
            type="text"
            name="adress"
            onChange={inputchange}
            value={billing.adress}
            onKeyDown={next}
            onKeyUp={prev}
            placeholder="address"
          />
        </div>
      </div>
      <br />
      <br />
      <Addfield prev={prev} next={next} />
      <br />
      <div className="subPArent">
        <button className="submit" onClick={submit}>
          Submit
        </button>
      </div>
      <br />
      <br />
      <ToastContainer />
    </div>
  );
}
