import Link from "next/link";
export default function NotFound() {
  return (
    <div className="doc" style={{ textAlign: "center" }}>
      <h2 style={{ marginTop: 0 }}>Page not found</h2>
      <p>The page you are looking for doesn&apos;t exist.</p>
      <p style={{ marginTop: 20 }}><Link href="/" style={{ color: "var(--p)" }}>Go to home</Link></p>
    </div>
  );
}
