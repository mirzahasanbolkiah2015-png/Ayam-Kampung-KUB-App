// ============================================================
// DATABASE UTAMA APLIKASI PANDUAN PETERNAKAN AYAM KUB
// Target Bobot 1 Kg dalam 60-90 Hari
// Referensi: Bulukumba, Sulawesi Selatan
// ============================================================

export interface FeedPhase {
  phase: string;
  weekStart: number;
  weekEnd: number;
  ageLabel: string;
  feedPerBirdGram: number; // gram/ekor/hari (nilai tengah)
  feedPerBirdMin: number;
  feedPerBirdMax: number;
  composition: {
    jagung: number;     // %
    dedak: number;      // %
    maggot: number;     // %
    azolla: number;     // %
    mineral: number;    // %
    konsentrat?: number; // % (fase starter)
  };
  notes: string;
  targetWeightGram: number; // target bobot akhir fase (gram)
}

export interface VaccineSchedule {
  id: number;
  dayAge: number;
  weekAge: number;
  vaccineName: string;
  vaccineType: string;
  method: string;
  methodDetail: string;
  dose: string;
  purpose: string;
  notes: string;
  color: string;
}

export interface HerbalRecipe {
  id: number;
  name: string;
  ingredients: string[];
  benefits: string[];
  frequency: string;
  howToMake: string;
  dose: string;
  ageRecommendation: string;
  icon: string;
}

export interface NutritionSource {
  id: number;
  nutrient: string;
  naturalSources: { name: string; content: string }[];
  function: string;
  deficiencySign: string;
  dose: string;
}

export interface PriceData {
  id: string;
  name: string;
  unit: string;
  defaultPrice: number; // Rp per kg
  emoji: string;
}

// ============================================================
// 1. DATA FASE PAKAN
// ============================================================
export const FEED_PHASES: FeedPhase[] = [
  {
    phase: "Starter",
    weekStart: 1,
    weekEnd: 2,
    ageLabel: "Minggu 1–2 (DOC – 14 hari)",
    feedPerBirdGram: 18,
    feedPerBirdMin: 15,
    feedPerBirdMax: 20,
    composition: {
      jagung: 35,
      dedak: 15,
      maggot: 5,
      azolla: 5,
      mineral: 5,
      konsentrat: 35,
    },
    notes:
      "Fase kritis – fokus pada adaptasi & pembentukan sistem imun. Protein tinggi sangat penting. Pastikan air minum bersih tersedia 24 jam. Tambahkan vitamin B-kompleks dan elektrolit di air minum.",
    targetWeightGram: 80,
  },
  {
    phase: "Grower I",
    weekStart: 3,
    weekEnd: 4,
    ageLabel: "Minggu 3–4 (15–28 hari)",
    feedPerBirdGram: 35,
    feedPerBirdMin: 30,
    feedPerBirdMax: 40,
    composition: {
      jagung: 42,
      dedak: 23,
      maggot: 12,
      azolla: 18,
      mineral: 5,
    },
    notes:
      "Pertumbuhan bulu mulai aktif. Maggot BSF segar sangat dianjurkan untuk efisiensi biaya protein. Azolla dapat diberikan segar. Pastikan kandang terventilasi baik.",
    targetWeightGram: 200,
  },
  {
    phase: "Grower II",
    weekStart: 5,
    weekEnd: 8,
    ageLabel: "Minggu 5–8 (29–56 hari)",
    feedPerBirdGram: 57,
    feedPerBirdMin: 50,
    feedPerBirdMax: 65,
    composition: {
      jagung: 45,
      dedak: 30,
      maggot: 13,
      azolla: 9,
      mineral: 3,
    },
    notes:
      "Fase tumbuh terpanjang – efisiensi pakan menentukan profitabilitas. Pertimbangkan penambahan minyak ikan (0.5%) untuk energi ekstra. Pantau FCR mingguan.",
    targetWeightGram: 600,
  },
  {
    phase: "Finisher",
    weekStart: 9,
    weekEnd: 12,
    ageLabel: "Minggu 9–12 (57–84 hari)",
    feedPerBirdGram: 78,
    feedPerBirdMin: 70,
    feedPerBirdMax: 85,
    composition: {
      jagung: 50,
      dedak: 25,
      maggot: 15,
      azolla: 7,
      mineral: 3,
    },
    notes:
      "Target bobot panen 900 g – 1.1 kg. Kurangi protein, tingkatkan energi (jagung). Stop herbal antibiotik minimal 7 hari sebelum panen. Pantau bobot tiap minggu dengan timbangan.",
    targetWeightGram: 1000,
  },
];

// ============================================================
// 2. JADWAL VAKSINASI
// ============================================================
export const VACCINE_SCHEDULES: VaccineSchedule[] = [
  {
    id: 1,
    dayAge: 1,
    weekAge: 0,
    vaccineName: "Marek's Disease",
    vaccineType: "Vaksin Aktif HVT",
    method: "Suntik Subkutan",
    methodDetail: "Suntik di bawah kulit leher belakang, dosis 0.2 ml/ekor",
    dose: "0.2 ml/ekor",
    purpose: "Mencegah tumor Marek yang mematikan",
    notes: "Dilakukan di hatchery/tempat pembibit. Biasanya sudah divaksin saat beli DOC.",
    color: "purple",
  },
  {
    id: 2,
    dayAge: 4,
    weekAge: 1,
    vaccineName: "Newcastle Disease (ND) – Lasota",
    vaccineType: "Vaksin Aktif Strain Lasota",
    method: "Tetes Mata / Hidung",
    methodDetail: "Teteskan 1 tetes (0.05 ml) ke mata atau lubang hidung menggunakan pipet vaksin",
    dose: "1 tetes/ekor (0.05 ml)",
    purpose: "Mencegah penyakit tetelo/pareh (ND), sangat menular dan mematikan",
    notes: "Encerkan dengan aquades steril. Gunakan pada pagi hari saat suhu rendah. Simpan dalam termos es.",
    color: "blue",
  },
  {
    id: 3,
    dayAge: 10,
    weekAge: 2,
    vaccineName: "Infectious Bronchitis (IB)",
    vaccineType: "Vaksin Aktif Strain H120",
    method: "Tetes Mata / Spray",
    methodDetail: "Tetes mata 1 tetes/ekor atau semprot di kandang dengan sprayer halus",
    dose: "1 tetes/ekor atau spray 0.05 ml/ekor",
    purpose: "Mencegah bronkitis infeksius – gangguan pernapasan serius",
    notes: "Bisa dikombinasikan dengan ND Lasota dalam satu aplikasi. Pastikan ventilasi baik setelah spray.",
    color: "teal",
  },
  {
    id: 4,
    dayAge: 14,
    weekAge: 2,
    vaccineName: "Gumboro (IBD)",
    vaccineType: "Vaksin Aktif Strain Intermediate",
    method: "Air Minum",
    methodDetail: "Encerkan dalam air minum bersih. Puasakan air 2 jam sebelum vaksinasi",
    dose: "1 dosis/ekor dalam air minum",
    purpose: "Mencegah Infectious Bursal Disease – merusak imun ayam",
    notes: "Gunakan air bersih tanpa klorin. Habiskan dalam 2 jam. Jangan campur dengan vitamin/obat.",
    color: "orange",
  },
  {
    id: 5,
    dayAge: 21,
    weekAge: 3,
    vaccineName: "Gumboro Ulang",
    vaccineType: "Vaksin Aktif Strain Intermediate Plus",
    method: "Air Minum",
    methodDetail: "Sama seperti vaksinasi Gumboro pertama",
    dose: "1 dosis/ekor",
    purpose: "Booster kekebalan terhadap Gumboro",
    notes: "Booster wajib untuk memperkuat kekebalan. Pantau konsumsi air minum.",
    color: "orange",
  },
  {
    id: 6,
    dayAge: 28,
    weekAge: 4,
    vaccineName: "Newcastle Disease (ND) Ulang",
    vaccineType: "Vaksin Aktif Lasota / Clone 45",
    method: "Air Minum",
    methodDetail: "Encerkan dalam air minum. Tambahkan susu skim 0.1% sebagai stabilizer vaksin",
    dose: "1 dosis/ekor",
    purpose: "Booster kekebalan ND yang lebih tahan lama",
    notes: "Susu skim melindungi vaksin dari klorin air. Puasakan air 1-2 jam sebelumnya.",
    color: "blue",
  },
  {
    id: 7,
    dayAge: 42,
    weekAge: 6,
    vaccineName: "Avian Influenza (AI) – H5N1",
    vaccineType: "Vaksin Inaktif (Mati)",
    method: "Suntik Intramuskular",
    methodDetail: "Suntik pada otot dada (pectoralis) atau otot paha luar, dosis 0.5 ml/ekor",
    dose: "0.5 ml/ekor",
    purpose: "Mencegah Flu Burung H5N1 yang sangat berbahaya",
    notes: "WAJIB di daerah endemis. Gunakan jarum baru tiap 10 ekor. Simpan 2-8°C, JANGAN dibekukan.",
    color: "red",
  },
  {
    id: 8,
    dayAge: 56,
    weekAge: 8,
    vaccineName: "Cacar Ayam (Fowl Pox)",
    vaccineType: "Vaksin Aktif",
    method: "Tusuk Sayap (Wing Web)",
    methodDetail: "Celupkan jarum tusuk ganda ke larutan vaksin, tusukkan ke membran sayap (webbing)",
    dose: "Satu tusukan di web sayap",
    purpose: "Mencegah cacar ayam yang menyebabkan lesi di kulit dan produksi turun",
    notes: "Cek reaksi 7 hari kemudian – harus ada keropeng/bisul kecil tanda vaksin berhasil.",
    color: "yellow",
  },
];

// ============================================================
// 3. TIPS & RAMUAN HERBAL
// ============================================================
export const HERBAL_RECIPES: HerbalRecipe[] = [
  {
    id: 1,
    name: "Jamu Kunyit + Jahe + Temulawak",
    ingredients: ["Kunyit segar 200 g", "Jahe segar 100 g", "Temulawak 100 g", "Air bersih 2 liter"],
    benefits: [
      "Anti-inflamasi alami",
      "Meningkatkan nafsu makan",
      "Memperkuat sistem imun",
      "Mencegah diare",
    ],
    frequency: "3x seminggu, pagi hari",
    howToMake:
      "Haluskan semua bahan, rebus dalam 2 liter air selama 20 menit, saring, dinginkan. Campurkan dalam air minum.",
    dose: "10 ml/liter air minum",
    ageRecommendation: "Mulai minggu ke-2",
    icon: "herb",
  },
  {
    id: 2,
    name: "Bawang Putih Tunggal",
    ingredients: ["Bawang putih tunggal 50 g", "Air bersih 1 liter"],
    benefits: [
      "Antibiotik alami (allicin)",
      "Anti-parasit internal",
      "Mencegah coccidiosis",
      "Meningkatkan nafsu makan",
    ],
    frequency: "2x seminggu",
    howToMake:
      "Cincang halus bawang putih, rendam dalam 1 liter air selama 30 menit, saring, campurkan dalam air minum.",
    dose: "5–10 ml/liter air minum",
    ageRecommendation: "Mulai minggu ke-1",
    icon: "garlic",
  },
  {
    id: 3,
    name: "Daun Pepaya Segar",
    ingredients: ["Daun pepaya muda 5–10 lembar", "Air bersih 1 liter"],
    benefits: [
      "Stimulan nafsu makan (papain)",
      "Anti-cacing alami",
      "Antioksidan tinggi",
      "Mempercepat pertumbuhan",
    ],
    frequency: "2x seminggu, atau sebagai pakan tambahan langsung",
    howToMake: "Rajang daun pepaya, rebus 10 menit, saring, campurkan dalam air minum ATAU berikan daun segar langsung.",
    dose: "2–3 lembar daun segar/ekor/hari atau 10 ml ekstrak/liter air",
    ageRecommendation: "Mulai minggu ke-3",
    icon: "leaf",
  },
  {
    id: 4,
    name: "Kayu Manis + Cengkeh",
    ingredients: ["Kayu manis 50 g", "Cengkeh 20 g", "Air bersih 2 liter"],
    benefits: [
      "Anti-jamur (aspergillosis)",
      "Anti-bakteri E. coli",
      "Meningkatkan kualitas daging",
      "Aroma sedap menambah nafsu makan",
    ],
    frequency: "1x seminggu",
    howToMake: "Rebus kayu manis dan cengkeh dalam 2 liter air selama 30 menit, saring, dinginkan.",
    dose: "10–15 ml/liter air minum",
    ageRecommendation: "Mulai minggu ke-4",
    icon: "spice",
  },
  {
    id: 5,
    name: "Lengkuas + Sirih",
    ingredients: ["Lengkuas segar 100 g", "Daun sirih 10 lembar", "Air bersih 1 liter"],
    benefits: [
      "Anti-jamur kulit",
      "Mencegah penyakit pernapasan",
      "Antiseptik alami",
      "Mengurangi bau kandang",
    ],
    frequency: "1x seminggu",
    howToMake: "Haluskan lengkuas, rebus bersama daun sirih dalam 1 liter air, saring.",
    dose: "10 ml/liter air minum atau semprot kandang",
    ageRecommendation: "Mulai minggu ke-3",
    icon: "herb",
  },
  {
    id: 6,
    name: "Molasses (Tetes Tebu)",
    ingredients: ["Molasses/tetes tebu 50 ml", "Air bersih 1 liter"],
    benefits: [
      "Sumber energi cepat",
      "Mengandung mineral alami (Fe, Zn, Mn)",
      "Mengurangi stres saat vaksinasi",
      "Mempercepat pemulihan pasca sakit",
    ],
    frequency: "Saat stres, vaksinasi, atau cuaca panas",
    howToMake: "Larutkan molasses langsung dalam air minum.",
    dose: "10–20 ml/liter air minum",
    ageRecommendation: "Semua umur",
    icon: "drop",
  },
];

// ============================================================
// 4. PANDUAN NUTRISI
// ============================================================
export const NUTRITION_SOURCES: NutritionSource[] = [
  {
    id: 1,
    nutrient: "Kalsium (Ca)",
    naturalSources: [
      { name: "Tepung tulang", content: "30% Ca" },
      { name: "Kapur pertanian (CaCO3)", content: "38% Ca" },
      { name: "Kerang bubuk", content: "33% Ca" },
      { name: "Batu kapur giling", content: "35% Ca" },
      { name: "Kulit telur kering bubuk", content: "37% Ca" },
    ],
    function: "Pembentukan tulang, kerabang telur, kontraksi otot, pembekuan darah",
    deficiencySign: "Tulang lunak (rickets), lumpuh, produksi telur turun, paruh bengkok",
    dose: "0.9–1.2% dari total pakan (periode tumbuh), 3.5–4.5% (periode layer)",
  },
  {
    id: 2,
    nutrient: "Fosfor (P)",
    naturalSources: [
      { name: "Tepung tulang", content: "12–15% P" },
      { name: "Dedak halus", content: "1.2% P" },
      { name: "Maggot BSF kering", content: "0.8% P" },
    ],
    function: "Pembentukan tulang bersama Ca, metabolisme energi (ATP), fungsi sel",
    deficiencySign: "Pertumbuhan terhambat, nafsu makan turun, tulang rapuh",
    dose: "0.45–0.6% dari total pakan",
  },
  {
    id: 3,
    nutrient: "Protein (Asam Amino)",
    naturalSources: [
      { name: "Maggot BSF segar", content: "40–42% protein kasar" },
      { name: "Maggot BSF kering", content: "40–45% protein kasar" },
      { name: "Azolla segar", content: "25–30% protein kasar" },
      { name: "Tepung ikan", content: "55–65% protein kasar" },
      { name: "Kedelai rebus", content: "35% protein kasar" },
    ],
    function: "Pertumbuhan otot, produksi enzim dan hormon, pembentukan bulu, sistem imun",
    deficiencySign: "Pertumbuhan lambat, bulu kusam/rontok, kanibalisme",
    dose: "Fase starter: 21–23% CP | Grower: 17–19% CP | Finisher: 15–17% CP",
  },
  {
    id: 4,
    nutrient: "Vitamin A",
    naturalSources: [
      { name: "Jagung kuning", content: "Beta-karoten tinggi" },
      { name: "Daun pepaya", content: "Beta-karoten sangat tinggi" },
      { name: "Wortel", content: "8.3 mg beta-karoten/100g" },
      { name: "Azolla", content: "Beta-karoten + klorofil" },
      { name: "Paprika merah", content: "Lutein dan zeaxanthin" },
    ],
    function: "Kesehatan mata, pertumbuhan epitel, sistem imun, reproduksi",
    deficiencySign: "Kebutaan, leleran hidung/mata, penurunan produktivitas",
    dose: "1.500–5.000 IU/kg pakan",
  },
  {
    id: 5,
    nutrient: "Vitamin D3",
    naturalSources: [
      { name: "Paparan sinar matahari langsung", content: "Sintesis kulit" },
      { name: "Minyak ikan", content: "D3 tinggi" },
      { name: "Kuning telur", content: "D3 alami" },
    ],
    function: "Penyerapan kalsium dan fosfor, kesehatan tulang",
    deficiencySign: "Rakitis, paruh lunak, kerabang telur tipis",
    dose: "200–500 IU/kg pakan | ATAU jemur ayam 1-2 jam/hari",
  },
  {
    id: 6,
    nutrient: "Vitamin E + Selenium",
    naturalSources: [
      { name: "Kecambah gandum", content: "Vit E tinggi" },
      { name: "Jagung", content: "Vit E sedang" },
      { name: "Maggot BSF", content: "Selenium organik" },
      { name: "Bawang putih", content: "Selenium organik" },
    ],
    function: "Antioksidan, imunitas, reproduksi, mencegah muscular dystrophy",
    deficiencySign: "Encephalomalacia, mortalitas DOC tinggi, kematian mendadak",
    dose: "10–20 IU Vit E/kg pakan | 0.1–0.3 mg Selenium/kg pakan",
  },
  {
    id: 7,
    nutrient: "Energi (ME)",
    naturalSources: [
      { name: "Jagung kuning", content: "3.350 kkal ME/kg" },
      { name: "Dedak halus", content: "1.630 kkal ME/kg" },
      { name: "Maggot BSF kering (lemak)", content: "~3.000 kkal ME/kg" },
      { name: "Minyak kelapa sawit", content: "8.300 kkal ME/kg" },
    ],
    function: "Sumber energi utama untuk aktivitas, pertumbuhan, dan produksi panas tubuh",
    deficiencySign: "Pertumbuhan sangat lambat, lemah, gemetar kedinginan",
    dose: "Starter: 2.900–3.000 kkal/kg | Grower: 2.850–2.950 kkal/kg | Finisher: 3.000–3.100 kkal/kg",
  },
];

// ============================================================
// 5. HARGA BAHAN PAKAN DEFAULT
// ============================================================
export const DEFAULT_PRICES: PriceData[] = [
  { id: "jagung", name: "Jagung Giling", unit: "kg", defaultPrice: 5500, emoji: "🌽" },
  { id: "dedak", name: "Dedak Halus", unit: "kg", defaultPrice: 3500, emoji: "🌾" },
  { id: "maggot", name: "Maggot BSF Segar", unit: "kg", defaultPrice: 8000, emoji: "🐛" },
  { id: "azolla", name: "Azolla Segar", unit: "kg", defaultPrice: 3000, emoji: "🌿" },
  { id: "mineral", name: "Mineral/Premix", unit: "kg", defaultPrice: 15000, emoji: "💊" },
  { id: "konsentrat", name: "Konsentrat Ayam", unit: "kg", defaultPrice: 12000, emoji: "🥫" },
];

// ============================================================
// 6. TIPS MANAJEMEN KANDANG
// ============================================================
export const MANAGEMENT_TIPS = [
  {
    category: "Kandang",
    tips: [
      "Kepadatan ideal: 8–10 ekor/m² untuk lantai (litter), 6–8 ekor/m² untuk sangkar",
      "Tinggi kandang minimal 2.5 meter untuk sirkulasi udara",
      "Arah kandang timur–barat untuk ventilasi optimal",
      "Gunakan sekam padi atau serbuk gergaji sebagai litter, ketebalan 5–10 cm",
      "Ganti litter jika lembab untuk mencegah coccidiosis dan amonia berlebih",
    ],
  },
  {
    category: "Air Minum",
    tips: [
      "Kebutuhan air: 2x konsumsi pakan (ml/ekor/hari)",
      "Ganti air minum minimal 2x sehari",
      "Bersihkan tempat minum dengan desinfektan 1x seminggu",
      "Suhu air minum ideal: 15–20°C (jangan terlalu dingin atau panas)",
      "Tambahkan vitamin C 250 mg/liter saat cuaca panas",
    ],
  },
  {
    category: "Biosekuriti",
    tips: [
      "Semprot disinfektan di pintu masuk sebelum masuk kandang",
      "Batasi tamu/orang luar masuk area kandang",
      "Pisahkan kandang brooding dari kandang ayam dewasa",
      "Segera karantina ayam sakit dalam 24 jam",
      "Musnahkan bangkai jauh dari kandang, sedalam 50 cm",
    ],
  },
  {
    category: "Brooding",
    tips: [
      "Suhu brooding DOC (hari 1–7): 35–38°C",
      "Turunkan suhu 2–3°C per minggu",
      "Minggu ke-3 suhu ambient sudah cukup (di atas 28°C)",
      "Gunakan lampu pijar 60–100W atau pemanas gas",
      "Indikator: Anak ayam menyebar merata = suhu ideal, berkumpul = kedinginan",
    ],
  },
];

// ============================================================
// 7. HELPER FUNCTIONS
// ============================================================

/**
 * Dapatkan fase pakan berdasarkan umur minggu
 */
export function getFeedPhaseByWeek(week: number): FeedPhase {
  const phase = FEED_PHASES.find((p) => week >= p.weekStart && week <= p.weekEnd);
  return phase || FEED_PHASES[FEED_PHASES.length - 1];
}

/**
 * Hitung kebutuhan pakan total
 */
export interface FeedCalculation {
  phase: FeedPhase;
  totalFeedKg: number;
  totalFeedGram: number;
  components: {
    jagung: number;
    dedak: number;
    maggot: number;
    azolla: number;
    mineral: number;
    konsentrat: number;
  };
}

export function calculateFeed(birdCount: number, weekAge: number): FeedCalculation {
  const phase = getFeedPhaseByWeek(weekAge);
  const totalFeedGram = birdCount * phase.feedPerBirdGram;
  const totalFeedKg = totalFeedGram / 1000;

  const comp = phase.composition;
  const components = {
    jagung: (totalFeedGram * comp.jagung) / 100,
    dedak: (totalFeedGram * comp.dedak) / 100,
    maggot: (totalFeedGram * comp.maggot) / 100,
    azolla: (totalFeedGram * comp.azolla) / 100,
    mineral: (totalFeedGram * comp.mineral) / 100,
    konsentrat: (totalFeedGram * (comp.konsentrat || 0)) / 100,
  };

  return { phase, totalFeedKg, totalFeedGram, components };
}

/**
 * Hitung estimasi biaya pakan harian
 */
export function calculateCost(
  feedCalc: FeedCalculation,
  prices: Record<string, number>
): { perEkor: number; total: number; breakdown: Record<string, number> } {
  const { components } = feedCalc;

  // gram ke kg untuk harga per kg
  const breakdown = {
    jagung: (components.jagung / 1000) * (prices.jagung || DEFAULT_PRICES.find(p => p.id === 'jagung')!.defaultPrice),
    dedak: (components.dedak / 1000) * (prices.dedak || DEFAULT_PRICES.find(p => p.id === 'dedak')!.defaultPrice),
    maggot: (components.maggot / 1000) * (prices.maggot || DEFAULT_PRICES.find(p => p.id === 'maggot')!.defaultPrice),
    azolla: (components.azolla / 1000) * (prices.azolla || DEFAULT_PRICES.find(p => p.id === 'azolla')!.defaultPrice),
    mineral: (components.mineral / 1000) * (prices.mineral || DEFAULT_PRICES.find(p => p.id === 'mineral')!.defaultPrice),
    konsentrat: (components.konsentrat / 1000) * (prices.konsentrat || DEFAULT_PRICES.find(p => p.id === 'konsentrat')!.defaultPrice),
  };

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
  const perEkor = total / Math.max(feedCalc.totalFeedGram / feedCalc.phase.feedPerBirdGram, 1);

  return { perEkor, total, breakdown };
}

/**
 * Vaksin yang akan datang berdasarkan umur ayam
 */
export function getUpcomingVaccines(currentDayAge: number): VaccineSchedule[] {
  return VACCINE_SCHEDULES.filter((v) => v.dayAge >= currentDayAge)
    .sort((a, b) => a.dayAge - b.dayAge)
    .slice(0, 3);
}

/**
 * Estimasi bobot berdasarkan umur (gram)
 */
export function estimateWeight(weekAge: number): number {
  const weights: Record<number, number> = {
    0: 35, 1: 55, 2: 90, 3: 140, 4: 200,
    5: 280, 6: 380, 7: 480, 8: 590,
    9: 700, 10: 810, 11: 910, 12: 1000,
  };
  return weights[Math.min(weekAge, 12)] || 1000;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
