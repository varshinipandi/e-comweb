"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({
  children,
}) {
  const [wishlist, setWishlist] =
    useState([]);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "wishlist"
      );

    if (saved) {
      setWishlist(
        JSON.parse(saved)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const toggleWishlist = (
    product
  ) => {
    setWishlist((prev) => {
      const exists = prev.some(
        (item) =>
          item.id === product.id
      );

      if (exists) {
        return prev.filter(
          (item) =>
            item.id !== product.id
        );
      }

      return [...prev, product];
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () =>
  useContext(WishlistContext);