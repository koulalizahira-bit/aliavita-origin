"use client";
import { useApp } from "../AppContext";
import { MODES } from "@/lib/parcours";
import { jget, jset, pkey, updateProfile } from "@/lib/store";

interface Bilan { date?: string; pos?: string; axes?: string; obj?: string; avis?: string; }
type TData = Record<string, Bilan>;

export default function Tuteur() {
  const { profile, rev, reload } = useApp();

  if (!profile) {
    return (
      <section className="page">
        <span className="eyebrow">Réservé à l&apos;encadrement</span>
        <h2 className="title">Espace tuteur</h2>
        <div className="notice rgpd"><span>👤</span><div>Sélectionnez d&apos;abord le profil dans « Bienvenue ».</div></div>
      </section>
    );
  }

  const cfg = MODES[profile.mode];
  const key = pkey(profile.id, "tuteur");
  const data = jget<TData>(key, {});
  void rev;

  function setBilan(k: string, f: keyof Bilan, v: string) {
    const d = jget<TData>(key, {});
    d[k] = d[k] || {};
    d[k][f] = v;
    jset(key, d);
    reload();
  }

  return (
    <section className="page">
      <span className="eyebrow">Réservé à l&apos;encadrement</span>
      <h2 className="title">Espace tuteur</h2>
      <p className="lead">Retours qualitatifs aux temps clés. Les évaluations de compétences se font dans « Mon parcours » (colonne Tuteur).</p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="grid g2">
          <div className="field"><label>Tuteur·rice 1</label><input defaultValue={profile.t1 || ""} onBlur={(e) => { updateProfile(profile.id, { t1: e.target.value }); reload(); }} /></div>
          <div className="field"><label>Tuteur·rice 2</label><input defaultValue={profile.t2 || ""} onBlur={(e) => { updateProfile(profile.id, { t2: e.target.value }); reload(); }} /></div>
        </div>
      </div>

      {cfg.bilans.map(([k, lbl], idx) => {
        const b = data[k] || {};
        return (
          <details className="fiche" key={k} open={idx === 0}>
            <summary><span className="em">🗓️</span>{lbl}</summary>
            <div className="fiche-body">
              <div className="field"><label>Date</label><input type="date" defaultValue={b.date || ""} onChange={(e) => setBilan(k, "date", e.target.value)} /></div>
              <div className="field"><label>Points positifs</label><textarea defaultValue={b.pos || ""} onBlur={(e) => setBilan(k, "pos", e.target.value)} /></div>
              <div className="field"><label>Axes d&apos;amélioration</label><textarea defaultValue={b.axes || ""} onBlur={(e) => setBilan(k, "axes", e.target.value)} /></div>
              <div className="field"><label>Objectifs réajustés</label><textarea defaultValue={b.obj || ""} onBlur={(e) => setBilan(k, "obj", e.target.value)} /></div>
              {cfg.paliers && <div className="field"><label>Avis / décision (autonomie jour, feu vert nuit…)</label><textarea defaultValue={b.avis || ""} onBlur={(e) => setBilan(k, "avis", e.target.value)} /></div>}
            </div>
          </details>
        );
      })}
    </section>
  );
}
