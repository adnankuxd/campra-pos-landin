import type { Metadata } from "next";
import { CONFIG } from "@/lib/config";
import { Footer, SimpleHero } from "@/components/blocks";

export const metadata: Metadata = { title: `Privacy Policy — ${CONFIG.brand} POS` };

export default function Privacy() {
  return (
    <>
      <SimpleHero crumb="Privacy Policy" title="Privacy Policy" minH={300} />
      <div className="doc">
        <p>This policy explains what data {CONFIG.brand} collects and how it is used. Replace this text with your legal policy before going live.</p>
        <h2>What we collect</h2><p>Business details you give us (shop names, staff accounts, products, prices) and the sales, stock and customer records created while you use the system.</p>
        <h2>How we use it</h2><p>Only to run the service for you: billing, stock, reports and alerts. We do not sell your data.</p>
        <h2>Who can see it</h2><p>Only users you create, with the permissions you give them, and our support team when you ask for help.</p>
        <h2>Your rights</h2><p>You can export or delete your data at any time by contacting {CONFIG.email}.</p>
      </div>
      <Footer />
    </>
  );
}
