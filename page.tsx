"use client";
// PakanKUB — Dashboard utama ayam KUB

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bird,
  Clock,
  Weight,
  Wheat,
  Syringe,
  TrendingUp,
  Settings2,
  ChevronRight,
  CalendarDays,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { useData } from "@/app/context/DataContext";
import {
  calculateFeed,
  estimateWeight,
  getUpcomingVaccines,
  getFeedPhaseByWeek,
  formatRupiah,
  calculateCost,
  FEED_PHASES,
} from "@/lib/kub-data";

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-border flex flex-col gap-2">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-lg font-bold text-foreground leading-tight">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { state, setState, loaded } = useData();
  const [showSetup, setShowSetup] = useState(false);
  const [editForm, setEditForm] = useState({
    flockName: "",
    birdCount: 0,
    weekAge: 0,
    startDate: "",
  });

  useEffect(() => {
    if (loaded) {
      setEditForm({
        flockName: state.flockName,
        birdCount: state.birdCount,
        weekAge: state.weekAge,
        startDate: state.startDate,
      });
    }
  }, [loaded, state.flockName, state.birdCount, state.weekAge, state.startDate]);

  if (!loaded) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-muted-foreground">Memuat data...</div>
        </div>
      </AppShell>
    );
  }

  const feedCalc = calculateFeed(state.birdCount, state.weekAge);
  const weight = estimateWeight(state.weekAge);
  const phase = getFeedPhaseByWeek(state.weekAge);
  const upcomingVaccines = getUpcomingVaccines(state.weekAge * 7);
  const costCalc = calculateCost(feedCalc, state.prices);

  const progressPct = Math.min((state.weekAge / 12) * 100, 100);
  const daysLeft = Math.max(0, (12 - state.weekAge) * 7);

  function handleSaveSetup() {
    setState({
      flockName: editForm.flockName,
      birdCount: Number(editForm.birdCount),
      weekAge: Number(editForm.weekAge),
      startDate: editForm.startDate,
    });
    setShowSetup(false);
  }

  const phaseColor: Record<string, string> = {
    Starter: "bg-purple-100 text-purple-700",
    "Grower I": "bg-blue-100 text-blue-700",
    "Grower II": "bg-teal-100 text-teal-700",
    Finisher: "bg-amber-100 text-amber-800",
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.38_0.15_148)] to-[oklch(0.50_0.14_155)] text-white px-4 pt-12 pb-20">
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/8" />
        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bird size={18} className="text-white/80" />
              <span className="text-sm text-white/80 font-medium">PakanKUB</span>
            </div>
            <h1 className="text-2xl font-bold text-white leading-tight">{state.flockName}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  phaseColor[phase.phase] || "bg-white/20 text-white"
                }`}
              >
                Fase {phase.phase}
              </span>
              <span className="text-xs text-white/70">{phase.ageLabel}</span>
            </div>
          </div>
          <button
            onClick={() => setShowSetup(true)}
            className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Pengaturan kandang"
          >
            <Settings2 size={18} />
          </button>
        </div>

        {/* Progress to harvest */}
        <div className="relative mt-4">
          <div className="flex justify-between text-xs text-white/70 mb-1.5">
            <span>Progres menuju panen</span>
            <span>
              {state.weekAge} / 12 minggu ({daysLeft} hari lagi)
            </span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[oklch(0.85_0.16_80)] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="-mt-10 relative z-10 px-4">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<Bird size={18} className="text-[oklch(0.48_0.15_148)]" />}
            label="Jumlah Ayam"
            value={`${state.birdCount.toLocaleString()} ekor`}
            sub={`${state.birdCount > 0 ? (state.birdCount * 0.95).toFixed(0) : 0} estimasi hidup`}
            color="bg-[oklch(0.92_0.06_148)]"
          />
          <StatCard
            icon={<Weight size={18} className="text-amber-600" />}
            label="Estimasi Bobot"
            value={`${weight} gram`}
            sub={`Target: 900–1.100 g`}
            color="bg-amber-50"
          />
          <StatCard
            icon={<Wheat size={18} className="text-orange-600" />}
            label="Pakan Harian"
            value={`${feedCalc.totalFeedKg.toFixed(2)} kg`}
            sub={`${phase.feedPerBirdGram} g/ekor`}
            color="bg-orange-50"
          />
          <StatCard
            icon={<TrendingUp size={18} className="text-blue-600" />}
            label="Biaya Pakan/Hari"
            value={formatRupiah(costCalc.total)}
            sub={`${formatRupiah(costCalc.perEkor)}/ekor`}
            color="bg-blue-50"
          />
        </div>
      </div>

      {/* Growth Progress */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
          <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-[oklch(0.48_0.15_148)]" />
            Progress Pertumbuhan
          </h2>
          <div className="space-y-2.5">
            {FEED_PHASES.map((fp) => {
              const isDone = state.weekAge > fp.weekEnd;
              const isCurrent =
                state.weekAge >= fp.weekStart && state.weekAge <= fp.weekEnd;
              return (
                <div key={fp.phase} className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDone
                        ? "bg-[oklch(0.48_0.15_148)] text-white"
                        : isCurrent
                        ? "bg-amber-400 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <span className="text-[10px] font-bold">
                        {fp.phase[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs font-medium ${
                          isCurrent ? "text-amber-700" : isDone ? "text-[oklch(0.48_0.15_148)]" : "text-muted-foreground"
                        }`}
                      >
                        {fp.phase} (Mg {fp.weekStart}–{fp.weekEnd})
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {fp.targetWeightGram}g
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isDone
                            ? "bg-[oklch(0.48_0.15_148)]"
                            : isCurrent
                            ? "bg-amber-400"
                            : "bg-transparent"
                        }`}
                        style={{
                          width: isDone
                            ? "100%"
                            : isCurrent
                            ? `${
                                ((state.weekAge - fp.weekStart) /
                                  (fp.weekEnd - fp.weekStart + 1)) *
                                100
                              }%`
                            : "0%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Vaccines */}
      {upcomingVaccines.length > 0 && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Syringe size={16} className="text-purple-500" />
                Vaksin Mendatang
              </h2>
              <button
                onClick={() => router.push("/vaksin")}
                className="text-xs text-[oklch(0.48_0.15_148)] font-medium flex items-center gap-0.5"
              >
                Lihat semua <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {upcomingVaccines.map((v) => {
                const daysUntil = v.dayAge - state.weekAge * 7;
                const isUrgent = daysUntil <= 3;
                return (
                  <div
                    key={v.id}
                    className={`flex items-start gap-3 p-3 rounded-xl ${
                      isUrgent ? "bg-red-50 border border-red-200" : "bg-muted/50"
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isUrgent ? "bg-red-100" : "bg-[oklch(0.92_0.06_148)]"
                      }`}
                    >
                      {isUrgent ? (
                        <AlertCircle size={14} className="text-red-500" />
                      ) : (
                        <Syringe size={12} className="text-[oklch(0.48_0.15_148)]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-semibold truncate ${
                          isUrgent ? "text-red-700" : "text-foreground"
                        }`}
                      >
                        {v.vaccineName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Hari ke-{v.dayAge} ({v.method})
                      </p>
                    </div>
                    <div
                      className={`text-xs font-bold flex-shrink-0 ${
                        isUrgent ? "text-red-600" : "text-[oklch(0.48_0.15_148)]"
                      }`}
                    >
                      {daysUntil <= 0 ? "Hari ini!" : `${daysUntil}h lagi`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-4 mt-4 mb-2">
        <h2 className="text-sm font-semibold text-foreground mb-3">Aksi Cepat</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Kalkulator\nPakan", href: "/kalkulator", icon: <Wheat size={22} />, color: "bg-orange-50 text-orange-600 border-orange-200" },
            { label: "Estimasi\nBiaya", href: "/biaya", icon: <TrendingUp size={22} />, color: "bg-blue-50 text-blue-600 border-blue-200" },
            { label: "Jadwal\nVaksin", href: "/vaksin", icon: <Syringe size={22} />, color: "bg-purple-50 text-purple-600 border-purple-200" },
          ].map((item) => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`bg-white rounded-2xl p-3.5 shadow-sm border flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 ${item.color}`}
            >
              {item.icon}
              <span className="text-xs font-medium leading-tight text-center whitespace-pre-line text-foreground">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Phase Notes */}
      <div className="px-4 mt-4 mb-2">
        <div className="bg-[oklch(0.96_0.05_148)] rounded-2xl p-4 border border-[oklch(0.85_0.08_148)]">
          <div className="flex items-start gap-2">
            <Clock size={15} className="text-[oklch(0.48_0.15_148)] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[oklch(0.35_0.12_148)] mb-1">
                Catatan Fase {phase.phase}
              </p>
              <p className="text-xs text-[oklch(0.38_0.10_148)] leading-relaxed">
                {phase.notes}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Modal */}
      {showSetup && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-xl">
            <h2 className="text-base font-bold text-foreground mb-4">Pengaturan Kandang</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Nama Kandang
                </label>
                <input
                  type="text"
                  value={editForm.flockName}
                  onChange={(e) => setEditForm({ ...editForm, flockName: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-[oklch(0.48_0.15_148)]"
                  placeholder="Kandang A"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Jumlah Ayam (ekor)
                </label>
                <input
                  type="number"
                  min={1}
                  max={10000}
                  value={editForm.birdCount}
                  onChange={(e) => setEditForm({ ...editForm, birdCount: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 text-sm bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-[oklch(0.48_0.15_148)]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Umur Ayam (minggu)
                </label>
                <input
                  type="number"
                  min={1}
                  max={16}
                  value={editForm.weekAge}
                  onChange={(e) => setEditForm({ ...editForm, weekAge: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 text-sm bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-[oklch(0.48_0.15_148)]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Tanggal Mulai Masuk Kandang
                </label>
                <input
                  type="date"
                  value={editForm.startDate}
                  onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-[oklch(0.48_0.15_148)]"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowSetup(false)}
                className="flex-1 py-2.5 text-sm font-medium text-muted-foreground bg-muted rounded-xl hover:bg-border transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSaveSetup}
                className="flex-1 py-2.5 text-sm font-bold text-white bg-[oklch(0.48_0.15_148)] rounded-xl hover:bg-[oklch(0.42_0.15_148)] transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
