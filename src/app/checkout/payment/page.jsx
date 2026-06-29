"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./payment.css";

export default function PaymentPage() {
  const router = useRouter();

  const [paymentType, setPaymentType] = useState("card");
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [shippingData, setShippingData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const selectedAddress = JSON.parse(localStorage.getItem("selectedAddress")) || null;
    const selectedShipping = JSON.parse(localStorage.getItem("shippingMethod")) || null;
    setCartItems(cart);
    setAddress(selectedAddress);
    setShippingData(selectedShipping);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const tax = 50;
  let shippingCost = 0;
  if (shippingData?.method === "express") shippingCost = 8.5;
  if (shippingData?.method === "schedule") shippingCost = 5;
  const total = subtotal + tax + shippingCost;

  const steps = [
    { num: 1, label: "Address",  img: "/Location.png"  },
    { num: 2, label: "Shipping", img: "/Shipping1.png" },
    { num: 3, label: "Payment",  img: "/Payment.png"   },
  ];

  return (
    <div className="payment-page">

      <div className="checkout-steps">
        {steps.map((step) => {
          const isActive = step.num === 3;
          if (isMobile && step.num === 1) return null;
          return (
            <div key={step.num} className={`checkout-step ${isActive ? "active" : ""}`}>
              <img src={step.img} alt={step.label} className="step-icon" />
              <div>
                <p className="step-label">Step {step.num}</p>
                <h4>{step.label}</h4>
              </div>
            </div>
          );
        })}
      </div><br /><br />

      <div className="payment-container">

        {/* LEFT */}
        <div className="summary-box">
          <h2>Summary</h2><br />

          {cartItems.map((item) => (
            <div className="summary-product" key={item.id}>
              <img src={item.image} alt="" />
              <div className="product-name">{item.name || item.title}</div>
              <strong className="price-1">${item.price * (item.quantity || 1)}</strong>
            </div>
          ))}

          <div className="summary-section">
            <h4>Address</h4>
            <div className="summary-adr">
              {address ? (
                <>
                  <p>{address.fullName}</p>
                  <p>{address.house}, {address.street}</p>
                  <p>{address.city}, {address.state}</p>
                  <p>{address.pincode}</p>
                  <p>{address.mobile}</p>
                  <p><strong>{address.type}</strong></p>
                </>
              ) : (
                <p>No Address Selected</p>
              )}
            </div>
          </div>

          <div className="summary-section">
            <h4>Shipment Method</h4>
            <p>
              {shippingData?.method === "free" ? "Free Delivery"
                : shippingData?.method === "express" ? "Fast Delivery"
                : "Scheduled Delivery"}
            </p>
            {shippingData?.date && <p>Delivery: {shippingData.date}</p>}
          </div>

          <div className="bill-row total">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="bill-row" style={{ color: "#999" }}>
            <span>Estimated Tax</span>
            <span>${tax}</span>
          </div>

          <div className="bill-row" style={{ color: "#999" }}>
            <span>Shipping & Handling</span>
            <span>${shippingCost}</span>
          </div>

          <div className="bill-row total">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div><br />

        {/* RIGHT */}
        <div className="payment-box">
          <h2 className="payment-title">Payment Details</h2>

          <div className="payment-tabs">
            <button className={`tab-btn ${paymentType === "card" ? "active" : ""}`} onClick={() => setPaymentType("card")}>Credit Card</button>
            <button className={`tab-btn ${paymentType === "paypal" ? "active" : ""}`} onClick={() => setPaymentType("paypal")}>PayPal</button>
            <button className={`tab-btn ${paymentType === "paypal-credit" ? "active" : ""}`} onClick={() => setPaymentType("paypal-credit")}>PayPal Credit</button>
          </div>

          {paymentType === "card" && (
            <>
              <img src="/image 65.png" alt="" className="card-image" />
              <div className="input-group">
                <label>Cardholder Name</label>
                <input type="text" placeholder="Enter cardholder name" />
              </div>
              <div className="input-group">
                <label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="card-row">
                <div className="input-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input type="password" placeholder="123" />
                </div>
              </div>
            </>
          )}

          {paymentType === "paypal" && (
            <div className="paypal-box">
              <img src="/paypal.png" alt="" />
              <p>You will be redirected to PayPal to complete your purchase securely.</p>
            </div>
          )}

          {paymentType === "paypal-credit" && (
            <div className="paypal-box">
              <img src="/paypal-credit.png" alt="" />
              <p>Pay later with PayPal Credit.</p>
            </div>
          )}

          <label className="billing-check">
            <input type="checkbox" defaultChecked />
            Same as billing address
          </label>

          <div className="payment-buttons">
            <button className="back-btn" onClick={() => router.push("/checkout/shipping")}>Back</button>
            <button className="pay-btn">Pay</button>
          </div>
        </div>

      </div>
    </div>
  );
}