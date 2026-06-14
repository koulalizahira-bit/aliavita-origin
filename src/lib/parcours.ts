import type { ModeKey, ModeConfig, LevelConfig, ParcoursBloc } from "./types";

export const STATES = ["Non abordé", "Non acquis", "En cours d'acquisition", "Acquis"];
export const SEMNOTE = "Les items « dès S5 » ne sont pas attendus acquis avant la 3ᵉ année.";

export const MODES: Record<ModeKey, ModeConfig> = {
  etu_ide: {
    label: "Étudiant IDE", prof: "ide", calc: true, paliers: false, sem: true,
    ech: ["Arrivée", "Semaine 1", "Semaines 2-3", "Mi-stage", "Fin de stage"],
    echlbl: { "Arrivée": "Arrivée", "Semaine 1": "S1", "Semaines 2-3": "S2-3", "Mi-stage": "Mi-stage", "Fin de stage": "Fin" },
    echbadge: { "Arrivée": "badge-arr", "Semaine 1": "badge-s1", "Semaines 2-3": "badge-s23", "Mi-stage": "badge-mi", "Fin de stage": "badge-fin" },
    bilans: [["accueil", "Bilan d'accueil (J1-3)"], ["mistage", "Bilan de mi-stage (S5)"], ["final", "Bilan final (S10)"]],
    hero: ["Bienvenue aux soins intensifs.", "Stage de 10 semaines : compétences, surveillances, calcul de dose et défis. Ce carnet est votre GPS."],
    stat4: ["10 sem.", "durée du stage"],
  },
  na_ide: {
    label: "Nouvel arrivant IDE", prof: "ide", calc: true, paliers: true, doubTarget: "6",
    ech: ["Accueil", "J+15", "1 mois", "2 mois", "3 mois"],
    echlbl: { "Accueil": "Accueil", "J+15": "J+15", "1 mois": "M1", "2 mois": "M2", "3 mois": "M3" },
    echbadge: { "Accueil": "badge-arr", "J+15": "badge-s1", "1 mois": "badge-s23", "2 mois": "badge-mi", "3 mois": "badge-fin" },
    bilans: [["accueil", "Bilan d'accueil (J1-3)"], ["j15", "Bilan J+15"], ["m1", "Bilan 1 mois"], ["m2", "Bilan 2 mois"], ["m3", "Bilan 3 mois — fin d'intégration"]],
    hero: ["Bienvenue dans l'équipe.", "Intégration sur 3 mois jusqu'au feu vert : montée en autonomie, doublures, paliers et bilans."],
    stat4: ["3 mois", "intégration"],
  },
  etu_as: {
    label: "Élève AS", prof: "as", calc: false, paliers: false,
    ech: ["Arrivée", "Semaine 1", "Semaines 2-3", "Fin de stage"],
    echlbl: { "Arrivée": "Arrivée", "Semaine 1": "S1", "Semaines 2-3": "S2-3", "Fin de stage": "Fin" },
    echbadge: { "Arrivée": "badge-arr", "Semaine 1": "badge-s1", "Semaines 2-3": "badge-s23", "Fin de stage": "badge-fin" },
    bilans: [["accueil", "Bilan d'accueil"], ["mistage", "Bilan de mi-stage"], ["final", "Bilan final"]],
    hero: ["Bienvenue en soins intensifs.", "Stage d'élève aide-soignant (5 semaines). Ce carnet vous accompagne dans l'acquisition de vos compétences, en collaboration avec l'IDE."],
    stat4: ["5 sem.", "stage élève AS"],
  },
  na_as: {
    label: "Nouvel arrivant AS", prof: "as", calc: false, paliers: true, doubTarget: "3-4",
    ech: ["Accueil", "7 j", "15 j", "1 mois", "2 mois", "6 mois"],
    echlbl: { "Accueil": "Accueil", "7 j": "J7", "15 j": "J15", "1 mois": "M1", "2 mois": "M2", "6 mois": "M6" },
    echbadge: { "Accueil": "badge-arr", "7 j": "badge-s1", "15 j": "badge-s1", "1 mois": "badge-s23", "2 mois": "badge-mi", "6 mois": "badge-fin" },
    bilans: [["accueil", "Bilan d'accueil"], ["j15", "Bilan 15 jours"], ["m1", "Bilan 1 mois"], ["m2", "Bilan 2 mois"], ["m6", "Bilan 6 mois"]],
    hero: ["Bienvenue dans l'équipe.", "Intégration d'aide-soignant : montée en autonomie, doublure et bilans jalonnés, en collaboration avec l'IDE."],
    stat4: ["Intégration", "AS diplômé"],
  },
};

export const LEVELS: Partial<Record<ModeKey, LevelConfig>> = {
  etu_ide: {
    label: "Semestre",
    options: [["S3", "S3 (2ᵉ année)"], ["S4", "S4 (2ᵉ année)"], ["S5", "S5 (3ᵉ année)"], ["S6", "S6 (3ᵉ année)"]],
    banner: {
      S3: "participation guidée, gestes de base supervisés, début d'organisation des soins.",
      S4: "participation qui s'étoffe, gestes de base supervisés, plus d'initiative.",
      S5: "prise en charge plus complète et autonome d'un secteur, posture pré-professionnelle.",
      S6: "autonomie sur un secteur, posture pré-professionnelle confirmée.",
    },
  },
  etu_as: {
    label: "Période de formation",
    options: [["debut", "Début de formation"], ["milieu", "Milieu de formation"], ["fin", "Fin / période intégrative"]],
    banner: {
      debut: "découverte, gestes de base accompagnés, observation et hygiène.",
      milieu: "participe activement, gagne en autonomie sur les soins de base.",
      fin: "prise en charge quasi autonome d'un secteur, sous responsabilité du cadre.",
    },
  },
};

// item: [texte, échéance, s5?]
type Raw = [string, string, "s5"?];
const blk = (cat: string, items: Raw[]): ParcoursBloc => ({
  cat,
  items: items.map((i) => ({ texte: i[0], ech: i[1], s5: i[2] === "s5" })),
});

export const PARCOURS_BY_MODE: Record<ModeKey, ParcoursBloc[]> = {
  etu_ide: [
    blk("🧭 Je m'organise dans le service", [["Comprendre l'organisation d'une journée par catégorie professionnelle", "Semaine 1"], ["Participer au staff médical quotidien", "Arrivée"], ["Tour de sécurité à la prise de poste (scopes, UVIH, intubation, respi, frigo, O₂)", "Semaine 1"], ["Connaître le principe du « plein-vide »", "Arrivée"], ["Planifier mon travail sur mon secteur", "Semaines 2-3"], ["Analyser et synthétiser les infos pour la continuité des soins", "Semaines 2-3"]]),
    blk("💻 Logiciels & traçabilité", [["Module de prescription REASSIST", "Semaine 1"], ["Surveillance & traçabilité des soins", "Semaine 1"], ["Clinicom, Cyberlab, Pharma, Norméa…", "Semaines 2-3"]]),
    blk("💊 Prise en charge médicamenteuse", [["Préparations IV et identité patient (étiquettes institutionnelles)", "Arrivée"], ["Protocoles du médicament", "Semaine 1"], ["Identifier les MHR", "Semaine 1"], ["Thérapeutiques des soins critiques", "Mi-stage", "s5"], ["Traçabilité des stupéfiants", "Semaines 2-3"]]),
    blk("🛬 Accueillir un patient", [["Recevoir/installer le patient (dignité, pudeur)", "Arrivée"], ["Identitovigilance et bracelet", "Arrivée"], ["Communiquer avec le patient et l'entourage", "Arrivée"], ["Transmissions écrites et orales", "Semaine 1"], ["Recueil de données + macrocible", "Semaines 2-3"]]),
    blk("🔧 Actes & soins techniques", [["Surveiller et réévaluer la douleur", "Arrivée"], ["Scope : alarmes, électrodes, analyse", "Semaine 1"], ["Dispositifs IV & artériels (KT, VVC, PICC, PAC)", "Semaine 1"], ["PSE, PCA, pompe nutrition, moniteur", "Semaines 2-3", "s5"], ["Drains & dispositifs (thoraciques, Salem, GEP…)", "Mi-stage", "s5"], ["VAC & pansements complexes", "Mi-stage", "s5"], ["VVP, ECG, sondes, broncho-aspiration", "Mi-stage", "s5"], ["Découverte : servir un geste (VVC, KT artériel, intubation)", "Fin de stage", "s5"]]),
    blk("🚨 Situations d'urgence", [["Chariots d'urgence, DSA, intubation difficile", "Arrivée"], ["Premiers gestes (AFGSU 2)", "Arrivée"], ["Chariot UVIH et sac d'urgence", "Semaine 1"], ["Pré-oxygéner et ventiler au BAVU", "Semaine 1"], ["Drogues d'urgence et dilutions (protocole)", "Mi-stage", "s5"]]),
    blk("🧼 Hygiène & confort", [["Précautions standard et complémentaires", "Arrivée"], ["Asepsie lors d'un soin", "Arrivée"], ["Prévenir les escarres (posture, change, état cutané)", "Arrivée"], ["Soins d'hygiène et de confort adaptés", "Semaine 1"], ["Confort selon l'état (trachéo, VNI)", "Semaines 2-3"]]),
  ],
  na_ide: [
    blk("🧭 Organisation & posture", [["Organisation d'une journée par catégorie pro", "Accueil"], ["Participer au staff", "Accueil"], ["Tour de sécurité à la prise de poste", "J+15"], ["Planifier/organiser mon secteur", "J+15"], ["Analyser, synthétiser, prioriser", "1 mois"], ["Rôle de chef d'équipe et se positionner", "2 mois"], ["Tâches en l'absence de l'IDE au matériel", "3 mois"]]),
    blk("💻 Logiciels & traçabilité", [["REASSIST (prescription, thérapeutiques)", "Accueil"], ["Surveillance & traçabilité", "J+15"], ["Clinicom, Cyberlab, Pharma, Norméa, ENNOV", "1 mois"]]),
    blk("💊 Médicament & circuit", [["Sécuriser chariots/salle ; étiquettes", "Accueil"], ["Protocoles du médicament", "J+15"], ["Identifier les MHR", "J+15"], ["Stupéfiants : traçabilité et commande en autonomie", "1 mois"], ["Thérapeutiques critiques (morphiniques, sédation, catécholamines, curares)", "1 mois"], ["Commande exceptionnelle (médicament, gaz, DM)", "2 mois"]]),
    blk("🛬 Accueil & 🛫 sortie", [["Recevoir/installer ; identitovigilance", "Accueil"], ["Transmissions écrites et orales", "J+15"], ["Recueil + macrocible d'entrée", "J+15"], ["Réaliser la sortie (documents, transport, famille)", "1 mois"], ["Procédure en cas de décès", "1 mois"]]),
    blk("🔧 Actes & soins techniques", [["Scope : alarmes, électrodes, analyse", "J+15"], ["Dispositifs IV & artériels : surveiller", "J+15"], ["PSE, PCA, pompe nutrition, moniteur", "1 mois"], ["Préparer/programmer les seringues électriques", "1 mois"], ["Drains & dispositifs (thoraciques, Salem, GEP…)", "1 mois"], ["VAC & pansements complexes", "2 mois"], ["VVP, ECG, sondes, broncho-aspiration", "1 mois"], ["Servir un geste (VVC, KT artériel, intubation, drain, fibro)", "2 mois"], ["Soins canule/trachéo, Huber/PAC, stomies", "2 mois"]]),
    blk("🚨 Urgences", [["Chariots d'urgence, DSA, intubation difficile", "Accueil"], ["AFGSU 2", "Accueil"], ["Chariot UVIH, sac d'urgence", "J+15"], ["Pré-oxygéner, BAVU, DSA", "J+15"], ["Drogues d'urgence et dilutions", "1 mois"]]),
    blk("🤝 Encadrement", [["Collaboration avec l'AS", "J+15"], ["Accueillir et encadrer un étudiant", "2 mois"]]),
  ],
  etu_as: [
    blk("🧭 Posture & incontournables", [["Connaître les textes législatifs de la profession", "Semaine 1"], ["Connaître les droits du patient et les chartes", "Semaine 1"], ["Procédure en cas de plan blanc", "Semaines 2-3"], ["Curiosité : se donner les moyens de progresser", "Arrivée"], ["Réceptivité aux conseils, auto/hétéro-évaluation", "Arrivée"], ["Vigilance (adaptabilité aux prescriptions)", "Semaine 1"], ["Prendre des initiatives selon ses compétences", "Semaines 2-3"], ["Écoute du patient et de son entourage", "Arrivée"], ["Discrétion et secret professionnel", "Arrivée"], ["Respect de l'intimité, de la dignité, du consentement", "Arrivée"], ["Tact et diplomatie", "Arrivée"], ["Collaboration, entraide, bienveillance", "Arrivée"]]),
    blk("🧭 M'organiser dans le service", [["Organisation d'une journée par catégorie professionnelle", "Semaine 1"], ["Principe du « plein-vide »", "Arrivée"], ["Réaliser la check-list de la tenue d'une chambre", "Semaine 1"], ["Participer au staff journalier", "Arrivée"], ["Planifier et organiser son travail sur le secteur", "Semaines 2-3"], ["Analyser et synthétiser pour la continuité des soins", "Semaines 2-3"], ["Collaborer avec les intervenants (kiné, diét., psy…)", "Semaines 2-3"], ["Connaître le matériel spécifique", "Semaines 2-3"], ["Sécuriser la salle de soins", "Arrivée"]]),
    blk("💻 Logiciels & traçabilité", [["Surveillance & traçabilité des soins sur REASSIST", "Semaine 1"], ["Logiciels : Clinicom, Cyberlab, Pharma, Norméa…", "Semaines 2-3"], ["Procédure dégradée en cas de panne informatique", "Semaines 2-3"]]),
    blk("🩺 Soins & clinique (avec l'IDE)", [["Accompagner les actes essentiels de la vie quotidienne", "Arrivée"], ["Soins d'hygiène et de confort adaptés à l'état", "Semaine 1"], ["Installer et mobiliser (manutention, prévention)", "Semaine 1"], ["Prévention des escarres : posture, change, état cutané", "Arrivée"], ["Mesurer les paramètres vitaux, évaluer la douleur", "Semaine 1"], ["Glycémie capillaire (lecture instantanée)", "Semaine 1"], ["Recueillir et transmettre les observations", "Semaines 2-3"], ["Discerner le caractère urgent et alerter l'IDE", "Semaines 2-3"], ["Préparer / accompagner pour un examen ou le bloc", "Semaines 2-3"], ["Soins de confort selon l'état (trachéo, VNI)", "Fin de stage"]]),
    blk("🧼 Hygiène & environnement", [["Précautions standard", "Arrivée"], ["Précautions complémentaires (isolement)", "Arrivée"], ["Asepsie lors d'un soin", "Arrivée"], ["Entretien des locaux et du matériel (bionettoyage)", "Semaine 1"], ["Circuits linge / déchets / DM", "Semaine 1"], ["Circuits de l'alimentation", "Semaines 2-3"], ["Repérer et signaler les anomalies du matériel", "Semaines 2-3"]]),
    blk("🤝 Équipe, communication & qualité", [["Communiquer avec la personne et son entourage", "Arrivée"], ["Donner les informations pratiques à l'accueil", "Semaine 1"], ["Transmettre les informations pertinentes à l'équipe", "Semaine 1"], ["Identifier son champ d'intervention et coopérer", "Semaines 2-3"], ["Signaler les événements indésirables", "Semaines 2-3"], ["S'auto-évaluer et repérer ses axes d'amélioration", "Fin de stage"]]),
  ],
  na_as: [
    blk("🧭 Posture & incontournables", [["Textes de la profession ; droits du patient & chartes", "7 j"], ["Procédure en cas de plan blanc", "1 mois"], ["Discrétion, dignité, consentement", "Accueil"], ["Écoute, tact et diplomatie", "Accueil"], ["Vigilance, prise d'initiatives selon compétences", "15 j"], ["S'impliquer dans la réussite des objectifs du service", "6 mois"], ["Mission d'encadrement et de tutorat", "6 mois"], ["Collaboration, entraide, bienveillance", "Accueil"]]),
    blk("🧭 M'organiser dans le service", [["Organisation d'une journée par catégorie professionnelle", "7 j"], ["Principe du « plein-vide »", "Accueil"], ["Check-list de la tenue d'une chambre", "7 j"], ["Connaître le matériel spécifique", "15 j"], ["Planifier et organiser son secteur", "15 j"], ["Analyser/synthétiser pour la continuité des soins", "1 mois"], ["Se positionner dans l'équipe", "1 mois"], ["Collaborer avec les intervenants", "1 mois"], ["Tâches en l'absence de l'AS au matériel", "2 mois"], ["Commander à la reprographie", "1 mois"], ["Sécuriser la salle de soins", "Accueil"]]),
    blk("💻 Logiciels & traçabilité", [["Surveillance & traçabilité sur REASSIST", "7 j"], ["Clinicom, Cursus, Cyberlab, Pharma, Théo, Norméa, ENNOV", "15 j"], ["Procédure dégradée en cas de panne", "15 j"]]),
    blk("🩺 Soins & clinique (avec l'IDE)", [["Accompagner les actes essentiels de la vie quotidienne", "Accueil"], ["Soins d'hygiène et de confort adaptés", "7 j"], ["Installer et mobiliser (manutention, prévention)", "7 j"], ["Prévention des escarres : posture, change", "Accueil"], ["Paramètres vitaux, douleur, surveillances", "7 j"], ["Glycémie capillaire", "7 j"], ["Recueillir / transmettre les observations", "15 j"], ["Discerner le caractère urgent et alerter", "15 j"], ["Confort selon l'état (trachéo, VNI)", "1 mois"], ["Accompagner pour un examen / le bloc", "15 j"]]),
    blk("🧼 Hygiène & environnement", [["Précautions standard et complémentaires", "Accueil"], ["Asepsie lors d'un soin", "Accueil"], ["Entretien locaux / matériel (bionettoyage)", "7 j"], ["Circuits linge / déchets / DM, alimentation", "15 j"], ["Repérer et signaler les anomalies du matériel", "1 mois"]]),
    blk("🤝 Équipe, communication & qualité", [["Communiquer avec la personne et l'entourage", "Accueil"], ["Donner les informations pratiques à l'accueil", "7 j"], ["Transmettre les informations pertinentes", "7 j"], ["Identifier son champ d'intervention et coopérer", "15 j"], ["Signaler les événements indésirables", "1 mois"], ["Contribuer à la démarche qualité / gestion des risques", "2 mois"], ["Encadrer un élève AS", "6 mois"]]),
  ],
};

export const HABIL: [string, string][] = [
  ["reassist", "REASSIST (prescription / surveillance)"], ["logs", "Clinicom · Cyberlab · Pharma"], ["normea", "Norméa · ENNOV"], ["afgsu", "AFGSU 2 à jour"], ["forma", "Formations obligatoires (incendie…)"], ["proc", "Lecture des procédures clés"], ["badge", "Badge & accès (vestiaires, locaux)"],
];
export const PALIERSV: [string, string][] = [
  ["jour", "Autonomie de jour validée"], ["nuit", "Feu vert pour la nuit"], ["fin", "Validation de la fin de période d'intégration"],
];
