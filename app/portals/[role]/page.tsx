import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONFIG } from "@/lib/config";
import { PORTALS } from "@/lib/content";
import { Footer, InnerHero, StepBoxes, Talk } from "@/components/blocks";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(PORTALS).map((role) => ({ role }));
}

type Props = { params: Promise<{ role: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  return { title: `${PORTALS[role]?.t ?? "Portals"} — ${CONFIG.brand} POS` };
}

export default async function Portal({ params }: Props) {
  const { role } = await params;
  const p = PORTALS[role];
  if (!p) notFound();
  return (
    <>
      <InnerHero crumbs={[["Home", "/"], ["Portals", "/portals/owner/"], [p.t]]} title={p.t} sub={p.s} />
      <div className="tabs ptabs">
        {Object.entries(PORTALS).map(([k, v]) => (
          <Link key={k} href={`/portals/${k}/`} className={`tab ${k === role ? "on" : ""}`} style={{ display: "grid", placeItems: "center" }}>{v.t}</Link>
        ))}
      </div>
      <StepBoxes steps={p.steps} />
      <Talk second="wa" />
      <Footer />
    </>
  );
}
