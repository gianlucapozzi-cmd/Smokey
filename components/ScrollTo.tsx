"use client";

import { useEffect, type MouseEvent, type ReactNode } from "react";

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

function scrollToId(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior() });
}

function stripHash() {
  const { pathname, search, hash } = window.location;
  if (!hash) return;
  window.history.replaceState(null, "", pathname + search);
}

function consumeHash() {
  const id = window.location.hash.replace(/^#/, "");
  stripHash();
  if (id) scrollToId(id);
}

export function StripHash() {
  useEffect(() => {
    consumeHash();
    window.addEventListener("hashchange", consumeHash);
    return () => window.removeEventListener("hashchange", consumeHash);
  }, []);

  return null;
}

export function ScrollTo({
  id,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  id: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    scrollToId(id);
    stripHash();
  }

  return (
    <a href={`#${id}`} className={className} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </a>
  );
}
