import { CONFIG } from "@/lib/config";
import { Footer, Label, Marquee, Talk } from "@/components/blocks";
import { FaqTabs, Testimonials } from "@/components/interactive";
import AppDemo from "@/components/AppDemo";
import { PreviewBtn } from "@/components/LivePreview";
import { ONE_SYSTEM, THREE_JOBS } from "@/lib/appdemo";
import { GenerateReport, ModalBtn, ModalLink, ModulesGrid, PricingCards } from "@/components/ui";
import { Chips, Diamonds, Phones, QrMark } from "@/components/art";
import { Check, Ico, P } from "@/components/icons";

export default function Home() {
  const st = CONFIG.stats;
  return (
    <div className="home">
      <div className="hero">
        <div className="pill">Point of sale, made simple</div>
        <h1>Run your <b>Whole Business</b><br />from one place</h1>
        <p className="sub">Built for shop owners, cashiers, managers and audit teams.</p>
        <div className="cta">
          <ModalBtn kind="demo" cls="btn-p" label="Book a Demo" />
          <PreviewBtn cls="btn-o" />
        </div>
        <span style={{ marginTop: 22, fontSize: 13, color: "var(--mut)", zIndex: 2 }}>Try the real POS in your browser · no sign-up needed</span>
        <a className="scroll" href="#promise"><span className="mouse" />Scroll Down</a>
        <Diamonds side="l" />
        <Diamonds side="r" />
      </div>
      <Marquee />

      <section className="nob" id="promise">
        <Label>Our Promise</Label>
        <div className="promise rv">
          <div className="row">Every sale. <Chips items={["receipt", "barcode", "shop"]} /></div>
          <div className="row">Every item, every rupee, <Chips items={["chart", "cash", "phone"]} /></div>
          <div className="row">One calm place for all of it.</div>
        </div>
      </section>

      <section id="features">
        <Label>One System</Label>
        <h2 className="h">The <b>everyday problem,</b> shop work<br />should not be this hard</h2>
        <AppDemo setups={ONE_SYSTEM} />
      </section>

      <section>
        <Label>What You Can Do</Label>
        <h2 className="h">The <b>Three Jobs</b> that eat your week</h2>
        <AppDemo setups={THREE_JOBS} jobs />
      </section>

      <section>
        <Label>Upcoming Modules</Label>
        <h2 className="h">More modules are <b>on the way</b></h2>
        <ModulesGrid />
        <p style={{ textAlign: "center", color: "var(--mut)", marginTop: 40, fontSize: 14 }}>Tap a module to get notified when it launches.</p>
      </section>

      <section>
        <Label>Problem And The Solution</Label>
        <h2 className="h"><b>Shop work</b> should not be this hard</h2>
        <div className="ps rv">
          <div className="ps-a"><div className="in"><h5>Problem</h5>
            {["Sales written in a khata and typed in later", "Owner phones every shop for the day's total", "Stock counted by hand, once a month", "No way to tell which shop is losing money"].map((t) => (
              <div className="ps-it" key={t}><span className="mi" />{t}</div>
            ))}
          </div></div>
          <svg className="arrow" viewBox="0 0 180 60"><path d="M5 50 Q90 -20 170 35" fill="none" stroke="#8E33FF" strokeWidth="2.5" strokeDasharray="6 6" /><path d="M160 22l12 14-17 4" fill="#8E33FF" /></svg>
          <div className="ps-b"><div className="in"><h5>Solution With {CONFIG.brand}</h5>
            {["Every sale recorded the moment it rings", "Daily totals from all shops on WhatsApp", "Stock updates itself with every bill", "Profit and audit trail for every shop"].map((t) => (
              <div className="ps-it" key={t}><span className="ck"><Check /></span>{t}</div>
            ))}
          </div></div>
        </div>
      </section>

      <section id="how">
        <Label>How It Works</Label>
        <h2 className="h">Up and running in <b>four steps</b></h2>
        <div className="steps">
          <svg className="cv" viewBox="0 0 900 110" preserveAspectRatio="none"><path d="M60 40 Q170 -10 280 40" fill="none" stroke="#bbb" strokeDasharray="5 6" /><path d="M340 50 Q450 110 560 50" fill="none" stroke="#bbb" strokeDasharray="5 6" /><path d="M620 40 Q730 -10 840 40" fill="none" stroke="#bbb" strokeDasharray="5 6" /></svg>
          {[
            [P.check, "Book a demo", "We show you the system with your shops and products in mind."],
            [P.sliders, "We set up your shops", "Your branches, counters, prices and staff roles are configured."],
            [P.file, "We move your products", "Send us your item list with barcodes. We check it before anything goes live."],
            [P.msg, "Train cashiers and go live", "Cashiers learn billing in a day. Your whole chain runs on one system."],
          ].map(([d, t, p], i) => (
            <div className="st rv" key={t} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="ic"><Ico d={d} /></div><h6>{t}</h6><p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Label>About Your Data</Label>
        <h2 className="h">Your <b>data stays safe,</b> and stays yours</h2>
        <div className="dc">
          {[
            [P.lock, "Controlled access", "Cashiers see their counter. Managers see their shop. Owners see everything."],
            [P.log, "Full activity log", "Every refund, discount and price change is recorded with who and when."],
            [P.wifi, "Works offline", "Billing keeps running when the internet drops and syncs when it's back."],
            [P.export, "Your data is yours", "Export your sales, stock and customers any time."],
          ].map(([d, t, p]) => (
            <div className="dcard rv" key={t}><div className="ic"><Ico d={d} size={30} color="currentColor" /></div><h6>{t}</h6><p>{p}</p></div>
          ))}
        </div>
      </section>

      <section>
        <Label>Owner App</Label>
        <h2 className="h">Keep an eye on every shop, <b>on any phone</b></h2>
        <div className="app"><div className="app-box">
          <Phones />
          <div className="qr-side">
            <QrMark />
            <h3>Available on<br />Play Store</h3>
            <p>Download the app now<br />for your device</p>
            <a className="btn btn-p" href={CONFIG.playStore} target="_blank" rel="noopener">Download</a>
          </div>
          <div className="fpills">
            <span className="fpill">See live sales from every shop</span>
            <span className="fpill">Get stock and cash alerts instantly</span>
            <span className="fpill">Daily closing report on WhatsApp</span>
          </div>
        </div></div>
      </section>

      <section id="pricing">
        <Label>Pricing</Label>
        <h2 className="h">Simple pricing that <b>grows with you</b></h2>
        <PricingCards />
        <p className="plans-foot">Prices in PKR, per counter, per month. Hardware (scanners, printers) is not included. Not sure which plan fits? <ModalLink kind="sales">Talk to sales</ModalLink></p>
      </section>

      <section>
        <Label>What Shops Say</Label>
        <h2 className="h">Shops that <b>run on {CONFIG.brand}</b></h2>
        <Testimonials />
      </section>

      <section>
        <Label>FAQ</Label>
        <h2 className="h">Questions shops <b>ask us</b></h2>
        <FaqTabs />
      </section>

      <section className="nob" style={{ paddingTop: 20 }}>
        <div className="bento">
          <div className="bcol">
            <div className="bc b1"><small>{CONFIG.brand}</small><h3>Simple shop management</h3><p>Free demo ·<br />Free setup help</p></div>
            <div className="bc b-12k"><b>{st.happy}</b><p>bills every day</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="avs"><img src="/img/av1.webp" alt="" /><div>✦</div><img src="/img/av2.webp" alt="" /></div>
            </div>
            <div className="bc b-gen"><GenerateReport /></div>
          </div>
          <div className="bmid">
            <div className="btop"><small>{CONFIG.brand}</small><h3>Your Whole business,<br />one system.</h3></div>
            <div className="sphere-wrap">
              <svg viewBox="0 0 370 370"><defs><path id="circ" d="M185 185 m-160 0 a160 160 0 1 1 320 0 a160 160 0 1 1 -320 0" /></defs><text fontSize="13" fill="#7D6FB8" letterSpacing="3" fontFamily="monospace"><textPath href="#circ">1001010110 010 001 10010 110101 100011 1001010110 010 001 10010 110101 100011 1001010110 010 001 1001</textPath></text></svg>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/sphere.webp" alt="" />
            </div>
            <div className="bbl"><div className="bico" style={{ background: "linear-gradient(180deg,#f08a55,#c4521f)" }}><Ico d={P.branch} size={22} /></div><h5>Billing in 3 seconds</h5><p>Scan, total and print. Receipts carry your FBR number, and head office sees the sale instantly.</p></div>
            <div className="bbr"><div className="bico" style={{ background: "linear-gradient(180deg,#8E52FF,#5A22D6)" }}><Ico d={P.spark} size={22} /></div><h5>Stock without the stress</h5><p>Expiry alerts, purchase checks against benchmark rates, and stock for every shop in one place.</p></div>
          </div>
          <div className="bcol">
            <div className="bc b-uf"><span>USER FRIENDLY</span></div>
            <div className="bc b-num"><b>{st.bento}</b><span>Shops onboarded</span></div>
            <div className="bc b-msg"><h5>Message templates</h5><p>Send daily sales, stock alerts and udhaar reminders on WhatsApp in seconds.</p>
              <div className="tags">
                <span className="tg" style={{ left: 10, top: 10, transform: "rotate(-20deg)", border: "1.5px solid #f39a68" }}>Daily Report</span>
                <span className="tg" style={{ left: 0, top: 96, transform: "rotate(-55deg)" }}><i />Low Stock</span>
                <span className="tg" style={{ left: 70, top: 90, width: 46, height: 46, padding: 0, justifyContent: "center", background: "#7D4CFF", borderRadius: "50%" }}>✉</span>
                <span className="tg" style={{ right: -24, top: 80, transform: "rotate(-90deg)" }}><i style={{ background: "#f39a68" }} />OFFER · <i />AUDIT ALERT</span>
                <span className="tg" style={{ left: 6, top: 180, background: "#3a2a24", color: "#f39a68", fontSize: 11 }}>PKR</span>
                <span className="tg" style={{ left: 66, top: 160, transform: "rotate(30deg)" }}>Udhaar ✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Talk second="wa" />
      <Footer />
    </div>
  );
}
