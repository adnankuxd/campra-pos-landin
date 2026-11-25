"use client";
// "Live Preview" button: opens the real POS app (CONFIG.demoUrl) in a full-screen overlay.
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CONFIG } from "@/lib/config";
import { Arr } from "./icons";

type Dev = "web" | "phone";

export function PreviewBtn({ cls, label = "Live Preview" }: { cls: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const [dev, setDev] = useState<Dev>("web");
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function show() {
    if (window.innerWidth < 760) setDev("phone");
    setOpen(true);
  }

  const overlay = (
    <div
      className={`pv${open ? " show" : ""}`}
      role="dialog"
      aria-label="Live preview"
      onClick={(e) => {
        const el = e.target as HTMLElement;
        if (el.classList.contains("pv") || el.classList.contains("pv-stage")) setOpen(false);
      }}
    >
      <div className="pv-bar">
        <b>
          {CONFIG.brand} POS · Live Preview
          <small>Real working app with demo data. On the login page, pick any role to explore.</small>
        </b>
        <div className="pv-seg">
          <button className={dev === "web" ? "on" : ""} onClick={() => setDev("web")}>Laptop</button>
          <button className={dev === "phone" ? "on" : ""} onClick={() => setDev("phone")}>Phone</button>
        </div>
        <a className="pv-open" href={CONFIG.demoUrl} target="_blank" rel="noopener">Open full screen ↗</a>
        <button className="pv-x" onClick={() => setOpen(false)} aria-label="Close preview">
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </div>
      <div className="pv-stage">
        <div className={`pv-frame${dev === "phone" ? " phone" : ""}`}>
          {!loaded && <div className="pv-load">Loading the POS…</div>}
          {open || loaded ? (
            <iframe src={CONFIG.demoUrl} title={`${CONFIG.brand} POS live preview`} allow="clipboard-write" onLoad={() => setLoaded(true)} />
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button className={`btn ${cls}`} onClick={show}>
        {label}
        <span className="ar"><Arr /></span>
      </button>
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
