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

function Barcode({ seed }: { seed: number }) {
  const ws = Array.from({ length: 46 }, (_, i) => ((i * 7 + seed * 13) % 4) + 1);
  const xs = ws.reduce<number[]>((a, w, i) => [...a, i ? a[i - 1] + ws[i - 1] + 1.4 : 0], []);
  const total = xs[xs.length - 1] + ws[ws.length - 1];
  return (
    <svg className="rc-bar" viewBox={`0 0 ${total} 34`} preserveAspectRatio="none" aria-hidden>
      {ws.map((w, i) => <rect key={i} x={xs[i]} y="0" width={w} height="34" fill="currentColor" />)}
    </svg>
  );
}

export function PricingCards() {
  const { open } = useModal();
  return (
    <div className="plans">
      {PLANS.map((p, idx) => {
        const [cur, amt] = p.price.startsWith("Rs ") ? ["Rs", p.price.slice(3)] : ["", p.price];
        return (
          <div key={p.name} className={`rc-wrap rv rc-${idx}${p.popular ? " pop" : ""}`}>
            {p.popular && (
              <span className="rc-stamp" aria-label="Most popular"><span>★ Most ★</span><b>Popular</b><span>Campra</span></span>
            )}
            <article className="rc">
              <div className="rc-top mono"><span>{CONFIG.brand.toUpperCase()} POS</span><span>PLAN 0{idx + 1}</span></div>
              <h3 className="rc-name">{p.name}</h3>
              <p className="rc-tag mono">{p.tag}</p>

              <div className="rc-cut" />
              <ul className="rc-lines mono">
                {p.limits.map((l) => <li key={l}><span>{l}</span><i /><b>✓</b></li>)}
              </ul>
              <div className="rc-cut" />

              <div className="rc-total">
                <span className="mono">TOTAL</span>
                <div className="rc-amt">{cur && <small>{cur}</small>}<b>{amt}</b></div>
              </div>
              <p className="rc-per mono">{p.unit ? p.unit.replace(/^\/\s*/, "per ") : "volume pricing · let's talk"}</p>

              <button className="rc-cta" onClick={() => open(p.kind, `I'm interested in the ${p.name} plan.`)}>
                <span>{p.cta}</span><span className="ar"><Arr /></span>
              </button>

              <div className="rc-cut" />
              <p className="rc-h mono">Items included</p>
              <ul className="rc-feats">
                {p.feats.map((f, i) => (
                  <li key={f} className={i === 0 && f.startsWith("Everything") ? "all" : ""}><span className="mono">{String(i + 1).padStart(2, "0")}</span>{f}</li>
                ))}
              </ul>

              <div className="rc-foot">
                <Barcode seed={idx + 3} />
                <p className="mono">{p.note}</p>
              </div>
            </article>
          </div>
        );
      })}
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
