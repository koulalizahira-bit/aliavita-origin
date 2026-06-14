// Contenu des écrans d'accueil ajoutés : check-list d'arrivée, FAQ, types de poste.

// ===== Check-list des premiers jours =====
export interface CheckGroupe { titre: string; emoji: string; items: string[]; }

export const PREMIERS_JOURS: CheckGroupe[] = [
  {
    titre: "Administratif & accès", emoji: "🪪",
    items: [
      "Récupérer mon badge d'accès (vestiaires, locaux, service)",
      "Visiter les vestiaires et récupérer mes tenues",
      "Noter les codes d'accès qui me seront communiqués",
      "Vérifier mes identifiants des logiciels (REASSIST, Clinicom, Norméa…)",
    ],
  },
  {
    titre: "Me présenter", emoji: "🤝",
    items: [
      "Me présenter au cadre de santé et à l'infirmière coordinatrice (IDEC)",
      "Rencontrer mon ou mes tuteurs",
      "Faire connaissance avec l'équipe du jour (IDE, AS, ASH)",
      "Repérer à qui m'adresser selon la situation",
    ],
  },
  {
    titre: "Découvrir les lieux", emoji: "🗺️",
    items: [
      "Visiter la salle de soins et la pharmacie du service",
      "Localiser le chariot d'urgence, le DSA et le matériel d'intubation",
      "Repérer la salle de pause, les toilettes, le local matériel",
      "Comprendre l'organisation en secteurs (réa / chirurgie)",
    ],
  },
  {
    titre: "Comprendre l'organisation", emoji: "🕒",
    items: [
      "Connaître les horaires et le déroulé d'un poste (jour / nuit)",
      "Assister à une relève et à un staff médical",
      "Comprendre le principe du « plein-vide »",
      "Savoir où trouver les procédures (Norméa)",
    ],
  },
  {
    titre: "Sécurité — les essentiels", emoji: "🚨",
    items: [
      "Localiser les issues de secours et le matériel incendie",
      "Connaître la conduite à tenir en cas d'urgence vitale (AFGSU)",
      "Savoir déclarer un événement indésirable (ENNOV)",
      "Appliquer les précautions standard d'hygiène",
    ],
  },
];

// ===== FAQ : « Je fais quoi si… » =====
export interface FaqItem { q: string; r: string[]; }

export const FAQ: FaqItem[] = [
  {
    q: "Je suis en retard ou je ne peux pas venir (absence, maladie) ?",
    r: [
      "Prévenez le service le plus tôt possible (salle de soins de votre unité), puis le cadre de santé.",
      "En cas d'arrêt de travail, transmettez votre justificatif selon la procédure de l'établissement.",
      "Étudiant·e ou élève : prévenez aussi votre école/IFSI et l'infirmière coordinatrice (IDEC).",
    ],
  },
  {
    q: "Je ne sais pas faire un geste ou j'ai un doute ?",
    r: [
      "On ne devine jamais : demandez à votre tuteur, à l'IDE référent ou au cadre.",
      "Pour un médicament ou un calcul de dose : en cas de doute, on n'administre pas, on fait revérifier.",
      "Demander n'est pas une faiblesse — c'est la bonne pratique.",
    ],
  },
  {
    q: "Je casse du matériel ou un appareil est défectueux ?",
    r: [
      "Ne remettez pas l'appareil en service ; signalez-le immédiatement à l'IDE et identifiez le matériel.",
      "Prévenez le service biomédical si nécessaire et tracez le dysfonctionnement.",
      "Aucune crainte à signaler : la sécurité passe avant tout.",
    ],
  },
  {
    q: "Je pense avoir fait une erreur ?",
    r: [
      "La priorité est la sécurité du patient : alertez sans attendre l'IDE et le médecin.",
      "Déclarez l'événement indésirable (ENNOV). Une déclaration de bonne foi n'entraîne pas de sanction.",
      "Parler d'une erreur permet à toute l'équipe d'apprendre et d'éviter qu'elle se reproduise.",
    ],
  },
  {
    q: "Une urgence vitale survient ?",
    r: [
      "Alertez, évaluez (conscience, respiration, pouls), agissez selon l'AFGSU.",
      "Faites venir le médecin et l'équipe ; amenez le chariot d'urgence et le DSA au lit.",
      "Vous n'êtes jamais seul·e face à une urgence.",
    ],
  },
  {
    q: "Je ne trouve pas une procédure ou une information ?",
    r: [
      "Toutes les procédures sont sur Norméa.",
      "Si vous ne trouvez pas : demandez à un collègue, au tuteur ou au cadre.",
    ],
  },
  {
    q: "J'ai une question sur mon planning, mes horaires ou mes congés ?",
    r: [
      "Adressez-vous au cadre de santé, qui gère les plannings de l'équipe.",
      "Consultez l'onglet « Mon planning » pour visualiser vos postes.",
    ],
  },
  {
    q: "Je suis étudiant·e et j'ai une question sur mon encadrement ?",
    r: [
      "L'infirmière coordinatrice (IDEC) assure le suivi des étudiants : c'est votre interlocutrice privilégiée.",
      "Votre tuteur reste votre référent au quotidien pour vos objectifs de stage.",
    ],
  },
  {
    q: "Je me sens en difficulté ou dépassé·e ?",
    r: [
      "Parlez-en : votre tuteur, le cadre et l'IDEC sont là pour vous soutenir.",
      "Un·e psychologue est disponible (voir les contacts dans « Bienvenue »).",
      "Prendre soin de soi fait partie du métier.",
    ],
  },
];

export const FAQ_NOTE = "Les modalités précises (qui prévenir, délais, justificatifs) peuvent varier : référez-vous aux consignes de votre service et aux procédures Norméa.";

// ===== Types de poste (planning) =====
export interface ShiftType { key: string; label: string; court: string; }

export const SHIFTS: ShiftType[] = [
  { key: "repos", label: "Repos", court: "Repos" },
  { key: "j12", label: "Jour 12h — 7h à 19h", court: "J 7-19" },
  { key: "n12", label: "Nuit 12h — 19h à 7h", court: "N 19-7" },
  { key: "m7", label: "Matin 7h — 7h à 14h", court: "M 7-14" },
  { key: "s7", label: "Soir 7h — 12h à 19h", court: "S 12-19" },
];

export const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

// ===== Unités & secteurs (onglet planning uniquement) =====
export const UNITES_PLAN = [
  { key: "rea", label: "USI Réa", secteurs: 4 },
  { key: "chir", label: "USI Chir", secteurs: 3 },
] as const;
export type UniteKey = "rea" | "chir";

// Heures par type de poste
export const HEURES_POSTE: Record<string, number> = { j12: 12, n12: 12, m7: 7, s7: 7, repos: 0, absence: 0, ifms: 7 };
