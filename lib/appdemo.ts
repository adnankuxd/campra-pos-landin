// Interactive app demo: real screens from the Figma Make POS.
// Each screen is a full 1440x1040 capture. Sidebar hotspots are in CSS px of that frame
// and are converted to percentages, so only the sidebar tabs are clickable.

export const FRAME = { w: 1440, h: 1040 };

export type AppKey = "owner" | "cashier";
export type DemoScreen = { key: string; label: string; img: string; y: number; title: string; desc: string; to: string };

// Sidebar item geometry (same for every screen of an app)
const NAV_X = 16, NAV_W = 232, NAV_H = 40;
export const hotspot = (y: number) => ({
  left: `${(NAV_X / FRAME.w) * 100}%`,
  top: `${(y / FRAME.h) * 100}%`,
  width: `${(NAV_W / FRAME.w) * 100}%`,
  height: `${(NAV_H / FRAME.h) * 100}%`,
});

export const APPS: Record<AppKey, DemoScreen[]> = {
  owner: [
    { key: "dashboard", label: "Dashboard", img: "/app/o_dashboard.webp", y: 164, title: "Owner Dashboard",
      desc: "Today's total sale across all 150 shops, purchases, cash short and shops not yet closed, on one screen. Day and night shift are split, and every alert that needs you is waiting on the right.", to: "/features/dashboard/" },
    { key: "shops", label: "Shops", img: "/app/o_shops.webp", y: 208, title: "Every Shop, Ranked",
      desc: "All 150 shops ranked by today's sale, with region, change from yesterday, cash short and closing status. Filter by North, Central or South, or see only shops that haven't closed.", to: "/portals/owner/" },
    { key: "sales", label: "Sales", img: "/app/o_sales.webp", y: 304, title: "Sales",
      desc: "Chain-wide sales by day, shift and region: today, the last 7 and 30 days, the average per shop, and the top and bottom five shops of the day.", to: "/features/dashboard/" },
    { key: "purchasing", label: "Purchasing", img: "/app/o_purchasing.webp", y: 348, title: "Purchasing",
      desc: "Every purchase bill from every shop, checked against the network average rate. Bills above benchmark and bills without an invoice photo are counted and flagged.", to: "/features/purchases/" },
    { key: "inventory", label: "Inventory & Expiry", img: "/app/o_inventory.webp", y: 392, title: "Inventory & Expiry",
      desc: "Batches expiring across the chain, earliest first, with the shop, quantity and value at cost, so shops sell them before they expire instead of writing them off.", to: "/features/stock/" },
    { key: "suppliers", label: "Suppliers", img: "/app/o_suppliers.webp", y: 436, title: "Suppliers",
      desc: "Approved suppliers with their city and phone, what the shops still owe them, and how many payments are overdue.", to: "/features/purchases/" },
    { key: "staff", label: "Staff & Payroll", img: "/app/o_staff.webp", y: 532, title: "Staff & Payroll",
      desc: "Staff across all shops: who is on duty now, who is on leave, salaries pending, and the expense approvals waiting for you.", to: "/features/staff/" },
    { key: "expenses", label: "Expenses", img: "/app/o_expenses.webp", y: 576, title: "Expenses",
      desc: "Shop expenses above Rs 10,000 need head office approval before they count. Expenses without a receipt are flagged.", to: "/features/expenses/" },
    { key: "audit", label: "Audit", img: "/app/o_audit.webp", y: 672, title: "Audit Overview",
      desc: "Every shop gets an audit score. Missing invoice photos, cash short, prices above benchmark and stock issues are flagged, so the weakest shops come first.", to: "/features/audit/" },
    { key: "reports", label: "Reports", img: "/app/o_reports.webp", y: 716, title: "Monthly Reports",
      desc: "One report per shop, generated automatically on the 27th for the month, with an audit score for every shop. Export them all in one click.", to: "/features/whatsapp/" },
    { key: "whatsapp", label: "WhatsApp Reports", img: "/app/o_whatsapp.webp", y: 760, title: "WhatsApp Reports",
      desc: "At 8 PM and 8 AM the owner gets the day's summary on WhatsApp, in English or Urdu: total sale, top and lowest shops, cash short and shops not closed.", to: "/features/whatsapp/" },
    { key: "settings", label: "Settings", img: "/app/o_settings.webp", y: 816, title: "Rules Set by Head Office",
      desc: "Head office sets the rules every shop follows: expense approval limit, price benchmark tolerance, void approvals, salary payment and the low-stock threshold.", to: "/features/pricing/" },
  ],
  cashier: [
    { key: "pos", label: "POS", img: "/app/c_pos.webp", y: 128, title: "POS Billing",
      desc: "Scan a barcode or tap a popular item. Item names show in English and Urdu, prices are locked by head office, and the total includes GST. The customer pays by cash, card or QR.", to: "/features/billing/" },
    { key: "shift", label: "Shift Close", img: "/app/c_shift.webp", y: 184, title: "Blind Shift Close",
      desc: "The cashier counts the drawer note by note before seeing what's expected. If cash is short, a reason is required before the shift can be handed over.", to: "/features/shift/" },
    { key: "mysales", label: "My Sales", img: "/app/c_sales.webp", y: 240, title: "My Sales",
      desc: "Every bill the cashier made this shift, with cash and card totals. A return needs a reason and the manager's PIN.", to: "/features/returns/" },
  ],
};

// Home-page tab setups
export const ONE_SYSTEM: { tab: string; app: AppKey; start: string }[] = [
  { tab: "Head Office", app: "owner", start: "dashboard" },
  { tab: "Shop Counter", app: "cashier", start: "pos" },
];
export const THREE_JOBS: { tab: string; app: AppKey; start: string; heading: string }[] = [
  { tab: "Billing", app: "cashier", start: "pos", heading: "Billing & Checkout" },
  { tab: "Stock", app: "owner", start: "inventory", heading: "Stock & Expiry" },
  { tab: "Reports", app: "owner", start: "whatsapp", heading: "Daily Reports" },
];
