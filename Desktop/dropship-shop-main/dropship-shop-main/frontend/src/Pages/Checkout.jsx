import React, { useState } from "react";
import logoImg from "../assets/images.jpeg";
import "../Css/checkout.css";
import DeliveryOptions from "./DeliveryOptions"; 

const countries = [
  "Pakistan",
  "United States",
  "United Kingdom",
  "India",
  "Canada",
  "Australia",
  "Other",
];

const Checkout = () => {
  const [email, setEmail] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState("");

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "Pakistan",
    postalCode: "",
    phone: "",
  });
  const [shippingErrors, setShippingErrors] = useState({});

  const [showDelivery, setShowDelivery] = useState(false);

  const validateEmail = (value) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(value).toLowerCase());
  };

  const onProceedToShipping = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setContactError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setContactError("Please enter a valid email address.");
      return;
    }
    setContactError("");
    setContactSubmitted(true);

    document.getElementById("shipping-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleShippingChange = (field, value) => {
    setShipping((s) => ({ ...s, [field]: value }));
    setShippingErrors((e) => ({ ...e, [field]: "" }));
  };

  const validateShipping = () => {
    const errs = {};
    if (!shipping.firstName.trim()) errs.firstName = "First name required";
    if (!shipping.lastName.trim()) errs.lastName = "Last name required";
    if (!shipping.address1.trim()) errs.address1 = "Address required";
    if (!shipping.postalCode.trim()) errs.postalCode = "Postal code required";
    if (!shipping.phone.trim()) errs.phone = "Phone number required";
    if (shipping.phone && shipping.phone.replace(/\D/g, "").length < 7)
      errs.phone = "Enter a valid phone number";

    setShippingErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onProceedToDelivery = (e) => {
    e.preventDefault();

    if (!validateShipping()) return;

    setShowDelivery(true);

    setTimeout(() => {
      document.getElementById("delivery-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <img src={logoImg} alt="Logo" className="checkout-logo" />
      </header>

      <main className="checkout-container">
        <section className="card contact-card">
          <div className="step-number">1</div>
          <div className="card-body">
            <h2 className="card-title">Contact Information</h2>

            <form onSubmit={onProceedToShipping} className="contact-form">
              <label className="field-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                className={`input ${contactError ? "input-error" : ""}`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {contactError && (
                <div className="error-text">{contactError}</div>
              )}

              <button className="btn primary-block">PROCEED TO SHIPPING</button>
            </form>
          </div>
        </section>

        <section
          id="shipping-section"
          className={`card shipping-card ${
            contactSubmitted ? "visible" : "collapsed"
          }`}
        >
          <div className="step-number">2</div>
          <div className="card-body">
            <h2 className="card-title">Shipping</h2>

            <form className="shipping-form" onSubmit={onProceedToDelivery}>
              <div className="row">
                <div className="col">
                  <label className="field-label">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    className={`input ${
                      shippingErrors.firstName ? "input-error" : ""
                    }`}
                    value={shipping.firstName}
                    onChange={(e) =>
                      handleShippingChange("firstName", e.target.value)
                    }
                  />
                  {shippingErrors.firstName && (
                    <div className="error-text">
                      {shippingErrors.firstName}
                    </div>
                  )}
                </div>

                <div className="col">
                  <label className="field-label">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    className={`input ${
                      shippingErrors.lastName ? "input-error" : ""
                    }`}
                    value={shipping.lastName}
                    onChange={(e) =>
                      handleShippingChange("lastName", e.target.value)
                    }
                  />
                  {shippingErrors.lastName && (
                    <div className="error-text">
                      {shippingErrors.lastName}
                    </div>
                  )}
                </div>
              </div>

              <label className="field-label">
                Address Line 1 <span className="required">*</span>
              </label>
              <input
                className={`input ${
                  shippingErrors.address1 ? "input-error" : ""
                }`}
                value={shipping.address1}
                onChange={(e) =>
                  handleShippingChange("address1", e.target.value)
                }
                placeholder="Address Line 1"
              />

              <label className="field-label">Address Line 2</label>
              <input
                className="input"
                value={shipping.address2}
                onChange={(e) =>
                  handleShippingChange("address2", e.target.value)
                }
                placeholder="Address Line 2 (optional)"
              />

              <div className="row">
                <div className="col">
                  <label className="field-label">
                    Country <span className="required">*</span>
                  </label>
                  <select
                    className="input"
                    value={shipping.country}
                    onChange={(e) =>
                      handleShippingChange("country", e.target.value)
                    }
                  >
                    {countries.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="col">
                  <label className="field-label">
                    Postal Code <span className="required">*</span>
                  </label>
                  <input
                    className={`input ${
                      shippingErrors.postalCode ? "input-error" : ""
                    }`}
                    value={shipping.postalCode}
                    onChange={(e) =>
                      handleShippingChange("postalCode", e.target.value)
                    }
                  />
                </div>
              </div>

              <label className="field-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                className={`input ${
                  shippingErrors.phone ? "input-error" : ""
                }`}
                value={shipping.phone}
                onChange={(e) =>
                  handleShippingChange("phone", e.target.value)
                }
                placeholder="+92 300 0000000"
              />

              <div className="actions-row">
                <button
                  className="btn secondary"
                  type="button"
                  onClick={() => setContactSubmitted(false)}
                >
                  Back to Contact
                </button>

                <button className="btn primary">PROCEED TO DELIVERY OPTIONS</button>
              </div>
            </form>
          </div>
        </section>

        {showDelivery && (
          <section
            id="delivery-section"
            className="card shipping-card visible"
          >
            <DeliveryOptions />
          </section>
        )}
      </main>
    </div>
  );
};

export default Checkout;
