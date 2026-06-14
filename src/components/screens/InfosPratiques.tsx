"use client";
import { useApp } from "../AppContext";
import { MODES } from "@/lib/parcours";
import { INFOS_EXTRA } from "@/lib/content";
import type { ModeKey } from "@/lib/types";

function modeInfos(m: ModeKey): [string, string][] {
  const cfg = MODES[m];
  const etu = m.indexOf("etu") > -1;
  const ide = cfg.prof === "ide";
  const tenue = ide
    ? (etu
      ? "Vous venez avec vos 5 tenues blanches de votre IFMS. Établissement → blanchisserie (8-8040) ; extérieur → vous gérez votre linge."
      : "5 tenues vertes fournies par l'établissement, changées chaque jour ; blanchisserie (8-8040).")
    : (etu
      ? "Tenues fournies par votre école/IFAS (à apporter). Blanchisserie selon votre statut (8-8040)."
      : "Tenues vertes fournies par l'établissement, changées chaque jour ; blanchisserie (8-8040).");
  const staff = cfg.prof === "as"
    ? "Chir 8h30 · Réa 8h45 — le staff est un moment clé pour apprendre."
    : "Chir 8h30 · Réa 8h45 (sauf WE & fériés).";
  const tut: Record<ModeKey, string> = {
    etu_ide: "Bilan d'accueil, mi-stage (S5), final (S10).",
    na_ide: "Bilans accueil, J+15, 1, 2 et 3 mois.",
    etu_as: "Bilan d'accueil, mi-stage, final.",
    na_as: "Bilans accueil, 15 j, 1, 2 et 6 mois.",
  };
  return [
    ["Tenue", tenue],
    ["Règles d'or", "Zéro bijou, cheveux attachés, ongles courts sans vernis. Blouse pour sortir. Pas de téléphone perso en zone de soins."],
    ["Horaires", "Journée 7h–19h · Nuit 19h–7h, toujours + relève."],
    ["Staff médical", staff],
    ["Procédures", "Toutes sur Norméa."],
    ["Votre tuteur", tut[m]],
  ];
}

export default function InfosPratiques() {
  const { profile } = useApp();
  const rows = modeInfos(profile?.mode || "etu_ide");

  return (
    <section className="page">
      <span className="eyebrow">Au quotidien</span>
      <h2 className="title">Infos pratiques</h2>
      <p className="lead">L&apos;essentiel pour vous repérer dès les premiers jours.</p>

      <div className="card">
        {rows.map(([k, v]) => <div className="info-row" key={k}><span className="k">{k}</span><span>{v}</span></div>)}
      </div>

      <h3 className="sub"><span className="dot" />Vie pratique sur place</h3>
      <div className="card">
        {INFOS_EXTRA.map(([k, v]) => <div className="info-row" key={k}><span className="k">{k}</span><span>{v}</span></div>)}
      </div>
    </section>
  );
}
