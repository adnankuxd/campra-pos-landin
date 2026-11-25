"use client";
// Segmented tab bar for feature pages.
// The bar keeps its scroll position between pages, so switching tabs only changes the active pill.
// Hidden tabs are reached with the left / right arrow buttons.
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

let savedScroll: number | null = null; // survives client-side navigation between feature pages

export default function FeatureTabs({ items, active }: { items: { slug: string; title: string }[]; active: string }) {
  const bar = useRef<HTMLDivElement>(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(false);

  const update = () => {
    const b = bar.current;
    if (!b) return;
    setCanL(b.scrollLeft > 2);
    setCanR(b.scrollLeft + b.clientWidth < b.scrollWidth - 2);
  };

  // Restore position instantly (no animation). Only on first visit, bring the active tab into view.
  useLayoutEffect(() => {
    const b = bar.current;
    if (!b) return;
    if (savedScroll !== null) b.scrollLeft = savedScroll;
    else {
      const el = b.querySelector<HTMLElement>(".ftab.on");
      if (el) b.scrollLeft = el.offsetLeft - (b.clientWidth - el.offsetWidth) / 2;
    }
    update();
  }, []);

  useEffect(() => {
    const b = bar.current;
    if (!b) return;
    const onScroll = () => { savedScroll = b.scrollLeft; update(); };
    b.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => { b.removeEventListener("scroll", onScroll); window.removeEventListener("resize", update); };
  }, []);

  const move = (dir: number) => {
    const b = bar.current;
    if (b) b.scrollBy({ left: dir * b.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <div className="ftabs-wrap">
      <div className="ftabs-row">
        <button className="ftab-arrow" onClick={() => move(-1)} disabled={!canL} aria-label="Show previous tabs">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className={`ftabs ${canL ? "fl" : ""} ${canR ? "fr" : ""}`} ref={bar} role="tablist">
          {items.map((i) => (
            <Link key={i.slug} href={`/features/${i.slug}/`} scroll={false} className={`ftab ${i.slug === active ? "on" : ""}`} role="tab" aria-selected={i.slug === active}>
              {i.title}
            </Link>
          ))}
        </div>
        <button className="ftab-arrow" onClick={() => move(1)} disabled={!canR} aria-label="Show more tabs">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}
