"use client";
// Tabs + a live-feeling app frame. Only the sidebar tabs inside the screen are clickable.
import { useState } from "react";
import { APPS, AppKey, hotspot } from "@/lib/appdemo";

type Setup = { tab: string; app: AppKey; start: string; heading?: string };

export default function AppDemo({ setups, jobs }: { setups: Setup[]; jobs?: boolean }) {
  const [tab, setTab] = useState(0);
  const setup = setups[tab];
  const screens = APPS[setup.app];
  const [cur, setCur] = useState(setup.start);

  const screen = screens.find((s) => s.key === cur) || screens[0];

  return (
    <div className="demo-wrap">
      <div className="tabs" style={{ gridTemplateColumns: `repeat(${setups.length},1fr)` }}>
        {setups.map((s, i) => (
          <button key={s.tab} className={`tab ${i === tab ? "on" : ""}`} onClick={() => { setTab(i); setCur(s.start); }}>{s.tab}</button>
        ))}
      </div>

      <div className="desc">
        <h4 className={jobs ? "pc" : ""}>{jobs && setup.heading ? `${setup.heading} · ${screen.title}` : screen.title}</h4>
        <p>{screen.desc}</p>
      </div>

      <div className="demo">
        <div className="frame demo-frame">
          <div className="demo-screen">
            {/* All screens are stacked in a fixed-size frame; switching only fades between them. */}
            {screens.map((s) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.img} src={s.img} alt={s.key === cur ? `${s.title} screen` : ""} className={s.key === cur ? "on" : ""} draggable={false} />
            ))}
            {screens.map((s) => (
              <button
                key={s.key}
                className={`demo-hot ${s.key === cur ? "on" : ""}`}
                style={hotspot(s.y)}
                onClick={() => setCur(s.key)}
                aria-label={`Open ${s.label}`}
                title={s.label}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
