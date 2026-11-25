// Small inline icons used across the site.
export const Arr = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const Left = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const Right = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Chev = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>
);
export const Check = ({ size = 12, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round"><path d="m5 12 5 5 9-10" /></svg>
);
export const WaIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.2.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);

/** Icon from raw SVG path markup (keeps the icon set compact). */
export function Ico({ d, size = 34, color = "#fff" }: { d: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: d }} />
  );
}

export const P = {
  check: '<circle cx="12" cy="12" r="9" fill="#fff" stroke="none"/><path d="m8 12 3 3 5-6" stroke="#8E33FF" stroke-width="2.4"/>',
  sliders: '<path d="M4 8h16M4 16h16"/><circle cx="9" cy="8" r="2.5" fill="#8E33FF"/><circle cx="15" cy="16" r="2.5" fill="#8E33FF"/>',
  file: '<path d="M6 3h8l4 4v14H6z" fill="#fff" stroke="none"/><path d="M9 13h5M12 10l3 3-3 3" stroke="#8E33FF" stroke-width="2"/>',
  msg: '<rect x="4" y="5" width="16" height="13" rx="3" fill="#fff" stroke="none"/><path d="M8 10h8M8 13h5" stroke="#8E33FF" stroke-width="2"/>',
  lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  log: '<path d="M4 6h16M4 12h10M4 18h7"/><circle cx="18" cy="16" r="3"/>',
  wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/>',
  export: '<path d="M12 3v12M7 8l5-5 5 5M5 15v5h14v-5"/>',
  doc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  store: '<path d="M4 9 5.5 4h13L20 9M4 9h16v11H4zM9 20v-6h6v6"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" fill="#fff" stroke="none"/><path d="m8.5 12 2.5 2.5 4.5-5" stroke="#181818" stroke-width="2.2"/>',
  branch: '<circle cx="7" cy="5" r="2"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="8" r="2"/><path d="M7 7v10M17 10c0 4-10 3-10 7"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
};
