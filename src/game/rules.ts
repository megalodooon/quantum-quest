// All tunable game numbers live here.

export const XP = {
  numericFirst: 15,
  numericRetry: 8,
  selfGot: 10,
  selfMissed: 3,
  reflect: 6,
  topicDone: 50,
  review: 6,
  reviewSession: 20,
  bossWin: 300,
  comboBonus: 2, // per step of combo, capped
};
export const QUANTA = { topicDone: 15, bossWin: 150, levelUp: 40, reviewSession: 10 };

/** XP needed to go from level L to L+1. */
export const xpForLevel = (L: number) => 100 + 25 * (L - 1);

export function levelFromXp(xp: number) {
  let L = 1, need = xpForLevel(1), rest = xp;
  while (rest >= need) { rest -= need; L++; need = xpForLevel(L); }
  return { level: L, into: rest, need };
}

export const TITLES = [
  "Curious Mind", "Number Wrangler", "Equation Tamer", "Wave Rider", "Vector Pilot", "Field Walker",
  "Spin Doctor", "Phase Shifter", "Quanta Collector", "Superposer", "Tunneller", "Entangler",
  "Operator", "Eigenstate Hunter", "Hilbert Navigator", "Field Theorist", "Wavefunction Whisperer",
  "Decoherence Tamer", "Quantum Sage", "Planck Scaler",
];
export const titleFor = (level: number) => TITLES[Math.min(TITLES.length - 1, Math.floor((level - 1) / 3))];
export function rankIcon(level: number) {
  const tier = level <= 10 ? "bronze" : level <= 20 ? "silver" : "gold";
  const n = ((level - 1) % 10) + 1;
  return `rank_${tier}${Math.min(n, 10)}`;
}

// ---------- spaced repetition (Leitner boxes) ----------
export const BOX_DAYS = [0, 1, 3, 7, 16, 35, 80];
export const DAY = 86_400_000;
export const today = (t = Date.now()) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
export const dayDiff = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / DAY);

// ---------- shop ----------
export type ShopItem = { id: string; kind: "avatar" | "ship" | "theme" | "freeze" | "focus" | "box"; name: string; price: number; img?: string; desc: string; color?: string };

export const THEMES: Record<string, { name: string; accent: string; accent2: string }> = {
  cyan: { name: "Blueprint Cyan", accent: "#5ee7ff", accent2: "#7aa2ff" },
  plasma: { name: "Plasma Violet", accent: "#c39bff", accent2: "#ff7ac6" },
  solar: { name: "Solar Flare", accent: "#ffbf5a", accent2: "#ff6b5e" },
  aurora: { name: "Aurora", accent: "#6bf2b0", accent2: "#5ee7ff" },
  crimson: { name: "Red Shift", accent: "#ff6b8b", accent2: "#ffb547" },
};

const TOONS = [["femaleadventurer", "Explorer Ava"], ["maleadventurer", "Explorer Max"], ["robot", "Unit B-0"], ["femaleperson", "Dr. Lina"], ["maleperson", "Dr. Sam"], ["zombie", "Decohered Zed"]];
const PLATS = [["player", "Pip"], ["adventurer", "Rook"], ["female", "Nova"], ["soldier", "Sergeant Spin"], ["zombie", "Mossy"]];
const FREE_AVATARS = ["toon_femaleadventurer_idle", "toon_maleadventurer_idle", "toon_robot_idle", "plat_player_idle"];
export const AVATARS: ShopItem[] = [
  ...TOONS.map(([k, n], i) => ({ id: `toon_${k}_idle`, kind: "avatar" as const, name: n, price: FREE_AVATARS.includes(`toon_${k}_idle`) ? 0 : 250 + i * 50, img: `toon_${k}_idle`, desc: "Your avatar; it cheers and winces with you" })),
  ...PLATS.map(([k, n], i) => ({ id: `plat_${k}_idle`, kind: "avatar" as const, name: n, price: FREE_AVATARS.includes(`plat_${k}_idle`) ? 0 : 160 + i * 40, img: `plat_${k}_idle`, desc: "Your avatar; it cheers and winces with you" })),
];
/** The same avatar in another pose: "cheer" or "hurt". */
export function pose(avatar: string, mood: "cheer" | "hurt" | "idle") {
  if (mood === "idle") return avatar;
  if (avatar.startsWith("toon_")) return avatar.replace("_idle", mood === "cheer" ? "_cheer0" : "_hurt");
  if (avatar.startsWith("plat_")) return avatar.replace("_idle", mood === "cheer" ? "_cheer1" : "_hurt");
  return avatar;
}
export const SHIPS: ShopItem[] = [1, 2, 3].flatMap((n) =>
  ["blue", "green", "orange", "red"].map((c, i) => ({
    id: `ship${n}_${c}`, kind: "ship" as const, name: `${["Photon", "Boson", "Fermion"][n - 1]} ${c}`, price: n === 1 && c === "blue" ? 0 : 180 + n * 80 + i * 30, img: `ship${n}_${c}`, desc: "Your ship in boss battles and on the map",
  }))
).concat(["blue", "green", "red", "yellow"].map((c, i) => ({ id: `ufo_${c}`, kind: "ship" as const, name: `Saucer ${c}`, price: 520 + i * 40, img: `ufo_${c}`, desc: "Your ship in boss battles and on the map" })));
export const THEME_ITEMS: ShopItem[] = Object.entries(THEMES).map(([id, t], i) => ({ id: "theme_" + id, kind: "theme", name: t.name, price: i === 0 ? 0 : 400 + i * 100, desc: "Recolours the whole app", color: t.accent }));
export const CONSUMABLES: ShopItem[] = [
  { id: "freeze", kind: "freeze", name: "Streak Freeze", price: 200, img: "powerupgreen_shield", desc: "Covers one missed day. Hold up to 2." },
  { id: "focus", kind: "focus", name: "Focus Potion", price: 150, img: "pill_blue", desc: "Double XP on your next 10 answers." },
  { id: "box", kind: "box", name: "Mystery Box", price: 300, img: "powerupyellow_star", desc: "A random reward. Odds are shown when you open it." },
];
export const ALL_ITEMS = [...AVATARS, ...SHIPS, ...THEME_ITEMS, ...CONSUMABLES];

export const BOX_ODDS = [
  { rarity: "Common", p: 0.55, color: "#9fb0d8", what: "60 to 120 quanta" },
  { rarity: "Rare", p: 0.3, color: "#5ee7ff", what: "An avatar or ship you don't own" },
  { rarity: "Epic", p: 0.12, color: "#c39bff", what: "A theme, or 2 streak freezes" },
  { rarity: "Legendary", p: 0.03, color: "#ffbf5a", what: "1,000 quanta" },
];

// ---------- achievements ----------
export type Ach = { id: string; name: string; desc: string; medal: number };
export const ACHIEVEMENTS: Ach[] = [
  { id: "first", name: "First Collapse", desc: "Answer your first question correctly", medal: 1 },
  { id: "topic1", name: "Lift-off", desc: "Finish your first topic", medal: 2 },
  { id: "topic10", name: "Ten Down", desc: "Finish 10 topics", medal: 3 },
  { id: "topic50", name: "Half-Century", desc: "Finish 50 topics", medal: 4 },
  { id: "topic200", name: "Long Haul", desc: "Finish 200 topics", medal: 5 },
  { id: "combo5", name: "Coherent", desc: "Get 5 right in a row", medal: 6 },
  { id: "combo15", name: "Superposition", desc: "Get 15 right in a row", medal: 7 },
  { id: "boss1", name: "Boss Breaker", desc: "Defeat your first boss", medal: 8 },
  { id: "boss5", name: "Fleet Admiral", desc: "Defeat 5 bosses", medal: 9 },
  { id: "streak3", name: "Warming Up", desc: "Keep a 3-day streak", medal: 2 },
  { id: "streak7", name: "One Full Week", desc: "Keep a 7-day streak", medal: 5 },
  { id: "streak30", name: "Plasma Flame", desc: "Keep a 30-day streak", medal: 9 },
  { id: "level5", name: "Climbing", desc: "Reach level 5", medal: 3 },
  { id: "level15", name: "Veteran", desc: "Reach level 15", medal: 6 },
  { id: "review50", name: "Never Forget", desc: "Do 50 review answers", medal: 4 },
  { id: "tutor", name: "Ask Away", desc: "Ask Claude to explain something", medal: 1 },
  { id: "shop", name: "Window Shopper", desc: "Buy something in the shop", medal: 7 },
  { id: "box", name: "Box Opener", desc: "Open a mystery box", medal: 8 },
  { id: "part", name: "Island Cleared", desc: "Finish every topic in a part", medal: 9 },
];

// ---------- daily quests ----------
export type QuestDef = { id: string; text: string; target: number; reward: number; stat: string };
export const QUEST_POOL: QuestDef[] = [
  { id: "answer15", text: "Answer 15 questions", target: 15, reward: 40, stat: "answered" },
  { id: "answer30", text: "Answer 30 questions", target: 30, reward: 70, stat: "answered" },
  { id: "correct10", text: "Get 10 answers right", target: 10, reward: 45, stat: "correct" },
  { id: "streak5", text: "Get 5 right in a row", target: 5, reward: 50, stat: "bestComboToday" },
  { id: "topic1", text: "Finish a topic", target: 1, reward: 35, stat: "topics" },
  { id: "topic3", text: "Finish 3 topics", target: 3, reward: 80, stat: "topics" },
  { id: "review", text: "Do a review session", target: 1, reward: 40, stat: "reviewSessions" },
  { id: "xp150", text: "Earn 150 XP", target: 150, reward: 45, stat: "xp" },
  { id: "watch2", text: "Watch 2 videos", target: 2, reward: 30, stat: "watched" },
  { id: "tutor1", text: "Ask Claude to explain something", target: 1, reward: 30, stat: "tutor" },
  { id: "checks8", text: "Tick 8 self-checks", target: 8, reward: 30, stat: "checks" },
];
export function questsForDay(day: string): QuestDef[] {
  let h = 0;
  for (const c of day) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const pool = [...QUEST_POOL];
  const out: QuestDef[] = [];
  const kinds = new Set<string>();
  while (out.length < 3 && pool.length) {
    h = (h * 1103515245 + 12345) >>> 0;
    const q = pool.splice(h % pool.length, 1)[0];
    if (kinds.has(q.stat)) continue;
    kinds.add(q.stat);
    out.push(q);
  }
  return out;
}
