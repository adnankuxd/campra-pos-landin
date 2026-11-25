"use client";
import { useEffect, useState } from "react";
import { LEADS_KEY, Lead } from "@/components/ModalProvider";
import { Arr } from "@/components/icons";

// Enquiries submitted from this browser (demo only). Connect a form service to receive them by email.
export default function Leads() {
  const [L, setL] = useState<Lead[]>([]);
  useEffect(() => {
    try { setL(JSON.parse(localStorage.getItem(LEADS_KEY) || "[]")); } catch {}
  }, []);
  function exportCsv() {
    const rows = [["Date", "Type", "Name", "Business", "Phone", "Shops", "City", "Message"], ...L.map((l) => [l.at, l.type, l.name, l.business, l.phone, l.shops, l.city, l.msg])];
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n")], { type: "text/csv" }));
    a.download = "enquiries.csv";
    a.click();
  }
  function clear() {
    if (confirm("Clear all saved enquiries?")) { localStorage.removeItem(LEADS_KEY); setL([]); }
  }
  return (
    <div className="doc" style={{ maxWidth: 1100 }}>
      <h2 style={{ marginTop: 0 }}>Enquiries received ({L.length})</h2>
      <p>Stored in this browser only. Connect a backend or form service to receive them by email.</p>
      {L.length ? (
        <>
          <table>
            <thead><tr><th>Date</th><th>Type</th><th>Name</th><th>Business</th><th>Phone</th><th>Shops</th><th>City</th><th>Message</th></tr></thead>
            <tbody>
              {L.slice().reverse().map((l, i) => (
                <tr key={i}><td>{new Date(l.at).toLocaleString()}</td><td>{l.type}</td><td>{l.name}</td><td>{l.business}</td><td>{l.phone}</td><td>{l.shops}</td><td>{l.city}</td><td>{l.msg}</td></tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <button className="btn btn-p btn-sm" onClick={exportCsv}>Export CSV<span className="ar"><Arr /></span></button>
            <button className="btn btn-o btn-sm" onClick={clear}>Clear<span className="ar"><Arr /></span></button>
          </p>
        </>
      ) : (
        <p style={{ marginTop: 20 }}>No enquiries yet.</p>
      )}
    </div>
  );
}
