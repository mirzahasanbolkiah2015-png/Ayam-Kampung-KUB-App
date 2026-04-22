"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { DEFAULT_PRICES, FEED_PHASES, type FeedPhase } from "@/lib/kub-data";
import { type AppState, loadState, saveState } from "@/lib/store";

// ─── Derived helpers ──────────────────────────────────────────────────────────

export function getCurrentPhase(weekAge: number): FeedPhase | undefined {
  return FEED_PHASES.find(
    (p) => weekAge >= p.weekStart && weekAge <= p.weekEnd
  );
}

export function getDayAge(startDate: string): number {
  const start = new Date(startDate).getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
}

export function getWeekFromDay(dayAge: number): number {
  return Math.max(1, Math.ceil(dayAge / 7));
}

// ─── Context shape ────────────────────────────────────────────────────────────

export type FCRStatus = "efisien" | "normal" | "boros" | null;

export interface FCRResult {
  fcr: number;
  kenaikanBobot: number;
  status: FCRStatus;
  label: string;
  color: string;
}

export interface DataContextValue {
  state: AppState;
  loaded: boolean;
  setState: (updater: Partial<AppState> | ((prev: AppState) => AppState)) => void;
  resetState: () => void;

  // Derived values computed once here, consumed anywhere
  currentPhase: FeedPhase | undefined;
  dayAge: number;
  feedPerBirdGram: number;
  totalFeedKg: number;
  totalFeedKgPerDay: (count?: number) => number;
  estimatedWeightGram: number;
  progressPercent: number;

  // FCR derived result — available globally so FCR page can read input from /nutrisi
  fcrResult: FCRResult | null;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const DataContext = createContext<DataContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<AppState>({
    birdCount: 100,
    weekAge: 4,
    startDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    flockName: "Kandang A",
    prices: Object.fromEntries(
      DEFAULT_PRICES.map((p) => [p.id, p.defaultPrice])
    ),
  });
  const [loaded, setLoaded] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setStateRaw(loadState());
    setLoaded(true);
  }, []);

  const setState = useCallback(
    (updater: Partial<AppState> | ((prev: AppState) => AppState)) => {
      setStateRaw((prev) => {
        const next =
          typeof updater === "function"
            ? updater(prev)
            : { ...prev, ...updater };
        saveState(next);
        return next;
      });
    },
    []
  );

  const resetState = useCallback(() => {
    const fresh: AppState = {
      birdCount: 100,
      weekAge: 1,
      startDate: new Date().toISOString().split("T")[0],
      flockName: "Kandang Baru",
      prices: Object.fromEntries(
        DEFAULT_PRICES.map((p) => [p.id, p.defaultPrice])
      ),
    };
    saveState(fresh);
    setStateRaw(fresh);
  }, []);

  // ── Derived values ───────────────────────────────────────────────────────────

  const dayAge = getDayAge(state.startDate);
  const currentPhase = getCurrentPhase(state.weekAge);
  const feedPerBirdGram = currentPhase?.feedPerBirdGram ?? 0;
  const totalFeedKg = (feedPerBirdGram * state.birdCount) / 1000;

  const totalFeedKgPerDay = useCallback(
    (count?: number) => {
      const n = count ?? state.birdCount;
      return (feedPerBirdGram * n) / 1000;
    },
    [feedPerBirdGram, state.birdCount]
  );

  // Interpolate weight between phases
  const estimatedWeightGram = (() => {
    const phases = FEED_PHASES;
    const lastPhase = phases[phases.length - 1];
    if (state.weekAge >= lastPhase.weekEnd) return lastPhase.targetWeightGram;
    const phase = getCurrentPhase(state.weekAge);
    if (!phase) return 0;
    const prevPhase = phases[phases.indexOf(phase) - 1];
    const startWeight = prevPhase?.targetWeightGram ?? 40;
    const endWeight = phase.targetWeightGram;
    const progress =
      (state.weekAge - phase.weekStart) /
      Math.max(1, phase.weekEnd - phase.weekStart);
    return Math.round(startWeight + (endWeight - startWeight) * progress);
  })();

  // Target 1000g at week 12
  const progressPercent = Math.min(
    100,
    Math.round((estimatedWeightGram / 1000) * 100)
  );

  // FCR global result — computed from persisted input fields
  const fcrResult: FCRResult | null = (() => {
    const { totalPakan, bobotAwal, bobotAkhir } = state;
    const kenaikanBobot = bobotAkhir - bobotAwal;
    if (!totalPakan || !kenaikanBobot || kenaikanBobot <= 0) return null;
    const fcr = totalPakan / kenaikanBobot;
    let status: FCRStatus;
    let label: string;
    let color: string;
    if (fcr < 2) {
      status = "efisien"; label = "Sangat Efisien"; color = "text-emerald-600";
    } else if (fcr <= 2.5) {
      status = "normal"; label = "Normal"; color = "text-amber-600";
    } else {
      status = "boros"; label = "Boros — Perlu Evaluasi"; color = "text-red-600";
    }
    return { fcr, kenaikanBobot, status, label, color };
  })();

  const value: DataContextValue = {
    state,
    loaded,
    setState,
    resetState,
    currentPhase,
    dayAge,
    feedPerBirdGram,
    totalFeedKg,
    totalFeedKgPerDay,
    estimatedWeightGram,
    progressPercent,
    fcrResult,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData must be used inside <DataProvider>");
  }
  return ctx;
}
