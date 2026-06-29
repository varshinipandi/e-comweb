"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./cart.css";

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, action) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              action === "increase"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
          }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const tax = 50;
  const shipping = cartItems.length > 0 ? 29 : 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="cart-page">
      {/* LEFT SIDE */}
      <div className="cart-left">
        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
          </div>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name || item.title}
                className="cart-image"
              />

              <div className="cart-info">
                <h4>{item.name || item.title}</h4><br/>
                <p>${item.price}</p>
              </div>

              <div className="quantity">
                <button
                  onClick={() =>
                    updateQuantity(item.id, "decrease")
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, "increase")
                  }
                >
                  +
                </button>
              </div>

              <h3>
                $
                {(item.price || 0) *
                  (item.quantity || 1)}
              </h3>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

     <div className="cart-right">
  <h2>Order Summary</h2>

  {/* Promo Code */}
  <div className="input-group">
    <label>Discount code | Promo code</label>
    <input
      type="text"
      placeholder="Code"
      className="summary-input"
    />
  </div>

  {/* Bonus Card */}
  <div className="input-group">
    <label>Your bonus card number</label>

    <div className="bonus-card">
      <input
        type="text"
        placeholder="Enter Card Number"
        className="summary-input"
      />

      <button className="apply-btn">
        Apply
      </button>
    </div>
  </div>

      {/* RIGHT SIDE */}
      <div className="cart-right1">
        <div className="summary-row">
          <span><strong>Subtotal</strong></span>
          <span>${subtotal}</span>
        </div>

        <div className="summary-row">
          <span>Estimated Tax</span>
          <span>${tax}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span>${shipping}</span>
        </div>

        <div className="summary-row total">
          <span>Total</span>
          <span>${total}</span>
        </div>

        <button
  className="checkout-btn"
  onClick={() => router.push("/checkout/address")}
>
  Checkout
</button>
      </div>
    </div>
    </div>
  );
}