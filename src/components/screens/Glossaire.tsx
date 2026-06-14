"use client";
import { useState } from "react";
import { GLO } from "@/lib/content";

export default function Glossaire() {
  const [q, setQ] = useState("");
  const query = q.toLowerCase();
  const list = GLO
    .filter((g) => !query || (g[0] + g[1]).toLowerCase().includes(query))
    .sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <section className="page">
      <span className="eyebrow">Décoder le service</span>
      <h2 className="title">Glossaire des sigles</h2>
      <p className="lead">Tous les acronymes des fiches et des transmissions. Cherchez, et n&apos;hésitez jamais à demander.</p>
      <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔎 Rechercher (ex : UVIH, GEP, PSE…)" />
      {list.map((g) => <div className="gl" key={g[0]}><b>{g[0]}</b><span>{g[1]}</span></div>)}
      {list.length === 0 && <p style={{ color: "#6b7d7b" }}>Aucun sigle.</p>}
    </section>
  );
}
