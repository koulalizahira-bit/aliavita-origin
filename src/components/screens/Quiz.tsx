"use client";
import { useState, useEffect, useCallback } from "react";
import { useApp } from "../AppContext";
import { MODES } from "@/lib/parcours";
import { QUIZ_IDE, QUIZ_AS, type QItem } from "@/lib/clinical";
import { jget, jset, pkey } from "@/lib/store";

export default function Quiz() {
  const { profile } = useApp();
  const bank: QItem[] = profile && MODES[profile.mode].prof === "as" ? QUIZ_AS : QUIZ_IDE;

  const [order, setOrder] = useState<number[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const start = useCallback(() => {
    const o = bank.map((_, i) => i).sort(() => Math.random() - 0.5).slice(0, 10);
    setOrder(o); setIdx(0); setScore(0); setPicked(null); setDone(false);
  }, [bank]);

  useEffect(() => { start(); }, [start]);

  if (!order.length) return <section className="page"><h2 className="title">Le défi du jour</h2></section>;

  const q = bank[order[idx]];

  function answer(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.a) setScore((s) => s + 1);
  }
  function next() {
    if (idx + 1 < order.length) { setIdx(idx + 1); setPicked(null); }
    else {
      setDone(true);
      if (profile) {
        const best = jget<{ best: number }>(pkey(profile.id, "quiz"), { best: 0 });
        if (score > best.best) jset(pkey(profile.id, "quiz"), { best: score });
      }
    }
  }

  const pct = Math.round((score / order.length) * 100);
  const endMsg = pct >= 90 ? "Excellent 🏆" : pct >= 70 ? "Très bien 💪" : pct >= 50 ? "On consolide 📖" : "Reprends les fiches 🌱";

  return (
    <section className="page">
      <span className="eyebrow">Testez-vous sans pression</span>
      <h2 className="title">Le défi du jour</h2>
      <p className="lead">10 questions tirées au sort. Votre meilleur score est gardé dans votre profil.</p>

      <div className="q-card">
        {!done ? (
          <>
            <div className="q-meta"><span>Question {idx + 1} / {order.length}</span><span>Score : {score}</span></div>
            <div className="scorebar"><i style={{ width: (idx / order.length * 100) + "%" }} /></div>
            <div className="q-text">{q.q}</div>
            <div>
              {q.o.map((opt, i) => {
                let cls = "opt";
                if (picked !== null) {
                  if (i === q.a) cls += " correct";
                  else if (i === picked) cls += " wrong";
                }
                return <button key={i} className={cls} disabled={picked !== null} onClick={() => answer(i)}>{opt}</button>;
              })}
            </div>
            {picked !== null && <div className="q-explain">{picked === q.a ? "✅ " : "💡 "}{q.e}</div>}
            {picked !== null && (
              <div style={{ marginTop: 14, display: "flex", gap: 9, flexWrap: "wrap" }}>
                <button className="btn" onClick={next}>{idx + 1 < order.length ? "Suivant →" : "Voir mon score 🎉"}</button>
                <button className="btn ghost" onClick={start}>Recommencer</button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="q-meta"><span>Résultat</span><span>Score : {score}</span></div>
            <div className="scorebar"><i style={{ width: "100%" }} /></div>
            <div className="q-text">Terminé : {score} / {order.length}</div>
            <p style={{ fontSize: "1.05rem", color: "var(--petrol-deep)", fontWeight: 600 }}>{endMsg}</p>
            <button className="btn ghost" onClick={start}>Recommencer</button>
          </>
        )}
      </div>
    </section>
  );
}
