"use client";
import { useState, useEffect, useRef } from "react";
import { Home, Target, Building2, Stethoscope, GraduationCap, CalendarDays, LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { AppProvider, useApp } from "./AppContext";
import { MODES } from "@/lib/parcours";
import { shortName, setActiveId } from "@/lib/store";
import Accueil, { type NavTarget } from "./screens/Accueil";
import PremiersJours from "./screens/PremiersJours";
import Faq from "./screens/Faq";
import Parcours from "./screens/Parcours";
import Planning from "./screens/Planning";
import Paliers from "./screens/Paliers";
import Tuteur from "./screens/Tuteur";
import Objectifs from "./screens/Objectifs";
import Dossier from "./screens/Dossier";
import GenPlanning from "./screens/GenPlanning";
import Taches from "./screens/Taches";
import Competences from "./screens/Competences";
import Contacts from "./screens/Contacts";
import InfosPratiques from "./screens/InfosPratiques";
import Charte from "./screens/Charte";
import Fiches from "./screens/Fiches";
import Calcul from "./screens/Calcul";
import Urgences from "./screens/Urgences";
import Glossaire from "./screens/Glossaire";
import Quiz from "./screens/Quiz";

interface Child { key: string; label: string; node: React.ReactNode; vis?: () => boolean; }
interface Section { key: string; label: string; icon: React.ReactNode; children: Child[]; }

// ─── Icône ECG Aliavita ─────────────────────────────────────────────────────
// Fond nuit #0f0a1e · ECG lavande #a899e8 · point terminal orange #fb923c
// Sans barre du A — identique Origin et Prism
function EcgMark() {
  return (
    <div className="mark">
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M 2,16 L 7,16 L 10,5 L 13,16 L 16,16 L 18.5,23 L 21,16 L 30,16"
          stroke="#a899e8" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"
        />
        <circle cx="30" cy="16" r="2.2" fill="#fb923c"/>
      </svg>
    </div>
  );
}

// ─── Sélecteur d'étudiant (vue tuteur) ──────────────────────────────────────
function TuteurProfilePicker() {
  const { profile, list, reload } = useApp();

  if (list.length === 0) {
    return (
      <section className="page">
        <span className="eyebrow">Suivi tuteur</span>
        <h2 className="title">Étudiant suivi</h2>
        <div className="notice info">
          <span>ℹ️</span>
          <div>Aucun profil trouvé. L'étudiant doit d'abord se connecter dans l'espace Équipe et créer son profil.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <span className="eyebrow">Suivi tuteur</span>
      <h2 className="title">Étudiant suivi</h2>
      <p className="lead">Sélectionnez l'étudiant à suivre. Ses bilans, objectifs et planning sont liés à ce profil.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        {list.map((p) => {
          const active = profile?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => { setActiveId(p.id); reload(); }}
              style={{
                textAlign: "left", cursor: "pointer", fontFamily: "inherit",
                background: active ? "var(--mint)" : "var(--paper)",
                border: `${active ? 2 : 1}px solid ${active ? "var(--petrol)" : "var(--line)"}`,
                borderRadius: "var(--r)", padding: "16px 20px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}
            >
              <div>
                <b style={{ color: "var(--petrol-deep)", fontSize: "1rem" }}>{p.nom}</b>
                <span style={{ display: "block", fontSize: ".84rem", color: "var(--petrol-soft)", marginTop: 2 }}>
                  {MODES[p.mode]?.label ?? p.mode}
                </span>
              </div>
              {active && (
                <span style={{
                  background: "var(--petrol)", color: "white",
                  borderRadius: 8, padding: "4px 10px", fontSize: ".78rem", fontWeight: 700,
                }}>
                  Sélectionné
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ─── Shell ─────────────────────────────────────────────────────────────────
function Shell({ role }: { role: "tuteur" | "agent" }) {
  const { profile } = useApp();

  const initSection = role === "tuteur" ? "suivi"     : "accueil";
  const initSub     = role === "tuteur" ? "etudiant"  : "bienvenue";

  const [sectionKey, setSectionKey] = useState(initSection);
  const [subKey,     setSubKey]     = useState(initSub);
  const subRef = useRef<HTMLDivElement>(null);

  const cfg   = profile ? MODES[profile.mode] : null;
  const isEtu = !!profile && profile.mode.indexOf("etu") > -1;

  function go(section: string, sub?: string) {
    setSectionKey(section);
    const raw = role === "tuteur" ? sectionsTuteur : sectionsAgent;
    if (sub) {
      setSubKey(sub);
    } else {
      const s   = raw.find((x) => x.key === section);
      const first = s?.children.find((c) => !c.vis || c.vis());
      if (first) setSubKey(first.key);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function nav(t: NavTarget) { go(t.section, t.sub); }

  // ─── Sections TUTEUR ─────────────────────────────────────────────────────
  // Le tuteur gère les étudiants qu'il suit.
  // • Suivi : sélecteur d'étudiant, planning individuel, bilans, objectifs.
  // • Planning global : génération de planning multi-agents (sans code).
  // Les données (localStorage) sont partagées automatiquement avec l'espace Équipe
  // sur le même appareil/navigateur.
  const sectionsTuteur: Section[] = [
    {
      key: "suivi", label: "Suivi", icon: <GraduationCap size={22} />,
      children: [
        { key: "etudiant",    label: "Étudiant suivi",  node: <TuteurProfilePicker /> },
        { key: "competences", label: "Compétences",      node: <Parcours tuteurMode /> },
        { key: "planning",    label: "Planning",          node: <Planning forceUnlocked /> },
        { key: "bilans",      label: "Bilans",            node: <Tuteur /> },
        { key: "objectifs",   label: "Objectifs",         node: <Objectifs /> },
      ],
    },
    {
      key: "planif", label: "Planning global", icon: <CalendarDays size={22} />,
      children: [
        { key: "genplan", label: "Génération planning", node: <GenPlanning forceUnlocked /> },
      ],
    },
  ];

  // ─── Sections AGENT / ÉQUIPE ──────────────────────────────────────────────
  const sectionsAgent: Section[] = [
    {
      key: "accueil", label: "Accueil", icon: <Home size={22} />,
      children: [
        { key: "bienvenue", label: "Bienvenue", node: <Accueil onNavigate={nav} /> },
      ],
    },
    {
      key: "integration", label: "Intégration", icon: <Target size={22} />,
      children: [
        { key: "premiers",  label: "Premiers jours",    node: <PremiersJours /> },
        { key: "parcours",  label: "Mon parcours",       node: <Parcours /> },
        { key: "paliers",   label: "Paliers & doublure", node: <Paliers />,
          vis: () => !!profile && MODES[profile.mode].paliers },
        { key: "planning",  label: "Mon planning",       node: <Planning />,
          vis: () => isEtu },
        { key: "faq",       label: "Je fais quoi si…",   node: <Faq /> },
        { key: "dossier",   label: "Mon dossier (PDF)",  node: <Dossier /> },
      ],
    },
    {
      key: "service", label: "Le service", icon: <Building2 size={22} />,
      children: [
        { key: "infos",       label: "Infos pratiques", node: <InfosPratiques /> },
        { key: "charte",      label: "Charte",           node: <Charte /> },
        { key: "contacts",    label: "Contacts",         node: <Contacts /> },
        { key: "taches",      label: "Fiche de tâches",  node: <Taches />,
          vis: () => !cfg || cfg.prof === "ide" },
        { key: "referentiel", label: "Référentiel",      node: <Competences /> },
      ],
    },
    {
      key: "memo", label: "Mémo", icon: <Stethoscope size={22} />,
      children: [
        { key: "fiches",    label: "Fiches & surveillances", node: <Fiches /> },
        { key: "calcul",    label: "Calcul de dose",          node: <Calcul />,
          vis: () => !cfg || cfg.calc },
        { key: "urgences",  label: "Urgences",                node: <Urgences /> },
        { key: "glossaire", label: "Glossaire",               node: <Glossaire /> },
        { key: "quiz",      label: "Défi du jour",            node: <Quiz /> },
      ],
    },
  ];

  const sectionsRaw     = role === "tuteur" ? sectionsTuteur : sectionsAgent;
  const section         = sectionsRaw.find((s) => s.key === sectionKey) ?? sectionsRaw[0];
  const visibleChildren = section.children.filter((c) => !c.vis || c.vis());

  useEffect(() => {
    if (!visibleChildren.find((c) => c.key === subKey)) {
      setSubKey(visibleChildren[0]?.key ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey, profile]);

  const child = visibleChildren.find((c) => c.key === subKey) ?? visibleChildren[0];

  return (
    <>
      {/* ─── En-tête ────────────────────────────────────────────── */}
      <header className="top">
        <div className="wrap">
          <div className="brand">
            <EcgMark />
            <div>
              <div className="t1">ALIAVITA</div>
              <div className="t2">· ORIGIN</div>
            </div>

            {role === "tuteur" ? (
              <div className="who">
                <span>Espace</span>
                <b>Tuteur / IDEC</b>
              </div>
            ) : (
              <div className="who">
                <span>{cfg ? cfg.label : "Profil"}</span>
                <b>{profile ? shortName(profile.nom) : "— non sélectionné"}</b>
              </div>
            )}

            <form action={logoutAction} style={{ marginLeft: "8px" }}>
              <button
                type="submit"
                title="Se déconnecter"
                style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  border: "1px solid var(--line)", background: "var(--paper)",
                  display: "grid", placeItems: "center", cursor: "pointer",
                  color: "var(--petrol-deep)", flexShrink: 0,
                }}
              >
                <LogOut size={16} />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ─── Contenu ────────────────────────────────────────────── */}
      <main className="wrap">
        {section.key !== "accueil" && (
          <div className="section-head">
            <span className="sh-ic">{section.icon}</span>
            <b>{section.label}</b>
          </div>
        )}

        {visibleChildren.length > 1 && (
          <div className="subtabs" ref={subRef}>
            {visibleChildren.map((c) => (
              <button
                key={c.key}
                className={"subtab" + (child?.key === c.key ? " on" : "")}
                onClick={() => { setSubKey(c.key); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        {child?.node}

        <footer>
          <b style={{ fontFamily: "var(--font-bricolage)", color: "var(--petrol-deep)" }}>
            Aliavita · Origin
          </b>
          {role === "tuteur"
            ? " — Espace de suivi et d'encadrement."
            : " — Pour les équipes et apprenants en soins intensifs."}
          <br />
          Ne remplace ni les protocoles institutionnels, ni les prescriptions, ni l&apos;accompagnement du tuteur.
        </footer>
      </main>

      {/* ─── Navigation basse ───────────────────────────────────── */}
      <nav className="bottomnav">
        {sectionsRaw.map((s) => (
          <button
            key={s.key}
            className={sectionKey === s.key ? "on" : ""}
            onClick={() => go(s.key)}
          >
            <span className="nb-ic">{s.icon}</span>
            <span className="nb-lbl">{s.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────
export default function AppShell({ role = "agent" }: { role?: "tuteur" | "agent" }) {
  return (
    <AppProvider>
      <Shell role={role} />
    </AppProvider>
  );
}
