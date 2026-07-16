// Types partagés de l'application d'accueil USI

export type ModeKey = "etu_ide" | "na_ide" | "etu_as" | "na_as";
export type Prof = "ide" | "as";

export interface ModeConfig {
  label: string;
  prof: Prof;
  calc: boolean;
  paliers: boolean;
  sem?: boolean;
  doubTarget?: string;
  ech: string[];
  echlbl: Record<string, string>;
  echbadge: Record<string, string>;
  bilans: [string, string][];
  hero: [string, string];
  stat4: [string, string];
}

export interface LevelConfig {
  label: string;
  options: [string, string][];
  banner: Record<string, string>;
}

export interface ParcoursItem {
  texte: string;
  ech: string;
  s5?: boolean;
}
export interface ParcoursBloc {
  cat: string;
  items: ParcoursItem[];
}

export interface Profile {
  id: string;
  mode: ModeKey;
  nom: string;
  ifsi: string;
  sem: string;
  debut: string;
  fin: string;
  t1: string;
  t2: string;
  pin: string | null;
}

// État d'un item du parcours : a = auto-évaluation, t = tuteur (0..3)
// aDate/tDate : date (YYYY-MM-DD) de la dernière modification, pour le suivi
export interface ItemStatus {
  a: number;
  t: number;
  aDate?: string;
  tDate?: string;
}
