"use client";
// Product demo as a guided tour on a dark stage.
// Left: numbered list of screens. The open one expands with its story and a progress line.
// Right: the real app screen inside a browser window. Screens move on by themselves every few seconds
// (only while the section is on screen, paused on hover, off for people who prefer less motion).
// Visitors can also click a screen in the list, or the sidebar inside the screenshot.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { APPS, AppKey, NAV, NAV_ON, hotspot } from "@/lib/appdemo";

type Setup = { tab: string; app: AppKey; start: string; heading?: string };
const STEP_MS = 6500;

export default function AppDemo({ setups, jobs }: { setups: Setup[]; jobs?: boolean }) {
  const [tab, setTab] = useState(0);
  const setup = setups[tab];
  const screens = APPS[setup.app];
  const [cur, setCur] = useState(setup.start);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [seen, setSeen] = useState(false);
  const [tick, setTick] = useState(0); // restarts the progress line on every change
  const root = useRef<HTMLDivElement>(null);

  const idx = Math.max(0, screens.findIndex((s) => s.key === cur));
  const screen = screens[idx];
  const rects = NAV_ON[setup.app]?.[screen.key] ?? NAV[setup.app];
  const roleName = setup.app === "owner" ? "Head office" : setup.app === "manager" ? "Shop manager" : "Cashier";
  const running = playing && seen && !hover;

  const go = (key: string) => { setCur(key); setTick((t) => t + 1) };

  // Only tour while the section is visible; no auto tour for reduced motion
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
    const el = root.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => go(screens[(idx + 1) % screens.length].key), STEP_MS);
    return () => clearTimeout(id);
  }, [running, idx, screens, tick]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`dx ${running ? "is-run" : ""}`} ref={root}>
      <div className="dx-glow" aria-hidden />
      <div className="dx-top">
        {setups.length > 1 ? (
          <div className="dx-switch" role="tablist" aria-label="Choose a role">
            {setups.map((s, i) => (
              <button key={s.tab} role="tab" aria-selected={i === tab} className={i === tab ? "on" : ""} onClick={() => { setTab(i); setCur(s.start); setTick((t) => t + 1) }}>{s.tab}</button>
            ))}
          </div>
        ) : <span />}
        <div className="dx-ctrl">
          <span className="dx-count"><b>{String(idx + 1).padStart(2, "0")}</b> / {String(screens.length).padStart(2, "0")}</span>
          <button className="dx-play" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause the tour" : "Play the tour"}>
            {playing
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.2" /><rect x="14" y="5" width="4" height="14" rx="1.2" /></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>}
            <span>{playing ? "Auto tour" : "Paused"}</span>
          </button>
        </div>
      </div>

      <div className="dx-grid">
        <nav className="dx-rail" aria-label={`${roleName} screens`}>
          {jobs && setup.heading && <span className="dx-eyebrow">{setup.heading}</span>}
          <span className="dx-railhead">{roleName} · {screens.length} screens</span>
          <ol>
            {screens.map((s, i) => {
              const on = s.key === cur
              return (
                <li key={s.key} className={on ? "on" : ""}>
                  <button onClick={() => go(s.key)} aria-current={on ? "step" : undefined}>
                    <span className="dx-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="dx-l">{s.label}</span>
                  </button>
                  <div className="dx-more" aria-hidden={!on}>
                    <div>
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                      {s.to && <Link href={s.to} className="dx-link" tabIndex={on ? 0 : -1}>See how it works <span aria-hidden>→</span></Link>}
                    </div>
                  </div>
                  {on && <span key={tick} className="dx-bar" aria-hidden />}
                </li>
              )
            })}
          </ol>
        </nav>

        <div className="dx-win" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div className="dx-chrome">
            <span className="dx-dots" aria-hidden><i /><i /><i /></span>
            <span className="dx-url"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>app.campra.pk/{screen.key}</span>
            <span className="dx-live"><i />Live demo</span>
          </div>
          <div className="dx-screen">
            {screens.map((s) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.img} src={s.img} alt={s.key === cur ? `${s.title} screen` : ""} className={s.key === cur ? "on" : ""} draggable={false} loading="lazy" />
            ))}
            {screens.map((s) =>
              rects[s.key] ? (
                <button key={s.key} className={`dx-hot ${s.key === cur ? "on" : ""}`} style={hotspot(rects[s.key])} onClick={() => go(s.key)} aria-label={`Open ${s.label}`} title={s.label} />
              ) : null
            )}
          </div>
          {/* Phone and tablet: the story sits under the window */}
          <div className="dx-cap">
            <h4>{screen.title}</h4>
            <p>{screen.desc}</p>
          </div>
        </div>
      </div>
      <p className="dx-tip">Click any screen on the left, or the menu inside the app. Hover the window to pause.</p>
    </div>
  );
}
