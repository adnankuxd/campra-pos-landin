"use client";
// Interactive home-page sections: tab carousels, FAQ tabs, testimonials.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FAQ, JOBS, ONESYS, TESTI } from "@/lib/content";
import { Arr, Chev, Left, Right } from "./icons";
import { Screen } from "./blocks";
import { ModalLink } from "./ui";

type Slide = { t?: string; d: string; m: string; to: string };

export function TabCarousel({ mode }: { mode: "onesys" | "jobs" }) {
  const data: Record<string, { h?: string; s: Slide[] }> =
    mode === "onesys" ? Object.fromEntries(Object.entries(ONESYS).map(([k, v]) => [k, { s: v }])) : JOBS;
  const keys = Object.keys(data);
  const [tab, setTab] = useState(0);
  const [idx, setIdx] = useState(0);
  const [w, setW] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const sx = useRef<number | null>(null);

  const cur = data[keys[tab]];
  const slide = cur.s[idx];

  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (!el || !el.children[0]) return;
      setW((el.children[0] as HTMLElement).getBoundingClientRect().width + parseFloat(getComputedStyle(el).gap || "0"));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [tab]);

  const go = (d: number) => setIdx((i) => Math.max(0, Math.min(cur.s.length - 1, i + d)));

  return (
    <div>
      <div className="tabs" style={{ gridTemplateColumns: `repeat(${keys.length},1fr)`, padding: mode === "onesys" ? "0 40px" : 0 }}>
        {keys.map((k, i) => (
          <button key={k} className={`tab ${i === tab ? "on" : ""}`} onClick={() => { setTab(i); setIdx(0); }}>{k}</button>
        ))}
      </div>
      <div className="desc">
        <h4 className={mode === "jobs" ? "pc" : ""}>{cur.h || slide.t}</h4>
        <p>{slide.d}</p>
      </div>
      <div className="car">
        <div
          className="car-t"
          ref={track}
          style={{ transform: `translateX(${-idx * w}px)` }}
          onTouchStart={(e) => (sx.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (sx.current == null) return;
            const dx = e.changedTouches[0].clientX - sx.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            sx.current = null;
          }}
        >
          {cur.s.map((s, i) => (
            <div className="slide" key={keys[tab] + i}><div className="frame"><Screen k={s.m} /></div></div>
          ))}
        </div>
      </div>
      <div className="dots">{cur.s.map((_, i) => <i key={i} className={i === idx ? "on" : ""} />)}</div>
      <div className="car-c">
        <button className="rb" onClick={() => go(-1)} disabled={idx === 0} aria-label="Previous"><Left /></button>
        <Link className="btn btn-dk" href={slide.to}>Detailed View <span style={{ marginLeft: 4 }}><Arr /></span></Link>
        <button className="rb" onClick={() => go(1)} disabled={idx === cur.s.length - 1} aria-label="Next"><Right /></button>
      </div>
    </div>
  );
}

export function FaqTabs() {
  const keys = Object.keys(FAQ);
  const [k, setK] = useState(keys[0]);
  const [open, setOpen] = useState(1);
  return (
    <div className="fbox rv">
      <div className="seg">
        {keys.map((x) => <button key={x} className={x === k ? "on" : ""} onClick={() => { setK(x); setOpen(1); }}>{x}</button>)}
      </div>
      {FAQ[k].map(([q, a], i) => (
        <details key={k + i} className="qa" open={open === i} onClick={(e) => { e.preventDefault(); setOpen(open === i ? -1 : i); }}>
          <summary>{q}<i><Chev /></i></summary>
          <p>{a}</p>
        </details>
      ))}
      <div className="fbot">
        <span>Need more help? <ModalLink kind="contact" style={{ color: "var(--p)" }}>contact us</ModalLink></span>
        <Link href="/faq/" style={{ color: "var(--ink)" }}>Read all FAQs ↗</Link>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(false);
  const go = (d: number) => {
    setFade(true);
    setTimeout(() => { setI((x) => (x + d + TESTI.length) % TESTI.length); setFade(false); }, 250);
  };
  useEffect(() => {
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [i]);
  const t = TESTI[i];
  return (
    <div className="tbox rv">
      <div className="q">“</div>
      <div className="tav">{t.i}</div>
      <div className="tq" style={{ opacity: fade ? 0 : 1 }}>{t.q}</div>
      <div className="tmeta">
        <div><b>{t.n}</b><small>{t.r}</small></div>
        <div className="tnav">
          <button onClick={() => go(-1)} aria-label="Previous">‹</button>
          <button className="nx" onClick={() => go(1)} aria-label="Next">›</button>
        </div>
      </div>
    </div>
  );
}
