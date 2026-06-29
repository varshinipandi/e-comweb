"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./address.css";

export default function AddressPage() {
  const router = useRouter();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    house: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    country: "India",
    type: "Home",
  });

  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    const savedSelectedAddress = JSON.parse(localStorage.getItem("selectedAddressIndex"));
    setAddresses(savedAddresses);
    if (savedSelectedAddress !== null) {
      setSelectedAddress(savedSelectedAddress);
    }
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveAddress = () => {
    if (!formData.fullName || !formData.mobile || !formData.pincode || !formData.house || !formData.street || !formData.city || !formData.state) {
      alert("Please fill all required fields");
      return;
    }
    let updatedAddresses = [...addresses];
    if (editIndex !== null) {
      updatedAddresses[editIndex] = formData;
    } else {
      updatedAddresses.push(formData);
    }
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setFormData({ fullName: "", mobile: "", pincode: "", house: "", street: "", landmark: "", city: "", state: "", country: "India", type: "Home" });
    setEditIndex(null);
    setShowForm(false);
  };

  const editAddress = (index) => {
    setFormData(addresses[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const deleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    if (selectedAddress === index) {
      setSelectedAddress(null);
      localStorage.removeItem("selectedAddressIndex");
      localStorage.removeItem("selectedAddress");
    }
  };

  const steps = [
    { num: 1, label: "Address",  img: "/adress1.png" , mobileImg: "/adress1.png"  },
    { num: 2, label: "Shipping", img: "/shipping1.png" , mobileImg: "/shipping1.png" },
    { num: 3, label: "Payment",  img: "/payment1.png"  },
  ];

  return (
    <div className="checkout-page"><br /><br />

      <div className="checkout-steps">
  {steps.map((step) => {
    const isActive = step.num === 1;

    if (isMobile && step.num > 2) return null;

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
</div><br /><br /><br />

      <h2 className="section-title">Select Address</h2>

      {addresses.map((address, index) => (
        <div
          key={index}
          className={`address-card ${selectedAddress === index ? "active" : ""}`}
          onClick={() => {
            setSelectedAddress(index);
            localStorage.setItem("selectedAddressIndex", JSON.stringify(index));
            localStorage.setItem("selectedAddress", JSON.stringify(address));
          }}
        >
          <div className="address-left">
            <input type="radio" checked={selectedAddress === index} readOnly />
            <div className="address-details">
              <div className="address-header">
                <h4>{address.fullName}</h4>
                <span className="address-type">{address.type}</span>
              </div>
              <p>{address.house}, {address.street}</p>
              <p>{address.city}, {address.state}</p>
              <p>{address.pincode}</p>
              <p>{address.mobile}</p>
            </div>
          </div>
          <div className="address-actions">
            <button className="edit-btn" onClick={(e) => { e.stopPropagation(); editAddress(index); }}>✎</button>
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); deleteAddress(index); }}>✕</button>
          </div>
        </div>
      ))}

      <div className="add-address" onClick={() => { setShowForm(!showForm); setEditIndex(null); }}><br />
        Add New Address
      </div>

      {showForm && (
        <div className="address-form">
          <input type="text" name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleChange} />
          <input type="text" name="mobile" placeholder="Mobile Number *" value={formData.mobile} onChange={handleChange} />
          <input type="text" name="pincode" placeholder="Pincode *" value={formData.pincode} onChange={handleChange} />
          <input type="text" name="house" placeholder="Flat / House No *" value={formData.house} onChange={handleChange} />
          <input type="text" name="street" placeholder="Area / Street *" value={formData.street} onChange={handleChange} />
          <input type="text" name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} />
          <input type="text" name="city" placeholder="City *" value={formData.city} onChange={handleChange} />
          <input type="text" name="state" placeholder="State *" value={formData.state} onChange={handleChange} />
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Home">Home</option>
            <option value="Office">Office</option>
          </select>
          <button className="save-btn" onClick={saveAddress}>
            {editIndex !== null ? "Update Address" : "Save Address"}
          </button>
        </div>
      )}

      <div className="checkout-buttons">
        <button className="back-btn" onClick={() => router.push("/cart")}>Back</button>
        <button className="next-btn" disabled={selectedAddress === null} onClick={() => router.push("/checkout/shipping")}>Next</button>
      </div>

    </div>
  );
}