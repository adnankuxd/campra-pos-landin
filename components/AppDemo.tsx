"use client";
// Product demo: role tabs + a list of every screen on the left, the real app screen on the right.
// Visitors can click a screen name in the list, or the sidebar inside the screenshot itself.
import { useState } from "react";
import { APPS, AppKey, NAV, NAV_ON, hotspot } from "@/lib/appdemo";

type Setup = { tab: string; app: AppKey; start: string; heading?: string };

export default function AppDemo({ setups, jobs }: { setups: Setup[]; jobs?: boolean }) {
  const [tab, setTab] = useState(0);
  const setup = setups[tab];
  const screens = APPS[setup.app];
  const [cur, setCur] = useState(setup.start);

  const screen = screens.find((s) => s.key === cur) || screens[0];
  // Sidebar positions can change per screen (the cashier POS uses a collapsed icon bar).
  const rects = NAV_ON[setup.app]?.[screen.key] ?? NAV[setup.app];
  const roleName = setup.app === "owner" ? "Head office" : setup.app === "manager" ? "Shop manager" : "Cashier";

  return (
    <div className="demo-wrap">
      <aside className="demo-side">
        <div className="tabs" role="tablist" style={{ gridTemplateColumns: `repeat(${setups.length},1fr)` }}>
          {setups.map((s, i) => (
            <button key={s.tab} role="tab" aria-selected={i === tab} className={`tab ${i === tab ? "on" : ""}`} onClick={() => { setTab(i); setCur(s.start); }}>{s.tab}</button>
          ))}
        </div>

        <div className="desc">
          {jobs && setup.heading && <span className="demo-eyebrow">{setup.heading}</span>}
          <h4>{screen.title}</h4>
          <p>{screen.desc}</p>
        </div>

        <div className="demo-list" aria-label={`${roleName} screens`}>
          <small>{roleName} screens · {screens.length}</small>
          <ul>
            {screens.map((s) => (
              <li key={s.key}>
                <button className={s.key === cur ? "on" : ""} onClick={() => setCur(s.key)} aria-current={s.key === cur ? "page" : undefined}>
                  <span className="dot" />{s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <span className="demo-hint">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11V5a2 2 0 0 1 4 0v6m0-1a2 2 0 0 1 4 0v1m0 0a2 2 0 0 1 4 0v4a6 6 0 0 1-6 6h-2a6 6 0 0 1-5-2.7L4.5 14a1.8 1.8 0 0 1 3-2l1.5 2" /></svg>
          Pick a screen above, or click the menu inside the app
        </span>
      </aside>

      <div className="demo">
        <div className="frame demo-frame">
          <div className="demo-screen">
            {/* All screens are stacked in a fixed-size frame; switching only fades between them. */}
            {screens.map((s) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.img} src={s.img} alt={s.key === cur ? `${s.title} screen` : ""} className={s.key === cur ? "on" : ""} draggable={false} />
            ))}
            {screens.map((s) =>
              rects[s.key] ? (
                <button
                  key={s.key}
                  className={`demo-hot ${s.key === cur ? "on" : ""}`}
                  style={hotspot(rects[s.key])}
                  onClick={() => setCur(s.key)}
                  aria-label={`Open ${s.label}`}
                  title={s.label}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
