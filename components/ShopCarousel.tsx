"use client";

import { useEffect, useRef, useState } from "react";

const IMAGES = [
  { src: "/carousel/01.jpg", alt: "Vetrina SOSmoke" },
  { src: "/carousel/02.jpg", alt: "Interno negozio SOSmoke" },
  { src: "/carousel/03.jpg", alt: "Scaffale La Tabaccheria" },
  { src: "/carousel/04.jpg", alt: "Scaffali liquidi SOSmoke" },
  { src: "/carousel/05.jpg", alt: "Insegna SOSmoke di sera" },
] as const;

const COPIES = 3;

export function ShopCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const loopWidth = () => track.scrollWidth / COPIES;

    const apply = () => {
      const width = loopWidth();
      if (!width) return;
      const raw = reduceMotion ? 0 : window.scrollY * 0.42;
      offsetRef.current = raw % width;
      track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    };

    setReady(true);
    apply();

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    const images = track.querySelectorAll("img");
    images.forEach((img) => img.addEventListener("load", apply));

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      images.forEach((img) => img.removeEventListener("load", apply));
    };
  }, []);

  const slides = Array.from({ length: COPIES }, () => IMAGES).flat();

  return (
    <section
      aria-label="I negozi SOSmoke"
      className="overflow-hidden bg-ink py-5 sm:py-7"
    >
      <div
        ref={trackRef}
        className="flex w-max gap-3 will-change-transform sm:gap-4"
        style={{ opacity: ready ? 1 : 0 }}
      >
        {slides.map((image, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${image.src}-${index}`}
            src={image.src}
            alt={index < IMAGES.length ? image.alt : ""}
            aria-hidden={index >= IMAGES.length}
            className="h-44 w-64 shrink-0 rounded-2xl object-cover sm:h-56 sm:w-80"
          />
        ))}
      </div>
    </section>
  );
}
