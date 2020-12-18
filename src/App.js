import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles.css";
export default function App() {
  const containerRef = useRef(null);

  const elementRef = useRef(null);
  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState("welcome.jpg");
  const [distance, setdistance] = useState(0);
  const [elWidth, setElWidth] = useState(0);
  const [conLength, setLength] = useState(0);
  const [viewed, setView] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0);

  const images = [
    "bg1.jpg",
    "bg2.jpg",
    "bg3.jpg",
    "bg4.jpg",
    "bg5.jpg",
    "bg6.jpg",
    "bg7.jpg",
    "bg8.jpg"
  ];
  const [img, setImages] = useState(images);

  const observer = useRef();
  const elRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          setImages((prev) => {
            let a = [...prev, ...images];
            console.log("New" + a);
            return a;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [img]
  );

  function showNext() {
    setView(viewed - containerRef.current);
    console.log("Viewed:" + viewed);
    setdistance(distance - conLength + elWidth);
    console.log("Dis:" + distance);
  }
  function showPrev() {
    setView(viewed - totalInViewport);
    setdistance(distance + conLength - elWidth);
  }

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` }
  };

  useEffect(() => {
    const conLength = containerRef.current.clientWidth;
    console.log("Lenght:" + conLength);
    setLength(conLength);
    setElWidth(Math.floor(conLength / images.length));
    setTotalInViewport(Math.floor(conLength / elWidth));
    //console.log("ELLenght:" + totalInViewport);
  }, [containerRef.current, img]);

  return (
    <div className="App">
      <h1>Photo Album</h1>
      <div className="line">
        <img
          className="back"
          src={"backArrow.png"}
          alt="back"
          onClick={() => showPrev()}
        ></img>
        <div ref={containerRef} className="bar" {...slideProps}>
          {img.map((image, index) =>
            img.length == index + 1 ? (
              <img
                ref={elRef}
                className="imageBar"
                key={index}
                src={image}
                alt="test"
              ></img>
            ) : (
              <img
                className="imageBar"
                key={index}
                src={image}
                alt="test"
                onClick={() => setCurrent(image)}
              ></img>
            )
          )}
        </div>
        <img
          className="front"
          src={"frontArrow.png"}
          alt="front"
          onClick={() => showNext()}
        ></img>
      </div>
      <div className="display">
        <img src={current} alt="display" className="zoom"></img>
      </div>
    </div>
  );
}
