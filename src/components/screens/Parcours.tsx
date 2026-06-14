"use client";
import { useState } from "react";
import { useApp } from "../AppContext";
import { MODES, LEVELS, PARCOURS_BY_MODE, STATES, SEMNOTE } from "@/lib/parcours";
import { jget, jset, pkey } from "@/lib/store";
import type { ItemStatus } from "@/lib/types";

type PData = Record<string, ItemStatus>;

export default function Parcours() {
  const { profile, rev, reload } = useApp();
  const [curEch, setCurEch] = useState("all");

  if (!profile) {
    return (
      <section className="page">
        <span className="eyebrow">Ta progression</span>
        <h2 className="title">Mon parcours</h2>
        <div className="notice rgpd"><span>👤</span><div>Sélectionnez ou créez votre <b>profil</b> dans « Bienvenue ».</div></div>
      </section>
    );
  }

  const cfg = MODES[profile.mode];
  const parc = PARCOURS_BY_MODE[profile.mode] || [];
  const key = pkey(profile.id, "parcours");
  const data = jget<PData>(key, {});
  void rev;

  function setStatus(id: string, who: "a" | "t", v: number) {
    const d = jget<PData>(key, {});
    d[id] = d[id] || { a: 0, t: 0 };
    d[id][who] = v;
    jset(key, d);
    reload();
  }

  const ech = cfg.ech.includes(curEch) ? curEch : "all";

  // totaux
  let gA = 0, gT = 0, tot = 0;
  parc.forEach((blk, bi) => blk.items.forEach((_, ii) => {
    tot++;
    const s = data[bi + "_" + ii] || { a: 0, t: 0 };
    if (s.a === 3) gA++;
    if (s.t === 3) gT++;
  }));
  const pct = tot ? Math.round((gT / tot) * 100) : 0;
  const msg = pct === 0 ? "C'est parti !" : pct < 25 ? "Vous posez les bases 👏" : pct < 50 ? "Belle dynamique !" : pct < 75 ? "Vous prenez de l'assurance 💪" : pct < 100 ? "Bientôt validé !" : "Tout est acquis ! 🎉";

  const lv = LEVELS[profile.mode];
  const banner = lv ? (() => {
    const s = profile.sem || lv.options[0][0];
    const lab = (lv.options.find((o) => o[0] === s) || ["", s])[1];
    return <>{<b>Attendu — {lab} :</b>} {lv.banner[s] || ""}{profile.mode === "etu_ide" ? " " + SEMNOTE : ""}</>;
  })() : null;

  const Sel = ({ id, who, val }: { id: string; who: "a" | "t"; val: number }) => (
    <select value={val} onChange={(e) => setStatus(id, who, parseInt(e.target.value))}>
      {STATES.map((s, i) => <option key={i} value={i}>{s}</option>)}
    </select>
  );

  return (
    <section className="page">
      <span className="eyebrow">Ta progression — {cfg.label}</span>
      <h2 className="title">Mon parcours</h2>
      <p className="lead">Double regard : votre auto-évaluation et celle de votre tuteur, sur une échelle commune. L&apos;anneau reflète ce qui est <b>acquis selon le tuteur</b>.</p>

      {banner && <div className="notice info"><span>🎓</span><div>{banner}</div></div>}

      <div className="card">
        <div className="progress-head">
          <div className="ring" style={{ ["--p" as string]: pct }}>
            <div className="inner"><b>{pct}%</b><span>acquis tuteur</span></div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontFamily: "var(--font-bricolage)", fontSize: "1.15rem", color: "var(--petrol-deep)", marginBottom: 4 }}>{msg}</div>
            <div style={{ fontSize: ".9rem", color: "#3c5654" }}><span>{gT}</span> acquis (tuteur) · <span>{gA}</span> en auto-évaluation. Filtrez par jalon pour cibler.</div>
          </div>
        </div>
      </div>

      <div className="filters">
        <button className={"fbtn" + (ech === "all" ? " on" : "")} onClick={() => setCurEch("all")}>Tout</button>
        {cfg.ech.map((e) => <button key={e} className={"fbtn" + (ech === e ? " on" : "")} onClick={() => setCurEch(e)}>{cfg.echlbl[e]}</button>)}
      </div>

      {parc.map((blk, bi) => {
        const vis = blk.items.filter((it) => ech === "all" || it.ech === ech);
        if (!vis.length) return null;
        let acq = 0;
        blk.items.forEach((_, ii) => { if ((data[bi + "_" + ii] || {}).t === 3) acq++; });
        const early = cfg.sem && (profile.sem === "S3" || profile.sem === "S4");
        return (
          <details className="block" key={bi} open={ech !== "all"}>
            <summary>{blk.cat}<span className="mini">{acq}/{blk.items.length} acquis</span></summary>
            <div className="items">
              {blk.items.map((it, ii) => {
                if (ech !== "all" && it.ech !== ech) return null;
                const id = bi + "_" + ii;
                const st = data[id] || { a: 0, t: 0 };
                return (
                  <div className="item" key={ii}>
                    <div className="lbl">{it.texte}{" "}
                      <span className={"chip " + cfg.echbadge[it.ech]} style={{ marginLeft: 4 }}>{cfg.echlbl[it.ech]}</span>
                      {it.s5 && <span className="chip badge-s5"> dès S5</span>}
                      {it.s5 && early && <span style={{ fontSize: ".74rem", color: "#7b3fa0" }}> — non attendu avant S5</span>}
                    </div>
                    <div className="evrow">
                      <span className="evcol">🧑‍🎓 Moi <Sel id={id} who="a" val={st.a} /></span>
                      <span className="evcol">🧑‍🏫 Tuteur <Sel id={id} who="t" val={st.t} /></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </details>
        );
      })}
    </section>
  );
}
