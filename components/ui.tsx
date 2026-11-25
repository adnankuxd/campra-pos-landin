"use client";
// Small client components that open the lead modal or need the browser.
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useModal } from "./ModalProvider";
import { Arr } from "./icons";
import { CONFIG, waLink } from "@/lib/config";
import { MODS, PLANS, SHOPS } from "@/lib/content";
import { Check } from "./icons";

type K = "demo" | "contact" | "sales";

export function ModalBtn({ kind, label, cls }: { kind: K; label: string; cls: string }) {
  const { open } = useModal();
  return (
    <button className={`btn ${cls}`} onClick={() => open(kind)}>
      {label}
      <span className="ar"><Arr /></span>
    </button>
  );
}

export function ModalLink({ kind, children, style }: { kind: K; children: React.ReactNode; style?: React.CSSProperties }) {
  const { open } = useModal();
  return (
    <a href="#" style={style} onClick={(e) => { e.preventDefault(); open(kind); }}>
      {children}
    </a>
  );
}

export function WaLink({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <a className={className} href={waLink(`Assalam o Alaikum! I'd like to know more about ${CONFIG.brand} POS for my shops.`)} target="_blank" rel="noopener">
      {children}
    </a>
  );
}

export function ModulesGrid() {
  const { open } = useModal();
  return (
    <div className="mods">
      {MODS.map(([t, s]) => (
        <button key={t} className="mod rv" onClick={() => open("contact", `Please notify me when the ${t} module launches.`)}>
          {t}
          <small>{s}</small>
        </button>
      ))}
    </div>
  );
}

export function GenerateReport() {
  const { toast } = useModal();
  function run() {
    const d = new Date().toISOString().slice(0, 10);
    const rows: (string | number)[][] = [["Shop", "City", "Bills", "Sales (Rs)", "Cash (Rs)", "Card/Wallet (Rs)", "Refunds (Rs)", "Status"]];
    SHOPS.forEach((s) => rows.push([s[0], s[1], Math.round(s[2] / 471), s[2], Math.round(s[2] * 0.7), Math.round(s[2] * 0.3), Math.round(s[2] * 0.01), s[3] ? "Online" : "Offline"]));
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `${CONFIG.brand}-daily-report-sample-${d}.csv`;
    a.click();
    toast("Sample daily report downloaded");
  }
  return <button onClick={run}>Generate Daily Report</button>;
}

export function PricingCards() {
  const { open } = useModal();
  return (
    <div className="plans">
      {PLANS.map((p) => (
        <div key={p.name} className={`plan rv${p.popular ? " pop" : ""}`}>
          {p.popular && <span className="plan-badge">Most popular</span>}
          <h3>{p.name}</h3>
          <p className="plan-tag">{p.tag}</p>
          <div className="plan-price"><b>{p.price}</b>{p.unit && <span>{p.unit}</span>}</div>
          <p className="plan-note">{p.note}</p>
          <button className={`btn ${p.popular ? "btn-w" : "btn-p"} plan-cta`} onClick={() => open(p.kind, `I'm interested in the ${p.name} plan.`)}>
            {p.cta}
            <span className="ar"><Arr /></span>
          </button>
          <ul className="plan-limits">{p.limits.map((l) => <li key={l}>{l}</li>)}</ul>
          <ul className="plan-feats">
            {p.feats.map((f) => (
              <li key={f}><span className="ck"><Check size={10} color={p.popular ? "#8E33FF" : "#fff"} /></span>{f}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Scroll-reveal for `.rv` elements + back-to-top button. Re-runs on every route change. */
export function RevealAndTop() {
  const path = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    const scan = () => document.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [path]);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button className={`totop ${show ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20V4M5 11l7-7 7 7" /></svg>
    </button>
  );
}
