import Link from "next/link";
import type { Metadata } from "next";
import { CONFIG } from "@/lib/config";
import { PORTALS } from "@/lib/content";
import { Footer, Label, Talk } from "@/components/blocks";
import { Arr, Ico, P } from "@/components/icons";

export const metadata: Metadata = { title: `About us — ${CONFIG.brand} POS` };

export default function About() {
  const st = CONFIG.stats;
  return (
    <>
      <div className="phero" style={{ minHeight: 440, textAlign: "center" }}>
        <div className="crumb"><Link href="/">Home</Link><span>/</span><b>About us</b></div>
        <h1 style={{ fontSize: "clamp(34px,4vw,54px)", marginTop: 30 }}>We’re building the shop system</h1>
        <p style={{ maxWidth: 760, fontSize: 19, marginTop: 20 }}>{CONFIG.brand} helps shops replace khata registers, spreadsheets, and late-night phone calls with one simple, reliable system.</p>
        <div className="torn" />
      </div>

      <section className="story nob">
        <Label serif>Our Story</Label>
        <p className="rv"><b>Running a shop</b> in Pakistan means juggling a lot, sales, stock, suppliers, cash, and staff you can&apos;t always watch. For many businesses, <b>all of it still lives in khata registers, Excel sheets, and WhatsApp groups.</b></p>
        <div className="tornT" style={{ bottom: -40, transform: "scaleY(-1)" }} />
      </section>

      <section className="nob" style={{ paddingTop: 110 }}>
        <Label serif>Mission And Vision</Label>
        <div className="mv">
          <div className="mvc rv" style={{ ["--c" as string]: "#8E33FF" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/target.webp" alt="" /><h4>Our <b>Mission</b></h4>
            <p>Make running a shop simple, so owners spend less time chasing numbers and more time growing their business.</p>
          </div>
          <div className="mvc rv" style={{ ["--c" as string]: "#FF6B2C" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/puzzle.webp" alt="" /><h4>Our <b>Vision</b></h4>
            <p>Every shop in Pakistan, one counter or a hundred, runs on a system that is easy to use, affordable, and trusted.</p>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--card)", border: 0, position: "relative" }}>
        <Label serif>What We Believe</Label>
        <h2 className="h">What we <b>stand for</b></h2>
        <div className="believe">
          {[
            ["#8E33FF", P.doc, "Simple first.", "If a cashier can't learn it in a day, we haven't finished designing it."],
            ["#FF6B2C", P.store, "Built for local shops", "Urdu and English, FBR invoices, udhaar and real shop practices, not a foreign product with a translation."],
            ["#1FC32E", P.shield, "Trust and privacy.", "Sales and stock data is sensitive. We protect it and you always own it."],
          ].map(([c, d, t, p]) => (
            <div className="bl rv" key={t} style={{ ["--c" as string]: c }}><div className="ic"><Ico d={d} size={38} /></div><h4>{t}</h4><p>{p}</p></div>
          ))}
        </div>
      </section>

      <section className="nob" style={{ position: "relative", paddingTop: 130 }}>
        <div className="tornT" style={{ top: -30 }} />
        <Label serif>{`What ${CONFIG.brand} Does`}</Label>
        <h2 className="h">One system for your <b>whole business</b></h2>
        <div className="does">
          {Object.entries(PORTALS).map(([k, v]) => (
            <Link key={k} href={`/portals/${k}/`}><span>{v.t}</span><i style={{ color: "var(--p)" }}><Arr /></i></Link>
          ))}
        </div>
        <Link className="vm" href="/features/billing/">VIEW MODULES <Arr /></Link>
      </section>

      <section style={{ background: "var(--card)", border: 0, position: "relative" }}>
        <Label serif>How We Work With Shops</Label>
        <h2 className="h">We don’t just hand you software</h2>
        <div className="stack">
          <div className="scard sc1"><h4>We set up with you</h4><p>Shops, counters, prices and staff accounts,<br />configured with your team.</p></div>
          <div className="scard sc2"><h4>We train your staff</h4><p>Hands-on training for cashiers and managers,<br />at your shops or online.</p></div>
          <div className="scard sc3"><h4>We stay with you</h4><p>Local support on WhatsApp and phone,<br />long after go-live.</p></div>
        </div>
      </section>

      <section style={{ background: "var(--card)", border: 0 }}>
        <Label serif>Numbers</Label>
        <h2 className="h">Numbers that keep growing</h2>
        <div className="nums">
          {[
            [st.shops, "Shops onboarded", "Shops running billing, stock and reports on one system.", ["Grocery", "Pharmacy"]],
            [st.cashiers, "Cashiers trained", "Cashiers billing confidently from their first day.", ["Urdu + English", "Offline Ready"]],
            [st.bills, "Bills processed", "Cash, card and wallet sales recorded and reported.", ["Easypaisa", "JazzCash", "SadaPay"]],
          ].map(([n, h, p, tags]) => (
            <div className="num rv" key={h as string}>
              <div className="ntags">{(tags as string[]).map((t) => <span key={t}>{t}</span>)}</div>
              <b>{n as string}</b><h6>{h as string}</h6><p>{p as string}</p>
            </div>
          ))}
        </div>
      </section>

      <Talk second="demo" />
      <Footer />
    </>
  );
}
