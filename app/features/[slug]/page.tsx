import FeatureTabs from "@/components/FeatureTabs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONFIG } from "@/lib/config";
import { F } from "@/lib/content";
import { Footer, InnerHero, StepBoxes, Talk } from "@/components/blocks";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(F).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${F[slug]?.t ?? "Features"} — ${CONFIG.brand} POS`, description: F[slug]?.s };
}

export default async function Feature({ params }: Props) {
  const { slug } = await params;
  const f = F[slug];
  if (!f) notFound();
  return (
    <>
      <InnerHero crumbs={[["Home", "/"], ["Features", "/features/billing/"], [f.t]]} title={f.t} sub={f.s} />
      <FeatureTabs items={Object.keys(F).map((k) => ({ slug: k, title: F[k].t }))} active={slug} />
      <StepBoxes steps={f.steps} />
      <Talk second="wa" />
      <Footer />
    </>
  );
}
