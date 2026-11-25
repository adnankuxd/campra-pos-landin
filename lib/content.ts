// All website copy lives here. Edit text, steps and screens without touching components.
// Screen keys used in steps: dashboard | shops | stock | purchases | audit | reports | billing | shift | staff
export type Step = [title: string, desc: string, bullets: string[], screen: string];

export const MARQ = ["MOTORWAY MART","GREEN VALLEY STORES","CITY CASH & CARRY","AL-NOOR GROCERS","HIGHWAY FRESH","SHAHEEN SUPER STORE","DAILY NEEDS","KHYBER MART"];

export const ONESYS: Record<string, { t: string; d: string; m: string; to: string }[]> = {
  "Head Office": [
    {t:"Owner Dashboard",d:"Today's total sale across all 150 shops, purchases, cash short and shops not yet closed, on one screen. Day and night shift are split, and every alert that needs you is waiting on the right.",m:"dashboard",to:"/portals/owner"},
    {t:"Every Shop, Ranked",d:"All 150 shops ranked by today's sale, with region, change from yesterday, cash short and closing status. Filter by North, Central or South, or show only shops that haven't closed.",m:"shops",to:"/features/dashboard"},
    {t:"Audit Overview",d:"Every shop gets an audit score. Missing invoice photos, cash short, prices above benchmark and stock issues are flagged, so the weakest shops come first.",m:"audit",to:"/portals/auditor"},
  ],
  "Shop Counter": [
    {t:"POS Billing",d:"Scan a barcode or tap a popular item. Item names show in English and Urdu, prices are locked by head office, and the total includes GST. The customer pays by cash, card or QR.",m:"billing",to:"/portals/cashier"},
    {t:"Blind Shift Close",d:"The cashier counts the drawer note by note before seeing what's expected. If cash is short, they must give a reason before the shift can be handed over.",m:"shift",to:"/features/shift"},
    {t:"Purchase Bills",d:"Every purchase bill a shop enters is checked against the network's average rate. Items bought above benchmark are flagged, and bills without an invoice photo are counted.",m:"purchases",to:"/features/purchases"},
  ],
};
export const JOBS: Record<string, { h: string; s: { d: string; m: string; to: string }[] }> = {
  "Billing": {h:"Billing & Checkout",s:[
    {d:"A cashier builds the bill by scanning or tapping items, in English or Urdu. Prices can't be changed at the counter, GST is included, and payment is cash, card or QR (JazzCash, Easypaisa, Raast).",m:"billing",to:"/features/billing"},
    {d:"At the end of the shift the drawer is counted blind, note by note. The difference is shown only after the count, and a cash short needs a reason the manager can see.",m:"shift",to:"/features/shift"},
  ]},
  "Stock": {h:"Stock & Expiry",s:[
    {d:"Batches expiring across the chain, earliest first, with the shop, quantity and value at cost. Shops sell them before they expire instead of writing them off.",m:"stock",to:"/features/stock"},
    {d:"Every purchase is compared with the network average rate, so a shop paying 14% more for the same item is spotted the same day.",m:"purchases",to:"/features/purchases"},
  ]},
  "Reports": {h:"Daily Reports",s:[
    {d:"Every day at 8 PM and 8 AM the owner gets a summary on WhatsApp: total sale, day shift, top and lowest shops, cash short and shops not closed. In English or Urdu.",m:"reports",to:"/features/whatsapp"},
    {d:"The live dashboard shows the sales trend, day against night shift, cash against card and QR, and the people on duty, for any day, week, month or year.",m:"dashboard",to:"/features/dashboard"},
  ]},
};
export const MODS = [["Loyalty Points","Rewards for regulars"],["Supplier Orders","Auto purchase orders"],["Online Store","Sell on your website"],["Delivery App","Riders & tracking"],["Expiry Alerts","Batch & expiry dates"],["Payroll","Salaries & advances"],["Price Labels","Shelf label printing"],["Franchise Mode","Multi-owner chains"]];

export const FAQ: Record<string, [string, string][]> = {
  "Owners":[
    ["Can I see all my shops from one place?","Yes. The head office dashboard shows live sales, stock and cash for every shop, and the owner app shows the same numbers on your phone."],
    ["What happens if a shop loses internet?","Billing keeps working offline. Bills are saved on the counter and sync to head office as soon as the internet is back. Nothing is lost."],
    ["Does it work with FBR?","Yes. Invoices can be reported to FBR's POS integration, and each receipt carries its FBR invoice number and QR code."],
    ["How is pricing worked out?","You pay per counter, per month. After a short demo we give you a clear quote based on the number of shops and the modules you need."],
  ],
  "Cashiers":[
    ["How long does it take to learn?","Most cashiers are billing confidently on their first day. The screen is in Urdu and English, with big buttons and quick keys."],
    ["Can I use my existing barcode scanner and printer?","In most cases, yes. Standard USB barcode scanners and 80mm thermal receipt printers work out of the box."],
    ["What if I make a mistake on a bill?","You can remove an item before payment. After payment, a return or void needs a manager PIN, and it is recorded in the audit log."],
    ["How do I close my shift?","Count the cash, enter it, and the system shows the expected amount and any difference. Your closing report goes to the manager automatically."],
  ],
  "Auditors":[
    ["Can I see who changed a price?","Yes. Every price change, discount, refund and void is logged with the user, the shop, the time and the old and new values."],
    ["Can I check a shop without visiting it?","Yes. You can review bills, cash closings and stock counts for any shop remotely, and request a spot stock count from your desk."],
    ["Can staff delete records?","No. Sales and audit records cannot be deleted. Corrections are made as new entries, so the history is always complete."],
    ["Can I export data for my own checks?","Yes. Any report can be exported to Excel or PDF, filtered by shop, date, cashier or item."],
  ],
};
// Placeholder testimonials — replace with real client quotes before publishing
export const TESTI = [
  {q:"Before, I phoned every shop at night to ask for the day's sale. Now the report is on my WhatsApp before the shutters are down.",n:"Shop owner",r:"Grocery chain · 18 shops",i:"S"},
  {q:"Cash differences used to take days to explain. Now the shift report shows it the same evening, with the bills behind it.",n:"Audit officer",r:"Multi-branch retailer",i:"A"},
  {q:"My cashiers learned it in one afternoon. Billing is faster and the queue on Friday evenings is half what it was.",n:"Branch manager",r:"Motorway service store",i:"B"},
];

// Placeholder testimonials note above
/* features: slug -> {g:group, t:title, s:subtitle, steps:[title, desc, [bullets], mock]} */
export const F: Record<string, { g: string; t: string; s: string; steps: Step[] }> = {
  dashboard:{g:"Head Office",t:"Multi-shop Dashboard",s:"Every shop's sales, live, on one screen.",steps:[
    ["See today's sales from every shop","Totals update as bills ring up at each counter. No calls, no waiting for the night report.",["Live sales per shop","Today vs yesterday","Top and bottom shops"],"dashboard"],
    ["Drill into any shop","Open a shop to see its bills, its cashier on duty and its stock, as if you were standing at the counter.",["Bill-by-bill view","Cashier performance","Hourly sales"],"shops"],
    ["Spot problems early","Shops with falling sales, high refunds or low stock are flagged, so you know where to look first.",["Refund and discount alerts","Low-stock warnings","Offline shops flagged"],"audit"],
    ["Get it on your phone","The same dashboard is in the owner app, and the closing summary arrives on WhatsApp every night.",["Owner mobile app","Nightly WhatsApp summary","Excel and PDF export"],"reports"]]},
  stock:{g:"Head Office",t:"Stock & Inventory",s:"Know what's on every shelf, in every shop.",steps:[
    ["Stock that updates itself","Every bill reduces stock in that shop, and every delivery adds to it. The count is always current.",["Real-time stock per shop","Unit and carton tracking","Opening stock import"],"stock"],
    ["Low-stock alerts","Set a reorder level for each item. The manager is alerted before the shelf goes empty.",["Reorder levels per shop","WhatsApp alerts","Suggested order quantity"],"stock"],
    ["Move stock between shops","Transfer slow stock from one branch to a branch that needs it, with a record at both ends.",["Two-tap transfers","Sent and received tracking","Transfer history"],"shops"],
    ["Monthly counts in minutes","Count with a scanner or phone. Differences are shown before anything is adjusted.",["Scanner or phone counting","Difference report","Approval before adjusting"],"audit"]]},
  purchases:{g:"Head Office",t:"Purchases & Suppliers",s:"Every delivery checked, every supplier tracked.",steps:[
    ["Every purchase bill in one place","Each shop enters its purchase bills with an invoice photo. Head office sees every bill, from every shop, the same day.",["Bills from all shops","Invoice photo on each bill","Search by item, supplier or shop"],"purchases"],
    ["Checked against the benchmark","Every rate is compared with the network average. Paying 14% more for rusk or garam masala is flagged straight away.",["Network average rate","Above-benchmark flags","30-day history"],"purchases"],
    ["Supplier balances","See what you owe each supplier and what you have paid, shop by shop.",["Supplier ledger","Payment records","Due date reminders"],"dashboard"],
    ["Purchase reports","Know what you bought, from whom and at what price, across every shop.",["Price history","Supplier comparison","Excel export"],"reports"]]},
  pricing:{g:"Head Office",t:"Price Management",s:"Change a price once, every shop has it.",steps:[
    ["Central price list","Set prices at head office and push them to every shop at once, or to selected branches.",["One price list for all","Branch-specific prices","Scheduled price changes"],"stock"],
    ["Offers and discounts","Run weekend offers, bundle deals and discounts with start and end dates.",["Buy-X-get-Y deals","Time-limited offers","Discount limits per role"],"billing"],
    ["No price edits at the counter","Cashiers can change quantity, never price. The bill shows the price is locked by head office.",["Locked prices","Void bills recorded","Same price in every shop"],"billing"],
    ["Margin view","See cost, price and margin for every item so you know where you make money.",["Item margins","Category margins","Low-margin alerts"],"dashboard"]]},
  staff:{g:"Head Office",t:"Staff & Roles",s:"Everyone sees exactly what their job needs.",steps:[
    ["Staff across every shop","Total staff, who is on duty now, who is on leave and how much salary is pending, for the whole chain.",["On duty now","Leave requests","Payroll by shop"],"staff"],
    ["Personal logins","Each cashier logs in with their own PIN, so every bill has a name on it.",["PIN login at counter","Shift start and end","No shared accounts"],"billing"],
    ["Performance by cashier","See sales, bill count, refunds and cash differences for each staff member.",["Sales per cashier","Refund ratio","Cash difference history"],"dashboard"],
    ["Add or remove staff in seconds","When someone leaves, switch off their access from head office straight away.",["Instant access removal","Transfer between shops","Activity history kept"],"shops"]]},
  expenses:{g:"Head Office",t:"Expenses & Cash",s:"Petty cash and shop expenses, recorded where they happen.",steps:[
    ["Expenses go for approval","A shop manager records an expense, like an electricity bill, and head office approves or rejects it.",["Approve or reject","Shop and manager named","Approval history"],"staff"],
    ["Cash in the drawer, accounted","Cash sales, expenses and cash drops are reconciled at every shift close.",["Expected vs counted cash","Cash drop records","Difference alerts"],"shift"],
    ["Bank deposits","Record daily deposits and match them to the shop's closing cash.",["Deposit slips","Deposit matching","Undeposited cash alert"],"reports"],
    ["Profit by shop","Sales minus cost and expenses, shop by shop, so you know which branches really earn.",["Shop-wise P&L","Monthly comparison","Excel export"],"dashboard"]]},
  audit:{g:"Head Office",t:"Audit Trail",s:"Every change has a name and a time.",steps:[
    ["Everything is logged","Refunds, voids, discounts, price changes and stock adjustments are all recorded.",["User, shop and time","Old and new values","Cannot be deleted"],"audit"],
    ["Exceptions first","The audit screen puts unusual activity on top: big refunds, repeated voids, late-night bills.",["Exception rules","Risk flags","Daily exception report"],"audit"],
    ["Cash checks","Compare cash closings with sales for every shift, and see differences at a glance.",["Shift reconciliations","Difference trends","Per-cashier history"],"shift"],
    ["Remote spot checks","Request a stock count for any item at any shop and compare it with the system count.",["Spot count requests","Count vs system","Follow-up notes"],"stock"]]},
  whatsapp:{g:"Head Office",t:"WhatsApp Reports",s:"Your daily numbers, where you already look.",steps:[
    ["Nightly closing report","Sales, cash, refunds and top items from every shop, sent to the owner each night.",["All shops in one message","Totals and highlights","Choose who receives it"],"reports"],
    ["Instant alerts","Low stock, big refunds, cash differences and offline shops trigger an alert straight away.",["Choose alert types","Per-shop thresholds","Quiet hours"],"reports"],
    ["Message templates","Send payment reminders, offers and supplier orders from ready templates.",["Udhaar reminders","Offer broadcasts","Supplier orders"],"reports"],
    ["Weekly and monthly summaries","Comparisons by shop and by week, with a PDF attached for your records.",["Weekly comparison","Monthly PDF","Growth by shop"],"dashboard"]]},
  fbr:{g:"Head Office",t:"FBR Integration",s:"Tax-ready invoices from every counter.",steps:[
    ["Invoices reported automatically","Each sale can be reported to FBR's POS system as it happens.",["Real-time reporting","Retry when offline","Status per invoice"],"billing"],
    ["FBR number and QR on receipts","Customers get a receipt with the FBR invoice number and QR code.",["Printed QR code","Invoice number","Sales tax shown"],"billing"],
    ["Tax settings per item","Set the tax rate for each item or category once, and every bill applies it.",["Item-level tax rates","Exempt items","Tax summaries"],"stock"],
    ["Tax reports","Monthly sales tax summaries by shop, ready for your accountant.",["Monthly tax report","Shop-wise totals","Excel export"],"reports"]]},
  billing:{g:"Shop Counter",t:"Fast Billing (POS)",s:"Scan, total, paid. Every sale in seconds.",steps:[
    ["Bill a customer in seconds","Scan items or tap quick keys. The total, tax and change are worked out for you.",["Barcode scanning","Quick keys for loose items","Hold and recall bills"],"billing"],
    ["Every way to pay","Take cash, card, JazzCash or Easypaisa, or split one bill across several methods.",["Cash, card and wallets","Split payments","Change calculation"],"billing"],
    ["Receipts that look right","Print an 80mm receipt with your logo, FBR number and QR code, or send it on WhatsApp.",["Thermal printing","WhatsApp e-receipt","Urdu and English"],"billing"],
    ["Works without internet","If the connection drops, billing carries on. Bills sync to head office when it returns.",["Offline billing","Automatic sync","No lost sales"],"shift"]]},
  barcode:{g:"Shop Counter",t:"Barcode & Labels",s:"Every item scannable, every shelf labelled.",steps:[
    ["Scan any barcode","Standard product barcodes work straight away with a USB or Bluetooth scanner.",["USB and Bluetooth scanners","Camera scanning on phone","Multiple barcodes per item"],"billing"],
    ["Print your own labels","Create barcodes for loose items, bakery goods or your own packing.",["Label templates","Weight-based barcodes","Bulk label printing"],"stock"],
    ["Shelf price labels","When a price changes, print new shelf labels for every shop from head office.",["Price-change labels","Per-shop printing","Offer labels"],"stock"],
    ["Fewer billing mistakes","Scanning instead of typing means the right item at the right price, every time.",["No manual price entry","Unknown barcode alerts","Faster queues"],"billing"]]},
  returns:{g:"Shop Counter",t:"Returns & Refunds",s:"Returns handled properly, and on the record.",steps:[
    ["Find the original bill","Scan the receipt or search by date to pull up the bill being returned.",["Receipt scan","Bill search","Partial returns"],"billing"],
    ["Rules you set","Refunds over a limit need a manager PIN. Exchanges are handled on the same screen.",["Manager PIN limits","Exchange support","Reason codes"],"audit"],
    ["Back into stock","Returned items go back into stock, or are marked damaged if they can't be sold.",["Restock or write off","Damaged stock report","Supplier returns"],"stock"],
    ["Refund reports","See refunds by shop, cashier and reason, so unusual patterns stand out.",["Refunds per cashier","Reason analysis","Audit alerts"],"dashboard"]]},
  shift:{g:"Shop Counter",t:"Shift Closing",s:"The right cash in the drawer, every shift.",steps:[
    ["Open the shift","The cashier logs in and enters the opening cash. Everything after that is on their name.",["PIN login","Opening cash entry","Shift timer"],"billing"],
    ["Count at the end","Count notes by denomination. The system shows expected cash and the difference.",["Denomination count","Expected vs counted","Difference reason"],"shift"],
    ["Closing report sent","The shift report goes to the manager and head office automatically.",["Auto-sent report","WhatsApp copy","Printed summary"],"reports"],
    ["Patterns over time","Repeated differences for a cashier or shop are flagged for the auditor.",["Difference history","Auditor alerts","Shop comparison"],"audit"]]},
  credit:{g:"Shop Counter",t:"Customer Credit (Udhaar)",s:"Udhaar without the khata.",steps:[
    ["Sell on credit","Add a customer to the bill and mark it as credit. Limits stop anyone going too far.",["Customer accounts","Credit limits","Guarantor details"],"billing"],
    ["Balances at a glance","See every customer's balance, last payment and how long it's been due.",["Customer ledger","Ageing report","Shop-wise balances"],"stock"],
    ["Reminders on WhatsApp","Send a polite reminder with the balance in one tap.",["One-tap reminders","Scheduled reminders","Payment links"],"reports"],
    ["Record payments","Payments are recorded at any shop and the balance updates everywhere.",["Pay at any branch","Partial payments","Receipts for payments"],"shift"]]},
};
export const FGROUPS: Record<string, string[]> = {"Head Office":["dashboard","stock","purchases","pricing","staff","expenses","audit","whatsapp","fbr"],"Shop Counter":["billing","barcode","returns","shift","credit"]};

export const PORTALS: Record<string, { t: string; s: string; steps: Step[] }> = {
  owner:{t:"Head Office",s:"Every shop, every rupee, from one desk.",steps:[
    ["See today's sale across every shop","Total sale, purchases, cash short and shops not closed, live for all 150 shops, with day and night shift side by side.",["Live totals for the whole chain","Day vs night shift","Cash vs card and QR"],"dashboard"],
    ["Rank every shop","Shops ranked by today's sale with change from yesterday, cash short and closing status. Export the list any time.",["North, Central and South filters","Top 5 and bottom 5","Not-closed shops at a glance"],"shops"],
    ["Stop overpaying suppliers","Every purchase bill is checked against the network average rate, and bills without an invoice photo are counted.",["Above-benchmark flags","Missing invoice photos","Supplier on every line"],"purchases"],
    ["Get the day's report on WhatsApp","At 8 PM and 8 AM the summary lands on your phone: sale, top and lowest shops, cash short and shops not closed.",["Twice-daily summary","English or Urdu","Sent-report history"],"reports"]]},
  cashier:{t:"Shop Counter",s:"Fast billing your cashier learns in a day.",steps:[
    ["Bill a customer in seconds","Scan a barcode or tap a popular item. Names show in English and Urdu, and low-stock items are marked.",["Barcode or tap to add","English and Urdu item names","Cash, card or QR"],"billing"],
    ["Prices locked by head office","The cashier can change quantity, never price. Voiding a bill is recorded, so every rupee has a name on it.",["Locked prices","GST included in total","Voids on the record"],"billing"],
    ["Close the shift with a blind count","Count the drawer note by note. The expected amount stays hidden until the count is in, and a short needs a reason.",["Note-by-note count","Hidden expected amount","Reason required for short"],"shift"]]},
  auditor:{t:"Audit Officer",s:"Check every shop without visiting every shop.",steps:[
    ["Every shop has a score","Shops are scored on cash, purchases, prices and stock. Critical shops under 70 come first, with their red flags.",["Audit score per shop","Red flags by type","Lowest score first"],"audit"],
    ["Catch inflated purchases","Rates above the network average and bills missing invoice photos are flagged for follow-up.",["Above-benchmark rates","Missing photos","Search by item, supplier or shop"],"purchases"],
    ["See why cash was short","Every shift close records the counted amount, the expected amount and the reason for any difference.",["Blind cash counts","Short and excess","Reasons on record"],"shift"],
    ["Check stock remotely","See expiring batches, quantities and value at risk for any shop, without a visit.",["Expiry by shop","Value at risk","Shops affected"],"stock"]]},
};


export const SHOPS: [string,string,number,number][] =[["Peshawar Ring Rd","Peshawar",248300,1],["Mardan Bypass","Mardan",162450,1],["Islamabad F-10","Islamabad",311900,1],["Rawalpindi Saddar","Rawalpindi",205700,1],["Bhera Service Area","M-2",188200,1],["Lahore Thokar","Lahore",342100,1],["Multan Bypass","Multan",151900,0],["Sukkur Toll Plaza","Sukkur",129400,1]];

export const rs = (n: number) => "Rs " + n.toLocaleString("en-PK");
