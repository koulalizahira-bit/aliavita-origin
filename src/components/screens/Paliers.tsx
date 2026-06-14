"use client";
import { useApp } from "../AppContext";
import { MODES, HABIL, PALIERSV } from "@/lib/parcours";
import { jget, jset, pkey } from "@/lib/store";

interface PlData {
  doublure: Record<string, string>;
  habil: Record<string, boolean>;
  paliers: Record<string, boolean>;
}
const empty: PlData = { doublure: {}, habil: {}, paliers: {} };

export default function Paliers() {
  const { profile, rev, reload } = useApp();

  if (!profile || !MODES[profile.mode].paliers) {
    return (
      <section className="page">
        <span className="eyebrow">Montée en autonomie</span>
        <h2 className="title">Paliers, doublure &amp; habilitations</h2>
        <div className="notice info"><span>ℹ️</span><div>Section réservée aux nouveaux arrivants (IDE et AS).</div></div>
      </section>
    );
  }

  const cfg = MODES[profile.mode];
  const key = pkey(profile.id, "paliers");
  const d = jget<PlData>(key, empty);
  void rev;

  function setPath(group: keyof PlData, field: string, val: string | boolean) {
    const cur = jget<PlData>(key, empty);
    (cur[group] as Record<string, unknown>)[field] = val;
    jset(key, cur);
    reload();
  }

  const Check = ({ group, k, lbl }: { group: keyof PlData; k: string; lbl: string }) => (
    <label className="item" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <span className="lbl" style={{ flex: 1, margin: 0 }}>{lbl}</span>
      <input type="checkbox" style={{ width: 20, height: 20 }}
        checked={!!(d[group] as Record<string, boolean>)[k]}
        onChange={(e) => setPath(group, k, e.target.checked)} />
    </label>
  );

  return (
    <section className="page">
      <span className="eyebrow">Montée en autonomie</span>
      <h2 className="title">Paliers, doublure &amp; habilitations</h2>
      <p className="lead">La doublure (compagnonnage), les habilitations, et les paliers validés par le tuteur jusqu&apos;au feu vert.</p>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 className="sub" style={{ marginTop: 0 }}><span className="dot" />Doublure (compagnonnage)</h3>
        <p style={{ fontSize: ".85rem", color: "#6b7d7b", marginBottom: 8 }}>Jour : cible indicative <b>{cfg.doubTarget} gardes de 12 h</b>, rajout possible. Nuit : selon l&apos;agent.</p>
        <div className="grid g2">
          <div className="field"><label>Doublure jour — début</label><input type="date" value={d.doublure.dj1 || ""} onChange={(e) => setPath("doublure", "dj1", e.target.value)} /></div>
          <div className="field"><label>Doublure jour — fin</label><input type="date" value={d.doublure.dj2 || ""} onChange={(e) => setPath("doublure", "dj2", e.target.value)} /></div>
        </div>
        <div className="field"><label>Nombre de gardes de jour en doublure (cible {cfg.doubTarget}, + si besoin)</label><input type="number" min={0} value={d.doublure.nb || ""} onChange={(e) => setPath("doublure", "nb", e.target.value)} /></div>
        <div className="grid g2">
          <div className="field"><label>Doublure nuit — début</label><input type="date" value={d.doublure.dn1 || ""} onChange={(e) => setPath("doublure", "dn1", e.target.value)} /></div>
          <div className="field"><label>Doublure nuit — fin</label><input type="date" value={d.doublure.dn2 || ""} onChange={(e) => setPath("doublure", "dn2", e.target.value)} /></div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 className="sub" style={{ marginTop: 0 }}><span className="dot" />Habilitations &amp; prérequis</h3>
        <div className="items" style={{ border: "1px solid var(--line)", borderRadius: 12 }}>
          {HABIL.map(([k, lbl]) => <Check key={k} group="habil" k={k} lbl={lbl} />)}
        </div>
      </div>

      <div className="card">
        <h3 className="sub" style={{ marginTop: 0 }}><span className="dot" />Paliers validés par le tuteur</h3>
        <div className="items" style={{ border: "1px solid var(--line)", borderRadius: 12 }}>
          {PALIERSV.map(([k, lbl]) => <Check key={k} group="paliers" k={k} lbl={lbl} />)}
        </div>
      </div>
    </section>
  );
}
