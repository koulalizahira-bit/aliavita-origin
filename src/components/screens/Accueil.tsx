"use client";
import { useState } from "react";
import { ClipboardCheck, Target, Info, Phone, Stethoscope, HelpCircle } from "lucide-react";
import { useApp } from "../AppContext";
import { MODES, LEVELS } from "@/lib/parcours";
import { BIENVENUE, ECOLES } from "@/lib/content";
import type { ModeKey, Profile } from "@/lib/types";
import {
  setActiveId, createProfile, deleteProfile,
  tryUnlock, isUnlocked, initials, shortName, setMasterCode, master,
} from "@/lib/store";

export interface NavTarget { section: string; sub: string; }

export default function Accueil({ onNavigate }: { onNavigate?: (t: NavTarget) => void }) {
  const { profile, list, reload } = useApp();
  const cfg = MODES[profile?.mode || "etu_ide"];
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState<ModeKey>("etu_ide");
  const [nom, setNom] = useState("");
  const [ifsi, setIfsi] = useState("");
  const [autre, setAutre] = useState(false);
  const [sem, setSem] = useState("S3");
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");
  const [pin, setPin] = useState("");

  const lv = LEVELS[mode];
  const etu = mode.indexOf("etu") > -1;

  function onMode(m: ModeKey) {
    setMode(m);
    setAutre(false);
    setIfsi("");
    const l = LEVELS[m];
    if (l) setSem(l.options[0][0]);
  }
  function onEcole(v: string) {
    if (v === "__autre__") { setAutre(true); setIfsi(""); }
    else { setAutre(false); setIfsi(v); }
  }

  function openProfile(p: Profile) {
    if (!isUnlocked(p)) {
      const c = window.prompt("Profil protégé. Saisissez le code d'accès :", "");
      if (c === null) return;
      if (!tryUnlock(p, c)) { alert("Code incorrect."); return; }
    }
    setActiveId(p.id);
    reload();
  }
  function submit() {
    if (!nom.trim()) { alert("Indiquez un prénom et un nom."); return; }
    const p: Profile = {
      id: "p" + Date.now(), mode, nom: nom.trim(), ifsi: ifsi.trim(),
      sem, debut, fin, t1: t1.trim(), t2: t2.trim(), pin: pin.trim() || null,
    };
    createProfile(p);
    setNom(""); setIfsi(""); setAutre(false); setT1(""); setT2(""); setPin(""); setOpen(false);
    reload();
  }
  function remove(id: string) {
    if (!confirm("Supprimer ce profil et ses données ?")) return;
    deleteProfile(id); reload();
  }
  function masterBtn() {
    const cur = master();
    const v = window.prompt(cur ? "Modifier le code cadre (vide pour le retirer) :" : "Définir un code cadre (mode encadrant : planning, FAQ…) :", "");
    if (v === null) return;
    setMasterCode(v.trim() ? v.trim() : null);
    alert(v.trim() ? "Code cadre enregistré." : "Code cadre retiré.");
  }

  const tiles: { icon: React.ReactNode; title: string; sub: string; t: NavTarget }[] = [
    { icon: <ClipboardCheck size={20} />, title: "Premiers jours", sub: "Ma check-list d'arrivée", t: { section: "integration", sub: "premiers" } },
    { icon: <Target size={20} />, title: "Mon parcours", sub: "Compétences & progression", t: { section: "integration", sub: "parcours" } },
    { icon: <HelpCircle size={20} />, title: "Je fais quoi si…", sub: "Les bons réflexes", t: { section: "integration", sub: "faq" } },
    { icon: <Info size={20} />, title: "Infos pratiques", sub: "Tenue, accès, pause…", t: { section: "service", sub: "infos" } },
    { icon: <Phone size={20} />, title: "Contacts", sub: "Tout l'annuaire", t: { section: "service", sub: "contacts" } },
    { icon: <Stethoscope size={20} />, title: "Fiches & mémos", sub: "Surveillances, calcul…", t: { section: "memo", sub: "fiches" } },
  ];

  return (
    <section className="page">
      <div className="hero">
        <h1>{cfg.hero[0]}</h1>
        <p>{profile ? cfg.hero[1] : "Choisissez ou créez votre profil pour démarrer. Étudiants et nouveaux arrivants, IDE comme aides-soignants : chacun son carnet, chacun son mode."}</p>
        <div className="stats">
          <div className="stat"><b>35 lits</b><span>réa &amp; chirurgie</span></div>
          <div className="stat"><b>24h – 5 j</b><span>DMS selon l&apos;unité</span></div>
          <div className="stat"><b>2×12h</b><span>jour / nuit + relève</span></div>
          <div className="stat"><b>{cfg.stat4[0]}</b><span>{cfg.stat4[1]}</span></div>
        </div>
      </div>

      <h3 className="sub"><span className="dot" />Le mot de l&apos;équipe</h3>
      <div className="card" style={{ borderLeft: "4px solid var(--coral)" }}>
        <div style={{ fontFamily: "var(--font-bricolage)", fontSize: "1.2rem", color: "var(--petrol-deep)", marginBottom: 8 }}>{BIENVENUE.titre} 👋</div>
        {BIENVENUE.paragraphes.map((p, i) => <p key={i} style={{ fontSize: ".93rem", color: "#3c5654", marginBottom: 8 }}>{p}</p>)}
        <p style={{ fontSize: ".85rem", color: "var(--petrol-soft)", fontStyle: "italic", marginTop: 4 }}>— {BIENVENUE.signature}</p>
      </div>

      <h3 className="sub"><span className="dot" />Accès rapide</h3>
      <div className="tiles">
        {tiles.map((tl) => (
          <button className="tile" key={tl.title} onClick={() => onNavigate?.(tl.t)}>
            <span className="ti">{tl.icon}</span>
            <b>{tl.title}</b>
            <span>{tl.sub}</span>
          </button>
        ))}
      </div>

      <h3 className="sub"><span className="dot" />Qui êtes-vous ?</h3>
      <div className="card">
        <div className="notice rgpd"><span>🔒</span><div>Outil <b>à usage interne</b>. Les données restent <b>sur cet appareil</b>. Vous pouvez protéger un profil par un <b>code</b> (PIN) : seuls l&apos;intéressé·e et son tuteur (ou le code cadre) pourront l&apos;ouvrir.</div></div>

        {list.length === 0 && <p style={{ color: "#6b7d7b", fontSize: ".9rem" }}>Aucun profil. Créez le vôtre ci-dessous 👇</p>}
        {list.map((p) => {
          const active = profile?.id === p.id;
          return (
            <div key={p.id} className={"profcard" + (active ? " active" : "")}>
              <div className="av">{initials(p.nom)}</div>
              <div style={{ flex: 1 }}>
                <b style={{ color: "var(--petrol-deep)" }}>{shortName(p.nom)}{p.pin ? " 🔒" : ""}</b>
                <div style={{ fontSize: ".78rem", color: "var(--petrol-soft)" }}>{MODES[p.mode].label}{p.debut ? " · " + p.debut : ""}</div>
              </div>
              {active ? <span className="chip badge-s23">actif</span> : <button className="btn ghost sm" onClick={() => openProfile(p)}>Ouvrir</button>}
              <button className="btn ghost sm" style={{ padding: "6px 9px" }} onClick={() => remove(p.id)}>🗑</button>
            </div>
          );
        })}

        <details open={open} style={{ marginTop: 10 }}>
          <summary style={{ cursor: "pointer", fontWeight: 700, color: "var(--coral-deep)" }}
            onClick={(e) => { e.preventDefault(); setOpen(!open); }}>➕ Nouveau profil</summary>
          <div style={{ marginTop: 12 }}>
            <div className="field"><label>Mode (statut)</label>
              <select value={mode} onChange={(e) => onMode(e.target.value as ModeKey)}>
                <option value="etu_ide">Étudiant·e IDE (stage 10 sem.)</option>
                <option value="na_ide">Nouvel arrivant IDE (intégration 3 mois)</option>
                <option value="etu_as">Élève aide-soignant·e (stage 5 sem.)</option>
                <option value="na_as">Nouvel arrivant AS (intégration)</option>
              </select>
            </div>
            <div className="field"><label>Prénom et nom</label><input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="ex : Camille Durand" /></div>
            <div className="grid g2">
              {etu ? (
                <div className="field"><label>IFMS / école</label>
                  <select value={autre ? "__autre__" : ifsi} onChange={(e) => onEcole(e.target.value)}>
                    <option value="">— choisir —</option>
                    {ECOLES.map((e) => <option key={e} value={e}>{e}</option>)}
                    <option value="__autre__">Autre (à préciser)</option>
                  </select>
                  {autre && <input style={{ marginTop: 8 }} value={ifsi} onChange={(e) => setIfsi(e.target.value)} placeholder="Nom de l'école / IFMS" />}
                </div>
              ) : (
                <div className="field"><label>Poste / expérience antérieure</label><input value={ifsi} onChange={(e) => setIfsi(e.target.value)} placeholder="ex : ex-service de…" /></div>
              )}
              {lv && (
                <div className="field"><label>{lv.label}</label>
                  <select value={sem} onChange={(e) => setSem(e.target.value)}>
                    {lv.options.map((o) => <option key={o[0]} value={o[0]}>{o[1]}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div className="grid g2">
              <div className="field"><label>{etu ? "Début de stage" : "Date d'arrivée"}</label><input type="date" value={debut} onChange={(e) => setDebut(e.target.value)} /></div>
              <div className="field"><label>{etu ? "Fin de stage" : "Fin de période d'intégration (prév.)"}</label><input type="date" value={fin} onChange={(e) => setFin(e.target.value)} /></div>
            </div>
            <div className="grid g2">
              <div className="field"><label>Tuteur·rice 1</label><input value={t1} onChange={(e) => setT1(e.target.value)} placeholder="nom du tuteur" /></div>
              <div className="field"><label>Tuteur·rice 2 <span className="hint">(facultatif)</span></label><input value={t2} onChange={(e) => setT2(e.target.value)} placeholder="2ᵉ tuteur" /></div>
            </div>
            <div className="field"><label>Code d&apos;accès (PIN, facultatif) <span className="hint">— 4 à 6 chiffres ; laissez vide pour aucun verrou</span></label><input inputMode="numeric" maxLength={6} value={pin} onChange={(e) => setPin(e.target.value)} placeholder="ex : 2468" /></div>
            <button className="btn" onClick={submit}>Créer le profil</button>
          </div>
        </details>

        <div style={{ marginTop: 14, display: "flex", gap: 9, flexWrap: "wrap" }}>
          <button className="btn ghost sm" onClick={() => onNavigate?.({ section: "integration", sub: "dossier" })}>📄 Dossier à imprimer</button>
          <button className="btn ghost sm" onClick={masterBtn}>⚙︎ Code cadre</button>
        </div>
      </div>

      <h3 className="sub"><span className="dot" />Le service en 30 secondes</h3>
      <div className="grid g2">
        <div className="card"><strong style={{ color: "var(--petrol-deep)" }}>USI — secteur réanimation</strong>
          <p style={{ marginTop: 6, fontSize: ".92rem", color: "#3c5654" }}><b>20 lits.</b> Patients en aval de réanimation : surveillance rapprochée, sevrage, gestes lourds. DMS ≈ 5 jours. Staff médical à <b>8h45</b>. 4 secteurs.</p></div>
        <div className="card"><strong style={{ color: "var(--petrol-deep)" }}>USI — secteur chirurgie</strong>
          <p style={{ marginTop: 6, fontSize: ".92rem", color: "#3c5654" }}><b>15 lits.</b> Surveillance rapprochée au décours d&apos;une chirurgie. DMS ≈ 24–48 h. Staff médical à <b>8h30</b>. 3 secteurs.</p></div>
      </div>
    </section>
  );
}
