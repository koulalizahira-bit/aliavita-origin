"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "@/app/actions/auth";
import { LogIn, ShieldCheck } from "lucide-react";

function SubmitBtn({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="btn"
      style={{ width: "100%", background: "var(--coral)", color: "white", opacity: (pending || disabled) ? 0.5 : 1 }}
    >
      {pending ? "Connexion…" : "Se connecter"}
      <LogIn size={18} />
    </button>
  );
}

export default function OriginLoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(loginAction, {});
  const [pin, setPin] = useState("");
  const pinRef = useRef<HTMLInputElement>(null);
  const cells = [0, 1, 2, 3];

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Identifiant */}
      <div className="field">
        <label htmlFor="login-origin">Identifiant</label>
        <input
          id="login-origin"
          name="login"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="ex : cadre"
          required
        />
      </div>

      {/* PIN */}
      <div className="field">
        <label>Code PIN (4 chiffres)</label>
        <input type="hidden" name="pin" value={pin} />
        <div
          style={{ display: "flex", gap: "10px", justifyContent: "center", cursor: "text" }}
          onClick={() => pinRef.current?.focus()}
        >
          {cells.map((i) => (
            <div
              key={i}
              style={{
                width: "58px", height: "64px",
                borderRadius: "14px",
                border: `2px solid ${pin.length === i ? "var(--petrol)" : "rgba(124,58,237,.2)"}`,
                background: pin.length === i ? "var(--mint)" : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.8rem", fontWeight: 700, color: "var(--petrol-deep)",
                transition: "border-color .15s, background .15s",
                userSelect: "none",
              }}
            >
              {pin[i] ? "•" : ""}
            </div>
          ))}
        </div>
        <input
          ref={pinRef}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
          inputMode="numeric"
          autoComplete="one-time-code"
          className="sr-only"
          aria-label="Code PIN"
        />
      </div>

      {/* Erreur */}
      {state.error && (
        <div className="notice" style={{ background: "#fde8e8", borderColor: "#f9b4b4", color: "#8a2020" }}>
          {state.error}
        </div>
      )}

      <SubmitBtn disabled={pin.length < 4} />

      <p style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "6px", fontSize: "12px", color: "var(--grey)",
      }}>
        <ShieldCheck size={14} />
        Connexion sécurisée — données stockées localement
      </p>
    </form>
  );
}
