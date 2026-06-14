"use client";
import { ANN } from "@/lib/content";

export default function Contacts() {
  return (
    <section className="page">
      <span className="eyebrow">Annuaire</span>
      <h2 className="title">Contacts utiles</h2>
      <p className="lead">Tous les numéros du service et des partenaires, par catégorie.</p>
      <div className="notice"><span>📞</span><div><b>SAMU 15 / Pompiers 18</b> : depuis un <b>poste fixe de l&apos;établissement</b>.</div></div>
      {ANN.map(([cat, nums]) => (
        <details className="fiche" key={cat}>
          <summary><span className="em">{cat.split(" ")[0]}</span>{cat.replace(/^\S+\s/, "")}</summary>
          <div className="fiche-body" style={{ paddingTop: 6 }}>
            {nums.map((n) => <div className="pill-num" key={n[0]}><span>{n[0]}</span><b>{n[1]}</b></div>)}
          </div>
        </details>
      ))}
    </section>
  );
}
