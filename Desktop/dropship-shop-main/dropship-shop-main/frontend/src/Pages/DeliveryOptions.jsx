import React, { useState } from "react";
import "../Css/delivery.css";

const DeliveryOptions = () => {
  const [selectedDelivery, setSelectedDelivery] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("card");

  return (
    <div className="delivery-container">

      {/* 1 — Delivery Options */}
      <div className="section-block">
        <div className="section-header">
          <span className="section-number">3</span>
          <h2>Delivery Options</h2>
        </div>

        <label className="option-box">
          <input
            type="radio"
            name="delivery"
            checked={selectedDelivery === "standard"}
            onChange={() => setSelectedDelivery("standard")}
          />
          <div>
            <h4>Standard Delivery</h4>
            <p>3 - 5 business days</p>
          </div>
          <span className="price">Rs 200</span>
        </label>

        <label className="option-box">
          <input
            type="radio"
            name="delivery"
            checked={selectedDelivery === "express"}
            onChange={() => setSelectedDelivery("express")}
          />
          <div>
            <h4>Express Delivery</h4>
            <p>1 - 2 business days</p>
          </div>
          <span className="price">Rs 400</span>
        </label>
      </div>

      <hr />

      {/* 2 — Payment Section */}
      <div className="section-block">
        <div className="section-header">
          <span className="section-number">4</span>
          <h2>Payment</h2>
        </div>

        {/* Payment Method Selector */}
        <label className="option-box">
          <input
            type="radio"
            name="payment"
            checked={selectedPayment === "card"}
            onChange={() => setSelectedPayment("card")}
          />
          <h4>Credit / Debit Card</h4>
        </label>

        {selectedPayment === "card" && (
          <div className="payment-form">

            <input
              type="text"
              className="input-field"
              placeholder="Card Number"
            />

            <div className="two-columns">
              <input type="text" className="input-field" placeholder="Expiry (MM/YY)" />
              <input type="text" className="input-field" placeholder="CVC" />
            </div>

            <input
              type="text"
              className="input-field"
              placeholder="Card Holder Name"
            />

          </div>
        )}

      </div>

      {/* CONTINUE BUTTON */}
      <button className="proceed-btn">PAY NOW</button>

    </div>
  );
};

export default DeliveryOptions;
