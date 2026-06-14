"use client";
import { useApp } from "../AppContext";
import { PREMIERS_JOURS } from "@/lib/accueil";
import { jget, jset, pkey } from "@/lib/store";

type Checked = Record<string, boolean>;

export default function PremiersJours() {
  const { profile, rev, reload } = useApp();
  const key = profile ? pkey(profile.id, "arrivee") : "usic_guest_arrivee";
  const data = jget<Checked>(key, {});
  void rev;

  function toggle(id: string, v: boolean) {
    const d = jget<Checked>(key, {});
    d[id] = v;
    jset(key, d);
    reload();
  }

  let total = 0, done = 0;
  PREMIERS_JOURS.forEach((g, gi) => g.items.forEach((_, ii) => { total++; if (data[gi + "_" + ii]) done++; }));
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <section className="page">
      <span className="eyebrow">Bien démarrer</span>
      <h2 className="title">Ma check-list d&apos;arrivée</h2>
      <p className="lead">Les premières choses à faire et à repérer. Cochez au fur et à mesure — pas de pression, tout ne se fait pas le premier jour.</p>

      {!profile && <div className="notice info"><span>ℹ️</span><div>Astuce : créez votre <b>profil</b> dans « Bienvenue » pour que cette check-list soit enregistrée avec votre carnet.</div></div>}

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
          <b style={{ color: "var(--petrol-deep)", fontFamily: "var(--font-bricolage)" }}>{done} / {total} faits</b>
          <span style={{ color: "var(--petrol-soft)", fontWeight: 600 }}>{pct}%</span>
        </div>
        <div className="scorebar"><i style={{ width: pct + "%" }} /></div>
      </div>

      {PREMIERS_JOURS.map((g, gi) => (
        <details className="block" key={gi} open>
          <summary>{g.emoji} {g.titre}</summary>
          <div className="items">
            {g.items.map((it, ii) => {
              const id = gi + "_" + ii;
              return (
                <label className="item" key={ii} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <input type="checkbox" style={{ width: 20, height: 20, flex: "none" }} checked={!!data[id]} onChange={(e) => toggle(id, e.target.checked)} />
                  <span className="lbl" style={{ flex: 1, margin: 0, textDecoration: data[id] ? "line-through" : "none", color: data[id] ? "var(--petrol-soft)" : undefined }}>{it}</span>
                </label>
              );
            })}
          </div>
        </details>
      ))}
    </section>
  );
}
