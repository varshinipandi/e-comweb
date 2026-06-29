"use client";

import Link from "next/link";
import { useState } from "react";
import "../styles/navbar.css";
import { useRouter } from "next/navigation";

import {
  useWishlist,
} from "@/components/WishlistProvider";

import {
  useCart,
} from "@/components/CartProvider";

function Navbar() {
  const [menuOpen,
    setMenuOpen] =
    useState(false);

  const {
    wishlist,
  } = useWishlist();

  const {
    cart,
  } = useCart();

  const router =
    useRouter();

  return (
    <nav className="navbar2">

      <div className="navbar-logo">
        <Link href="/">
          <img
            src="/Logo.png"
            alt="Logo"
          />
        </Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
        />
      </div>

      <div className="navbar-links">
        <Link
          className="navbar-hover"
          href="#HeroSection"
        >
          Home
        </Link>

        <Link
          className="navbar-hover"
          href="#about"
        >
          About
        </Link>

        <Link
          className="navbar-hover"
          href="#footer"
        >
          Contact Us
        </Link>

      </div>

      <div className="navbar-icons">

        <div
          className="wishlist-icon-wrapper"
          onClick={() =>
            router.push(
              "/wishlist"
            )
          }
        >
          <img
            className="icon"
            src="/Favorite.png"
            alt="Favorite"
          />

          {wishlist.length >
            0 && (
            <span className="wishlist-count">
              {
                wishlist.length
              }
            </span>
          )}
        </div>

        <div
          className="cart-icon-wrapper"
          onClick={() =>
            router.push(
              "/cart"
            )
          }
        >
          <img
            className="icon"
            src="/Cart.png"
            alt="Cart"
          />

          {cart.length >
            0 && (
            <span className="cart-count">
              {cart.length}
            </span>
          )}
        </div>

        <img
          className="icon"
          src="/User.png"
          alt="User"
        />

      </div>

      <button
        className="menu-btn"
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      {menuOpen && (
  <div className="mobile-menu">
    <input type="text" placeholder="Search" />
    
    <Link className="navbar-hover" href="/" onClick={() => setMenuOpen(false)}>Home</Link>
    <Link className="navbar-hover" href="/about" onClick={() => setMenuOpen(false)}>About</Link>
    <Link className="navbar-hover" href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
    <Link className="navbar-hover" href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>

    <div className="menu-icons">
      {/* Wishlist — count badge + onClick */}
      <div
        className="wishlist-icon-wrapper"
        onClick={() => { router.push("/wishlist"); setMenuOpen(false); }}
      >
        <img className="icon" src="/Favorite.png" alt="Favorite" />
        {wishlist.length > 0 && (
          <span className="wishlist-count">{wishlist.length}</span>
        )}
      </div>

      {/* Cart — count badge + onClick */}
      <div
        className="cart-icon-wrapper"
        onClick={() => { router.push("/cart"); setMenuOpen(false); }}
      >
        <img className="icon" src="/Cart.png" alt="Cart" />
        {cart.length > 0 && (
          <span className="cart-count">{cart.length}</span>
        )}
      </div>

      <img className="icon" src="/User.png" alt="User" />
    </div>
  </div>
)}
    </nav>
  );
}

export default Navbar;
