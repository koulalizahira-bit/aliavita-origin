"use client";
import { useState } from "react";
import { TACHES } from "@/lib/clinical";

export default function Taches() {
  const [u, setU] = useState<"PR" | "PO">("PR");
  const [h, setH] = useState<"jour" | "nuit">("jour");
  const arr = TACHES[u + "_" + h] || [];

  return (
    <section className="page">
      <span className="eyebrow">La vraie journée chez nous</span>
      <h2 className="title">Fiche de tâches IDE</h2>
      <p className="lead">Le déroulé réel d&apos;un poste. <span style={{ color: "var(--petrol-soft)" }}>(Document de travail — version officielle validée par le service qualité.)</span></p>

      <div>
        <div className="toggle">
          <button className={u === "PR" ? "on" : ""} onClick={() => setU("PR")}>USI Réa</button>
          <button className={u === "PO" ? "on" : ""} onClick={() => setU("PO")}>USI Chir</button>
        </div>
        <div className="toggle">
          <button className={h === "jour" ? "on" : ""} onClick={() => setH("jour")}>Jour 7h–19h</button>
          <button className={h === "nuit" ? "on" : ""} onClick={() => setH("nuit")}>Nuit 19h–7h</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 6 }}>
        <div className="tline">
          {arr.map((s, i) => (
            <div className="tslot" key={i}>
              <div className="th">{s.t} — {s.title}</div>
              <ul>{s.tasks.map((x, j) => <li key={j}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
