import React, { useState } from "react";
import "../Css/ship.css";

const Ship = () => {
  const [email] = useState("aima@gmail.com");

  return (
    <div className="ship-container">
      <div className="section-block">
        <div className="section-header">
          <span className="section-number">1</span>
          <h2>Contact Information</h2>
          <button className="edit-btn">Edit</button>
        </div>

        <p className="saved-email">{email} ✔</p>

        <label className="checkbox-row">
          <input type="checkbox" />
          Email me with news and offers
        </label>
      </div>

      <hr />
      <div className="section-block">
        <div className="section-header">
          <span className="section-number">2</span>
          <h2>Shipping</h2>
        </div>

        <input type="text" className="input-field" placeholder="First Name *" />

        <input type="text" className="input-field" placeholder="Last Name *" />

        <input
          type="text"
          className="input-field"
          placeholder="Address Line 1 *"
        />

        <input
          type="text"
          className="input-field"
          placeholder="Address Line 2"
        />
        <div className="two-columns">
          <select className="input-field">
            <option>Pakistan</option>
          </select>

          <select className="input-field">
            <option>Select an Option</option>
            <option>Karachi</option>
            <option>Lahore</option>
            <option>Islamabad</option>
            <option>Rawalpindi</option>
            <option>Faisalabad</option>
          </select>
        </div>

        <input type="text" className="input-field" placeholder="Postal Code" />

        <div className="phone-row">
          <div className="phone-flag-box">🇵🇰 +92</div>
          <input
            type="text"
            className="phone-number-field"
            placeholder="03XXXXXXXXX"
          />
        </div>

        <label className="checkbox-row">
          <input type="checkbox" />
          Send it as a gift
        </label>
      </div>

      <button className="proceed-btn">PROCEED TO DELIVERY OPTIONS</button>
    </div>
  );
};

export default Ship;
