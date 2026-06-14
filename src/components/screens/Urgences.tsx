"use client";
import { NORMS } from "@/lib/content";

export default function Urgences() {
  return (
    <section className="page">
      <span className="eyebrow">Quand ça s&apos;accélère</span>
      <h2 className="title">Réflexes, matériel &amp; normes</h2>
      <p className="lead">Une urgence se prépare. Pour les dilutions exactes : protocole et chariot du service.</p>

      <h3 className="sub"><span className="dot" />Premiers réflexes (AFGSU 2)</h3>
      <div className="grid g3">
        <div className="card"><b style={{ color: "var(--coral-deep)" }}>1 · Alerter</b><p style={{ fontSize: ".9rem", marginTop: 5, color: "#3c5654" }}>Appeler à l&apos;aide, faire venir le médecin et l&apos;équipe.</p></div>
        <div className="card"><b style={{ color: "var(--coral-deep)" }}>2 · Évaluer</b><p style={{ fontSize: ".9rem", marginTop: 5, color: "#3c5654" }}>Conscience, respiration, pouls. Chariot d&apos;urgence / DSA au lit.</p></div>
        <div className="card"><b style={{ color: "var(--coral-deep)" }}>3 · Agir</b><p style={{ fontSize: ".9rem", marginTop: 5, color: "#3c5654" }}>Pré-oxygénation, BAVU, RCP + DSA, drogues préparées sur prescription.</p></div>
      </div>

      <h3 className="sub"><span className="dot" />Constantes &amp; normes — pense-bête</h3>
      <div className="notice"><span>ℹ️</span><div>Valeurs de référence <b>adulte, indicatives</b> — à valider et adapter selon protocoles et état du patient.</div></div>
      <div className="card">
        <table className="normtab">
          <tbody>
            <tr><th>Paramètre</th><th>Repère usuel adulte</th></tr>
            {NORMS.map((n) => <tr key={n[0]}><td>{n[0]}</td><td>{n[1]}</td></tr>)}
          </tbody>
        </table>
      </div>
      <div className="alertbox">Une alarme qui sonne = je regarde le patient avant l&apos;écran. Jamais d&apos;alarme neutralisée sans avoir compris pourquoi.</div>
    </section>
  );
}
