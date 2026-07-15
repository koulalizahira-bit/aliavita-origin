// Contenu du service : identité, infos pratiques, annuaire (anonymisé), glossaire, normes.

export const SERVICE = {
  titre: "Unité de Soins Intensifs",
  sousTitre: "Établissement · USI",
  etablissement: "Établissement",
};

// Mot de bienvenue — à personnaliser librement (texte du cadre).
export const BIENVENUE = {
  titre: "Bienvenue parmi nous",
  signature: "Le cadre de santé & l'infirmière coordinatrice (IDEC)",
  paragraphes: [
    "Bienvenue dans notre unité de soins intensifs. Nous sommes heureux de vous accueillir dans l'équipe, que vous soyez étudiant·e, élève ou nouvel·le arrivant·e.",
    "Vous serez accompagné·e tout au long de votre intégration. Vous n'êtes jamais seul·e : votre tuteur, vos collègues, le cadre de santé et l'infirmière coordinatrice sont là pour vous guider. L'IDEC assure notamment le suivi des étudiants et de plusieurs missions d'encadrement.",
    "Prenez le temps de découvrir le service, de poser vos questions et de progresser à votre rythme. Apprendre, douter et demander font partie du métier : c'est ainsi qu'on devient un·e soignant·e sûr·e.",
    "Le droit à l'erreur fait partie de l'apprentissage : ce qui compte, c'est de signaler, d'en parler et d'apprendre ensemble. Personne n'est jugé pour avoir demandé de l'aide ou déclaré une difficulté.",
    "Cette application est votre carnet de route : le service, l'équipe, votre parcours, les fiches utiles et les infos pratiques. Bonne intégration !",
  ],
};

// Écoles / IFMS (Institut de Formation aux Métiers de la Santé)
export const ECOLES = [
  "IFMS de l'établissement",
  "IFMS partenaire",
];

// Infos pratiques élargies (statiques, communes à tous)
export const INFOS_EXTRA: [string, string][] = [
  ["Salle de pause", "Une salle de pause est à votre disposition, équipée d'un micro-ondes et d'un réfrigérateur. Rien à manger ni à boire en zone de soins."],
  ["Restauration", "Self / cafétéria de l'établissement. Possibilité de commander un pique-nique (voir Contacts)."],
  ["Parking & accès", "Parking du personnel accessible avec la carte de l'établissement, ou parking visiteur. Se renseigner auprès de l'accueil sur les accès disponibles."],
  ["Vestiaires & badge", "Vestiaires attribués ; un badge d'accès vous est remis à l'arrivée (vestiaires, locaux, service)."],
  ["Médecine du travail", "Suivi assuré par le service de santé au travail de l'établissement."],
];

// Charte des bonnes pratiques en stage / d'arrivée
export const CHARTE: string[] = [
  "Secret professionnel : tout ce que vous voyez, entendez ou lisez reste strictement confidentiel.",
  "Aucune donnée patient sur un téléphone personnel : pas de photo, pas de nom, pas de capture d'écran.",
  "Respect de l'intimité, de la dignité et du consentement de chaque patient.",
  "Tenue professionnelle : zéro bijou, cheveux attachés, ongles courts sans vernis ; blouse pour sortir du service.",
  "Pas de téléphone personnel en zone de soins.",
  "Ponctualité et fiabilité : prévenez en cas de retard ou d'absence.",
  "Hygiène des mains et précautions standard à chaque soin.",
  "Posture d'apprentissage : observer, demander, et ne jamais agir dans le doute.",
  "Signalement : déclarez tout événement indésirable (ENNOV), sans crainte d'être jugé·e.",
  "Respect de l'équipe, des patients et des règles du service.",
];

export const UNITES = [
  {
    code: "Réa",
    nom: "Soins Intensifs Post-Réanimation",
    texte: "20 lits. Patients en aval de réanimation : surveillance rapprochée, sevrage, gestes lourds. DMS ≈ 5 jours. Staff médical à 8h45. 4 secteurs.",
  },
  {
    code: "Chir",
    nom: "Soins Intensifs Post-Opératoire",
    texte: "15 lits. Surveillance rapprochée au décours d'une chirurgie. DMS ≈ 24–48 h. Staff médical à 8h30. 3 secteurs.",
  },
];

// Annuaire — numéros externes anonymisés pour la version de démonstration.
// Remplacer par les vrais numéros lors du déploiement institutionnel final.
export const ANN: [string, [string, string][]][] = [
  ["📟 Service & soignants", [["Salle de soins Réa", "8-5115"], ["Salle de soins Chir", "8-5334"], ["IDE Réa", "8-5166"], ["IDE Chir", "8-2474"], ["Bureau doc Réa", "8-8032 / 8-7705"], ["Bureau doc Chir", "8-7708"], ["Cadre de santé", "07 XX XX XX XX"], ["IDE coordinateur (IDEC)", "06 XX XX XX XX"], ["Cadre UMCH", "06 XX XX XX XX"], ["Coursier ASH", "06 XX XX XX XX"], ["BED Manager CHIR", "06 XX XX XX XX"], ["BED Manager MED", "07 XX XX XX XX"]]],
  ["🩺 Médecins & astreintes", [["MDG Réa", "06 XX XX XX XX"], ["MDG Chir", "06 XX XX XX XX"], ["IDG Réa", "07 XX XX XX XX"], ["Oncologie médicale", "06 XX XX XX XX"], ["Neurologie", "06 XX XX XX XX"], ["Pneumologie", "06 XX XX XX XX"], ["SMIT", "06 XX XX XX XX"], ["Hématologie", "06 XX XX XX XX"], ["Médecine polyvalente", "8-2167 / 8-7048"], ["Orthopédie", "06 XX XX XX XX"], ["Neurochir privé", "06 XX XX XX XX"]]],
  ["🤝 Paramédicaux", [["Stomathérapie", "8-4186 / 06 XX XX XX XX"], ["Kiné", "06 XX XX XX XX"], ["Kiné — week-end", "06 XX XX XX XX"], ["Assistante sociale", "8-6814 / 06 XX XX XX XX"], ["Diététicienne", "8-7979"], ["Ergothérapeute", "07 XX XX XX XX"], ["Ergothérapeute (attelles)", "06 XX XX XX XX"], ["Orthophoniste", "06 XX XX XX XX"], ["Psychologue", "06 XX XX XX XX"], ["Psychologue (2)", "06 XX XX XX XX / 8-5638"], ["IDE nutrition", "06 XX XX XX XX"], ["Hygiénistes", "8-4084 / 8-4041 / 8-5251"]]],
  ["🧪 Laboratoires", [["Biochimie (HO)", "8-3207"], ["Biochimie (hors HO)", "06 XX XX XX XX"], ["Hématologie (HO)", "8-7425"], ["Hématologie (hors HO)", "07 XX XX XX XX"], ["Microbiologie (HO)", "8-3102"], ["Microbiologie (hors HO)", "06 XX XX XX XX"], ["Anatomopathologie", "8-3461 / 8-8274"], ["Hémovigilance", "8-4014"]]],
  ["🩸 EFS", [["Navette EFS", "06 XX XX XX XX"], ["Distribution PSL", "04 XX XX XX XX"], ["Télécopie distribution", "*2644"]]],
  ["🩻 Imagerie", [["Radio", "8-3318"], ["Scan / IRM / échographie", "8-3318"], ["Doppler", "8-3313"], ["Imagerie neuroscience", "8-5244"]]],
  ["💊 Pharmacie", [["Préparateur RUSC", "8-3104"], ["Pharmacien soins critiques", "06 XX XX XX XX (sinon 8-3289)"], ["Délivrance stupéfiants", "8-8330"], ["Interne de garde", "8-2398 / 04 XX XX XX XX"], ["Suivi chimiothérapie", "8-3370"]]],
  ["🛏️ Matériel médical", [["Croix-Rousse (ceinture abdo)", "06 XX XX XX XX"], ["Matelas à air (24h/24)", "04 XX XX XX XX"], ["La Garrigue (corsets, orthèses)", "04 XX XX XX XX"], ["Protéor (minerves, corsets)", "04 XX XX XX XX"]]],
  ["🚑 Transport & prélèvements", [["Régulation UCB (intra)", "8-7744"], ["Régulation UTM (extra)", "8-3247"], ["Coordination dons d'organes", "8-421"], ["Astreinte coordination (nuit/WE)", "06 XX XX XX XX"]]],
  ["🚨 Sécurité & urgences", [["SAMU (poste fixe)", "15"], ["Pompiers (poste fixe)", "18"], ["SAMU régulation interne", "8-3329 (WE 8-3129)"], ["SAGU", "8-3129"], ["PC incendie", "8-4092"], ["PC sécurité", "8-3396"]]],
  ["🗂️ Administratif & divers", [["Bureau des entrées", "8-3409"], ["Identitovigilance", "8-3591"], ["Interprète", "8-3605"], ["Blanchisserie", "8-8040"], ["Chambre mortuaire", "8-3013"], ["Régie (coffre)", "8-3750"], ["Service télévision", "8-3772"], ["Commande pique-nique", "8-3894"], ["Biomédical", "8-4396"], ["Informatique", "8-4050"]]],
  ["🕊️ Aumôneries", [["Catholique (bureau)", "04 XX XX XX XX"], ["Protestante (bureau)", "04 XX XX XX XX"], ["Musulmane (bureau)", "04 XX XX XX XX"]]],
];

export const GLO: [string, string][] = [
  ["AFGSU", "Formation aux gestes et soins d'urgence"], ["AS / ASH", "Aide-soignant·e / Agent de service hospitalier"], ["AVK", "Antivitamine K"], ["BAVU", "Insufflateur manuel (ballon à valve)"], ["BPCO", "Broncho-pneumopathie chronique obstructive"], ["CDS / IDEC", "Cadre de santé / IDE coordinateur·rice"], ["CUSC", "Chariot d'urgences soins critiques"], ["DMS", "Durée moyenne de séjour"], ["DPI", "Dossier patient informatisé"], ["DSA", "Défibrillateur semi-automatique"], ["EPPI", "Eau pour préparation injectable"], ["GEP", "Gastrostomie endoscopique percutanée"], ["IADE", "Infirmier·e anesthésiste DE"], ["MHR", "Médicament à haut risque"], ["OAP", "Œdème aigu du poumon"], ["PAC", "Port-à-cath"], ["PCA / PCEA", "Analgésie contrôlée par le patient (péridurale pour PCEA)"], ["PECM", "Prise en charge médicamenteuse"], ["PSE", "Pousse-seringue électrique"], ["PSL", "Produit sanguin labile"], ["PTG / PTH", "Prothèse totale de genou / hanche"], ["RUSC", "Délivrance — soins critiques (pharmacie)"], ["SAD", "Sonde à demeure (urinaire)"], ["SDRA", "Syndrome de détresse respiratoire aiguë"], ["SNG", "Sonde naso-gastrique"], ["TCA", "Temps de céphaline activée"], ["UVIH", "Urgence vitale intra-hospitalière (chariot)"], ["USI", "Unité de soins intensifs (secteurs réanimation et chirurgie)"], ["VAC", "Pansement à pression négative"], ["VNI", "Ventilation non invasive"], ["VVC / VVP", "Voie veineuse centrale / périphérique"],
];

export const NORMS: [string, string][] = [
  ["Fréquence cardiaque", "60 – 100 /min"], ["Pression artérielle", "≈ 120/80 mmHg (PAM ≥ 65)"], ["Fréquence respiratoire", "12 – 20 /min"], ["SpO₂", "≥ 95 % (adaptée si BPCO)"], ["Température", "36,5 – 37,5 °C"], ["Score de Glasgow", "15 (min 3)"], ["Glycémie capillaire", "≈ 0,7 – 1,1 g/L à jeun"], ["Kaliémie", "3,5 – 5 mmol/L"], ["Natrémie", "135 – 145 mmol/L"], ["Diurèse", "≈ 0,5 – 1 mL/kg/h"],
];
