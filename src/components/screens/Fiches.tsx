"use client";
import { useState } from "react";
import { useApp } from "../AppContext";
import { MODES } from "@/lib/parcours";
import { FICHES } from "@/lib/clinical";

export default function Fiches() {
  const { profile } = useApp();
  const prof = profile ? MODES[profile.mode].prof : "ide";
  const [q, setQ] = useState("");
  const query = q.toLowerCase();

  const list = FICHES.filter((x) =>
    !query || (x.t + x.sub + x.risk.join() + x.surv.join() + x.as.join() + x.alert).toLowerCase().includes(query)
  );

  return (
    <section className="page">
      <span className="eyebrow">Mémo clinique</span>
      <h2 className="title">Fiches pathologies &amp; surveillances</h2>
      <p className="lead">Situations prévalentes par spécialité, surveillances spécifiques et points d&apos;alerte. Liste non exhaustive.</p>
      <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔎 Rechercher (ex : trachéo, PTH, lambeau…)" />

      {list.map((x) => {
        const isAS = prof === "as" && x.as.length > 0;
        const items = isAS ? x.as : x.surv;
        const h = isAS ? "Rôle de l'AS (en collaboration IDE)" : "Surveillances";
        return (
          <details className="fiche" key={x.t} open={!!query}>
            <summary><span className="em">{x.em}</span><span>{x.t}<div style={{ fontSize: ".74rem", fontWeight: 500, color: "var(--petrol-soft)", fontFamily: "var(--font-hanken)" }}>{x.sub}</div></span></summary>
            <div className="fiche-body">
              <div className="grp"><h4>Risques</h4><div className="taglist">{x.risk.map((r) => <span key={r}>{r}</span>)}</div></div>
              <div className="grp"><h4>{h}</h4><ul className="surv">{items.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
              {x.alert && <div className="alertbox">⚠️ {x.alert}</div>}
            </div>
          </details>
        );
      })}
      {list.length === 0 && <p style={{ color: "#6b7d7b" }}>Aucune fiche.</p>}
    </section>
  );
}
