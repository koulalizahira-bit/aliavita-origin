"use client";
// Stockage local (sur l'appareil) : profils, progression, bilans, paliers, quiz.
// Marche hors-ligne ; rien n'est envoyé sur un serveur.

import type { Profile } from "./types";

const MEM: Record<string, string> = {};
const get = (k: string): string | null => {
  try {
    const v = localStorage.getItem(k);
    return v === null ? (k in MEM ? MEM[k] : null) : v;
  } catch {
    return k in MEM ? MEM[k] : null;
  }
};
const set = (k: string, v: string) => {
  try { localStorage.setItem(k, v); } catch { /* ignore */ }
  MEM[k] = v;
};
const del = (k: string) => {
  try { localStorage.removeItem(k); } catch { /* ignore */ }
  delete MEM[k];
};
export function jget<T>(k: string, d: T): T {
  const v = get(k);
  try { return v ? (JSON.parse(v) as T) : d; } catch { return d; }
}
export function jset(k: string, o: unknown) { set(k, JSON.stringify(o)); }

// déverrouillages en mémoire (par session)
const unlocked: Record<string, boolean> = {};

export function profiles(): Profile[] { return jget<Profile[]>("usic_profiles", []); }
export function setProfiles(p: Profile[]) { jset("usic_profiles", p); }
export function activeId(): string | null { return get("usic_active"); }
export function setActiveId(id: string) { set("usic_active", id); }
export function activeProfile(): Profile | null {
  const id = activeId();
  return profiles().find((p) => p.id === id) || null;
}
export function pkey(id: string, s: string) { return "usic_" + id + "_" + s; }

export function master(): string | null { return get("usic_master"); }
export function setMasterCode(v: string | null) {
  if (v && v.trim()) set("usic_master", v.trim());
  else del("usic_master");
}

// ===== Mode encadrant (cadre / IDEC) — déverrouillé par le code cadre =====
// Déverrouillage PERSISTANT (survit au rechargement) : stocké sur l'appareil.
export function hasMaster(): boolean { return !!master(); }
export function staffUnlocked(): boolean { return get("usic_staff") === "1"; }
export function lockStaff() { del("usic_staff"); }
export function unlockStaff(code: string): boolean {
  const m = master();
  if (m && code === m) { set("usic_staff", "1"); return true; }
  return false;
}

export function isUnlocked(p: Profile): boolean { return !p.pin || !!unlocked[p.id]; }
export function tryUnlock(p: Profile, code: string): boolean {
  if (!p.pin || unlocked[p.id]) return true;
  if (code === p.pin || (master() && code === master())) {
    unlocked[p.id] = true;
    return true;
  }
  return false;
}
export function markUnlocked(id: string) { unlocked[id] = true; }

export function createProfile(p: Profile) {
  const list = profiles();
  list.push(p);
  setProfiles(list);
  if (p.pin) unlocked[p.id] = true;
  setActiveId(p.id);
}
export function deleteProfile(id: string) {
  setProfiles(profiles().filter((p) => p.id !== id));
  ["parcours", "tuteur", "paliers", "quiz"].forEach((s) => del(pkey(id, s)));
  if (activeId() === id) del("usic_active");
}
export function updateProfile(id: string, patch: Partial<Profile>) {
  const list = profiles();
  const p = list.find((x) => x.id === id);
  if (p) { Object.assign(p, patch); setProfiles(list); }
}

export function initials(n: string) { return n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase(); }
export function shortName(n: string) {
  const a = n.split(/\s+/);
  return a.length > 1 ? a[0] + " " + a[a.length - 1][0] + "." : n;
}
