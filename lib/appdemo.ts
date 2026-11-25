// Interactive app demo: real screens from the current POS (new design).
// Each screen is a full 1440x1040 capture. Sidebar hotspots are CSS px of that frame
// and are converted to percentages, so only the sidebar items are clickable.

export const FRAME = { w: 1440, h: 1040 };

export type AppKey = "owner" | "manager" | "cashier";
export type DemoScreen = { key: string; label: string; img: string; title: string; desc: string; to: string };
type Rect = [x: number, y: number, w: number, h: number];

export const hotspot = ([x, y, w, h]: Rect) => ({
  left: `${(x / FRAME.w) * 100}%`,
  top: `${(y / FRAME.h) * 100}%`,
  width: `${(w / FRAME.w) * 100}%`,
  height: `${(h / FRAME.h) * 100}%`,
});

// Where each sidebar item sits (measured from the live POS at 1440x1040).
const row = (y: number): Rect => [16, y, 231, 40];
export const NAV: Record<AppKey, Record<string, Rect>> = {
  owner: {
    dashboard: row(116), shops: row(160), people: row(256), payroll: row(300), expenses: row(344),
    audit: row(440), reports: row(484), whatsapp: row(528), partners: row(572), settings: row(628),
  },
  manager: {
    today: row(80), receive: row(136), inventory: row(192), count: row(248), staff: row(304), expenses: row(360), shifts: row(416),
  },
  cashier: { pos: row(80), mysales: row(136), shift: row(192) },
};
// The cashier POS screen shows a collapsed icon sidebar, so its hotspots are small icons.
export const NAV_ON: Partial<Record<AppKey, Record<string, Record<string, Rect>>>> = {
  cashier: { pos: { pos: [16, 80, 40, 40], mysales: [16, 124, 40, 40], shift: [16, 168, 40, 40] } },
};

export const APPS: Record<AppKey, DemoScreen[]> = {
  owner: [
    { key: "dashboard", label: "Dashboard", img: "/app/o_dashboard.webp", title: "Owner Dashboard",
      desc: "Today's sale across all 150 shops, split by day and night shift, with cash short, shifts not closed, approvals waiting and the average audit score on one screen. Sales by region and the alerts that need you sit right below.", to: "/features/dashboard/" },
    { key: "shops", label: "Shops", img: "/app/o_shops.webp", title: "Every Shop, Ranked",
      desc: "All 150 shops ranked by today's sale. Filter by cash short or not closed, and open any shop to see its sale, team, problems and last 14 days.", to: "/portals/owner/" },
    { key: "people", label: "People", img: "/app/o_people.webp", title: "People",
      desc: "Everyone across the chain: who is on duty now, who is on leave, and which shops are short of staff. Hiring, transfers and leave requests wait here for your approval.", to: "/features/staff/" },
    { key: "payroll", label: "Payroll", img: "/app/o_payroll.webp", title: "Payroll",
      desc: "Salaries for the month, shop by shop. Managers pay in cash or bank and staff confirm by SMS code, so you can see what's paid, what's still to pay and which shops haven't closed payroll.", to: "/features/staff/" },
    { key: "expenses", label: "Expenses", img: "/app/o_expenses.webp", title: "Expenses",
      desc: "Shop expenses above Rs 10,000 need head office approval before they count. Approve or reject in one tap, and see every recent expense with its status.", to: "/features/expenses/" },
    { key: "audit", label: "Audit", img: "/app/o_audit.webp", title: "Audit Overview",
      desc: "Every shop gets an audit score. The lowest scores and the most serious problems, like missing invoice photos, cash short and prices above benchmark, come first.", to: "/features/audit/" },
    { key: "reports", label: "Reports", img: "/app/o_reports.webp", title: "Monthly Reports",
      desc: "One report per shop for the month, with an audit score and the red flags behind it. Download it or send it in one click.", to: "/features/whatsapp/" },
    { key: "whatsapp", label: "WhatsApp Reports", img: "/app/o_whatsapp.webp", title: "WhatsApp Reports",
      desc: "Every day at 8 PM and 8 AM the owner gets the summary on WhatsApp, in English or Urdu: total sale, top and lowest shops, cash short and shops not closed.", to: "/features/whatsapp/" },
    { key: "partners", label: "Partners & shares", img: "/app/o_partners.webp", title: "Partners & Shares",
      desc: "Shops with more than one owner: each partner's share, their shops and their part of the profit. Every partner gets their own login and sees only their own share.", to: "/portals/owner/" },
    { key: "settings", label: "Settings", img: "/app/o_settings.webp", title: "Settings",
      desc: "Your profile, light or dark mode, the brand colour, language and the notification rules head office sets for every shop. Changes save straight away.", to: "/features/pricing/" },
  ],
  manager: [
    { key: "today", label: "Today", img: "/app/m_today.webp", title: "Shop Manager · Today",
      desc: "The manager's day at a glance: today's sale by shift, low stock, items close to expiry, staff present and anything waiting on them, with quick actions to receive stock or add an expense.", to: "/features/stock/" },
    { key: "receive", label: "Receive Purchase", img: "/app/m_receive.webp", title: "Receive Purchase",
      desc: "Stock comes only from approved suppliers. Pick who delivered, add the items and a photo of the invoice, or record a cash payout to a supplier.", to: "/features/purchases/" },
    { key: "inventory", label: "Inventory", img: "/app/m_inventory.webp", title: "Stock & Expiry",
      desc: "All items in the shop with stock left, low stock and expiry. Open an item to see its batches, earliest expiry first, so it's sold before it has to be written off.", to: "/features/stock/" },
    { key: "count", label: "Stock Count", img: "/app/m_count.webp", title: "Blind Stock Count",
      desc: "Staff count each item on the shelf and enter how many they see. The system number stays hidden until they submit, so the count is honest.", to: "/features/stock/" },
    { key: "staff", label: "Staff & Leave", img: "/app/m_staff.webp", title: "Staff & Leave",
      desc: "Mark attendance for the shop team in one tap, handle leave requests and see salaries.", to: "/features/staff/" },
    { key: "expenses", label: "Expenses", img: "/app/m_expenses.webp", title: "Shop Expenses",
      desc: "Add an expense with a photo of the receipt. Big expenses go to head office for approval before they count.", to: "/features/expenses/" },
    { key: "shifts", label: "Shift Reports", img: "/app/m_shifts.webp", title: "Shift Reports",
      desc: "Every day and night shift for the last 14 days, with the sale and whether the cash matched.", to: "/features/shift/" },
  ],
  cashier: [
    { key: "pos", label: "POS", img: "/app/c_pos.webp", title: "POS Billing",
      desc: "Scan a barcode or type an item name. Items show in English and Urdu, prices are set by head office and GST is included. The customer pays by cash, card or QR.", to: "/features/billing/" },
    { key: "mysales", label: "My Sales", img: "/app/c_sales.webp", title: "My Sales",
      desc: "Every bill the cashier made this shift, with cash and card totals. Tap a bill to see the receipt or return it; a return needs the manager's PIN.", to: "/features/returns/" },
    { key: "shift", label: "Shift Close", img: "/app/c_shift.webp", title: "Blind Shift Close",
      desc: "The cashier counts the drawer note by note before seeing what's expected. If cash is short, a reason is required before the shift can be handed over.", to: "/features/shift/" },
  ],
};

// Home-page tab setups
export const ONE_SYSTEM: { tab: string; app: AppKey; start: string }[] = [
  { tab: "Head Office", app: "owner", start: "dashboard" },
  { tab: "Shop Counter", app: "cashier", start: "pos" },
];
export const THREE_JOBS: { tab: string; app: AppKey; start: string; heading: string }[] = [
  { tab: "Billing", app: "cashier", start: "pos", heading: "Billing & Checkout" },
  { tab: "Stock", app: "manager", start: "inventory", heading: "Stock & Expiry" },
  { tab: "Reports", app: "owner", start: "whatsapp", heading: "Daily Reports" },
];
