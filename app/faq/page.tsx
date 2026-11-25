import type { Metadata } from "next";
import { CONFIG } from "@/lib/config";
import { FAQ } from "@/lib/content";
import { Footer, SimpleHero, Talk } from "@/components/blocks";
import { Chev } from "@/components/icons";

export const metadata: Metadata = { title: `FAQs — ${CONFIG.brand} POS` };

export default function Faq() {
  return (
    <>
      <SimpleHero crumb="FAQs" title="All questions, answered" sub={`Everything owners, cashiers and auditors usually ask before switching to ${CONFIG.brand}.`} />
      <section className="nob">
        {Object.entries(FAQ).map(([k, v]) => (
          <div className="fbox rv" key={k} style={{ marginBottom: 30 }}>
            <h2 className="h" style={{ marginBottom: 30 }}>For <b>{k}</b></h2>
            {v.map(([q, a]) => (
              <details className="qa" key={q}><summary>{q}<i><Chev /></i></summary><p>{a}</p></details>
            ))}
          </div>
        ))}
      </section>
      <Talk second="wa" />
      <Footer />
    </>
  );
}
