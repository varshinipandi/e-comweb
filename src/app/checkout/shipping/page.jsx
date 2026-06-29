"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./shipping.css";

export default function ShippingPage() {
  const router = useRouter();

  const [method, setMethod] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const today = new Date();

  useEffect(() => {
    const savedShipping = JSON.parse(localStorage.getItem("shippingMethod"));
    if (savedShipping) {
      setMethod(savedShipping.method);
      if (savedShipping.date) setSelectedDate(savedShipping.date);
    }
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const selectShipping = (methodName, cost) => {
    setMethod(methodName);
    localStorage.setItem("shippingMethod", JSON.stringify({ method: methodName, cost, date: selectedDate }));
  };

  const freeDelivery = new Date(today);
  freeDelivery.setDate(today.getDate() + 5);

  const expressDelivery = new Date(today);
  expressDelivery.setDate(today.getDate() + 2);

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  const steps = [
    { num: 1, label: "Address",  img: "/Location.png" },
    { num: 2, label: "Shipping", img: "/Shipping.png" },
    { num: 3, label: "Payment",  img: "/Payment1.png" },
  ];

  return (
    <div className="shipping-page"><br />

      <div className="checkout-steps">
        {steps.map((step) => {
          const isActive = step.num === 2;
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

      <h2 className="shipment-title">Shipment Method</h2>

      {/* Free */}
      <div className={`shipping-card ${method === "free" ? "selected" : ""}`} onClick={() => selectShipping("free", 0)}>
        <input type="radio" checked={method === "free"} readOnly />
        <div className="shipping-info">
          <span className="price">Free</span>
          <span>Regular shipment</span>
        </div>
        <div className="shipping-date">{formatDate(freeDelivery)}</div>
      </div>

      {/* Express */}
      <div className={`shipping-card ${method === "express" ? "selected" : ""}`} onClick={() => selectShipping("express", 8.5)}>
        <input type="radio" checked={method === "express"} readOnly />
        <div className="shipping-info">
          <span className="price">$8.50</span>
          <span>Get your delivery as soon as possible</span>
        </div>
        <div className="shipping-date">{formatDate(expressDelivery)}</div>
      </div>

      {/* Schedule */}
      <div className={`shipping-card ${method === "schedule" ? "selected" : ""}`} onClick={() => selectShipping("schedule", 5)}>
        <input type="radio" checked={method === "schedule"} readOnly />
        <div className="shipping-info">
          <span className="price">Schedule</span>
          <span>Pick a date when you want to get your delivery</span>
        </div>
        <input
          type="date"
          className="date-picker"
          value={selectedDate}
          min={new Date().toISOString().split("T")[0]}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            localStorage.setItem("shippingMethod", JSON.stringify({ method: "schedule", cost: 5, date: e.target.value }));
          }}
        />
      </div><br /><br /><br /><br />

      <div className="shipping-buttons">
        <button className="back-btn" onClick={() => router.push("/checkout/address")}>Back</button>
        <button className="next-btn" disabled={!method} onClick={() => router.push("/checkout/payment")}>Next</button>
      </div>

    </div>
  );
}