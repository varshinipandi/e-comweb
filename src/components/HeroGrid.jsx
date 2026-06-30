"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import "../styles/HeroGrid.css";

function HeroGrid() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkScreen = () => {
        setIsMobile(window.innerWidth <= 768);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);

  return (
    <section className="hg-wrapper" id="about">

      {/* LEFT COLUMN */}
      <div className="hg-left">

        {/* PS5 */}
        <div
  className="hg-card hg-playstation"
  onClick={() => router.push("/products/smartphones")}
>
  <img
    src={
      isMobile
        ? "/PS1.png"
        : "/PlayStation.png"
    }
    alt="PlayStation 5"
    className="hg-ps-img"
  />

  <div className="hg-ps-text">
    <h2>Playstation 5</h2>
    <p>
      Incredibly powerful CPUs, GPUs, and an SSD with integrated
      I/O will redefine your PlayStation experience.
    </p>
  </div>
</div>
<br/><br/>

        {/* AirPods + Vision */}
        <div className="hg-small-row">

          <div
      className="hg-card hg-airpods"
      onClick={() => router.push("/products/headphones")}
    >
      <img
        src={
          isMobile
            ? "/airpods max silver.png"
            : "/Apple AirPods Max.png"
        }
        className="hg-airpods-img"
        alt="Apple AirPods Max"
      />

      <div className="hg-airpods-text">
        <h3 style={{
    fontFamily: "var(--font-inter)",
    fontWeight: 300,
  }}>
      {isMobile ? (
        "Apple AirPods Max strong"
      ) : (
        <>
          Apple<br/> AirPods<strong><br/>Max</strong>
        </>
      )}
    </h3>
        <p>Computational audio. Listen, it's powerful</p>
      </div>
    </div>

          <div
  className="hg-card hg-vision"
  onClick={() => router.push("/products/smartphones")}
>
  <img
    src={
      isMobile
        ? "/image 36-1.png"
        : "/image 36.png"
    }
    alt="Apple Vision Pro"
    className="hg-vision-img"
  />

  <div className="hg-vision-text">
     <h3 style={{
    fontFamily: "var(--font-inter)",
    fontWeight: 200,
  }}>
      {isMobile ? (
        "Apple Vision Pro"
      ) : (
        <>
          Apple <br/>Vision <strong><br/>Pro</strong>
        </>
      )}
    </h3>
    <p>An immersive way to experience entertainment</p>
  </div>
</div>

        </div>
      </div>

      {/* RIGHT COLUMN — MacBook */}
      <div className="hg-card hg-macbook" onClick={() => router.push("/products/laptop")}>
        <img src="/Screen.png" alt="MacBook Air" className="hg-mac-img-mobile" />
         <div className="hg-mac-text">
          <h2 style={{
    fontFamily: "var(--font-inter)",
    fontWeight: 100,
  }}>Macbook <br /><strong>Air</strong></h2>
          <p>The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
          <button
            className="hg-shop-btn"
            onClick={(e) => { e.stopPropagation(); router.push("/products/laptop"); }}
          >
            Shop Now
          </button>
        </div>
        <img src="/MacBook Pro 14.png" alt="" className="hg-mac-img-desktop" />
      </div>

    </section>
  );
}

export default HeroGrid;
  