"use client";

import { useState, useEffect, use } from "react";
import { sampleProducts } from "../../../../data/products";
import "./productDetails.css";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/components/WishlistProvider";

export default function ProductDetails({ params }) {
  const { id, category } = use(params);

  const product = sampleProducts.find(
    (item) => item.id === Number(id)
  );

  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);

  const discountProducts = [
    { id: 53, title: "Apple iPhone 14 Pro 512GB (MQ233)", price: 1437, image: "/Iphone-14-pro-mq2v3.png", category: "smartphones" },
    { id: 54, title: "AirPods Max Silver Starlight Aluminium", price: 549, image: "/airpods max silver.png", category: "smartphones" },
    { id: 56, title: "Apple Watch Series 9 GPS 41mm Starlight Aluminium", price: 399, image: "/apple watch serier 9 gps.png", category: "smartphones" },
    { id: 55, title: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)", price: 1499, image: "/Iphone-14-pro-mq233.png", category: "smartphones" },
  ];

  const router = useRouter();

  const [showMore, setShowMore] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedStorage, setSelectedStorage] = useState("128GB");

  const colors = ["#000000", "#6A0DAD", "#C9A227", "#D3D3D3"];
  const storage = ["128GB", "256GB", "512GB", "1TB"];

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [visibleReviews, setVisibleReviews] = useState(3);

  const initialReviews = [
    {
      name: "Grace Carey",
      rating: 4,
      date: "24 January, 2023",
      avatar: "/User-Pic.png",
      comment: "I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn't be happier with my purchase!! I have a pre-paid data plan so I was worried that this phone wouldn't connect with my data plan, since the new phones don't have the physical Sim tray anymore, but couldn't have been easier! I bought an Unlocked black iPhone 14 Pro Max in excellent condition and everything is PERFECT. It was super easy to set up and the phone works and looks great. It truly was in excellent condition. Highly recommend!!!🖤",
      images: [],
    },
    {
      name: "Ronald Richards",
      rating: 5,
      date: "24 January, 2023",
      avatar: "/User-Pic-1.png",
      comment: "This phone has 1T storage and is durable. Plus all the new iPhones have a C port! Apple is phasing out the current ones! (All about the Benjamin's) So if you want a phone that's going to last grab an iPhone 14 pro max and get several cords and plugs.",
      images: [],
    },
    {
      name: "Darcy King",
      rating: 5,
      date: "24 January, 2023",
      avatar: "/User-Pic-2.png",
      comment: "I might be the only one to say this but the camera is a little funky. Hoping it will change with a software update: otherwise, love this phone! Came in great condition",
      images: ["/Review-Image1.png", "/Review-Image2.png"],
    },
  ];

  useEffect(() => {
    if (!product) return;
    const storageKey = `reviews-${product.id}`;
    localStorage.removeItem(storageKey);
    setReviews(initialReviews);
    localStorage.setItem(storageKey, JSON.stringify(initialReviews));
  }, [product?.id]);

  const handleReviewSubmit = () => {
    if (!reviewText.trim() || !product) return;
    const storageKey = `reviews-${product.id}`;
    const newReview = {
      name: "Guest User",
      rating: userRating,
      date: new Date().toLocaleDateString(),
      avatar: "/User-Pic.png",
      comment: reviewText,
      images: [],
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(storageKey, JSON.stringify(updatedReviews));
    setReviewText("");
    setUserRating(5);
  };

  const excellent = reviews.filter((r) => r.rating === 5).length;
  const good = reviews.filter((r) => r.rating === 4).length;
  const average = reviews.filter((r) => r.rating === 3).length;
  const belowAverage = reviews.filter((r) => r.rating === 2).length;
  const poor = reviews.filter((r) => r.rating === 1).length;

  const avgRating = reviews.length
    ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
    : 0;

  const [showCartMessage, setShowCartMessage] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = existingCart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      existingCart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setShowCartMessage(true);
    setTimeout(() => setShowCartMessage(false), 3000);
  };

  return (
    <>
      {showCartMessage && (
        <div className="cart-toast">✅ Product Added To Cart</div>
      )}
      <div>
        <div className="breadcrumb">
          <span>Home</span>
          <span className="separator">&gt;</span>
          <span>Catalog</span>
          <span className="separator">&gt;</span>
          <span>Smartphones</span>
          <span className="separator">&gt;</span>
          <span>{product.brand}</span>
          <span className="separator">&gt;</span>
          <span className="active-category">{product.title}</span>
        </div>

        <div className="product-page">
          <div className="product-container">

            {/* Left */}
            <div className="product-gallery">
              <div className="thumbnail-column">
                <img src={product.image} alt="" className="thumb active" />
                <img src={product.image} alt="" className="thumb" />
                <img src={product.image} alt="" className="thumb" />
                <img src={product.image} alt="" className="thumb" />
              </div>
              <div className="main-image-container">
                <img src={product.image} alt={product.title} className="main-image" />
              </div>
            </div>

            {/* Right */}
            <div className="right-section">
              <h1>{product.title}</h1><br />

              <p className="rating">
                ⭐ {avgRating.toFixed(1)} | {reviews.length} Reviews
              </p>

              <h2 className="price">
                ${product.price}
                <span className="old-price">${product.oldPrice}</span>
              </h2>

              <p className="save">Save ${product.oldPrice - product.price}</p><br />

              <div className="color-it">
                <h4>Select Color : </h4>
                <div className="color-list">
                  {colors.map((color) => (
                    <div
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={selectedColor === color ? "color-circle selected" : "color-circle"}
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="storage-list">
                {storage.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedStorage(item)}
                    className={selectedStorage === item ? "storage-btn active-storage" : "storage-btn"}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="features">
                <div className="features-area">
                  <img src="/Screensize.png" alt="Screen Size" />
                  <div className="feature-content">
                    <h4>Screen Size</h4>
                    <p>6.7"</p>
                  </div>
                </div>
                <div className="features-area">
                  <img src="/cpu.png" alt="CPU" />
                  <div className="feature-content">
                    <h4>CPU</h4>
                    <p>Apple A16 Bionic</p>
                  </div>
                </div>
                <div className="features-area">
                  <img src="/cores.png" alt="Number of Cores" />
                  <div className="feature-content">
                    <h4>Number of Cores</h4>
                    <p>6</p>
                  </div>
                </div>
                <div className="features-area">
                  <img src="/main camera.png" alt="Main Camera" />
                  <div className="feature-content">
                    <h4>Main Camera</h4>
                    <p>48-12-12 MP</p>
                  </div>
                </div>
                <div className="features-area">
                  <img src="/front camera.png" alt="Front Camera" />
                  <div className="feature-content">
                    <h4>Front Camera</h4>
                    <p>12 MP</p>
                  </div>
                </div>
                <div className="features-area">
                  <img src="/battery capacity.png" alt="Battery Capacity" />
                  <div className="feature-content">
                    <h4>Battery Capacity</h4>
                    <p>4342 mAh</p>
                  </div>
                </div>
              </div>

              <p className={showDescription ? "full-text" : "short-text"}>
                {product.description}
              </p>
              <span className="more-link" onClick={() => setShowDescription(!showDescription)}>
                {showDescription ? "...Less" : "More...."}
              </span>

              <div className="button-row">
                <button className="wishlist-btnn">Add to Wishlist</button>
                <button className="cart-btn" onClick={handleAddToCart}>Add to Cart</button>
              </div>

              <div className="shipping">
                <div className="shipping-item">
                  <img src="/Delivery.png" alt="Delivery" />
                  <div>
                    <h4>Free Delivery</h4>
                    <p>1-2 days</p>
                  </div>
                </div>
                <div className="shipping-item">
                  <img src="/Stock.png" alt="Stock" />
                  <div>
                    <h4>In Stock</h4>
                    <p>Today</p>
                  </div>
                </div>
                <div className="shipping-item">
                  <img src="/Guaranteed.png" alt="Warranty" />
                  <div>
                    <h4>Guaranteed</h4>
                    <p>1 year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="details">
            <div className="details-section">
              <h2>Details</h2>
              <p>{product.description}</p>
              <table>
                <tbody>
                  <h2>Screen</h2>
                  <tr>
                    <td>Screen diagonal</td>
                    <td className="diagonal">{product.details.screen}</td>
                  </tr>
                  <tr>
                    <td>Resolution</td>
                    <td className="diagonal">{product.details.resolution}</td>
                  </tr>
                  <tr>
                    <td>Refresh Rate</td>
                    <td className="diagonal">{product.details.refreshRate}</td>
                  </tr>
                  <tr>
                    <td>Screen Type</td>
                    <td className="diagonal">{product.details.screenType}</td>
                  </tr>
                  {showMore && (
                    <>
                      <tr>
                        <td>CPU</td>
                        <td className="diagonal">{product.details.cpu}</td>
                      </tr>
                      <tr>
                        <td>Cores</td>
                        <td className="diagonal">{product.details.cores}</td>
                      </tr>
                      <tr>
                        <td>Battery</td>
                        <td className="diagonal">{product.details.battery}</td>
                      </tr>
                      <tr>
                        <td>Pixel Density</td>
                        <td className="diagonal">{product.details.pixelDensity}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              <button className="view-btn" onClick={() => setShowMore(!showMore)}>
                {showMore ? "View Less...." : "View More..."}
              </button>
            </div>
          </div>

          <div className="review-section">
            <h1>Reviews</h1>
            <br /><br />
            <div className="review-summary">

              {/* FIXED RATING BOX */}
              <div className="rating-box">
                <div className="rating-top">
                  <h1>{avgRating.toFixed(1)}</h1>
                  <div className="stars">★★★★★</div>
                </div>
                <p>of {reviews.length} reviews</p>
              </div>

              <div className="rating-bars">
                <div className="bar-row">
                  <span>Excellent</span>
                  <div className="bar">
                    <div className="fill" style={{ width: `${(excellent / reviews.length) * 100 || 0}%` }} />
                  </div>
                  <span className="reivew-1">{excellent}</span>
                </div>
                <div className="bar-row">
                  <span>Good</span>
                  <div className="bar">
                    <div className="fill" style={{ width: `${(good / reviews.length) * 100 || 0}%` }} />
                  </div>
                  <span className="reivew-1">{good}</span>
                </div>
                <div className="bar-row">
                  <span>Average</span>
                  <div className="bar">
                    <div className="fill" style={{ width: `${(average / reviews.length) * 100 || 0}%` }} />
                  </div>
                  <span className="reivew-1">{average}</span>
                </div>
                <div className="bar-row">
                  <span>Below Average</span>
                  <div className="bar">
                    <div className="fill" style={{ width: `${(belowAverage / reviews.length) * 100 || 0}%` }} />
                  </div>
                  <span className="reivew-1">{belowAverage}</span>
                </div>
                <div className="bar-row">
                  <span>Poor</span>
                  <div className="bar">
                    <div className="fill" style={{ width: `${(poor / reviews.length) * 100 || 0}%` }} />
                  </div>
                  <span className="reivew-1">{poor}</span>
                </div>
              </div>
            </div>

            <div className="leave-comment">
              <h4>Leave Comment</h4>
              <div className="star-picker">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={star <= userRating ? "star active-star" : "star"}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <button className="submit-review-btn" onClick={handleReviewSubmit}>
                Submit Review
              </button>
            </div>

            {reviews.slice(0, visibleReviews).map((review, index) => (
              <div className="review-card" key={index}>
                <div className="review-header">
                  <div className="review-user">
                    <img
                      src={review.avatar || "/User-Pic.png"}
                      alt={review.name || "User"}
                      className="review-avatar"
                      onError={(e) => { e.currentTarget.src = "/User-Pic.png"; }}
                    />
                    <div>
                      <h4>{review.name || "Guest User"}</h4>
                      <div className="stars">
                        {"★".repeat(Math.min(review.rating || 0, 5))}
                        {"☆".repeat(5 - Math.min(review.rating || 0, 5))}
                      </div>
                    </div>
                  </div>
                  <span className="review-date">{review.date || "N/A"}</span>
                </div>
                <p className="review-comment">{review.comment || "No review available."}</p>
                {Array.isArray(review.images) && review.images.length > 0 && (
                  <div className="review-images">
                    {review.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Review Image ${i + 1}`}
                        className="review-photo"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="discounts">
              <div>
                <h2>Related Products</h2>
              </div>
              <div className="products-grid">
                {discountProducts.map((product) => (
                  <div className="product-cell" key={product.id}>
                    <button
                      className={`wishlist-btn ${isWishlisted(product.id) ? "active" : ""}`}
                      onClick={() => toggleWishlist(product)}
                    >
                      {isWishlisted(product.id) ? "♥" : "♡"}
                    </button>
                    <img className="product-image" src={product.image} alt={product.title} />
                    <h3 className="product-name">{product.title}</h3>
                    <h1 className="product-price">${product.price}</h1>
                    <button
                      className="buy-now"
                      onClick={() => router.push(`/products/${product.category}/${product.id}`)}
                    >
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}