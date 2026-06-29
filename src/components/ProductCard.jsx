"use client";

import { useRouter } from "next/navigation";
import { useWishlist } from "./WishlistProvider";
import { useCart } from "./CartProvider";


export default function ProductCard({
  product,
}) {
  const router =
    useRouter();

  const {
    wishlist,
    toggleWishlist,
  } = useWishlist();

  const {
    addToCart,
  } = useCart();

  const isWishlisted =
    wishlist.some(
      (item) =>
        item.id ===
        product.id
    );

  return (
    <div className="product-card">

      <div className="product-image-wrapper">

        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />

        <button
          className={`wishlist-btn ${
            isWishlisted
              ? "active"
              : ""
          }`}
          onClick={() =>
            toggleWishlist(
              product
            )
          }
        >
          {isWishlisted
            ? "♥"
            : "♡"}
        </button>

      </div>

      <div className="product-info">

        <h3 className="product-title">
          {product.title}
        </h3>

        <p className="product-price">
          ${product.price}
        </p>


        <button
          className="buy-btn"
          onClick={() =>
            router.push(
              `/products/${product.category}/${product.id}`
            )
          }
        >
          Buy Now
        </button>

      </div>

    </div>
  );
}