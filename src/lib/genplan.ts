// Moteur de génération de planning (espace cadre).
// Données saisies par le cadre → planning calculé selon les règles du service.
import { HEURES_POSTE, type UniteKey } from "./accueil";

export interface GenAgent {
  id: string;
  nom: string;
  type: "ide" | "as";
  unite: UniteKey;
  heures: number;
  ifmsDeduit: boolean;
  ifms: string[];      // dates YYYY-MM-DD passées à l'IFMS
  absences: string[];  // dates YYYY-MM-DD d'absence
}
export interface GenState { start: string; agents: GenAgent[]; }

export interface DaySlot { date: string; week: number; shift: string; secteur?: number; unite?: UniteKey; }
export interface AgentResult {
  agent: GenAgent;
  days: DaySlot[];
  heuresGardes: number;
  heuresCredit: number; // IFMS déduit + absences + fériés
  heuresTotal: number;
  cible: number;
}

const WE: [number, number][] = [[4, 5], [5, 6], [4, 6]]; // Ven-Sam / Sam-Dim / Ven-Dim
const THR = [2, 4]; // uniquement 2 ou 4 gardes par secteur (jamais 3 = coupe la prise en charge)

function parse(d: string): Date { const [y, m, j] = d.split("-").map(Number); return new Date(y, m - 1, j); }
function ymd(d: Date): string {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), j = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${j}`;
}
function addDays(d: Date, n: number): Date { const x = new Date(d); x.setDate(x.getDate() + n); return x; }

// ===== Jours fériés français (métropole) =====
function easter(year: number): Date {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}
export function joursFeries(year: number): Set<string> {
  const e = easter(year);
  const fixed = [`${year}-01-01`, `${year}-05-01`, `${year}-05-08`, `${year}-07-14`, `${year}-08-15`, `${year}-11-01`, `${year}-11-11`, `${year}-12-25`];
  const movable = [addDays(e, 1), addDays(e, 39), addDays(e, 50)]; // Pâques+1, Ascension, Pentecôte+1
  return new Set([...fixed, ...movable.map(ymd)]);
}

export function generateAgent(a: GenAgent, start: Date, idx: number): AgentResult {
  const isIde = a.type === "ide";
  const absSet = new Set(a.absences);
  const ifmsSet = new Set(a.ifms);
  const ferieSet = new Set<string>();
  for (let y = start.getFullYear() - 1; y <= start.getFullYear() + 2; y++) joursFeries(y).forEach((d) => ferieSet.add(d));

  // L'IFMS déduit est pré-décompté du total à réaliser
  const ifmsCredit = a.ifmsDeduit ? a.ifms.length * 7 : 0;
  let remaining = Math.max(0, a.heures - ifmsCredit);

  // Ancrage calendaire : lundi de la semaine qui suit le début réel
  const startDow = (start.getDay() + 6) % 7; // 0 = Lun … 6 = Dim
  const weekAnchor = addDays(start, 7 - startDow); // 1er lundi après le début

  const slots: DaySlot[] = [];
  let gardeHours = 0;
  let creditHours = ifmsCredit;
  let w = 0;
  let stop = false;
  while (!stop && w < 40) {
    const week: [number, number][] = []; // [dow, kind] kind 0=matin 1=soir 2=12h
    if (w === 0) {
      // Semaine partielle (7h) : jours ouvrés à partir du jour d'arrivée, pas de WE
      // Mix matin/soir : première moitié = matins, deuxième moitié = soirs
      const availDows = [0, 1, 2, 3, 4].filter((d) => d >= startDow);
      const nMatins = Math.ceil(availDows.length / 2);
      availDows.forEach((d, i) => week.push([d, i < nMatins ? 0 : 1]));
    } else {
      // Dès la semaine 2 : calé sur le lundi-ancre, rythme 12h
      const cw = w - 1;
      if (cw % 2 === 0) {
        const cyc = Math.floor(cw / 2);
        const we = WE[(cyc + idx) % WE.length];
        week.push([0, 2], [1, 2], [we[0], 2], [we[1], 2]);
      } else week.push([2, 2], [3, 2]);
    }
    for (const [dow, kind] of week) {
      // Semaine 0 : décalage relatif au jour d'arrivée réel
      // Semaines 1+ : décalage relatif au lundi-ancre (grille calée dès le lundi)
      const date = w === 0
        ? ymd(addDays(start, dow - startDow))
        : ymd(addDays(weekAnchor, (w - 1) * 7 + dow));
      const base = kind === 0 ? "m7" : kind === 1 ? "s7" : "j12";
      const h = HEURES_POSTE[base];
      const isWeekday = dow <= 4;
      if (remaining <= 0) { stop = true; break; }
      if (absSet.has(date)) { slots.push({ date, week: w, shift: "absence" }); remaining -= h; creditHours += h; continue; }
      if (ifmsSet.has(date)) { slots.push({ date, week: w, shift: "ifms" }); continue; }
      if (isWeekday && ferieSet.has(date)) {
        const hf = 7; // JF toujours décomptés 7h, quelle que soit la durée du poste
        slots.push({ date, week: w, shift: "ferie" }); remaining -= hf; creditHours += hf; continue;
      }
      // garde réelle — ne pas dépasser la cible
      if (h > remaining) { stop = true; break; }
      slots.push({ date, week: w, shift: base });
      remaining -= h; gardeHours += h;
    }
    w++;
  }

  // Période de nuit (IDE) : 2 semaines de 12h au milieu
  if (isIde) {
    const weeks12 = [...new Set(slots.filter((s) => s.shift === "j12").map((s) => s.week))].sort((x, y) => x - y);
    if (weeks12.length >= 2) {
      const mid = Math.max(0, Math.floor(weeks12.length / 2) - 1);
      const nights = new Set([weeks12[mid], weeks12[mid + 1]].filter((x) => x !== undefined));
      slots.forEach((s) => { if (nights.has(s.week) && s.shift === "j12") s.shift = "n12"; });
    }
  }

  // Rotation Réa ↔ Chir alternée à chaque bloc de secteur (THR = [2,4], jamais 3).
  // L'unité de départ dépend de l'index de l'agent (pair → a.unite, impair → autre unité)
  // → distribution permanente : la moitié des étudiants sont côté Réa, l'autre côté Chir.
  const otherUnit: UniteKey = a.unite === "rea" ? "chir" : "rea";
  let curUnit: UniteKey = idx % 2 === 0 ? a.unite : otherUnit;
  let reaSecIdx = idx % 4;  // secteur courant dans USI Réa  (0-based → affiché +1)
  let chirSecIdx = idx % 3; // secteur courant dans USI Chir (0-based → affiché +1)
  let cnt = 0, thrIdx = 0;

  slots.forEach((s) => {
    s.unite = curUnit;
    if (s.shift === "absence" || s.shift === "ifms" || s.shift === "ferie") return;
    // Assigner le secteur courant dans l'unité courante
    s.secteur = (curUnit === "rea" ? reaSecIdx : chirSecIdx) + 1;
    cnt++;
    if (cnt >= THR[thrIdx % THR.length]) {
      // Avancer le secteur dans l'unité qu'on quitte, puis basculer
      if (curUnit === "rea") reaSecIdx = (reaSecIdx + 1) % 4;
      else chirSecIdx = (chirSecIdx + 1) % 3;
      curUnit = curUnit === "rea" ? "chir" : "rea";
      cnt = 0; thrIdx++;
    }
  });

  return { agent: a, days: slots, heuresGardes: gardeHours, heuresCredit: creditHours, heuresTotal: gardeHours + creditHours, cible: a.heures };
}

export function generateAll(state: GenState): AgentResult[] {
  if (!state.start) return [];
  const start = parse(state.start);
  return state.agents.map((a, i) => generateAgent(a, start, i));
}

export function allDates(results: AgentResult[]): string[] {
  const set = new Set<string>();
  results.forEach((r) => r.days.forEach((d) => set.add(d.date)));
  return [...set].sort();
}

// Liste des mois (y,m) couverts par l'ensemble des plannings
export function monthsSpan(results: AgentResult[]): { y: number; m: number }[] {
  const dates = allDates(results);
  if (!dates.length) return [];
  const first = parse(dates[0]), last = parse(dates[dates.length - 1]);
  const out: { y: number; m: number }[] = [];
  const c = new Date(first.getFullYear(), first.getMonth(), 1);
  const end = new Date(last.getFullYear(), last.getMonth(), 1);
  let g = 0;
  while (c <= end && g < 48) { out.push({ y: c.getFullYear(), m: c.getMonth() }); c.setMonth(c.getMonth() + 1); g++; }
  return out;
}
