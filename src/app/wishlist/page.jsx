"use client";

import { useWishlist } from "@/components/WishlistProvider";
import { useRouter } from "next/navigation";
import "./wishlist.css";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const router = useRouter();

  return (
    <div className="wishlist-page">
      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p className="wishlist-empty">No products added to wishlist.</p>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <div className="product-card" key={product.id}>
              
              {/* Heart — active always, click = remove */}
              <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(product)}
              >
                ♥
              </button>

              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="price">${product.price}</p>

              <button
                className="buy-now"
                onClick={() =>
                  router.push(`/products/${product.category}/${product.id}`)
                }
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}