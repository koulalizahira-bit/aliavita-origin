"use client";
import { useApp } from "../AppContext";
import { jget, jset, pkey } from "@/lib/store";

interface ObjData { date?: string; niveau?: string; acquis?: string; besoins?: string; objectifs?: string; }

export default function Objectifs() {
  const { profile, rev, reload } = useApp();

  if (!profile) {
    return (
      <section className="page">
        <span className="eyebrow">Au démarrage</span>
        <h2 className="title">Objectifs &amp; évaluation initiale</h2>
        <div className="notice rgpd"><span>👤</span><div>Sélectionnez d&apos;abord le profil dans « Accueil ».</div></div>
      </section>
    );
  }

  const key = pkey(profile.id, "objectifs");
  const d = jget<ObjData>(key, {});
  void rev;

  function set(f: keyof ObjData, v: string) {
    const cur = jget<ObjData>(key, {});
    cur[f] = v;
    jset(key, cur);
    reload();
  }

  return (
    <section className="page">
      <span className="eyebrow">Au démarrage</span>
      <h2 className="title">Objectifs &amp; évaluation initiale</h2>
      <p className="lead">Le point de départ, fait avec le tuteur lors des premiers jours : niveau, attentes et objectifs du stage. Les bilans périodiques se remplissent dans « Bilans ».</p>

      <div className="card">
        <div className="field"><label>Date du point d&apos;accueil</label><input type="date" defaultValue={d.date || ""} onChange={(e) => set("date", e.target.value)} /></div>
        <div className="field"><label>Niveau / expérience à l&apos;arrivée</label><textarea defaultValue={d.niveau || ""} onBlur={(e) => set("niveau", e.target.value)} placeholder="Ce que la personne sait déjà faire, son parcours…" /></div>
        <div className="field"><label>Points d&apos;appui</label><textarea defaultValue={d.acquis || ""} onBlur={(e) => set("acquis", e.target.value)} /></div>
        <div className="field"><label>Besoins d&apos;apprentissage identifiés</label><textarea defaultValue={d.besoins || ""} onBlur={(e) => set("besoins", e.target.value)} /></div>
        <div className="field"><label>Objectifs du stage / de l&apos;intégration</label><textarea defaultValue={d.objectifs || ""} onBlur={(e) => set("objectifs", e.target.value)} /></div>
      </div>
    </section>
  );
}
