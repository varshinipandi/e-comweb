"use client";

import { useMemo, useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import "../products.css";
import ProductCard from "../../../components/ProductCard";
import { sampleProducts } from "../../../data/products";

const categories = [
  "smartphones",
  "camera",
  "headphones",
  "laptop",
  "smartwatch",
  "gaming",
];

const categoryLabels = {
  smartphones: "Smartphones",
  camera: "Cameras",
  headphones: "Headphones",
  laptop: "Laptops",
  smartwatch: "Smartwatch",
  gaming: "Gaming",
};

export default function CategoryPage() {
  const { category } = useParams();

  if (!categories.includes(category)) {
    notFound();
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [openFilter, setOpenFilter] = useState("brand");
  const [openSection, setOpenSection] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [memorySearch, setMemorySearch] = useState("");
  const [priceFrom, setPriceFrom] = useState(1299);
  const [priceTo, setPriceTo] = useState(1299);
  const [sortBy, setSortBy] = useState("rating");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const categoryLabel = categoryLabels[category] || category;

  const categoryProducts = useMemo(
    () => sampleProducts.filter((product) => product.category === category),
    [category]
  );

  const brands = useMemo(
    () => Array.from(new Set(categoryProducts.map((p) => p.brand))),
    [categoryProducts]
  );

  const filteredProducts = useMemo(() => {
    let filtered = [...categoryProducts];

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    if (sortBy === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [categoryProducts, selectedBrands, sortBy]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="products-page-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span>
        <span className="separator">&gt;</span>
        <span>Catalog</span>
        <span className="separator">&gt;</span>
        <h3 className="active-category">{categoryLabel}</h3>
      </div>

      {/* Mobile Filter Trigger Bar */}
      <div className="mobile-filter-bar">
        <button
          className="mobile-filter-btn"
          onClick={() => setShowMobileFilter(true)}
        >
          <span>Filters</span>
          <span className="filter-icon">⫶☰</span>
        </button>
      </div>

      {/* Overlay */}
      {showMobileFilter && (
        <div
          className="filter-overlay"
          onClick={() => setShowMobileFilter(false)}
        />
      )}

      <div className="products-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${showMobileFilter ? "sidebar-open" : ""}`}>

          {/* Sidebar Header - mobile la மட்டும் show */}
          <div className="sidebar-header">
            <button
              className="sidebar-close-btn"
              onClick={() => setShowMobileFilter(false)}
            >
              ‹
            </button>
            <span className="sidebar-title">Filters</span>
          </div>

           {/* Price - mobile la மட்டும் first la show */}
          {isMobile && (
            <div className="filter-section">
              <h3
                onClick={() =>
                  setOpenFilter(openFilter === "price" ? null : "price")
                }
              >
                Price <span>{openFilter === "price" ? "▲" : "▼"}</span>
              </h3>
              {openFilter === "price" && (
                <div className="price-filter-content">
                  <div className="price-inputs">
                    <div className="price-input-group">
                      <label>From</label>
                      <input
                        type="number"
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(Number(e.target.value))}
                        className="price-input"
                      />
                    </div>
                    <span className="price-dash">—</span>
                    <div className="price-input-group">
                      <label style={{ textAlign: "right" }}>To</label>
                      <input
                        type="number"
                        value={priceTo}
                        onChange={(e) => setPriceTo(Number(e.target.value))}
                        className="price-input price-input-right"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1299"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(Number(e.target.value))}
                    className="price-range"
                  />
                </div>
              )}
            </div>
          )}

          {/* Brand - desktop & mobile both show */}
          <div className="filter-section">
            <h3
              onClick={() =>
                setOpenFilter(openFilter === "brand" ? null : "brand")
              }
            >
              Brand <span>{openFilter === "brand" ? "▲" : "▼"}</span>
            </h3>
            {openFilter === "brand" && (
              <div className="filter-content">
                <input
                  type="text"
                  placeholder="Search"
                  className="filter-search"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                />
                <div className="filter-list">
                  {brands
                    .filter((b) =>
                      b.toLowerCase().includes(brandSearch.toLowerCase())
                    )
                    .map((brand) => (
                      <label key={brand} className="filter-item">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                        />
                        <span className="brand-name">
                          {brand}
                          <span className="brand-count">
                            {categoryProducts.filter((p) => p.brand === brand).length}
                          </span>
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            )}
          </div>

      

          {/* Built-in Memory */}
          <div className="filter-section">
            <h3
              onClick={() =>
                setOpenSection(openSection === "memory" ? null : "memory")
              }
            >
              Built-in memory{" "}
              <span>{openSection === "memory" ? "▲" : "▼"}</span>
            </h3>
            {openSection === "memory" && (
              <div className="filter-content">
                <input
                  type="text"
                  placeholder="Search"
                  className="filter-search"
                  value={memorySearch}
                  onChange={(e) => setMemorySearch(e.target.value)}
                />
                <div className="filter-list">
                  {["16GB", "32GB", "64GB", "128GB", "256GB", "512GB"]
                    .filter((m) =>
                      m.toLowerCase().includes(memorySearch.toLowerCase())
                    )
                    .map((mem) => (
                      <label key={mem} className="filter-item">
                        <input
                          type="checkbox"
                          checked={selectedMemory.includes(mem)}
                          onChange={() =>
                            setSelectedMemory((prev) =>
                              prev.includes(mem)
                                ? prev.filter((m) => m !== mem)
                                : [...prev, mem]
                            )
                          }
                        />
                        <span className="brand-name">{mem}</span>
                      </label>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Protection class */}
          <button
            className="filter-header"
            onClick={() => toggleSection("protection")}
          >
            <span>Protection class</span>
            <span>{openSection === "protection" ? "▲" : "▼"}</span>
          </button>

          {/* Screen diagonal */}
          <button
            className="filter-header"
            onClick={() => toggleSection("diagonal")}
          >
            <span>Screen diagonal</span>
            <span>{openSection === "diagonal" ? "▲" : "▼"}</span>
          </button>

          {/* Screen type */}
          <button
            className="filter-header"
            onClick={() => toggleSection("screen")}
          >
            <span>Screen type</span>
            <span>{openSection === "screen" ? "▲" : "▼"}</span>
          </button>

          {/* Battery capacity */}
          <button
            className="filter-header"
            onClick={() => toggleSection("battery")}
          >
            <span>Battery capacity</span>
            <span>{openSection === "battery" ? "▲" : "▼"}</span>
          </button>

          {/* Apply */}
          <button
            className="filter-apply-btn"
            onClick={() => setShowMobileFilter(false)}
          >
            Apply
          </button>
        </aside>

        {/* Products */}
        <main className="products-main">
          <div className="products-header">
            <div className="selected-info">
              Selected Products: <strong>{filteredProducts.length}</strong>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="rating">By Rating</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard
                    product={product}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                  />
                </div>
              ))
            ) : (
              <div className="empty-state">
                No products found in this category.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}