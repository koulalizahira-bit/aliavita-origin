import { redirect } from "next/navigation";
import { getCurrentUser, homePathForRole } from "@/lib/auth";
import OriginLoginForm from "@/components/OriginLoginForm";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect(homePathForRole(user.role));

  const comptesDemo = [
    { label: "Équipe soignante", login: "equipe",  pin: "0000" },
    { label: "Tuteur / IDEC",   login: "tuteur",  pin: "1234" },
  ];

  return (
    <main style={{
      minHeight: "100dvh",
      background: "linear-gradient(160deg, var(--petrol-deep) 0%, #0f0a1e 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* ─── Branding ALIA VITA · ORIGIN ─── */}
        <div style={{ textAlign: "center", color: "white", marginBottom: "32px" }}>

          {/* Icône ECG — même design que Prism et que l'en-tête applicatif */}
          <div style={{
            margin: "0 auto 20px",
            width: "88px", height: "88px",
            borderRadius: "24px",
            background: "#0f0a1e",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 12px 40px rgba(15,10,30,.55)",
          }}>
            <svg viewBox="0 0 48 48" fill="none" width="52" height="52">
              <path d="M 3,24 L 10,24 L 15,7 L 20,24 L 24,24 L 27.5,34 L 31,24 L 45,24"
                    stroke="#a899e8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="45" cy="24" r="3.5" fill="#fb923c"/>
            </svg>
          </div>

          <div style={{
            fontSize: "2.4rem", fontWeight: 900,
            letterSpacing: "0.18em", lineHeight: 1,
            fontFamily: "var(--font-bricolage), system-ui",
          }}>
            ALIAVITA
          </div>
          <div style={{
            fontSize: "2rem", fontWeight: 900,
            letterSpacing: "0.28em", lineHeight: 1,
            color: "var(--coral)", marginTop: "4px",
            fontFamily: "var(--font-bricolage), system-ui",
          }}>
            · ORIGIN ·
          </div>
          <p style={{
            marginTop: "10px", fontSize: "11px", fontWeight: 700,
            color: "var(--petrol-soft)", textTransform: "uppercase",
            letterSpacing: "0.26em",
          }}>
            Intégration · Encadrement
          </p>
        </div>

        {/* ─── Carte de connexion ─── */}
        <div className="card" style={{ borderRadius: "32px", padding: "28px 32px" }}>
          <h2 style={{
            textAlign: "center", marginBottom: "24px",
            color: "var(--petrol-deep)", fontFamily: "var(--font-bricolage)",
            fontSize: "1.25rem", fontWeight: 700,
          }}>
            Connexion
          </h2>
          <OriginLoginForm />
        </div>

        {/* ─── Comptes de démonstration ─── */}
        <div style={{
          marginTop: "20px", borderRadius: "24px",
          background: "rgba(255,255,255,0.08)", padding: "18px 20px",
          backdropFilter: "blur(8px)",
        }}>
          <p style={{
            textAlign: "center", fontSize: "13px", fontWeight: 700,
            color: "var(--petrol-soft)", marginBottom: "10px",
          }}>
            🔑 Comptes de démonstration
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
            {comptesDemo.map((c) => (
              <li key={c.login} style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.06)",
                borderRadius: "12px", padding: "8px 12px",
                fontSize: "13px", color: "rgba(255,255,255,0.75)",
              }}>
                <span>{c.label}</span>
                <span style={{ display: "flex", gap: "6px" }}>
                  <code style={{
                    background: "rgba(0,0,0,0.4)", padding: "3px 8px",
                    borderRadius: "7px", fontFamily: "monospace",
                    color: "var(--petrol-soft)", fontSize: "12px",
                  }}>{c.login}</code>
                  <code style={{
                    background: "rgba(0,0,0,0.4)", padding: "3px 8px",
                    borderRadius: "7px", fontFamily: "monospace",
                    color: "var(--petrol-soft)", fontSize: "12px",
                  }}>{c.pin}</code>
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </main>
  );
}
