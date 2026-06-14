import { cookies } from "next/headers";

export const SESSION_COOKIE = "sid-origin";

export type OriginRole = "agent" | "tuteur";

export interface OriginUser {
  id: string;
  login: string;
  role: OriginRole;
  displayName: string;
}

const USERS: (OriginUser & { pin: string })[] = [
  { id: "u-agent",  login: "equipe",  pin: "0000", role: "agent",  displayName: "Équipe soignante" },
  { id: "u-tuteur", login: "tuteur",  pin: "1234", role: "tuteur", displayName: "Tuteur / IDEC"    },
];

export async function getCurrentUser(): Promise<OriginUser | null> {
  const store = await cookies();
  const id = store.get(SESSION_COOKIE)?.value;
  if (!id) return null;
  const u = USERS.find((u) => u.id === id);
  if (!u) return null;
  return { id: u.id, login: u.login, role: u.role, displayName: u.displayName };
}

export function validateUser(login: string, pin: string): OriginUser | null {
  const u = USERS.find(
    (u) => u.login === login.toLowerCase().trim() && u.pin === pin.trim()
  );
  if (!u) return null;
  return { id: u.id, login: u.login, role: u.role, displayName: u.displayName };
}

export function homePathForRole(role: OriginRole): string {
  return role === "tuteur" ? "/app/tuteur" : "/app/agent";
}
