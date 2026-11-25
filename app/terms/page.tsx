import type { Metadata } from "next";
import { CONFIG } from "@/lib/config";
import { Footer, SimpleHero } from "@/components/blocks";

export const metadata: Metadata = { title: `Terms of Service — ${CONFIG.brand} POS` };

export default function Terms() {
  return (
    <>
      <SimpleHero crumb="Terms of Service" title="Terms of Service" minH={300} />
      <div className="doc">
        <p>These terms govern your use of {CONFIG.brand}. Replace this text with your legal terms before going live.</p>
        <h2>Service</h2><p>{CONFIG.brand} provides point-of-sale, stock and reporting software on a monthly subscription per counter.</p>
        <h2>Payments</h2><p>Subscriptions are billed monthly in advance. Prices are confirmed in your written quote.</p>
        <h2>Data ownership</h2><p>All business data you enter remains yours. You may export it at any time.</p>
        <h2>Support</h2><p>Support is available on WhatsApp, phone and email during business hours.</p>
      </div>
      <Footer />
    </>
  );
}
