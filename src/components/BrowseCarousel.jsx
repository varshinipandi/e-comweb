import { useRef } from "react";

function BrowseCarousel() {
  const scrollRef = useRef(null);

  const moveLeft = () => {
    scrollRef.current.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };

  const moveRight = () => {
    scrollRef.current.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  return (
    <div className="hero-browse">
      <br/>
      <div className="browser">
        <div className="hero-browser-button">
      <h1 className="hhh">Browse By Category</h1>
      <div className="browser-button">
      <button className="btns" onClick={moveLeft}>{"<"}</button>
      <button className="btns" onClick={moveRight}>{">"}</button>
      </div>
      </div>
      <div className="scroll-container" ref={scrollRef}>
        <img
          src="/phones.png"
          alt="Phones"
          className="scroll-item"
          onClick={() => window.location.href = "/products/smartphones"}
          style={{ cursor: "pointer" }}
        />

        <img
          src="/smart watch.png"
          alt="Smart Watch"
          className="scroll-item"
          onClick={() => window.location.href = "/products/smartwatch"}
          style={{ cursor: "pointer" }}
        />

        <img
          src="/cameras.png"
          alt="Cameras"
          className="scroll-item"
          onClick={() => window.location.href = "/products/camera"}
          style={{ cursor: "pointer" }}
        />
        <img
          src="/headphones.png"
          alt="Headphones"
          className="scroll-item"
          onClick={() => window.location.href = "/products/headphones"}
          style={{ cursor: "pointer" }}
        />
        <img
          src="/computers.png"
          alt="Computers"
          className="scroll-item"
          onClick={() => window.location.href = "/products/laptop"}
          style={{ cursor: "pointer" }}
        />
        <img
          src="/gaming.png"
          alt="Gaming"
          className="scroll-item"
          onClick={() => window.location.href = "/products/gaming"}
          style={{ cursor: "pointer" }}
        />
      </div>
      </div>
    </div>
  );
}

export default BrowseCarousel;
