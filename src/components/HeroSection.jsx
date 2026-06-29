"use client";
import { useRef, useState } from "react";
import BrowseCarousel from "./BrowseCarousel";
import HeroGrid from "./HeroGrid";
import Footer from "./Footer";
import "../styles/HeroSection.css";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/components/WishlistProvider";

function HeroSection() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  const products = [
    { id: 57, title: "Apple iPhone 14 Pro Max 128GB Deep Purple", price: 900, image: "apple iphone 14 pro max.png", category: "smartphones" },
    { id: 58, title: "Blackmagic Pocket Cinema Camera 6K", price: 2535, image: "blackmagic pocket cinema.png", category: "smartphones" },
    { id: 59, title: "Apple Watch Series 9 GPS 41mm Starlight Aluminium", price: 399, image: "apple watch serier 9 gps.png", category: "smartphones" },
    { id: 60, title: "AirPods Max Silver Starlight Aluminium", price: 900, image: "airpods max silver.png", category: "smartphones" },
    { id: 61, title: "Samsung Galaxy Watch6 Classic 47mm Black", price: 369, image: "samsung galaxy watch6.png", category: "smartphones" },
    { id: 62, title: "Galaxy Z Fold5 Unlocked 256GB Phantom Black", price: 1799, image: "galaxy z fold5 unlock.png", category: "smartphones" },
    { id: 63, title: "Galaxy Buds FE Graphite", price: 99.9, image: "galaxy buds FE.png", category: "smartphones" },
    { id: 64, title: "Apple Watch Series 10 GPS", price: 999, image: "apple watch serier 9 gps.png", category: "smartphones" },
  ];

  const discountProducts = [
    { id: 53, title: "Apple iPhone 14 Pro 512GB (MQ233)", price: 1437, image: "/iphone 14 pro mq2v3.png", category: "smartphones" },
    { id: 54, title: "AirPods Max Silver Starlight Aluminium", price: 549, image: "/airpods max silver.png", category: "smartphones" },
    { id: 56, title: "Apple Watch Series 9 GPS 41mm Starlight Aluminium", price: 399, image: "/apple watch serier 9 gps.png", category: "smartphones" },
    { id: 55, title: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)", price: 1499, image: "/iphone 14 pro mq233.png", category: "smartphones" },
  ];

  const popularItems = [
    {
      id: 1,
      bg: "#f1f1f1",
      img: "Group 1.png",
      alt: "Popular",
      title: "Popular Product",
      desc: "iPad combines a magnificent 10.2-inch Retina, incredible performance, multitasking and ease of use.",
      btnColor: "dark",
      route: "/public/Apple AirPods Max.png",
    },
    {
      id: 2,
      bg: "#ededed",
      img: "ipad pro.png",
      alt: "iPad Pro",
      title: "iPad Pro",
      desc: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      btnColor: "dark",
      route: "/public/image 36.png",
    },
    {
      id: 3,
      bg: "#e5e5e5",
      img: "samsung galaxy.png",
      alt: "Samsung Galaxy",
      title: "Samsung Galaxy",
      desc: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      btnColor: "dark",
      route: "/public/PlayStation.png",
    },
    {
      id: 4,
      bg: "#2b2b2b",
      img: "macbook.png",
      alt: "Macbook Pro",
      title: "Macbook Pro",
      desc: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      btnColor: "light",
      route: "/public/Screen.png",
    },
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const goToSlide = (index) => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: index * width, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <>
      <section className="font-section-1">

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-company">Pro.Beyond.</p>
            <p className="hero-title">
              iPhone 14 <strong className="hero-title-strong">Pro</strong>
            </p>
            <p className="hero-description">
              Created to change everything for the better. For everyone.
            </p>
            <button className="shop-btn" onClick={() => router.push("/products/smartphones")}>
              Shop Now
            </button>
          </div>
          <div className="hero-image">
            <img src="Iphone image.png" alt="iPhone" />
          </div>
        </section>

        {/* Hero Grid */}
        <HeroGrid />

        {/* Browse Carousel */}
        <BrowseCarousel />

        {/* Products */}
        <div className="products">
          <div className="product-seller">
            <a
              href="#"
              className={active === "new" ? "active" : ""}
              onClick={() => setActive("new")}
            >
              New Arrival
            </a>
            <a
              href="#"
              className={active === "best" ? "active" : ""}
              onClick={() => setActive("best")}
            >
              Bestseller
            </a>
            <a
              href="#"
              className={active === "featured" ? "active" : ""}
              onClick={() => setActive("featured")}
            >
              Featured Products
            </a>
          </div>
          <br />
          <div className="products-grid">
            {products.map((product) => (
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

        {/* Popular — Desktop 4 grid */}
        <div className="popular">
          <div className="popular-card">
            <img src="Group 1.png" alt="Popular" />
            <div className="popular-1">
              <h2 style={{
    fontFamily: "var(--font-inter)",
    fontWeight: 300,
  }}>Popular Product</h2><br />
              <p>
                iPad combines a magnificent 10.2-inch Retina, incredible performance,
                multitasking and ease of use.
              </p>
              <button className="shop-button" onClick={() => router.push("/products/headphones")}>
                Shop Now
              </button>
            </div>
          </div>

          <div className="ipad-card">
            <img src="ipad pro.png" alt="iPad Pro" />
            <h2 style={{
    fontFamily: "var(--font-inter)",
    fontWeight: 300,
  }}>iPad Pro</h2><br />
            <p>
              iPad combines a magnificent 10.2-inch <br />
              Retina display, incredible performance,
              <br />multitasking and ease of use.
            </p>
            <button className="shop-button" onClick={() => router.push("/products/laptop")}>
              Shop Now
            </button>
          </div>

          <div className="samsung-card">
            <img src="samsung galaxy.png" alt="Samsung Galaxy" />
            <div className="samsung-1">
              <h2 style={{
    fontFamily: "var(--font-inter)",
    fontWeight: 300,
  }}>Samsung Galaxy</h2><br />
              <p>
                iPad combines a magnificent 10.2-inch<br />
                Retina display, incredible performance,
                <br />multitasking and ease of use.
              </p>
              <button className="shop-button" onClick={() => router.push("/products/smartphones")}>
                Shop Now
              </button>
            </div>
          </div>

          <div className="macpro-card">
            <img src="macbook.png" alt="Macbook Pro" />
            <div className="macpro-1">
              <h2 style={{
    fontFamily: "var(--font-inter)",
    fontWeight: 300,
  }}>Macbook Pro</h2><br />
              <p>
                iPad combines a magnificent 10.2-inch<br />
                Retina display, incredible performance,
                <br />multitasking and ease of use.
              </p>
              <br />
              <button className="shop-btn" onClick={() => router.push("/products/laptop")}>
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Popular — Mobile Carousel with Dots */}
        <div className="popular-carousel-wrapper">
          <div
            className="popular-scroll"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="popular-slide"
                style={{
                  background: item.bg,
                  color: item.bg === "#2b2b2b" ? "white" : "#000",
                }}
              >
                <img src={item.img} alt={item.alt} className="popular-slide-img" />
                <h2 style={{ color: item.bg === "#2b2b2b" ? "#e9e8e8" : "#2e2e2e" }}>
                  {item.title}
                </h2>
                <p style={{ color: item.bg === "#2b2b2b" ? "#d0d0d0" : "rgb(101,100,100)" }}>
                  {item.desc}
                </p>
                <button
                  style={
                    item.btnColor === "light"
                      ? { border: "1px solid white", color: "white", background: "transparent", padding: "14px 50px", borderRadius: "6px", cursor: "pointer", marginTop: "20px", fontSize: "15px" }
                      : { border: "2px solid black", color: "black", background: "transparent", padding: "14px 50px", borderRadius: "6px", cursor: "pointer", marginTop: "20px", fontSize: "15px" }
                  }
                  onClick={() => router.push(item.route)}
                >
                  Shop Now
                </button>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="popular-dots">
            {popularItems.map((_, index) => (
              <button
                key={index}
                className={`popular-dot ${activeIndex === index ? "popular-dot-active" : ""}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Discounts */}
        <div className="discounts">
          <div>
            <h2>Discount up to -50%</h2>
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

        {/* Banner */}
        <div className="banner">
          <div className="big-banner">
            <h1 style={{
    fontFamily: "var(--font-inter)",
    fontWeight: 100,
  }}>Big Summer <strong>Sale</strong></h1>
            <p>Commodo fames vitae leo mauris in. En consequat</p>
            <button className="shop-btn">Shop Now</button>
          </div>
        </div>

      </section>
    </>
  );
}

export default HeroSection;
