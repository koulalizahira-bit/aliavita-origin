"use client";
import { createContext, useContext, useCallback, useState, useEffect } from "react";
import type { Profile } from "@/lib/types";
import { activeProfile, profiles as readProfiles } from "@/lib/store";

interface AppState {
  ready: boolean;
  rev: number;            // incrémenté à chaque changement → re-render
  profile: Profile | null;
  list: Profile[];
  reload: () => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [rev, setRev] = useState(0);
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [list, setList] = useState<Profile[]>([]);

  const reload = useCallback(() => {
    setProfile(activeProfile());
    setList(readProfiles());
    setRev((r) => r + 1);
  }, []);

  useEffect(() => {
    setProfile(activeProfile());
    setList(readProfiles());
    setReady(true);
  }, []);

  return (
    <Ctx.Provider value={{ ready, rev, profile, list, reload }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp(): AppState {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp hors AppProvider");
  return c;
}
