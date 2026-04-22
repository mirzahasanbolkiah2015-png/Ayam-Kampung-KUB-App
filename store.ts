"use client";
import { useState, useEffect } from "react";
import { DEFAULT_PRICES } from "./kub-data";

export interface AppState {
  birdCount: number;
  weekAge: number;
  startDate: string;
  flockName: string;
  prices: Record<string, number>;
  // FCR input fields — persisted so they survive page navigation
  totalPakan: number;
  bobotAwal: number;
  bobotAkhir: number;
}

const DEFAULT_STATE: AppState = {
  birdCount: 100,
  weekAge: 4,
  startDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  flockName: "Kandang A",
  prices: Object.fromEntries(DEFAULT_PRICES.map((p) => [p.id, p.defaultPrice])),
  totalPakan: 0,
  bobotAwal: 0,
  bobotAkhir: 0,
};

const STORAGE_KEY = "pakankub_state";

export function loadState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function useAppState() {
  const [state, setStateRaw] = useState<AppState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setStateRaw(loadState());
    setLoaded(true);
  }, []);

  function setState(updater: Partial<AppState> | ((prev: AppState) => AppState)) {
    setStateRaw((prev) => {
      const next =
        typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      saveState(next);
      return next;
    });
  }

  return { state, setState, loaded };
}
