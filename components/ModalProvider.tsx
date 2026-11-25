"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, FormEvent } from "react";
import { CONFIG, waLink } from "@/lib/config";
import { Arr, WaIcon } from "./icons";

type Kind = "demo" | "contact" | "sales";
type Ctx = { open: (kind: Kind, extra?: string) => void; toast: (msg: string) => void };
const ModalCtx = createContext<Ctx>({ open: () => {}, toast: () => {} });
export const useModal = () => useContext(ModalCtx);

export type Lead = { type: string; at: string; name: string; business: string; phone: string; shops: string; city: string; msg: string };
export const LEADS_KEY = "campra_leads";

const COPY: Record<Kind, { h: [string, string]; p: string; btn: string }> = {
  demo: { h: ["Book a", "free demo"], p: "Tell us about your shops and we'll show you the system with your products in mind.", btn: "Book my demo" },
  contact: { h: ["Get in", "touch"], p: "Send us a message and our team will reply within one working day.", btn: "Send message" },
  sales: { h: ["Talk to", "sales"], p: "Get a clear quote for your shops and counters after a short call.", btn: "Request a quote" },
};

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ kind: Kind; extra?: string } | null>(null);
  const [toastMsg, setToastMsg] = useState("");
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback((kind: Kind, extra?: string) => setState({ kind, extra }), []);
  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => setToastMsg(""), 2800);
  }, []);

  useEffect(() => {
    document.body.style.overflow = state ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setState(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state]);

  return (
    <ModalCtx.Provider value={{ open, toast }}>
      {children}
      <div className={`ov ${state ? "show" : ""}`} onClick={(e) => e.target === e.currentTarget && setState(null)}>
        {state && (
          <div className="modal" role="dialog" aria-modal="true">
            <button className="x" onClick={() => setState(null)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
            <LeadForm key={state.kind + (state.extra || "")} kind={state.kind} extra={state.extra} onClose={() => setState(null)} />
          </div>
        )}
      </div>
      <div className={`toast ${toastMsg ? "show" : ""}`}>{toastMsg}</div>
    </ModalCtx.Provider>
  );
}

function LeadForm({ kind, extra, onClose }: { kind: Kind; extra?: string; onClose: () => void }) {
  const c = COPY[kind];
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState<Lead | null>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) || "").trim();
    const errs = {
      name: v("name").length < 2,
      business: v("business").length < 2,
      phone: !/^\+?[\d\s-]{10,15}$/.test(v("phone")),
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    const lead: Lead = { type: kind, at: new Date().toISOString(), name: v("name"), business: v("business"), phone: v("phone"), shops: v("shops"), city: v("city"), msg: v("msg") };
    try {
      const L = JSON.parse(localStorage.getItem(LEADS_KEY) || "[]");
      L.push(lead);
      localStorage.setItem(LEADS_KEY, JSON.stringify(L));
    } catch {}
    // To receive leads by email, POST `lead` to a form service (Formspree / Web3Forms) here.
    setDone(lead);
  }

  if (done) {
    const txt = `${kind === "demo" ? "Demo request" : kind === "sales" ? "Quote request" : "Enquiry"} — ${CONFIG.brand} POS\nName: ${done.name}\nBusiness: ${done.business}\nPhone: ${done.phone}\nShops: ${done.shops}\nCity: ${done.city}\n${done.msg}`;
    return (
      <div className="okbox">
        <div className="ck"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="m5 12 5 5 9-10" /></svg></div>
        <h3>Thank you, <b>{done.name.split(" ")[0]}!</b></h3>
        <p style={{ color: "var(--mut)", margin: "12px 0 26px", lineHeight: 1.5 }}>We&apos;ve received your details. For a faster reply, send them to us on WhatsApp too.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <a className="btn btn-wa" href={waLink(txt)} target="_blank" rel="noopener"><WaIcon /> Send on WhatsApp</a>
          <button className="btn btn-o" onClick={onClose}>Close<span className="ar"><Arr /></span></button>
        </div>
      </div>
    );
  }

  const fld = (name: string, label: string, msg: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className={`fld ${errors[name] ? "err" : ""}`}>
      <label>{label}</label>
      <input name={name} {...props} />
      <div className="em">{msg}</div>
    </div>
  );

  return (
    <>
      <h3>{c.h[0]} <b>{c.h[1]}</b></h3>
      <p style={{ color: "var(--mut)", marginTop: 10, lineHeight: 1.5 }}>{c.p}</p>
      <form className="fg" noValidate onSubmit={submit}>
        {fld("name", "Your name *", "Please enter your name", { autoComplete: "name", autoFocus: true })}
        {fld("business", "Business name *", "Please enter your business name")}
        {fld("phone", "Phone / WhatsApp *", "Enter a valid phone number", { type: "tel", placeholder: "03XX XXXXXXX", autoComplete: "tel" })}
        <div className="fld">
          <label>Number of shops</label>
          <select name="shops" defaultValue="50+"><option>1</option><option>2–5</option><option>6–20</option><option>21–50</option><option>50+</option></select>
        </div>
        <div className="fld full"><label>City</label><input name="city" placeholder="e.g. Lahore" /></div>
        <div className="fld full"><label>Message</label><textarea name="msg" rows={3} defaultValue={extra || ""} placeholder="Anything we should know?" /></div>
        <div className="full" style={{ marginTop: 6 }}>
          <button className="btn btn-p" type="submit">{c.btn}<span className="ar"><Arr /></span></button>
        </div>
      </form>
    </>
  );
}
