// Decorative artwork for the home page (hero diamonds, promise chips, owner-app phones, QR mark).
import { CONFIG } from "@/lib/config";

function Diamond({ id }: { id: string }) {
  return (
    <div className="dia">
      <svg viewBox="0 0 170 300">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B98BFF" />
            <stop offset="1" stopColor="#E4D3FF" />
          </linearGradient>
        </defs>
        <path d="M85 30 L150 150 L85 270 L20 150 Z" fill={`url(#${id})`} stroke={`url(#${id})`} strokeWidth="44" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
export const Diamonds = ({ side }: { side: "l" | "r" }) => (
  <div className={`dias ${side}`}>{[0, 1, 2, 3].map((i) => <Diamond key={i} id={`dg-${side}${i}`} />)}</div>
);

const CHIPS: Record<string, React.ReactNode> = {
  receipt: (<svg viewBox="0 0 118 72"><rect width="118" height="72" fill="#F1E7FF" /><rect x="38" y="8" width="42" height="60" rx="3" fill="#fff" stroke="#D9C4FF" /><path d="M45 18h28M45 25h20M45 32h28M45 39h16" stroke="#B996FF" strokeWidth="2.5" strokeLinecap="round" /><path d="M45 52h28" stroke="#8E33FF" strokeWidth="4" strokeLinecap="round" /></svg>),
  barcode: (<svg viewBox="0 0 118 72"><rect width="118" height="72" fill="#181818" />{Array.from({ length: 18 }).map((_, i) => <rect key={i} x={26 + i * 3.8} y="18" width={i % 3 ? 1.6 : 3} height="36" fill="#fff" />)}<rect x="18" y="35" width="82" height="2" fill="#ff5a3c" /></svg>),
  shop: (<svg viewBox="0 0 118 72"><rect width="118" height="72" fill="#FF6B2C" /><path d="M34 30h50v28H34z" fill="#fff" /><path d="M30 30l5-12h48l5 12z" fill="#ffe1d3" /><rect x="53" y="42" width="12" height="16" fill="#FF6B2C" /></svg>),
  chart: (<svg viewBox="0 0 118 72"><rect width="118" height="72" fill="#8E33FF" />{[18, 28, 22, 36, 30, 44].map((h, i) => <rect key={i} x={28 + i * 11} y={58 - h} width="7" height={h} rx="2" fill={i === 5 ? "#fff" : "#C9A6FF"} />)}</svg>),
  cash: (<svg viewBox="0 0 118 72"><rect width="118" height="72" fill="#1FC32E" /><rect x="26" y="20" width="66" height="34" rx="5" fill="#d6ffd9" /><circle cx="59" cy="37" r="9" fill="#1FC32E" /><text x="59" y="41" fontSize="11" textAnchor="middle" fill="#fff" fontFamily="Inter" fontWeight="700">Rs</text></svg>),
  phone: (<svg viewBox="0 0 118 72"><rect width="118" height="72" fill="#16202D" /><rect x="44" y="8" width="30" height="58" rx="6" fill="#fff" /><rect x="48" y="16" width="22" height="12" rx="2" fill="#8E33FF" /><rect x="48" y="32" width="22" height="4" rx="2" fill="#ddd" /><rect x="48" y="39" width="16" height="4" rx="2" fill="#ddd" /><rect x="48" y="46" width="22" height="4" rx="2" fill="#ddd" /></svg>),
};
export const Chips = ({ items }: { items: string[] }) => (
  <span className="chips">{items.map((k) => <div className="chp" key={k}>{CHIPS[k]}</div>)}</span>
);

// Owner app phones: real screenshots of the POS mobile app (Head Office role).
export function Phones() {
  return (
    <div className="phones">
      <div className="phone p1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ph-img" src="/mobile/owner_home.webp" alt={`${CONFIG.brand} owner app: today's sale for all shops`} draggable={false} />
      </div>
      <div className="phone p2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ph-img" src="/mobile/owner_shops.webp" alt={`${CONFIG.brand} owner app: every shop ranked by today's sale`} draggable={false} />
      </div>
    </div>
  );
}

export const QrMark = () => (
  <svg width="150" height="150" viewBox="0 0 100 100">
    <rect x="2" y="2" width="40" height="40" rx="12" fill="#181818" /><rect x="13" y="13" width="18" height="18" rx="5" fill="#fff" />
    <rect x="58" y="2" width="40" height="40" rx="12" fill="#181818" /><rect x="69" y="13" width="18" height="18" rx="5" fill="#fff" />
    <rect x="2" y="58" width="40" height="40" rx="12" fill="#181818" /><rect x="13" y="69" width="18" height="18" rx="5" fill="#fff" />
    <rect x="58" y="56" width="18" height="18" rx="5" fill="#181818" transform="rotate(45 67 65)" />
    <rect x="78" y="64" width="16" height="16" rx="4" fill="#181818" /><rect x="60" y="80" width="16" height="16" rx="4" fill="#181818" /><rect x="80" y="84" width="12" height="12" rx="3" fill="#181818" />
  </svg>
);
