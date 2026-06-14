"use client";
import { useState } from "react";
import { useApp } from "../AppContext";
import { jget, jset, staffUnlocked, unlockStaff, lockStaff, hasMaster, setMasterCode } from "@/lib/store";
import { UNITES_PLAN, type UniteKey } from "@/lib/accueil";
import { generateAll, monthsSpan, joursFeries, type GenState, type GenAgent, type AgentResult } from "@/lib/genplan";

const KEY = "usic_genplan";
const SHORT: Record<string, string> = { j12: "J 7-19", n12: "N 19-7", m7: "M 7-14", s7: "S 12-19", absence: "ABS", ifms: "IFMS", ferie: "Férié" };
const COLOR: Record<string, string> = { j12: "#fdeccb", n12: "#e0e9f8", m7: "#d8f0e6", s7: "#ffe7e2", absence: "#f3d6d6", ifms: "#efe2f7", ferie: "#e7e7f3" };
const UL: Record<UniteKey, string> = { rea: "R", chir: "C" };
const uNom = (u?: UniteKey) => (u === "rea" ? "Réa" : u === "chir" ? "Chir" : "");
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const JLT = ["L", "M", "M", "J", "V", "S", "D"];
const fmtJ = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "2-digit" });
const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function MonthCalendar({ results, y, m, feries, print }: { results: AgentResult[]; y: number; m: number; feries: Set<string>; print?: boolean }) {
  const first = new Date(y, m, 1);
  const startCol = (first.getDay() + 6) % 7;
  const nb = new Date(y, m + 1, 0).getDate();
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < startCol; i++) cells.push(<div key={"b" + i} style={{ background: "transparent" }} />);
  for (let day = 1; day <= nb; day++) {
    const dt = new Date(y, m, day);
    const ds = ymd(dt);
    const ferie = feries.has(ds);
    const entries = results.map((r) => { const d = r.days.find((x) => x.date === ds); return d ? { nom: r.agent.nom.split(" ")[0], shift: d.shift, sec: d.secteur, unite: d.unite } : null; }).filter(Boolean) as { nom: string; shift: string; sec?: number; unite?: UniteKey }[];
    cells.push(
      <div key={ds} style={{ border: "1px solid var(--line)", borderRadius: 7, minHeight: print ? 54 : 64, padding: 3, background: ferie ? "#f3eef8" : entries.length ? "#fff" : "#faf8f3" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: print ? 8 : 10, fontWeight: 700, color: "var(--petrol-soft)" }}>{day}</span>
          {ferie && <span style={{ fontSize: print ? 6 : 8, fontWeight: 800, color: "#7b3fa0", background: "#efe2f7", borderRadius: 4, padding: "0 3px" }}>Férié</span>}
        </div>
        {entries.map((e, i) => (
          <div key={i} title={e.nom} style={{ background: COLOR[e.shift], borderRadius: 4, padding: "1px 3px", margin: "2px 0", fontSize: print ? 7 : 9, lineHeight: 1.2, fontWeight: 600, color: "var(--petrol-deep)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {e.nom} · {SHORT[e.shift]}{e.sec ? " " + UL[e.unite!] + e.sec : ""}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, color: "var(--petrol-deep)", marginBottom: 6, textTransform: "capitalize" }}>{MOIS[m]} {y}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 3 }}>
        {JLT.map((j, i) => <div key={i} style={{ textAlign: "center", fontSize: print ? 8 : 10, fontWeight: 700, color: "var(--petrol-soft)" }}>{j}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>{cells}</div>
    </div>
  );
}

function StaffLogin({ onDone }: { onDone: () => void }) {
  const [code, setCode] = useState("");
  const first = !hasMaster();
  function submit() {
    if (first) {
      if (code.trim().length < 4) { alert("Choisissez un code d'au moins 4 caractères."); return; }
      setMasterCode(code.trim());
    }
    if (unlockStaff(code.trim())) onDone(); else alert("Code incorrect.");
  }
  return (
    <div className="card" style={{ maxWidth: 420 }}>
      <h3 className="sub" style={{ marginTop: 0 }}><span className="dot" />Espace encadrant</h3>
      <p style={{ fontSize: ".9rem", color: "#3c5654", marginBottom: 10 }}>
        {first ? "Définissez un code cadre (partagé entre le cadre et l'IDEC). Il protégera la génération de planning et l'édition de la FAQ." : "Entrez le code cadre pour accéder à la génération de planning."}
      </p>
      <div className="field"><label>{first ? "Nouveau code cadre" : "Code cadre"}</label>
        <input inputMode="numeric" value={code} onChange={(e) => setCode(e.target.value)} placeholder="••••" onKeyDown={(e) => e.key === "Enter" && submit()} /></div>
      <button className="btn" onClick={submit}>{first ? "Définir et entrer" : "Se connecter"}</button>
    </div>
  );
}

export default function GenPlanning({ forceUnlocked = false }: { forceUnlocked?: boolean }) {
  const { rev, reload } = useApp();
  // forceUnlocked = true quand le cadre est authentifié par session (plus besoin de code)
  const staff = forceUnlocked || staffUnlocked();
  void rev;

  const state = jget<GenState>(KEY, { start: "", agents: [] });
  const [view, setView] = useState<"agent" | "mois">("mois");
  const [selId, setSelId] = useState<string>("");
  const [printMode, setPrintMode] = useState<"none" | "agent" | "global">("none");

  const [nom, setNom] = useState("");
  const [type, setType] = useState<"ide" | "as">("ide");
  const [unite, setUnite] = useState<UniteKey>("rea");
  const [heures, setHeures] = useState("350");
  const [ifmsDeduit, setIfmsDeduit] = useState(false);

  if (!staff) {
    return (
      <section className="page">
        <span className="eyebrow">Réservé à l&apos;encadrement</span>
        <h2 className="title">Génération de planning</h2>
        <p className="lead">Cet espace permet au cadre / à l&apos;IDEC de générer automatiquement les plannings de stage.</p>
        <StaffLogin onDone={reload} />
      </section>
    );
  }

  function save(s: GenState) { jset(KEY, s); reload(); }
  function setStart(v: string) { save({ ...state, start: v }); }
  function addAgent() {
    if (!nom.trim()) { alert("Indiquez un nom."); return; }
    const a: GenAgent = { id: "a" + Date.now(), nom: nom.trim(), type, unite, heures: parseInt(heures) || 0, ifmsDeduit, ifms: [], absences: [] };
    save({ ...state, agents: [...state.agents, a] });
    setNom("");
  }
  function delAgent(id: string) { save({ ...state, agents: state.agents.filter((a) => a.id !== id) }); }
  function addDate(id: string, field: "ifms" | "absences", date: string) {
    if (!date) return;
    save({ ...state, agents: state.agents.map((a) => a.id === id && !a[field].includes(date) ? { ...a, [field]: [...a[field], date].sort() } : a) });
  }
  function rmDate(id: string, field: "ifms" | "absences", date: string) {
    save({ ...state, agents: state.agents.map((a) => a.id === id ? { ...a, [field]: a[field].filter((d) => d !== date) } : a) });
  }

  const results = generateAll(state);
  const sel = results.find((r) => r.agent.id === selId) || results[0];
  const months = monthsSpan(results);
  const feries = (() => {
    const s = new Set<string>();
    new Set(months.map((mm) => mm.y)).forEach((y) => joursFeries(y).forEach((d) => {
      const dt = new Date(d + "T00:00:00"); if (((dt.getDay() + 6) % 7) <= 4) s.add(d); // jours en semaine
    }));
    return s;
  })();
  const reaN = state.agents.filter((a) => a.unite === "rea").length;
  const chirN = state.agents.filter((a) => a.unite === "chir").length;

  function doPrint(mode: "agent" | "global") {
    setPrintMode(mode);
    setTimeout(() => { window.print(); setPrintMode("none"); }, 150);
  }
  function weeksOf(r: AgentResult) {
    const map = new Map<number, AgentResult["days"]>();
    r.days.forEach((d) => { if (!map.has(d.week)) map.set(d.week, []); map.get(d.week)!.push(d); });
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }

  return (
    <section className="page">
      <span className="eyebrow">Réservé à l&apos;encadrement</span>
      <h2 className="title">Génération de planning</h2>
      <p className="lead">Saisissez les agents et leurs heures à réaliser ; le planning est généré automatiquement selon la trame du service (jours fériés et absences déduits, sans dépasser la cible).</p>

      {/* La barre "Quitter" n'apparaît qu'en mode code (pas quand le cadre est authentifié par session) */}
      {!forceUnlocked && (
        <div className="staffbar"><span>🔓</span><div style={{ flex: 1 }}>Mode encadrant actif.</div><button className="btn ghost sm" onClick={() => { lockStaff(); reload(); }}>Quitter</button></div>
      )}

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="field" style={{ marginBottom: 6 }}><label>Début du stage (un lundi)</label><input type="date" value={state.start} onChange={(e) => setStart(e.target.value)} /></div>
        <div style={{ fontSize: ".82rem", color: "var(--petrol-soft)" }}>Répartition : <b>{reaN}</b> en USI Réa · <b>{chirN}</b> en USI Chir {Math.abs(reaN - chirN) > 1 && <span style={{ color: "var(--coral-deep)" }}>— pensez à équilibrer</span>}</div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 className="sub" style={{ marginTop: 0 }}><span className="dot" />Ajouter un agent</h3>
        <div className="field"><label>Nom</label><input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="ex : Alex Martin" /></div>
        <div className="grid g2">
          <div className="field"><label>Statut</label><select value={type} onChange={(e) => setType(e.target.value as "ide" | "as")}><option value="ide">Étudiant IDE</option><option value="as">Élève AS</option></select></div>
          <div className="field"><label>Unité</label><select value={unite} onChange={(e) => setUnite(e.target.value as UniteKey)}>{UNITES_PLAN.map((u) => <option key={u.key} value={u.key}>{u.label} ({u.secteurs} secteurs)</option>)}</select></div>
        </div>
        <div className="grid g2">
          <div className="field"><label>Heures à réaliser</label><input type="number" value={heures} onChange={(e) => setHeures(e.target.value)} /></div>
          <div className="field"><label>Temps IFMS</label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 400, marginTop: 6 }}><input type="checkbox" checked={ifmsDeduit} onChange={(e) => setIfmsDeduit(e.target.checked)} style={{ width: 18, height: 18 }} /> déduit du total d&apos;heures</label>
          </div>
        </div>
        <button className="btn" onClick={addAgent}>Ajouter l&apos;agent</button>
      </div>

      {state.agents.length > 0 && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h3 className="sub" style={{ marginTop: 0 }}><span className="dot" />Agents ({state.agents.length})</h3>
          {state.agents.map((a) => (
            <details className="block" key={a.id}>
              <summary>{a.nom}<span className="mini">{a.type.toUpperCase()} · {a.unite === "rea" ? "Réa" : "Chir"} · {a.heures} h</span></summary>
              <div className="items" style={{ padding: 12 }}>
                <div className="field" style={{ marginBottom: 8 }}><label>Ajouter une absence</label>
                  <input type="date" onChange={(e) => { addDate(a.id, "absences", e.target.value); e.target.value = ""; }} /></div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                  {a.absences.map((d) => <span key={d} className="chip badge-arr" onClick={() => rmDate(a.id, "absences", d)} style={{ cursor: "pointer" }}>{fmtJ(d)} ✕</span>)}
                </div>
                <div className="field" style={{ marginBottom: 8 }}><label>Ajouter un jour IFMS</label>
                  <input type="date" onChange={(e) => { addDate(a.id, "ifms", e.target.value); e.target.value = ""; }} /></div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                  {a.ifms.map((d) => <span key={d} className="chip badge-s5" onClick={() => rmDate(a.id, "ifms", d)} style={{ cursor: "pointer" }}>{fmtJ(d)} ✕</span>)}
                </div>
                <button className="btn ghost sm" onClick={() => delAgent(a.id)}>🗑 Supprimer l&apos;agent</button>
              </div>
            </details>
          ))}
        </div>
      )}

      {!state.start && <div className="notice"><span>📅</span><div>Renseignez la <b>date de début</b> pour générer les plannings.</div></div>}

      {state.start && results.length > 0 && (
        <>
          <div className="toggle">
            <button className={view === "mois" ? "on" : ""} onClick={() => setView("mois")}>Vue mensuelle (tous)</button>
            <button className={view === "agent" ? "on" : ""} onClick={() => setView("agent")}>Par agent</button>
          </div>

          {view === "mois" && (
            <div className="card" style={{ overflowX: "auto" }}>
              <p style={{ fontSize: ".82rem", color: "var(--petrol-soft)", marginBottom: 10 }}>Tous les agents, mois par mois (Prénom · poste · secteur).</p>
              <div style={{ minWidth: 520 }}>
                {months.map(({ y, m }) => <MonthCalendar key={y + "-" + m} results={results} y={y} m={m} feries={feries} />)}
              </div>
              <button className="btn" style={{ marginTop: 8 }} onClick={() => doPrint("global")}>🖨️ Imprimer le planning mensuel (tous les agents)</button>
            </div>
          )}

          {view === "agent" && sel && (
            <div className="card">
              <div className="field"><label>Agent</label>
                <select value={sel.agent.id} onChange={(e) => setSelId(e.target.value)}>{results.map((r) => <option key={r.agent.id} value={r.agent.id}>{r.agent.nom}</option>)}</select></div>
              <div className="notice info"><span>⏱️</span><div>Gardes : <b>{sel.heuresGardes} h</b>{sel.heuresCredit ? <> · déduit (IFMS/absences/fériés) : <b>{sel.heuresCredit} h</b></> : null} · Total : <b>{sel.heuresTotal} h</b> / cible {sel.cible} h</div></div>
              {weeksOf(sel).map(([w, days]) => (
                <div key={w} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, color: "var(--petrol-deep)", fontSize: ".82rem", marginBottom: 4 }}>Semaine {w + 1}{w === 0 ? " (7h)" : ""}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {days.map((d) => (
                      <span key={d.date} style={{ background: COLOR[d.shift], border: "1px solid var(--line)", borderRadius: 9, padding: "5px 9px", fontSize: ".76rem", fontWeight: 600, color: "var(--petrol-deep)" }}>
                        {fmtJ(d.date)} · {SHORT[d.shift]}{d.secteur ? ` · ${uNom(d.unite)} S${d.secteur}` : ""}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <button className="btn" style={{ marginTop: 8 }} onClick={() => doPrint("agent")}>🖨️ Imprimer le planning de {sel.agent.nom.split(" ")[0]}</button>
            </div>
          )}
        </>
      )}

      {/* Zone d'impression */}
      <div className="print-zone">
        {printMode === "agent" && sel && (
          <div>
            <h2>Planning de stage — {sel.agent.nom}</h2>
            <p>{sel.agent.type.toUpperCase()} · {sel.agent.unite === "rea" ? "USI Réa" : "USI Chir"} · {sel.heuresTotal} h / cible {sel.cible} h</p>
            <table border={1} cellPadding={4} style={{ borderCollapse: "collapse", width: "100%", fontSize: 12 }}>
              <thead><tr><th>Date</th><th>Poste</th><th>Unité · secteur</th></tr></thead>
              <tbody>{sel.days.map((d) => <tr key={d.date}><td>{fmtJ(d.date)}</td><td>{SHORT[d.shift]}</td><td>{d.secteur ? uNom(d.unite) + " S" + d.secteur : "—"}</td></tr>)}</tbody>
            </table>
          </div>
        )}
        {printMode === "global" && (
          <div>
            <h2>Planning mensuel — tous les agents</h2>
            <p>Début : {state.start}</p>
            {months.map(({ y, m }) => <MonthCalendar key={y + "-" + m} results={results} y={y} m={m} feries={feries} print />)}
          </div>
        )}
      </div>
    </section>
  );
}
