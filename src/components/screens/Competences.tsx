"use client";
import { useApp } from "../AppContext";
import { MODES } from "@/lib/parcours";
import { COMP_IDE, COMP_AS } from "@/lib/clinical";

export default function Competences() {
  const { profile } = useApp();
  const prof = profile ? MODES[profile.mode].prof : "ide";
  const ide = prof === "ide";
  const arr = ide ? COMP_IDE : COMP_AS;

  return (
    <section className="page">
      <span className="eyebrow">Cadre de référence</span>
      <h2 className="title">{ide ? "Les 10 compétences infirmières" : "Référentiel AS — 5 blocs / 11 compétences"}</h2>
      <p className="lead">{ide
        ? "Le référentiel sur lequel repose l'évaluation de stage — avec, pour chacune, ce que ça donne chez nous."
        : "Cadre métier de l'aide-soignant (en collaboration avec l'IDE) — avec ce que ça donne chez nous."}</p>
      <div className="notice rgpd"><span>📅</span><div>{ide
        ? <>Le décret n° 2025-1306 et le nouveau référentiel (arrêté du 20 fév. 2026) s&apos;appliquent à la rentrée de septembre 2026.</>
        : <>Référentiel en vigueur : <b>arrêté du 10 juin 2021</b> (a remplacé celui de 2005). Formation d&apos;actualisation pour les AS diplômés avant 2021 (arrêté du 26 fév. 2025).</>}</div></div>

      {arr.map((c) => (
        <details className="fiche" key={c.code}>
          <summary><span className="em">{ide ? "🔟" : "🧩"}</span><span>{c.code} — {c.titre}</span></summary>
          <div className="fiche-body">
            <div className="grp"><h4>Chez nous, concrètement</h4><p style={{ fontSize: ".9rem" }}>{c.chez}</p></div>
            <div className="grp"><h4>Ce qui est évalué</h4><p style={{ fontSize: ".86rem", color: "#3c5654" }}>{c.eval}</p></div>
          </div>
        </details>
      ))}
    </section>
  );
}
