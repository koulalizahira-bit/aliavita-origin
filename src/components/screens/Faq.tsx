"use client";
import { useState } from "react";
import { useApp } from "../AppContext";
import { FAQ as DEFAULT_FAQ, FAQ_NOTE, type FaqItem } from "@/lib/accueil";
import { jget, jset, staffUnlocked, unlockStaff, hasMaster } from "@/lib/store";

const KEY = "usic_faq";

export default function Faq() {
  const { rev, reload } = useApp();
  const list = jget<FaqItem[]>(KEY, DEFAULT_FAQ);
  const staff = staffUnlocked();
  void rev;

  const [nq, setNq] = useState("");
  const [nr, setNr] = useState("");

  function save(l: FaqItem[]) { jset(KEY, l); reload(); }
  function unlock() {
    if (!hasMaster()) { alert("Définissez d'abord un code cadre dans « Accueil » (bouton « Code cadre »)."); return; }
    const c = window.prompt("Code cadre pour modifier la FAQ :", "");
    if (c === null) return;
    if (unlockStaff(c)) reload(); else alert("Code incorrect.");
  }
  function add() {
    if (!nq.trim() || !nr.trim()) { alert("Renseignez la question et la réponse."); return; }
    const r = nr.split("\n").map((s) => s.trim()).filter(Boolean);
    save([...list, { q: nq.trim(), r }]);
    setNq(""); setNr("");
  }
  function remove(i: number) {
    if (!confirm("Supprimer cette question ?")) return;
    save(list.filter((_, j) => j !== i));
  }
  function reset() {
    if (!confirm("Réinitialiser la FAQ aux questions par défaut ?")) return;
    save(DEFAULT_FAQ);
  }

  return (
    <section className="page">
      <span className="eyebrow">Pas de panique</span>
      <h2 className="title">Je fais quoi si… ?</h2>
      <p className="lead">Les situations qui arrivent à tout le monde, et la conduite à tenir. En cas de doute, demandez toujours.</p>

      <div className="staffbar">
        <span>✏️</span>
        <div style={{ flex: 1 }}>{staff ? "Mode encadrant actif — vous pouvez ajouter ou retirer des questions." : "Le cadre / l'IDEC peut activer le mode encadrant pour modifier ces questions."}</div>
        {!staff && <button className="btn sm" onClick={unlock}>Mode encadrant</button>}
      </div>

      {list.map((f, i) => (
        <details className="fiche" key={i} open={i === 0}>
          <summary><span className="em">💬</span><span style={{ flex: 1 }}>{f.q}</span>{staff && <span role="button" onClick={(e) => { e.preventDefault(); remove(i); }} style={{ color: "var(--alert)", fontWeight: 700, padding: "0 6px" }}>🗑</span>}</summary>
          <div className="fiche-body"><ul className="surv">{f.r.map((line, j) => <li key={j}>{line}</li>)}</ul></div>
        </details>
      ))}

      {staff && (
        <div className="card" style={{ marginTop: 14 }}>
          <h3 className="sub" style={{ marginTop: 0 }}><span className="dot" />Ajouter une question</h3>
          <div className="field"><label>Question</label><input value={nq} onChange={(e) => setNq(e.target.value)} placeholder="Je fais quoi si… ?" /></div>
          <div className="field"><label>Réponse <span className="hint">(une idée par ligne)</span></label><textarea value={nr} onChange={(e) => setNr(e.target.value)} placeholder={"Première chose à faire…\nEnsuite…"} /></div>
          <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
            <button className="btn" onClick={add}>Ajouter</button>
            <button className="btn ghost" onClick={reset}>Réinitialiser par défaut</button>
          </div>
        </div>
      )}

      <div className="notice" style={{ marginTop: 16 }}><span>ℹ️</span><div>{FAQ_NOTE}</div></div>
    </section>
  );
}
