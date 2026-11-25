// Edit brand, contacts and numbers here.
// NOTE: stats & testimonials are placeholders — replace with real figures/quotes before going public.
export const CONFIG = {
  brand: "Campra",
  whatsapp: "923001234567", // international format, no + or spaces
  email: "hello@campra.pk",
  playStore: "https://play.google.com/store",
  demoUrl: "https://pos-psi-henna.vercel.app/",
  stats: { shops: "150+", cashiers: "2.5k", bills: "1.6M", bento: "112", happy: "12K" },
};

export const waLink = (text: string) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

export const SCREENS: Record<string, { src: string; alt: string }> = {
  dashboard: { src: "/screens/dashboard.webp", alt: "Owner dashboard" },
  shops: { src: "/screens/shops.webp", alt: "All shops ranking" },
  stock: { src: "/screens/stock.webp", alt: "Inventory and expiry" },
  purchases: { src: "/screens/purchases.webp", alt: "Purchasing" },
  audit: { src: "/screens/audit.webp", alt: "Audit overview" },
  reports: { src: "/screens/whatsapp.webp", alt: "WhatsApp reports" },
  billing: { src: "/screens/billing.webp", alt: "Cashier POS billing" },
  shift: { src: "/screens/shift.webp", alt: "Shift close" },
  staff: { src: "/screens/staff.webp", alt: "Staff and payroll" },
};
