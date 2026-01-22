import React, { useEffect, useRef, useState } from "react";

/** Simple, robust full-width carousel that slides by transform */
export default function Carousel({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setIndex(i => (i + 1) % slides.length), 4500);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="container" style={{paddingTop:20}}>
      <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="carousel-item">
              <img src={s.image} alt={s.title} />
              <div className="card-body">
                <div className="card-title">{s.title}</div>
                <div className="card-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:"flex", justifyContent:"center", gap:8, marginTop:10}}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width:12,
              height:12,
              borderRadius:12,
              border:"none",
              background: i === index ? "linear-gradient(90deg,#7c3aed,#06b6d4)" : "rgba(255,255,255,0.3)",
              boxShadow: i === index ? "0 6px 14px rgba(7,10,27,0.5)" : "none",
              cursor:"pointer"
            }}
            aria-label={`Go to slide ${i+1}`}
          />
        ))}
      </div>
    </div>
  );
}
