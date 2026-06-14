"use client";
import { useApp } from "../AppContext";
import { MODES, PARCOURS_BY_MODE, STATES } from "@/lib/parcours";
import { jget, pkey } from "@/lib/store";
import type { ItemStatus } from "@/lib/types";

interface Bilan { date?: string; pos?: string; axes?: string; obj?: string; avis?: string; }
interface ObjData { date?: string; niveau?: string; acquis?: string; besoins?: string; objectifs?: string; }

export default function Dossier() {
  const { profile, rev } = useApp();
  void rev;

  if (!profile) {
    return (
      <section className="page">
        <span className="eyebrow">À imprimer</span>
        <h2 className="title">Mon dossier (PDF)</h2>
        <div className="notice rgpd"><span>👤</span><div>Sélectionnez d&apos;abord votre profil dans « Accueil ».</div></div>
      </section>
    );
  }

  const cfg = MODES[profile.mode];
  const parc = PARCOURS_BY_MODE[profile.mode] || [];
  const pdata = jget<Record<string, ItemStatus>>(pkey(profile.id, "parcours"), {});
  const tdata = jget<Record<string, Bilan>>(pkey(profile.id, "tuteur"), {});
  const obj = jget<ObjData>(pkey(profile.id, "objectifs"), {});
  const titre = profile.mode.indexOf("na") > -1 ? "Bilan de période d'intégration" : "Bilan de stage";

  return (
    <section className="page">
      <span className="eyebrow">À imprimer</span>
      <h2 className="title">Mon dossier (PDF)</h2>
      <p className="lead">Un document unique regroupant l&apos;identité, le parcours complet (auto-évaluation + tuteur) et les bilans. Cliquez sur Imprimer puis « Enregistrer en PDF ».</p>

      <div className="notice info"><span>📄</span><div>Le dossier reprend tout ce qui est rempli dans « Mon parcours », « Objectifs &amp; éval » et « Bilans ».</div></div>
      <button className="btn" onClick={() => window.print()}>🖨️ Imprimer / Enregistrer en PDF</button>

      {/* Aperçu + zone d'impression */}
      <div className="print-zone" style={{ marginTop: 18, position: "static", display: "block" }}>
        <h1 style={{ fontSize: 22 }}>{titre} — {cfg.label}</h1>
        <p>Unité de Soins Intensifs · usage interne</p>
        <p>
          <b>{profile.mode.indexOf("etu") > -1 ? "Étudiant·e" : "Agent"} :</b> {profile.nom}{profile.ifsi ? " — " + profile.ifsi : ""}{cfg.sem && profile.sem ? " · " + profile.sem : ""}<br />
          <b>Période :</b> {profile.debut || "…"} → {profile.fin || "…"}<br />
          <b>Tuteur·rice(s) :</b> {[profile.t1, profile.t2].filter(Boolean).join(" · ") || "—"}
        </p>

        {(obj.niveau || obj.objectifs || obj.besoins) && (
          <>
            <h3 style={{ color: "#0a4347" }}>Objectifs &amp; évaluation initiale{obj.date ? " — " + obj.date : ""}</h3>
            {obj.niveau && <p><b>Niveau à l&apos;arrivée :</b> {obj.niveau}</p>}
            {obj.acquis && <p><b>Points d&apos;appui :</b> {obj.acquis}</p>}
            {obj.besoins && <p><b>Besoins :</b> {obj.besoins}</p>}
            {obj.objectifs && <p><b>Objectifs :</b> {obj.objectifs}</p>}
          </>
        )}

        <h3 style={{ color: "#0a4347" }}>Cartographie des compétences</h3>
        <table border={1} cellPadding={5} style={{ borderCollapse: "collapse", width: "100%", fontSize: 12 }}>
          <thead><tr style={{ background: "#0e5e63", color: "#fff" }}><th align="left">Domaine / compétence</th><th>Auto-éval</th><th>Tuteur</th></tr></thead>
          <tbody>
            {parc.map((blk, bi) => (
              <RowGroup key={bi} title={blk.cat}>
                {blk.items.map((it, ii) => {
                  const s = pdata[bi + "_" + ii] || { a: 0, t: 0 };
                  return <tr key={ii}><td>{it.texte} ({cfg.echlbl[it.ech]})</td><td align="center">{STATES[s.a]}</td><td align="center">{STATES[s.t]}</td></tr>;
                })}
              </RowGroup>
            ))}
          </tbody>
        </table>

        <h3 style={{ color: "#0a4347" }}>Bilans</h3>
        {cfg.bilans.map(([k, lbl]) => {
          const b = tdata[k] || {};
          return (
            <div key={k} style={{ marginBottom: 8 }}>
              <p style={{ fontWeight: 700 }}>{lbl}{b.date ? " — " + b.date : ""}</p>
              <p><b>Points positifs :</b> {b.pos || "—"}</p>
              <p><b>Axes :</b> {b.axes || "—"}</p>
              <p><b>Objectifs réajustés :</b> {b.obj || "—"}</p>
              {cfg.paliers && <p><b>Avis / décision :</b> {b.avis || "—"}</p>}
            </div>
          );
        })}

        <p style={{ marginTop: 20 }}>Date : ____ / ____ / ________ · Signature : __________ · Signature tuteur : __________</p>
      </div>
    </section>
  );
}

function RowGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <tr><td colSpan={3} style={{ background: "#eaf7f2", fontWeight: 700 }}>{title}</td></tr>
      {children}
    </>
  );
}
