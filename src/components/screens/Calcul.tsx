"use client";
import { useState } from "react";
import { CAS } from "@/lib/clinical";

const num = (v: string) => { const n = parseFloat(v); return isNaN(n) ? null : n; };
const fmt = (n: number) => (Number.isInteger(n) ? n : Math.round(n * 100) / 100);

function Outils() {
  const [dVol, setDVol] = useState(""); const [dH, setDH] = useState("");
  const [gVol, setGVol] = useState(""); const [gH, setGH] = useState(""); const [gFac, setGFac] = useState("20");
  const [ivD, setIvD] = useState(""); const [ivC, setIvC] = useState("");
  const [pD, setPD] = useState(""); const [pP, setPP] = useState("");
  const [gaD, setGaD] = useState(""); const [gaP, setGaP] = useState(""); const [gaC, setGaC] = useState("");

  const debit = (() => { const v = num(dVol), h = num(dH); return v != null && h ? fmt(v / h) + " mL/h" : "— mL/h"; })();
  const gtt = (() => { const v = num(gVol), h = num(gH), f = num(gFac); return v != null && h && f ? fmt((v * f) / (h * 60)) + " gtt/min" : "— gtt/min"; })();
  const ivse = (() => { const d = num(ivD), c = num(ivC); return d != null && c ? fmt(d / c) + " mL/h" : "— mL/h"; })();
  const poso = (() => { const d = num(pD), p = num(pP); return d != null && p ? fmt(d * p) + " mg" : "— mg"; })();
  const gamma = (() => { const d = num(gaD), p = num(gaP), c = num(gaC); return d != null && p && c ? fmt((d * p * 60) / c) + " mL/h" : "— mL/h"; })();

  return (
    <div className="grid g2">
      <div className="card"><h4 style={{ color: "var(--petrol-deep)", marginBottom: 10 }}>Débit (mL/h)</h4>
        <div className="field"><label>Volume (mL)</label><input type="number" value={dVol} onChange={(e) => setDVol(e.target.value)} /></div>
        <div className="field"><label>Durée (h)</label><input type="number" step="0.1" value={dH} onChange={(e) => setDH(e.target.value)} /></div>
        <div className="result"><small>Débit</small><div className="big">{debit}</div></div></div>
      <div className="card"><h4 style={{ color: "var(--petrol-deep)", marginBottom: 10 }}>Gouttes/min</h4>
        <div className="field"><label>Volume (mL)</label><input type="number" value={gVol} onChange={(e) => setGVol(e.target.value)} /></div>
        <div className="field"><label>Durée (h)</label><input type="number" step="0.1" value={gH} onChange={(e) => setGH(e.target.value)} /></div>
        <div className="field"><label>Perfuseur</label><select value={gFac} onChange={(e) => setGFac(e.target.value)}><option value="20">Classique 20</option><option value="15">Transfuseur 15</option><option value="60">Précision 60</option></select></div>
        <div className="result"><small>Vitesse</small><div className="big">{gtt}</div></div></div>
      <div className="card"><h4 style={{ color: "var(--petrol-deep)", marginBottom: 10 }}>Pousse-seringue (mL/h)</h4>
        <div className="field"><label>Dose prescrite (/h)</label><input type="number" step="0.01" value={ivD} onChange={(e) => setIvD(e.target.value)} /></div>
        <div className="field"><label>Concentration (/mL)</label><input type="number" step="0.01" value={ivC} onChange={(e) => setIvC(e.target.value)} /></div>
        <div className="result"><small>Débit</small><div className="big">{ivse}</div></div></div>
      <div className="card"><h4 style={{ color: "var(--petrol-deep)", marginBottom: 10 }}>Posologie mg/kg</h4>
        <div className="field"><label>Posologie (mg/kg)</label><input type="number" step="0.01" value={pD} onChange={(e) => setPD(e.target.value)} /></div>
        <div className="field"><label>Poids (kg)</label><input type="number" value={pP} onChange={(e) => setPP(e.target.value)} /></div>
        <div className="result"><small>Dose totale</small><div className="big">{poso}</div></div></div>
      <div className="card"><h4 style={{ color: "var(--petrol-deep)", marginBottom: 10 }}>Catécholamines (γ/kg/min)</h4>
        <p style={{ fontSize: ".82rem", color: "#6b7d7b", marginBottom: 8 }}>MHR — entraînement ; le débit suit la prescription.</p>
        <div className="field"><label>Dose (γ/kg/min)</label><input type="number" step="0.01" value={gaD} onChange={(e) => setGaD(e.target.value)} /></div>
        <div className="field"><label>Poids (kg)</label><input type="number" value={gaP} onChange={(e) => setGaP(e.target.value)} /></div>
        <div className="field"><label>Concentration (µg/mL)</label><input type="number" value={gaC} onChange={(e) => setGaC(e.target.value)} /></div>
        <div className="result"><small>Débit</small><div className="big">{gamma}</div></div></div>
    </div>
  );
}

function Train() {
  const [q, setQ] = useState("Génère un exercice 👇");
  const [w, setW] = useState<number | null>(null);
  const [ans, setAns] = useState("");
  const [fb, setFb] = useState<{ ok: boolean; txt: string } | null>(null);
  const [score, setScore] = useState(0);

  function neu() {
    const t = Math.floor(Math.random() * 4);
    let nq = "", nw = 0;
    const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
    if (t === 0) { const v = pick([250, 500, 1000]), h = pick([2, 4, 6, 8]); nq = `Passer ${v} mL en ${h} h → débit (mL/h) ?`; nw = fmt(v / h); }
    else if (t === 1) { const v = pick([500, 1000]), h = pick([6, 8, 12]); nq = `${v} mL en ${h} h, 20 gtt/mL → gouttes/min ?`; nw = fmt((v * 20) / (h * 60)); }
    else if (t === 2) { const dose = pick([2, 4, 6]), conc = pick([1, 2, 4]); nq = `PSE : ${dose} mg/h, concentration ${conc} mg/mL → mL/h ?`; nw = fmt(dose / conc); }
    else { const d = pick([0.1, 0.2, 0.5]), p = pick([60, 70, 80]), c = pick([200, 500]); nq = `Catécholamine : ${d} γ/kg/min, ${p} kg, ${c} µg/mL → mL/h ?`; nw = fmt((d * p * 60) / c); }
    setQ(nq); setW(nw); setAns(""); setFb(null);
  }
  function check() {
    const a = num(ans);
    if (a == null || w == null) return;
    const ok = Math.abs(a - w) <= Math.max(0.1, w * 0.02);
    if (ok) setScore((s) => s + 1);
    setFb({ ok, txt: ok ? `✅ Exact : ${w}.` : `❌ Réponse : ${w}.` });
  }

  return (
    <div className="q-card">
      <div className="q-meta"><span>Mode entraînement</span><span>Réussis : {score}</span></div>
      <div className="q-text" dangerouslySetInnerHTML={{ __html: q }} />
      <div className="field"><label>Votre réponse</label><input type="number" step="0.01" value={ans} onChange={(e) => setAns(e.target.value)} /></div>
      <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
        <button className="btn" onClick={check}>Vérifier</button>
        <button className="btn ghost" onClick={neu}>Nouvel exercice</button>
      </div>
      {fb && <div className="q-explain" style={{ background: fb.ok ? "#e3f6ec" : "#fbe6e6" }} dangerouslySetInnerHTML={{ __html: fb.txt }} />}
    </div>
  );
}

export default function Calcul() {
  const [tab, setTab] = useState<"cas" | "memo" | "outils" | "train">("cas");
  return (
    <section className="page">
      <span className="eyebrow">D&apos;après le Livret 3 PECM</span>
      <h2 className="title">Calcul de dose</h2>
      <div className="notice"><span>⚠️</span><div><b>Entraînement uniquement.</b> Tout calcul est revérifié, confronté à la prescription et validé. <b>En cas de doute, on ne va jamais jusqu&apos;à l&apos;administration : on demande.</b></div></div>

      <div className="calc-nav">
        <button className={"calc-tab" + (tab === "cas" ? " on" : "")} onClick={() => setTab("cas")}>Cas concrets</button>
        <button className={"calc-tab" + (tab === "memo" ? " on" : "")} onClick={() => setTab("memo")}>Mémo &amp; conseils</button>
        <button className={"calc-tab" + (tab === "outils" ? " on" : "")} onClick={() => setTab("outils")}>Outils de calcul</button>
        <button className={"calc-tab" + (tab === "train" ? " on" : "")} onClick={() => setTab("train")}>🎯 Entraînement</button>
      </div>

      {tab === "cas" && (
        <div>
          <p style={{ fontSize: ".86rem", color: "#6b7d7b", marginBottom: 12 }}>Cas issus du Livret 3 « Les calculs de dose » — Commission PECM, CHU (réf. ECMD039).</p>
          {CAS.map((c) => (
            <details className="cas" key={c.t}>
              <summary>🧩 {c.t}<span style={{ fontWeight: 400, fontSize: ".8rem", color: "var(--petrol-soft)", fontFamily: "var(--font-hanken)" }}>{c.sub}</span></summary>
              <div className="body"><p>{c.en}</p><div className="sol"><b style={{ color: "var(--ok)" }}>Raisonnement</b><br /><span dangerouslySetInnerHTML={{ __html: c.sol }} /></div></div>
            </details>
          ))}
        </div>
      )}

      {tab === "memo" && (
        <div className="card">
          <h3 className="sub" style={{ marginTop: 0 }}><span className="dot" />Concentration</h3>
          <p style={{ fontSize: ".92rem" }}>Produit dosé à <b>x %</b> = <b>x g pour 100 mL</b> (ex. NaCl 0,9 % → 0,9 g/100 mL).</p>
          <h3 className="sub"><span className="dot" />Produit en croix</h3>
          <p style={{ fontSize: ".92rem" }}>y = (250 × 5) / 500 = 2,5 mL.</p>
          <h3 className="sub"><span className="dot" />Débit</h3>
          <p style={{ fontSize: ".92rem" }}><b>Débit = volume ÷ durée.</b> Perfusion en gouttes/min, PSE en mL/h. <span style={{ color: "var(--alert)" }}>≠ unité de prescription (souvent mg/h).</span></p>
          <h3 className="sub"><span className="dot" />Gouttes / mL</h3>
          <table className="normtab"><tbody><tr><th>Perfuseur</th><th>Gouttes / mL</th></tr><tr><td>Classique</td><td>20 gtt/mL</td></tr><tr><td>Transfuseur</td><td>15 gtt/mL</td></tr><tr><td>Précision</td><td>60 gtt/mL</td></tr></tbody></table>
          <h3 className="sub"><span className="dot" />Les bons réflexes</h3>
          <ul className="surv"><li>Lire la prescription jusqu&apos;au bout.</li><li>Estimer l&apos;ordre de grandeur avant de calculer.</li><li>Utiliser la calculatrice.</li><li>En cas de doute, ne jamais administrer.</li><li>Réfléchir à voix haute.</li></ul>
        </div>
      )}

      {tab === "outils" && <Outils />}
      {tab === "train" && <Train />}
    </section>
  );
}
