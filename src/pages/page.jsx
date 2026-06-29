"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BrowseCarousel from "../components/BrowseCarousel";
import ProductCard from "../components/ProductCard";
import"../app/globals.css";
const categoryLabels = {
  smartphones: "Smartphones",
  "smart-watch": "Smart Watch",
  cameras: "Cameras",
  headphones: "Headphones",
  computers: "Computers",
  gaming: "Gaming",
};

const sampleProducts = [
  { id: 1, title: "Apple iPhone 14 Pro 512GB Gold", price: 1437, brand: "Apple", category: "smartphones", image: "/iphone14.png" },
  { id: 2, title: "Apple iPhone 11 128GB White", price: 510, brand: "Apple", category: "smartphones", image: "/iphone11.png" },
  { id: 3, title: "Apple iPhone 11 128GB", price: 550, brand: "Apple", category: "smartphones", image: "/iphone11-2.png" },
  { id: 4, title: "Apple iPhone 14 Pro 1TB Gold", price: 1499, brand: "Apple", category: "smartphones", image: "/iphone14pro1tb.png" },
  { id: 5, title: "Apple iPhone 14 Pro 1TB Gold", price: 1399, brand: "Apple", category: "smartphones", image: "/iphone14pro1tb-2.png" },
  { id: 6, title: "Apple iPhone 14 Pro 128GB Deep Purple", price: 1600, brand: "Apple", category: "smartphones", image: "/iphone14purple.png" },
  { id: 7, title: "Apple iPhone 13 mini 128GB Pink", price: 850, brand: "Apple", category: "smartphones", image: "/iphone13mini.png" },
  { id: 8, title: "Apple iPhone 14 Pro 256GB Space Black", price: 1399, brand: "Apple", category: "smartphones", image: "/iphone14black.png" },
  { id: 9, title: "Apple iPhone 14 Pro 256GB Silver", price: 1399, brand: "Apple", category: "smartphones", image: "/iphone14silver.png" },
  { id: 10, title: "Samsung Galaxy S22", price: 999, brand: "Samsung", category: "smartphones", image: "/samsung-s22.png" },
  { id: 11, title: "Xiaomi Redmi Note", price: 299, brand: "Xiaomi", category: "smartphones", image: "/xiaomi-note.png" },
  { id: 12, title: "Poco X5", price: 249, brand: "Poco", category: "smartphones", image: "/poco-x5.png" },
  { id: 13, title: "OPPO Reno", price: 399, brand: "OPPO", category: "smartphones", image: "/oppo-reno.png" },
  { id: 14, title: "Honor X", price: 199, brand: "Honor", category: "smartphones", image: "/honor-x.png" },
  { id: 15, title: "Motorola G", price: 279, brand: "Motorola", category: "smartphones", image: "/motorola-g.png" },
  { id: 16, title: "Realme GT", price: 329, brand: "Realme", category: "smartphones", image: "/realme-gt.png" },
  { id: 17, title: "Apple iPhone SE", price: 399, brand: "Apple", category: "smartphones", image: "/iphone-se.png" },
  { id: 18, title: "Samsung A53", price: 349, brand: "Samsung", category: "smartphones", image: "/samsung-a53.png" },
  { id: 19, title: "Xiaomi Mi 11", price: 459, brand: "Xiaomi", category: "smartphones", image: "/xiaomi-mi11.png" },
  { id: 20, title: "OPPO A16", price: 179, brand: "OPPO", category: "smartphones", image: "/oppo-a16.png" },
  { id: 21, title: "Poco M4", price: 199, brand: "Poco", category: "smartphones", image: "/poco-m4.png" },
  { id: 22, title: "Honor Play", price: 229, brand: "Honor", category: "smartphones", image: "/honor-play.png" },
  { id: 23, title: "Motorola Edge", price: 499, brand: "Motorola", category: "smartphones", image: "/motorola-edge.png" },
  { id: 24, title: "Realme Narzo", price: 179, brand: "Realme", category: "smartphones", image: "/realme-narzo.png" },
  { id: 25, title: "Apple iPhone 12", price: 699, brand: "Apple", category: "smartphones", image: "/iphone12.png" },
  { id: 26, title: "Samsung Note 20", price: 899, brand: "Samsung", category: "smartphones", image: "/samsung-note20.png" },
  { id: 27, title: "Xiaomi Poco F4", price: 429, brand: "Xiaomi", category: "smartphones", image: "/xiaomi-poco-f4.png" },
  { id: 28, title: "OPPO Find X", price: 849, brand: "OPPO", category: "smartphones", image: "/oppo-findx.png" },
  { id: 29, title: "Poco F3", price: 349, brand: "Poco", category: "smartphones", image: "/poco-f3.png" },
  { id: 30, title: "Realme 9", price: 219, brand: "Realme", category: "smartphones", image: "/realme9.png" },
];

export default function ProductsPage() {
  const router = useRouter();

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentCategory = useMemo(() => {
    return router.query.category || "smartphones";
  }, [router.query.category]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedBrands([]);
  }, [currentCategory]);

  const categoryLabel =
    categoryLabels[currentCategory] ||
    currentCategory.replace(/[-_]/g, " ");

  const categoryProducts = useMemo(() => {
    return sampleProducts.filter(
      (product) => product.category === currentCategory
    );
  }, [currentCategory]);

  const brands = useMemo(() => {
    return Array.from(
      new Set(categoryProducts.map((p) => p.brand))
    );
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    if (selectedBrands.length === 0) return categoryProducts;
    return categoryProducts.filter((p) =>
      selectedBrands.includes(p.brand)
    );
  }, [categoryProducts, selectedBrands]);

  const totalPages = 5;
  const itemsPerPage = Math.max(
    1,
    Math.ceil(filteredProducts.length / totalPages)
  );

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [currentPage, filteredProducts, itemsPerPage]);

  const toggleBrand = (brand) => {
    setCurrentPage(1);
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div>
      <BrowseCarousel />

      <div className="breadcrumb">
        Home &gt; Catalog &gt; {categoryLabel}
      </div>

      <div className="products-page">
        <aside className="sidebar">
          <h3>Brand</h3>

          <div className="filter-list">
            <button
              className="filter-reset"
              onClick={() => setSelectedBrands([])}
            >
              All brandsdnsgnn
            </button>

            {brands.map((brand) => (
              <label key={brand} className="filter-item">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                {brand}
              </label>
            ))}
          </div>

          <h3>Battery capacity</h3>
          <div className="filter-list">
            <label className="filter-item">3000–4000 mAh</label>
            <label className="filter-item">4000–5000 mAh</label>
            <label className="filter-item">5000+ mAh</label>
          </div>

          <h3>Display</h3>
          <div className="filter-list">
            <label className="filter-item">AMOLED</label>
            <label className="filter-item">OLED</label>
            <label className="filter-item">LCD</label>
          </div>
        </aside>

        <main className="product-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <div className="empty-state">
              No products found for this filter.
            </div>
          )}
        </main>
      </div>

      <div className="pagination">
  <button>&lt;</button>

  <button className="active-page">1</button>
  <button>2</button>
  <button>3</button>

  <button>&gt;</button>
</div>

      <Footer />
    </div>
  );
}