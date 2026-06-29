"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

export function CartProvider({
  children,
}) {
  const [cart, setCart] =
    useState([]);

  useEffect(() => {
    const savedCart =
      localStorage.getItem("cart");

    if (savedCart) {
      setCart(
        JSON.parse(savedCart)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (
    product
  ) => {
    const exists = cart.some(
      (item) =>
        item.id === product.id
    );

    if (!exists) {
      setCart([
        ...cart,
        product,
      ]);
    }
  };

  const removeFromCart = (
    id
  ) => {
    setCart(
      cart.filter(
        (item) =>
          item.id !== id
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () =>
  useContext(CartContext);