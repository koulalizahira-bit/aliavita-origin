"use client";
import { Printer } from "lucide-react";
import { useApp } from "../AppContext";
import { MODES } from "@/lib/parcours";
import { SHIFTS } from "@/lib/accueil";
import { jget, jset, pkey } from "@/lib/store";

interface PlanData { days: Record<string, string>; }
const COLOR: Record<string, string> = {
  repos: "var(--mint-2)", j12: "#fdeccb", n12: "#e0e9f8", m7: "#d8f0e6", s7: "#ffe7e2",
};
const CYCLE = ["", "j12", "n12", "m7", "s7", "repos"];
const SHORT: Record<string, string> = Object.fromEntries(SHIFTS.map((s) => [s.key, s.court]));
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const JLT = ["L", "M", "M", "J", "V", "S", "D"];

function ymd(d: Date) { return d.toISOString().slice(0, 10); }

// forceUnlocked = true dans la vue tuteur : les cases sont cliquables sans code
export default function Planning({ forceUnlocked = false }: { forceUnlocked?: boolean }) {
  const { profile, rev, reload } = useApp();
  void rev;

  const etu = profile && MODES[profile.mode] && profile.mode.indexOf("etu") > -1;
  if (!profile || !etu) {
    return (
      <section className="page">
        <span className="eyebrow">Mes horaires</span>
        <h2 className="title">Mon planning</h2>
        <div className="notice info"><span>ℹ️</span><div>Le planning prévisionnel est disponible pour les <b>étudiants en stage</b>.{!forceUnlocked && " Sélectionnez un profil étudiant dans « Accueil »."}{forceUnlocked && " Sélectionnez un étudiant dans « Étudiant suivi »."}</div></div>
      </section>
    );
  }

  const key = pkey(profile.id, "planning");
  const data = jget<PlanData>(key, { days: {} });

  function cycle(dateStr: string) {
    if (!forceUnlocked) return;
    const cur = jget<PlanData>(key, { days: {} });
    const v = cur.days[dateStr] || "";
    const next = CYCLE[(CYCLE.indexOf(v) + 1) % CYCLE.length];
    if (next) cur.days[dateStr] = next; else delete cur.days[dateStr];
    jset(key, cur);
    reload();
  }

  if (!profile.debut || !profile.fin) {
    return (
      <section className="page">
        <span className="eyebrow">Mes horaires</span>
        <h2 className="title">Mon planning de stage</h2>
        <div className="notice"><span>📅</span><div>Renseignez les <b>dates de début et de fin de stage</b> dans le profil pour générer le planning.</div></div>
      </section>
    );
  }

  const start = new Date(profile.debut);
  const end   = new Date(profile.fin);
  const months: { y: number; m: number }[] = [];
  const c = new Date(start.getFullYear(), start.getMonth(), 1);
  const last = new Date(end.getFullYear(), end.getMonth(), 1);
  let guard = 0;
  while (c <= last && guard < 36) { months.push({ y: c.getFullYear(), m: c.getMonth() }); c.setMonth(c.getMonth() + 1); guard++; }

  const cell = (dateStr: string | null, dayNum: number | null, inStage: boolean) => {
    if (!dateStr) return <div key={Math.random()} style={{ aspectRatio: "1", borderRadius: 8 }} />;
    const sh = data.days[dateStr] || "";
    return (
      <button key={dateStr} onClick={() => cycle(dateStr)} disabled={!forceUnlocked || !inStage}
        style={{
          aspectRatio: "1", borderRadius: 9, border: "1px solid var(--line)",
          background: sh ? COLOR[sh] : (inStage ? "#fff" : "#f4f1ea"),
          opacity: inStage ? 1 : .45, padding: 2,
          cursor: forceUnlocked && inStage ? "pointer" : "default",
          display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "inherit",
        }}>
        <span style={{ fontSize: ".62rem", color: "var(--petrol-soft)", fontWeight: 700, alignSelf: "flex-start", paddingLeft: 2 }}>{dayNum}</span>
        {sh && <span style={{ fontSize: ".58rem", fontWeight: 800, color: "var(--petrol-deep)", lineHeight: 1, paddingBottom: 2 }}>{SHORT[sh]}</span>}
      </button>
    );
  };

  return (
    <section className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
        <div>
          <span className="eyebrow">Mes horaires</span>
          <h2 className="title" style={{ marginBottom: 4 }}>Mon planning de stage</h2>
        </div>
        <button
          className="btn no-print"
          onClick={() => window.print()}
          style={{ marginTop: 10, flexShrink: 0, display: "flex", alignItems: "center", gap: 6, fontSize: ".85rem" }}
        >
          <Printer size={15} /> Imprimer
        </button>
      </div>

      {forceUnlocked ? (
        <p className="lead">Cliquez sur un jour pour renseigner le poste. Les modifications sont visibles immédiatement dans l&apos;espace de l&apos;étudiant.</p>
      ) : (
        <p className="lead">Votre planning établi par votre tuteur. Consultez-le et imprimez-le en PDF.</p>
      )}

      {months.map(({ y, m }) => {
        const first = new Date(y, m, 1);
        const startCol = (first.getDay() + 6) % 7;
        const nb = new Date(y, m + 1, 0).getDate();
        const cells: React.ReactNode[] = [];
        for (let i = 0; i < startCol; i++) cells.push(cell(null, null, false));
        for (let day = 1; day <= nb; day++) {
          const dt = new Date(y, m, day);
          const ds = ymd(dt);
          const inStage = dt >= new Date(start.getFullYear(), start.getMonth(), start.getDate()) && dt <= new Date(end.getFullYear(), end.getMonth(), end.getDate());
          cells.push(cell(ds, day, inStage));
        }
        return (
          <div className="card" key={y + "-" + m} style={{ marginBottom: 14, padding: 14 }}>
            <h3 className="sub" style={{ margin: "0 0 10px" }}><span className="dot" />{MOIS[m]} {y}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 4 }}>
              {JLT.map((j, i) => <div key={i} style={{ textAlign: "center", fontSize: ".66rem", fontWeight: 700, color: "var(--petrol-soft)" }}>{j}</div>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>{cells}</div>
          </div>
        );
      })}

      <h3 className="sub"><span className="dot" />Légende</h3>
      <div className="card">
        {SHIFTS.filter((s) => s.key !== "repos").map((s) => (
          <div className="info-row" key={s.key}>
            <span className="chip" style={{ background: COLOR[s.key], color: "var(--petrol-deep)", minWidth: 64, justifyContent: "center" }}>{s.court}</span>
            <span>{s.label}</span>
          </div>
        ))}
        <div className="info-row"><span className="chip" style={{ background: COLOR.repos, color: "var(--petrol-deep)", minWidth: 64, justifyContent: "center" }}>Repos</span><span>Jour de repos</span></div>
      </div>
    </section>
  );
}
