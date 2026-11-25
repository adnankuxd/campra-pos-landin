// Shared server-rendered blocks: marquee, labels, screens, inner-page hero, steps, contact, footer.
import Link from "next/link";
import { CONFIG, SCREENS } from "@/lib/config";
import { F, FGROUPS, MARQ, Step } from "@/lib/content";
import { ModalBtn, ModalLink, WaLink } from "./ui";
import { WaIcon } from "./icons";
import { PreviewBtn } from "./LivePreview";

export function Marquee() {
  const items = [...MARQ, ...MARQ];
  return (
    <div className="marq">
      <div className="marq-t">{items.map((m, i) => <span key={i}>{m}</span>)}</div>
    </div>
  );
}

export const Label = ({ children, serif }: { children: React.ReactNode; serif?: boolean }) => (
  <div className={`lbl ${serif ? "serif" : ""}`}>{children}</div>
);

/** A real app screen from the Figma Make POS, inside the device frame. */
export function Screen({ k }: { k: string }) {
  const s = SCREENS[k] || SCREENS.dashboard;
  return (
    <div className={`shot shot-${k}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.src} alt={`${s.alt} screen`} />
    </div>
  );
}

export function InnerHero({ crumbs, title, sub }: { crumbs: [string, string?][]; title: string; sub: string }) {
  return (
    <div className="phero">
      <div className="crumb">
        {crumbs.map(([label, href], i) =>
          href ? (
            <span key={i} style={{ display: "contents" }}><Link href={href}>{label}</Link><span>/</span></span>
          ) : (
            <b key={i}>{label}</b>
          )
        )}
      </div>
      <div className="grid">
        <div className="t">
          <h1>{title}</h1>
          <p>{sub}</p>
          <div className="cta">
            <ModalBtn kind="demo" cls="btn-w" label="Book a Demo" />
            <PreviewBtn cls="btn-gw" />
          </div>
        </div>
        <div className="fan">
          {["stock", "audit", "dashboard"].map((k) => (
            <div className="mini" key={k}><div className="frame"><Screen k={k} /></div></div>
          ))}
        </div>
      </div>
      <div className="torn" />
    </div>
  );
}

export function StepBoxes({ steps }: { steps: Step[] }) {
  return (
    <div>
      {steps.map(([t, d, bullets, screen], i) => (
        <div className="stepbox rv" key={i}>
          <div>
            <span className="badge">Step {i + 1}/{steps.length}</span>
            <h3>{t}</h3>
            <p>{d}</p>
            <div className="blist">{bullets.map((b) => <div key={b}>{b}</div>)}</div>
          </div>
          <div className="frame"><Screen k={screen} /></div>
        </div>
      ))}
    </div>
  );
}

export function Talk({ second = "wa" }: { second?: "wa" | "demo" }) {
  return (
    <section id="contact">
      <Label serif={second !== "wa"}>Contact Us</Label>
      <h2 className="h" style={{ marginBottom: 0 }}>Ready to simplify <b>your business?</b></h2>
      <div className="talk">
        <div className="big rv">Let’s Talk</div>
        <div className="cta">
          <ModalBtn kind="contact" cls="btn-p" label="Contact Us" />
          {second === "wa" ? (
            <WaLink className="btn btn-wa"><WaIcon /> WhatsApp</WaLink>
          ) : (
            <ModalBtn kind="demo" cls="btn-o" label="Book a Demo" />
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const li = (k: string) => <li key={k}><Link href={`/features/${k}/`}>{F[k].t}</Link></li>;
  return (
    <>
      <Marquee />
      <footer>
        <div>
          <Link href="/" className="logo purple">{CONFIG.brand}</Link>
          <h3>Point of sale,<br />made simple.</h3>
          <p className="fp">See {CONFIG.brand} in action. Book a free demo and we will show you how it fits your shops.</p>
          <div className="soc">
            <a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="#8E33FF" /><circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="2" /></svg></a>
            <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="currentColor" /><path d="M8 10v6M8 7.5v.1M11 16v-6M11 12.5c0-1.5 1-2.5 2.2-2.5S15.5 11 15.5 12.5V16" stroke="var(--card)" strokeWidth="1.8" strokeLinecap="round" /></svg></a>
            <a href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" /><path d="M15 8h-1.5c-1 0-1.5.5-1.5 1.5V22M10 13h5" stroke="var(--card)" strokeWidth="2" /></svg></a>
            <a href="#" aria-label="X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.8a8.5 8.5 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.6 1 4.2 4.2 0 0 0-7.2 3.8A12 12 0 0 1 3 4.6a4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5 4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.5 8.5 0 0 1 2 18.5 12 12 0 0 0 8.3 20c7.6 0 11.7-6.3 11.7-11.7v-.5A8.4 8.4 0 0 0 22 5.8Z" /></svg></a>
            <span>© {new Date().getFullYear()} {CONFIG.brand}. All rights reserved.</span>
          </div>
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <h4>Features</h4>
          <div className="fcols">
            <div><h5>Head Office</h5><ul>{FGROUPS["Head Office"].map(li)}<li><Link href="/portals/owner/">System Admin & Roles</Link></li></ul></div>
            <div><h5>Shop Counter</h5><ul>{FGROUPS["Shop Counter"].map(li)}</ul></div>
          </div>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link href="/about/">About</Link></li>
            <li><ModalLink kind="contact">Contact us</ModalLink></li>
            <li><Link href="/faq/">FAQs</Link></li>
            <li><Link href="/privacy/">Privacy Policy</Link></li>
            <li><Link href="/terms/">Terms of Service</Link></li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export function SimpleHero({ crumb, title, sub, minH = 330 }: { crumb: string; title: string; sub?: string; minH?: number }) {
  return (
    <div className="phero" style={{ minHeight: minH, textAlign: "center" }}>
      <div className="crumb"><Link href="/">Home</Link><span>/</span><b>{crumb}</b></div>
      <h1 style={{ marginTop: 40, fontSize: 46 }}>{title}</h1>
      {sub && <p style={{ maxWidth: 560 }}>{sub}</p>}
      <div className="torn" />
    </div>
  );
}
