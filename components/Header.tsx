"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";
import { WaLink } from "./ui";
import { WaIcon } from "./icons";

const NAV = [
  { href: "/", label: "Home", key: "home" },
  { href: "/features/billing/", label: "Features", key: "features" },
  { href: "/portals/owner/", label: "Portals", key: "portals" },
  { href: "/#pricing", label: "Pricing", key: "pricing" },
  { href: "/#how", label: "How it works", key: "how" },
  { href: "/about/", label: "About us", key: "about" },
];

export default function Header() {
  const path = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    try {
      const t = (localStorage.getItem("campra_theme") as "light" | "dark") || "light";
      setTheme(t);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("campra_theme", theme); } catch {}
  }, [theme]);
  useEffect(() => setOpen(false), [path]);

  const active = path === "/" ? "home" : path.split("/")[1];
  const isHome = path === "/";

  return (
    <header className="nav">
      <Link href="/" className="logo">{CONFIG.brand}</Link>
      <nav className={`links ${open ? "open" : ""}`}>
        {NAV.map((n) => (
          <Link key={n.key} href={n.href} className={active === n.key ? "on" : ""} onClick={() => setOpen(false)}>{n.label}</Link>
        ))}
      </nav>
      <div className="nav-r">
        {isHome && <WaLink className="circ wa"><WaIcon size={24} /></WaLink>}
        <button className="circ dk" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" fill="currentColor" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        </button>
        <button className="circ dk burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
    </header>
  );
}
