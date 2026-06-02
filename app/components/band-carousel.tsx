"use client";

import { useEffect, useState } from "react";

const bandPhotos = [
  "/images/band/band-01.jpg",
  "/images/band/band-02.jpg",
  "/images/band/band-03.jpg",
  "/images/band/band-04.jpg",
  "/images/band/band-05.jpg",
];

export default function BandCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % bandPhotos.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-square overflow-hidden bg-[#050505]">
      {bandPhotos.map((photo, index) => (
        <div
          className={`absolute inset-0 bg-cover bg-center transition duration-700 ${
            activeIndex === index
              ? "scale-100 opacity-100"
              : "scale-105 opacity-0"
          }`}
          key={photo}
          style={{ backgroundImage: `url('${photo}')` }}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-[#050505]/40 to-transparent" />
      <div className="absolute bottom-5 left-5 flex gap-2">
        {bandPhotos.map((photo, index) => (
          <button
            aria-label={`Show band photo ${index + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition ${
              activeIndex === index ? "bg-[#ffca16]" : "bg-white/45"
            }`}
            key={photo}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
