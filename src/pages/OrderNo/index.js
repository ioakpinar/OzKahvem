import { useState, useEffect } from "react";
import "./OrderNo.css";
import { Link, useParams } from "react-router-dom";

export default function OrderNo() {
  const { orderId } = useParams();

  const getOrderNo = () => {
    /* Get the text field */
    const orderNo = document.getElementById("orderNo");
    /* Select the text field */
    orderNo.select();
    orderNo.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(orderNo.value);

    /* Alert the copied text */
    document.execCommand("copy");
    alert("Copied the text: " + orderNo.value);
  };

  return (
    <div className="orderNo">
      <span className="left"></span>
      <span className="right"></span>
      <div className="orderNo__body">
        <h2>Sipariş No</h2>
        <div className="copy">
          <input id="orderNo" type="text" value={orderId} />
          <button className="largeButton" onClick={() => getOrderNo()}>
            Sipariş No'yu Kopyala
          </button>
        </div>
        <Link to="/products">
          <button className="largeButton orderNo__button">Kahvelere Git</button>
        </Link>
      </div>
    </div>
  );
}
