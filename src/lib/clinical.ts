// Contenu clinique : compétences, fiches de surveillance, fiche de tâches, calcul de dose, quiz.

export interface Comp { code: string; titre: string; chez: string; eval: string; }

export const COMP_IDE: Comp[] = [
  { code: "1", titre: "Évaluer une situation clinique et établir un diagnostic infirmier", chez: "Repérer le pertinent dans des données qui changent vite (hémodynamique, neuro, respiratoire) et hiérarchiser.", eval: "Pertinence des informations recherchées · cohérence · pertinence du diagnostic de situation." },
  { code: "2", titre: "Concevoir et conduire un projet de soins infirmier", chez: "Planifier ses soins sur un secteur, rechercher le consentement, réagir en urgence avec méthode.", eval: "Contenu et planification · consentement · modalités de réalisation · réactions en urgence · organisation." },
  { code: "3", titre: "Accompagner une personne dans ses soins quotidiens", chez: "Hygiène et confort d'un patient sédaté, trachéotomisé ou sous VNI ; prévention des escarres.", eval: "Adéquation activités/besoins · respect des bonnes pratiques · identification des risques." },
  { code: "4", titre: "Mettre en œuvre des actions à visée diagnostique et thérapeutique", chez: "Cœur technique du service : thérapeutiques, calcul de dose exact, dispositifs, traçabilité.", eval: "Bonnes pratiques · respect de la prescription · exactitude du calcul · surveillance · gestion des risques · usage des DM · traçabilité." },
  { code: "5", titre: "Initier et mettre en œuvre des soins éducatifs et préventifs", chez: "Information du patient et de la famille ; prévention (escarres, infection).", eval: "Pertinence de la séquence éducative · soins préventifs · promotion de la santé." },
  { code: "6", titre: "Communiquer et conduire une relation dans un contexte de soins", chez: "Communiquer avec un patient vulnérable et un entourage anxieux.", eval: "Analyse de la relation · communication adaptée · recherche du consentement." },
  { code: "7", titre: "Analyser la qualité et améliorer sa pratique", chez: "Audits (PECM, hygiène, identitovigilance), CREX, application des protocoles.", eval: "Utilisation du protocole · règles · désinfection/stérilisation · vérification des matériels · analyse critique." },
  { code: "8", titre: "Rechercher et traiter des données professionnelles et scientifiques", chez: "Chercher l'information sur Norméa, questionner sa pratique.", eval: "Pertinence des données recherchées · qualité du questionnement." },
  { code: "9", titre: "Organiser et coordonner les interventions soignantes", chez: "Binôme IDE/AS, coordination kiné, imagerie, bloc ; transmissions fiables.", eval: "Champ d'intervention des acteurs · continuité des soins · fiabilité des transmissions." },
  { code: "10", titre: "Informer, former des professionnels et des personnes en formation", chez: "Collaborer avec l'AS et encadrer un étudiant ; transmettre son savoir-faire.", eval: "Collaboration avec un AS · transmission à un stagiaire." },
];

export const COMP_AS: Comp[] = [
  { code: "Bloc 1", titre: "Accompagnement & soins de la vie quotidienne", chez: "Toilette, change, repas, mobilisation d'un patient en soins critiques (souvent porteur de dispositifs), dans le respect du rythme et de la pudeur.", eval: "Adéquation aux besoins · sécurité · respect de l'autonomie de la personne." },
  { code: "Bloc 2", titre: "Évaluation clinique & soins en collaboration", chez: "Prendre les constantes, surveiller, repérer un changement et alerter l'IDE ; aider aux soins.", eval: "Fiabilité des mesures · repérage des situations à risque · transmission de l'alerte." },
  { code: "Bloc 3", titre: "Information & accompagnement", chez: "Rassurer le patient et l'entourage anxieux, accueillir, encadrer un nouvel élève AS.", eval: "Communication adaptée · information juste · posture d'accueil et de tutorat." },
  { code: "Bloc 4", titre: "Entretien de l'environnement & du matériel", chez: "Bionettoyage, gestion des circuits (linge, déchets, DM), réfection du lit, prévention du risque infectieux.", eval: "Respect des protocoles d'hygiène · sécurité · repérage des anomalies du matériel." },
  { code: "Bloc 5", titre: "Travail en équipe & qualité", chez: "Transmissions ciblées, traçabilité, participation aux temps d'équipe et à la démarche qualité/gestion des risques.", eval: "Fiabilité des transmissions · coopération · signalement des événements indésirables." },
];

export interface Fiche { em: string; t: string; sub: string; risk: string[]; surv: string[]; as: string[]; alert: string; }

export const FICHES: Fiche[] = [
  { em: "🧠", t: "Neurochirurgie", sub: "Exérèse de tumeur · Hématome sous-dural", risk: ["Hémorragie", "Diabète insipide", "Crises/coma", "Thrombo-embolique"], surv: ["Surveillance immédiate puis /4h", "Constantes + Glasgow ; pupilles ; motricité G/D", "Diurèse ; glycémie ± BU", "Pansement « capeline » ; exudrains selon consigne"], as: ["Installer en sécurité (tête selon prescription), lit strict", "Soins d'hygiène et prévention d'escarre", "Observer conscience, agitation, vomissements → alerter l'IDE", "Aide à la prise des constantes ; surveiller la diurèse", "Risque de fausse route : rien per os sans accord IDE"], alert: "LIT STRICT jusqu'à consignes. Fausse route possible → test de déglutition." },
  { em: "🍽️", t: "Chirurgie digestive", sub: "Hépatectomie · DPC · RAR · AAP · Sleeve", risk: ["Hémorragie", "Fistule", "Occlusion/iléus"], surv: ["Stomies (aspect), reprise gaz/selles", "Réfection des poches /jour", "Amylase/Lipase J3-J5 sur le drain", "SNG / GEP selon présence"], as: ["Réfection du lit, hygiène, prévention d'escarre", "Observer l'aspect des stomies/poches → signaler", "Aide au lever et à la mobilisation (manutention)", "Surveiller transit, nausées, douleur → transmettre", "Patient bariatrique : matelas à air, manutention adaptée"], alert: "Patient bariatrique : lit bariatrique + matelas à air." },
  { em: "🫀", t: "Vasculaire / thoracique", sub: "Lobectomie · Pontage · Carotide · Pneumothorax", risk: ["Hémorragie", "AVC", "Détresse respiratoire", "Dysphagie"], surv: ["Constantes /4h ; recherche d'hématome", "Carotide : lever J3 + test de déglutition", "Pontage : lever J5 selon prescription"], as: ["Aide aux constantes ; observer coloration/chaleur des membres", "Repérer essoufflement, hématome, douleur → alerter", "Carotide : signaler toute difficulté à avaler ou parler", "Aide au lever progressif selon prescription"], alert: "" },
  { em: "🫘", t: "Chirurgie urologique", sub: "Néphrectomie · Cystoprostatectomie · Néovessie", risk: ["Hémorragie/hématurie", "Hypotension", "Rétention"], surv: ["Diurèse ; SAD : déclivité, perméabilité", "Coloration des urines ; bilan E/S", "Stomies/sondes urétérales (aseptie)"], as: ["Surveiller couleur des urines, vider/mesurer les poches", "Soins d'hygiène, soin du méat, confort", "Bilan entrées/sorties, tracer la diurèse", "Signaler hématurie, douleur ou absence d'urines"], alert: "" },
  { em: "👄", t: "Chirurgie ORL", sub: "Bucco-pharyngectomie · Glossectomie · Laryngectomie", risk: ["Détresse respiratoire", "Hémorragie"], surv: ["À JEUN STRICT per os", "Trachéotomisé : pression ballonnet ≥ 3×/j, tête en flexion", "Hémodynamique, hématome/œdème"], as: ["À JEUN STRICT : ne rien donner per os", "Soins de bouche selon protocole, confort", "Trachéotomisé : tête en flexion, surveiller perméabilité, aspirations sur délégation", "Lambeau : pas d'appui côté donneur, installation prudente → alerter"], alert: "Lambeau : pas d'appui sur la jambe donneuse ; pas de pansement compressif côté lambeau." },
  { em: "🦴", t: "Chirurgie orthopédique", sub: "PTH · PTG · Polytraumatisé", risk: ["Hémorragie", "Luxation de prothèse", "Thrombo-embolique"], surv: ["PTH : coussin d'abduction ; pas de rotation > 90°", "Surveillance de la plaie (aspect, exsudat, sensibilité)"], as: ["PTH : coussin d'abduction, ne pas croiser les jambes", "Installation, prévention d'escarre", "Aide au 1ᵉʳ lever avec l'équipe (manutention)", "Surveiller douleur, plaie, coloration du membre → transmettre"], alert: "" },
  { em: "🌸", t: "Chirurgie gynécologique", sub: "Débulking ovarien · Hémorragie de la délivrance", risk: ["Douleur", "Iléus", "Déglobulisation"], surv: ["Hémocue /4h ; KT péridural : TA, pouls, SpO₂", "Drainages (quantité, aspect)"], as: ["Hygiène, confort, prévention d'escarre", "Observer saignements/garnitures, douleur → alerter", "Aide aux constantes"], alert: "" },
  { em: "🫁", t: "Détresses respiratoires (Réa)", sub: "IRA/IRC · BPCO · OAP · AAG · SDRA", risk: ["Hypoxie/hypercapnie", "Épuisement"], surv: ["SpO₂, FR, signes de lutte, gaz du sang", "Tolérance O₂ / VNI / ventilation"], as: ["Installer demi-assis, assurer le confort", "Observer FR, coloration, sueurs, agitation → alerter sans délai", "Aide aux soins ; oxygénothérapie sous supervision IDE"], alert: "" },
  { em: "💗", t: "Urgences cardio (Réa)", sub: "IDM · Choc cardiogénique · ACR", risk: ["Trouble du rythme", "Choc"], surv: ["Scope continu, ECG, douleur thoracique", "Hémodynamique, signes de choc"], as: ["Installer au repos, limiter les efforts", "Observer douleur thoracique, malaise, sueurs → alerter immédiatement", "Aide aux constantes et à la préparation de l'ECG"], alert: "" },
  { em: "🦠", t: "Sepsis & infectieux (Réa)", sub: "Choc septique · Pneumopathies", risk: ["Choc septique", "Défaillance multi-viscérale"], surv: ["T°, hémodynamique, lactates", "Horaires des antibiotiques", "Précautions complémentaires si besoin"], as: ["Hygiène rigoureuse ; appliquer les précautions complémentaires", "Surveiller température, frissons, conscience → transmettre", "Aide aux soins et au confort"], alert: "" },
];

export interface TacheSlot { t: string; title: string; tasks: string[]; }

export const TACHES: Record<string, TacheSlot[]> = {
  PR_jour: [
    { t: "07h00", title: "Relève", tasks: ["Transmissions orales."] },
    { t: "07h30-07h40", title: "Vérification par secteur", tasks: ["S1 : téléphone, vérif Optiflow. S2 (salle de soins) : frigo, 4 glycémies, 2 HEMOCUE, 6 obus O₂. S3 : chariots urgence, intubation difficile, fibroscopie, transport. S4 : stupéfiants."] },
    { t: "07h45-08h45", title: "Tour de 8h (avec l'AS)", tasks: ["Constantes, thérapeutiques, prélèvements, repas ; tour de sécurité (SUSI015) ; remise à zéro équipements/PCA."] },
    { t: "08h45", title: "Staff", tasks: ["Tableau Velléda par secteur."] },
    { t: "08h45-11h30", title: "Soins", tasks: ["Hygiène/nursing, lever sur prescription, examens, départs bloc, pansements, aide aux gestes."] },
    { t: "11h30-13h00", title: "Sortants & tour de 12h", tasks: ["Préparation des sortants, point médecins, 2ᵉ tour."] },
    { t: "13h00-16h00", title: "Soins 24h & mouvements", tasks: ["Soins des 24h, mises à jour, entrées/sorties, préparation de chambre."] },
    { t: "16h00-17h00", title: "Tour de 16h", tasks: ["Réajustement IV ; mercredi & dimanche : changement rampes/PSE."] },
    { t: "17h00-19h00", title: "Fin de journée", tasks: ["Mouvements, thérapeutiques, transmissions (DPI)."] },
    { t: "Le 1ᵉʳ dimanche", title: "Périodique", tasks: ["Réfection par secteur : intubation difficile, urgence (CUSC), fibroscopie."] },
  ],
  PR_nuit: [
    { t: "19h00", title: "Relève", tasks: ["Transmissions orales."] },
    { t: "19h30-19h45", title: "Vérifications", tasks: ["S1 : téléphone. S4 : stupéfiants."] },
    { t: "19h45-22h30", title: "Tour de 20h", tasks: ["Tour de sécurité (SUSI015) ; réarmement des chariots par secteur."] },
    { t: "22h30-23h00", title: "Tour médecin", tasks: ["Tour avec le médecin."] },
    { t: "23h00-00h30", title: "Pause + tour de 00h", tasks: ["Constantes, thérapeutiques, nursing."] },
    { t: "01h00-04h00", title: "Organisation", tasks: ["EPC du mardi ; S1 medi-math, S2 commandes, S3 retours pharmacie, S4 rangement."] },
    { t: "04h00-06h00", title: "Tour de 4h", tasks: ["Prélèvements ; prises de sang avant 9h."] },
    { t: "06h00-07h00", title: "Transmissions", tasks: ["DPI."] },
    { t: "Le 1ᵉʳ dimanche", title: "Périodique", tasks: ["Réfection par secteur (4 secteurs) : intubation difficile, urgence (CUSC), fibroscopie."] },
  ],
  PO_jour: [
    { t: "07h30-07h40", title: "Vérification par secteur", tasks: ["S1 : chariot d'urgence Chir, téléphone. S2 (salle de soins) : frigo, 3 glycémies, 1 HEMOCUE, 6 obus O₂. S3 : stupéfiants."] },
    { t: "07h45-08h45", title: "Tour de 8h", tasks: ["Tour de sécurité (SUSI015) ; remise à zéro."] },
    { t: "08h30", title: "Staff", tasks: ["Tableau Velléda."] },
    { t: "08h45-13h00", title: "Soins & tour de 12h", tasks: ["Hygiène/nursing, examens, sortants, 2ᵉ tour."] },
    { t: "13h00-17h00", title: "Soins 24h & tour de 16h", tasks: ["Mouvements, préparation de chambre, réajustement IV."] },
    { t: "17h00-19h00", title: "Fin de journée", tasks: ["Transmissions (DPI)."] },
    { t: "Tous les dimanches", title: "Périodique", tasks: ["Réfection d'un chariot par secteur (traçabilité)."] },
  ],
  PO_nuit: [
    { t: "19h30-19h45", title: "Vérifications", tasks: ["S1 : téléphone. S3 : stupéfiants."] },
    { t: "19h45-22h30", title: "Tour de 20h", tasks: ["Tour de sécurité ; réarmement des chariots."] },
    { t: "23h00-00h30", title: "Pause + tour de 00h", tasks: ["Constantes, nursing."] },
    { t: "01h00-04h00", title: "Organisation", tasks: ["S1 medi-math, S2 commandes, S3 retours pharmacie, rangement."] },
    { t: "04h00-06h00", title: "Tour de 4h", tasks: ["Prélèvements."] },
    { t: "06h00-07h00", title: "Transmissions", tasks: ["DPI."] },
    { t: "Le 1ᵉʳ dimanche", title: "Périodique", tasks: ["Réfection du chariot d'urgence (péremptions, CUSC)."] },
  ],
};

export interface Cas { t: string; sub: string; en: string; sol: string; }
export const CAS: Cas[] = [
  { t: "Catapressan", sub: "enfant 12 kg", en: "2 µg/kg (max 75 µg) ; dilution 150 µg/10 mL = 15 µg/mL.", sol: "a) 2 × 12 = <b>24 µg</b> (≤ 75). b) 24 ÷ 15 = <b>1,6 mL</b>." },
  { t: "Midazolam", sub: "enfant 14 kg", en: "0,5 mg/kg ; ampoule 5 mg/1 mL.", sol: "0,5 × 14 = <b>7 mg</b> ; 7 ÷ 5 = <b>1,4 mL</b> → 2 ampoules." },
  { t: "Amoxicilline IV", sub: "750 mg en 1 h · 20 gtt/mL", en: "Flacon 1 g + 10 mL EPPI ; dans 100 mL NaCl.", sol: "a) 100 mg/mL → 750 mg = <b>7,5 mL</b> (total ≈ 107,5 mL). b) (107,5 × 20) ÷ 60 ≈ <b>36 gtt/min</b>." },
  { t: "Insuline au PSE", sub: "6 UI/h", en: "1 mL (100 UI) dans NaCl QSP 50 mL.", sol: "d) 100 ÷ 50 = <b>2 UI/mL</b>. e) 6 ÷ 2 = <b>3 mL/h</b>. f) 7 UI/h → <b>3,5 mL/h</b>." },
  { t: "Héparine au PSE", sub: "10 000 UI/24h dans 48 mL", en: "Ampoules 5 mL = 25 000 UI.", sol: "a) 5000 UI/mL → 10 000 UI = <b>2 mL</b>. b) 48 ÷ 24 = <b>2 mL/h</b>. Surveillance TCA ; risque hémorragie." },
];

export interface QItem { q: string; o: string[]; a: number; e: string; }
export const QUIZ_IDE: QItem[] = [
  { q: "Ballonnet d'un trachéotomisé : contrôle ?", o: ["1×/jour", "Au moins 3×/jour", "À l'admission", "Jamais"], a: 1, e: "Au moins 3×/jour, tête en flexion." },
  { q: "Après tumeur cérébrale, paramètre neuro central ?", o: ["Diurèse", "Score de Glasgow", "Glycémie", "FC"], a: 1, e: "Glasgow + pupilles + motricité, /4h." },
  { q: "PTH : entre les jambes avant de tourner ?", o: ["Un billot", "Un coussin d'abduction", "Rien", "Une attelle"], a: 1, e: "Coussin d'abduction, pas de rotation > 90°." },
  { q: "500 mL en 4 h → débit ?", o: ["100", "125", "200", "62"], a: 1, e: "500 ÷ 4 = 125 mL/h." },
  { q: "Priorité de repérage à l'arrivée ?", o: ["Le self", "UVIH, DSA, intubation", "Les congés", "Le code café"], a: 1, e: "Le matériel d'urgence d'abord." },
  { q: "Carotide opérée : requis à l'admission ?", o: ["Lever immédiat", "Test de déglutition", "Anticoagulation", "SNG"], a: 1, e: "Test de déglutition ; lever J3." },
  { q: "Une alarme du scope sonne. D'abord ?", o: ["La faire taire", "Regarder le patient", "Baisser le son", "Attendre"], a: 1, e: "Le patient avant l'écran." },
  { q: "Lambeau au membre inférieur : à proscrire ?", o: ["L'hydratation", "L'appui sur la jambe donneuse", "La surveillance", "Les antalgiques"], a: 1, e: "Pas d'appui sur la jambe donneuse." },
  { q: "Où trouver les procédures ?", o: ["Un cahier", "Norméa", "Le téléphone perso", "Le brancardier"], a: 1, e: "Norméa centralise les procédures." },
  { q: "Précautions standard : que faire ?", o: ["Bijoux ok", "Hygiène des mains + tenue adaptée", "Téléphone en chambre", "Vernis ok"], a: 1, e: "Hygiène des mains, tenue, zéro bijou." },
  { q: "MHR — exemples ?", o: ["Paracétamol", "Anticoagulants, insuline, KCl", "Sérum phy", "Pastilles"], a: 1, e: "Double vérification, traçabilité." },
  { q: "Prévenir l'escarre ?", o: ["Toujours sur le dos", "Changements de position réguliers", "Immobile", "Assis 12h"], a: 1, e: "Changements de position, effleurage, support adapté." },
];
export const QUIZ_AS: QItem[] = [
  { q: "Prévention de l'escarre : priorité ?", o: ["Rester immobile", "Changements de position réguliers", "Position assise 12h", "Rien"], a: 1, e: "Changements de position, effleurage doux, support adapté." },
  { q: "Avant tout soin : geste de base ?", o: ["Mettre des bijoux", "Hygiène des mains", "Ouvrir la fenêtre", "Téléphoner"], a: 1, e: "Hygiène des mains + tenue adaptée, zéro bijou." },
  { q: "Constante anormale relevée : que faites-vous ?", o: ["Rien", "Je préviens l'IDE", "J'attends demain", "Je modifie le traitement"], a: 1, e: "L'AS mesure, transmet et alerte ; il n'ajuste pas les traitements." },
  { q: "Bionettoyage d'une chambre : sens ?", o: ["Du sale vers le propre", "Du plus propre vers le plus sale", "Au hasard", "Sans gant"], a: 1, e: "Du plus propre au plus sale, produit et protocole adaptés." },
  { q: "Patient à jeun pour le bloc :", o: ["Lui donner un café", "Respecter le jeûne", "Donner de l'eau", "Un yaourt"], a: 1, e: "Respecter le jeûne, rien per os, le signaler." },
  { q: "Tri des déchets de soins :", o: ["Tout en DAOM", "DASRI pour le contaminé/piquant", "Tout en DASRI", "Avec le linge"], a: 1, e: "DASRI séparés des DAOM." },
  { q: "Aide au repas, risque de fausse route :", o: ["Allongé et vite", "Assis, texture adaptée, sans presser", "Debout", "En parlant"], a: 1, e: "Position assise, texture adaptée, on ne presse pas." },
  { q: "Patient trachéotomisé : installation ?", o: ["Tête en hyperextension", "Tête en flexion, voies perméables", "À plat ventre", "Peu importe"], a: 1, e: "Tête en flexion, surveiller la perméabilité." },
  { q: "Principe du « plein-vide » :", o: ["Vider sans remplir", "Réapprovisionner pour le poste suivant", "Tout jeter", "Ne rien toucher"], a: 1, e: "On laisse un environnement réapprovisionné et prêt." },
  { q: "Surveillance nutritionnelle, rôle AS :", o: ["Prescrire un régime", "Surveiller et tracer la prise alimentaire", "Poser une SNG", "Rien"], a: 1, e: "Observer et tracer les ingestas, signaler les difficultés." },
  { q: "Transmission de fin de poste :", o: ["Tout dire en vrac", "Cibler l'information utile à l'équipe", "Ne rien dire", "À l'oral seulement"], a: 1, e: "Transmission ciblée, écrite et orale, fiable." },
  { q: "Précautions complémentaires (isolement) :", o: ["Optionnelles", "Appliquer selon la signalétique/prescription", "Jamais", "Au choix"], a: 1, e: "On applique les précautions affichées (contact, gouttelettes, air)." },
];
