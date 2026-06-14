"use client";
import { CHARTE } from "@/lib/content";

export default function Charte() {
  return (
    <section className="page">
      <span className="eyebrow">Bien vivre le stage</span>
      <h2 className="title">Charte des bonnes pratiques</h2>
      <p className="lead">Quelques repères simples qui valent pour tout le monde, dès le premier jour.</p>
      <div className="card">
        <ul className="surv">
          {CHARTE.map((c, i) => <li key={i} style={{ marginBottom: 8 }}>{c}</li>)}
        </ul>
      </div>
      <div className="notice rgpd" style={{ marginTop: 16 }}><span>🔒</span><div><b>Confidentialité avant tout :</b> aucune information ni image de patient ne doit sortir du service, ni se retrouver sur un téléphone personnel.</div></div>
    </section>
  );
}
