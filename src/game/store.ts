import { useSyncExternalStore } from "react";
import { PARTS, TOPIC_INDEX } from "../content";
import { ACHIEVEMENTS, ALL_ITEMS, AVATARS, BOX_DAYS, BOX_ODDS, DAY, QUANTA, SHIPS, THEME_ITEMS, XP, levelFromXp, questsForDay, today, dayDiff } from "./rules";

export type TopicState = { s: number; w?: 1; d?: number[]; k?: number[]; c?: number[]; t?: number }; // s: 0 new, 1 in progress, 2 complete; d: exercises answered; k: exercises understood (answered right)
export type Card = [box: number, due: number];
export type Journal = { k: string; t: number; g: string };

export type Save = {
  v: 1;
  updatedAt: number;
  name: string;
  onboarded: boolean;
  xp: number;
  quanta: number;
  streak: { count: number; best: number; last: string; freezes: number };
  day: { d: string; answered: number; correct: number; topics: number; reviewSessions: number; xp: number; watched: number; tutor: number; checks: number; bestComboToday: number; claimed: string[] };
  topics: Record<string, TopicState>;
  bosses: Record<string, number>; // part -> best score; key present = beaten
  cards: Record<string, Card>;
  journal: Journal[];
  owned: string[];
  eq: { avatar: string; ship: string; theme: string };
  boxes: number;
  focus: number;
  ach: Record<string, number>;
  stats: { correct: number; wrong: number; answered: number; topics: number; bosses: number; reviews: number; bestCombo: number; tutor: number; buys: number; boxes: number };
  settings: { sound: boolean; haptics: boolean; calm: boolean; freeRoam: boolean };
};

const freeItems = ALL_ITEMS.filter((i) => i.price === 0).map((i) => i.id);

export function freshSave(): Save {
  return {
    v: 1, updatedAt: 0, name: "", onboarded: false, xp: 0, quanta: 100,
    streak: { count: 0, best: 0, last: "", freezes: 1 },
    day: newDay(today()),
    topics: {}, bosses: {}, cards: {}, journal: [], owned: freeItems,
    eq: { avatar: "toon_femaleadventurer_idle", ship: "ship1_blue", theme: "theme_cyan" },
    boxes: 1, focus: 0, ach: {},
    stats: { correct: 0, wrong: 0, answered: 0, topics: 0, bosses: 0, reviews: 0, bestCombo: 0, tutor: 0, buys: 0, boxes: 0 },
    settings: { sound: true, haptics: true, calm: false, freeRoam: false },
  };
}
function newDay(d: string): Save["day"] {
  return { d, answered: 0, correct: 0, topics: 0, reviewSessions: 0, xp: 0, watched: 0, tutor: 0, checks: 0, bestComboToday: 0, claimed: [] };
}

// ---------- juice events (toasts, flying XP, level-ups, unlocks) ----------
export type FX =
  | { type: "xp"; amount: number; x?: number; y?: number }
  | { type: "quanta"; amount: number }
  | { type: "level"; level: number }
  | { type: "ach"; id: string }
  | { type: "toast"; text: string; tone?: "good" | "bad" | "info" }
  | { type: "quest"; text: string; reward: number }
  | { type: "mood"; ok: boolean };
const fxListeners = new Set<(e: FX) => void>();
export const onFX = (fn: (e: FX) => void) => { fxListeners.add(fn); return () => { fxListeners.delete(fn); }; };
const emit = (e: FX) => fxListeners.forEach((f) => f(e));

// ---------- the store ----------
let state: Save = freshSave();
const listeners = new Set<() => void>();
let persist: (s: Save) => void = () => {};
export const setPersist = (fn: (s: Save) => void) => { persist = fn; };

export function getState() { return state; }
export function useGame<T>(sel: (s: Save) => T): T {
  return useSyncExternalStore((cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; }, () => sel(state));
}
export function replaceState(s: Save) {
  state = migrate(s);
  rollDay();
  listeners.forEach((l) => l());
}
function migrate(s: any): Save {
  const f = freshSave();
  const out = { ...f, ...s, streak: { ...f.streak, ...s.streak }, day: { ...f.day, ...s.day }, eq: { ...f.eq, ...s.eq }, stats: { ...f.stats, ...s.stats }, settings: { ...f.settings, ...s.settings } };
  if (!String(out.eq.avatar).match(/^(toon|plat)_/)) out.eq.avatar = "toon_femaleadventurer_idle";
  out.owned = Array.from(new Set([...(s.owned || []), ...freeItems]));
  return out;
}

function commit(mut: (d: Save) => void) {
  const next: Save = structuredClone(state);
  mut(next);
  next.updatedAt = Date.now();
  const before = levelFromXp(state.xp).level;
  state = next;
  const after = levelFromXp(state.xp).level;
  if (after > before) {
    state.quanta += QUANTA.levelUp * (after - before);
    emit({ type: "level", level: after });
  }
  checkAchievements();
  checkQuests();
  listeners.forEach((l) => l());
  persist(state);
}

function rollDay() {
  const d = today();
  if (state.day.d !== d) state = { ...state, day: newDay(d) };
  // streak decay with freezes
  if (state.streak.last && state.streak.count > 0) {
    const gap = dayDiff(state.streak.last, d);
    if (gap > 1) {
      const missed = gap - 1;
      if (missed <= state.streak.freezes) state = { ...state, streak: { ...state.streak, freezes: state.streak.freezes - missed, last: shiftDay(d, -1) } };
      else state = { ...state, streak: { ...state.streak, count: 0 } };
    }
  }
}
const shiftDay = (d: string, n: number) => today(Date.parse(d) + n * DAY + DAY / 2);

function touchStreak(d: Save) {
  const t = today();
  if (d.streak.last === t) return;
  const gap = d.streak.last ? dayDiff(d.streak.last, t) : 99;
  d.streak.count = gap === 1 ? d.streak.count + 1 : 1;
  d.streak.last = t;
  d.streak.best = Math.max(d.streak.best, d.streak.count);
  emit({ type: "toast", text: `Streak ${d.streak.count} ${d.streak.count === 1 ? "day" : "days"}`, tone: "good" });
}

function addXp(d: Save, n: number) {
  let amt = n;
  if (d.focus > 0) { amt *= 2; d.focus -= 1; }
  d.xp += amt;
  d.day.xp += amt;
  return amt;
}

function checkAchievements() {
  const s = state;
  const has = (id: string) => !!s.ach[id];
  const give = (id: string) => { if (!has(id)) { s.ach[id] = Date.now(); emit({ type: "ach", id }); } };
  if (s.stats.correct >= 1) give("first");
  if (s.stats.topics >= 1) give("topic1");
  if (s.stats.topics >= 10) give("topic10");
  if (s.stats.topics >= 50) give("topic50");
  if (s.stats.topics >= 200) give("topic200");
  if (s.stats.bestCombo >= 5) give("combo5");
  if (s.stats.bestCombo >= 15) give("combo15");
  if (s.stats.bosses >= 1) give("boss1");
  if (s.stats.bosses >= 5) give("boss5");
  if (s.streak.best >= 3) give("streak3");
  if (s.streak.best >= 7) give("streak7");
  if (s.streak.best >= 30) give("streak30");
  const L = levelFromXp(s.xp).level;
  if (L >= 5) give("level5");
  if (L >= 15) give("level15");
  if (s.stats.reviews >= 50) give("review50");
  if (s.stats.tutor >= 1) give("tutor");
  if (s.stats.buys >= 1) give("shop");
  if (s.stats.boxes >= 1) give("box");
  if (PARTS.some((p) => p.topics.every((t) => s.topics[t.id]?.s === 2))) give("part");
}

let announced = new Set<string>();
function checkQuests() {
  const qs = questsForDay(state.day.d);
  for (const q of qs) {
    const v = (state.day as any)[q.stat] ?? 0;
    const key = state.day.d + q.id;
    if (v >= q.target && !state.day.claimed.includes(q.id) && !announced.has(key)) {
      announced.add(key);
      emit({ type: "quest", text: q.text, reward: q.reward });
    }
  }
}

// ---------- actions ----------
export const actions = {
  onboard(name: string, avatar: string) {
    commit((d) => { d.name = name.trim() || "Explorer"; d.eq.avatar = avatar; d.onboarded = true; });
  },
  markWatched(id: string) {
    commit((d) => {
      const t = (d.topics[id] ||= { s: 1 });
      if (!t.w) { t.w = 1; d.day.watched++; }
      if (t.s === 0) t.s = 1;
    });
  },
  /** Record one exercise answer. kind: numeric|self|reflect. Returns XP actually awarded. */
  answer(id: string, n: number, opts: { ok: boolean; kind: "numeric" | "self" | "reflect"; firstTry: boolean; combo: number; given?: string; review?: boolean }) {
    let gained = 0;
    commit((d) => {
      const t = (d.topics[id] ||= { s: 1 });
      if (!opts.review) {
        t.d = Array.from(new Set([...(t.d || []), n]));
        if (opts.ok) t.k = Array.from(new Set([...(t.k || []), n]));
        if (t.s === 0) t.s = 1;
      }
      d.stats.answered++; d.day.answered++;
      const base = opts.kind === "reflect" ? XP.reflect : opts.kind === "self" ? (opts.ok ? XP.selfGot : XP.selfMissed) : opts.ok ? (opts.firstTry ? XP.numericFirst : XP.numericRetry) : 0;
      const bonus = opts.ok ? Math.min(10, Math.max(0, opts.combo - 1)) * XP.comboBonus : 0;
      gained = addXp(d, (opts.review ? XP.review : base) + bonus);
      if (opts.kind !== "reflect") {
        if (opts.ok) { d.stats.correct++; d.day.correct++; } else { d.stats.wrong++; }
        d.stats.bestCombo = Math.max(d.stats.bestCombo, opts.combo);
        d.day.bestComboToday = Math.max(d.day.bestComboToday, opts.combo);
        const key = `${id}#${n}`;
        const card = d.cards[key] || [0, 0];
        const box = opts.ok ? Math.min(BOX_DAYS.length - 1, card[0] + 1) : 1;
        d.cards[key] = [box, Date.now() + BOX_DAYS[box] * DAY - DAY / 3];
        if (!opts.ok && opts.given !== undefined) {
          d.journal = [{ k: key, t: Date.now(), g: opts.given }, ...d.journal.filter((j) => j.k !== key)].slice(0, 120);
        }
      }
      if (opts.review) d.stats.reviews++;
      touchStreak(d);
    });
    if (gained) emit({ type: "xp", amount: gained });
    if (opts.kind !== "reflect") emit({ type: "mood", ok: opts.ok });
    return gained;
  },
  tickCheck(id: string, i: number) {
    commit((d) => {
      const t = (d.topics[id] ||= { s: 1 });
      const c = new Set(t.c || []);
      if (c.has(i)) c.delete(i); else { c.add(i); d.day.checks++; }
      t.c = [...c];
    });
  },
  completeTopic(id: string) {
    let first = false;
    commit((d) => {
      const t = (d.topics[id] ||= { s: 1 });
      if (t.s !== 2) {
        first = true;
        t.s = 2; t.t = Date.now();
        d.stats.topics++; d.day.topics++;
        addXp(d, XP.topicDone);
        d.quanta += QUANTA.topicDone;
      }
      touchStreak(d);
    });
    if (first) { emit({ type: "xp", amount: XP.topicDone }); emit({ type: "quanta", amount: QUANTA.topicDone }); }
    return first;
  },
  finishReview(count: number) {
    commit((d) => { d.day.reviewSessions++; addXp(d, XP.reviewSession); d.quanta += QUANTA.reviewSession; touchStreak(d); });
    emit({ type: "xp", amount: XP.reviewSession });
  },
  bossResult(part: number, win: boolean, score: number) {
    commit((d) => {
      if (win) {
        const first = d.bosses[part] === undefined;
        d.bosses[part] = Math.max(d.bosses[part] ?? 0, score);
        if (first) d.stats.bosses++;
        addXp(d, XP.bossWin); d.quanta += QUANTA.bossWin; d.boxes += 1;
      }
      touchStreak(d);
    });
    if (win) { emit({ type: "xp", amount: XP.bossWin }); emit({ type: "quanta", amount: QUANTA.bossWin }); }
  },
  claimQuest(id: string, reward: number) {
    commit((d) => { if (!d.day.claimed.includes(id)) { d.day.claimed.push(id); d.quanta += reward; } });
    emit({ type: "quanta", amount: reward });
  },
  tutorUsed() { commit((d) => { d.stats.tutor++; d.day.tutor++; }); },
  buy(itemId: string): boolean {
    const item = ALL_ITEMS.find((i) => i.id === itemId);
    if (!item || state.quanta < item.price) return false;
    if (item.kind === "freeze" && state.streak.freezes >= 2) return false;
    commit((d) => {
      d.quanta -= item.price; d.stats.buys++;
      if (item.kind === "freeze") d.streak.freezes++;
      else if (item.kind === "focus") d.focus += 10;
      else if (item.kind === "box") d.boxes++;
      else if (!d.owned.includes(item.id)) d.owned.push(item.id);
    });
    return true;
  },
  equip(itemId: string) {
    const item = ALL_ITEMS.find((i) => i.id === itemId);
    if (!item || !state.owned.includes(itemId)) return;
    commit((d) => {
      if (item.kind === "avatar") d.eq.avatar = itemId;
      if (item.kind === "ship") d.eq.ship = itemId;
      if (item.kind === "theme") d.eq.theme = itemId;
    });
  },
  openBox(): { rarity: string; color: string; label: string; img?: string } | null {
    if (state.boxes <= 0) return null;
    const r = Math.random();
    let acc = 0, tier = BOX_ODDS[0];
    for (const o of BOX_ODDS) { acc += o.p; if (r <= acc) { tier = o; break; } }
    let res = { rarity: tier.rarity, color: tier.color, label: "", img: undefined as string | undefined };
    commit((d) => {
      d.boxes--; d.stats.boxes++;
      const unowned = [...AVATARS, ...SHIPS].filter((i) => !d.owned.includes(i.id));
      const themes = THEME_ITEMS.filter((i) => !d.owned.includes(i.id));
      if (tier.rarity === "Rare" && unowned.length) {
        const it = unowned[Math.floor(Math.random() * unowned.length)];
        d.owned.push(it.id); res.label = it.name; res.img = it.img;
      } else if (tier.rarity === "Epic" && themes.length && Math.random() < 0.6) {
        const it = themes[Math.floor(Math.random() * themes.length)];
        d.owned.push(it.id); res.label = it.name + " theme";
      } else if (tier.rarity === "Epic") {
        d.streak.freezes = Math.min(2, d.streak.freezes + 2); res.label = "2 streak freezes"; res.img = "powerupgreen_shield";
      } else if (tier.rarity === "Legendary") {
        d.quanta += 1000; res.label = "1,000 quanta"; res.img = "powerupyellow_star";
      } else {
        const q = 60 + Math.floor(Math.random() * 61); d.quanta += q; res.label = `${q} quanta`; res.img = "powerupyellow_star";
        res.rarity = "Common"; res.color = BOX_ODDS[0].color;
      }
    });
    return res;
  },
  setting<K extends keyof Save["settings"]>(k: K, v: Save["settings"][K]) { commit((d) => { d.settings[k] = v; }); },
  rename(n: string) { commit((d) => { d.name = n.trim() || d.name; }); },
  reset() { state = freshSave(); listeners.forEach((l) => l()); persist(state); },
};

// ---------- derived helpers ----------
export function partProgress(s: Save, p: number) {
  const ts = PARTS[p].topics;
  const done = ts.filter((t) => s.topics[t.id]?.s === 2).length;
  return { done, total: ts.length, frac: done / ts.length };
}
export function partUnlocked(s: Save, p: number) {
  if (p === 0 || s.settings.freeRoam) return true;
  return s.bosses[p - 1] !== undefined || partProgress(s, p - 1).frac >= 0.5;
}
export function topicUnlocked(s: Save, id: string) {
  const ti = TOPIC_INDEX[id];
  if (!ti) return false;
  if (!partUnlocked(s, ti.part.part)) return false;
  if (s.settings.freeRoam || ti.index === 0) return true;
  const prev = ti.part.topics[ti.index - 1];
  return topicCleared(s, prev.id) || (s.topics[id]?.s ?? 0) > 0;
}
/** Self-checks of a topic that aren't ticked yet. */
export function uncheckedCount(s: Save, id: string) {
  return Math.max(0, TOPIC_INDEX[id].topic.checks.length - (s.topics[id]?.c?.length ?? 0));
}
/** Finished and every self-check ticked: the only state that lets you move on. */
export function topicCleared(s: Save, id: string) {
  return s.topics[id]?.s === 2 && uncheckedCount(s, id) === 0;
}
/** Started topics that still have unticked self-checks, in course order. */
export function topicsToCheck(s: Save) {
  return Object.keys(s.topics)
    .filter((id) => TOPIC_INDEX[id] && s.topics[id].s > 0 && uncheckedCount(s, id) > 0)
    .sort((a, b) => TOPIC_INDEX[a].part.part - TOPIC_INDEX[b].part.part || TOPIC_INDEX[a].index - TOPIC_INDEX[b].index);
}
export function bossUnlocked(s: Save, p: number) {
  const pr = partProgress(s, p);
  return s.settings.freeRoam || pr.done >= Math.min(8, pr.total);
}
export function nextTopic(s: Save) {
  for (const p of PARTS) {
    if (!partUnlocked(s, p.part)) break;
    for (const t of p.topics) if (!topicCleared(s, t.id) && topicUnlocked(s, t.id)) return t;
  }
  return PARTS[0].topics[0];
}
export function dueCards(s: Save, limit = 12) {
  const now = Date.now();
  return Object.entries(s.cards).filter(([, c]) => c[1] <= now).sort((a, b) => a[1][1] - b[1][1]).slice(0, limit).map(([k]) => k);
}
export function mastery(s: Save, id: string) {
  const t = s.topics[id];
  if (!t || t.s !== 2) return t?.s ? 0.5 : 0;
  const ti = TOPIC_INDEX[id];
  const cards = ti.topic.ex.map((e) => s.cards[`${id}#${e.n}`]).filter(Boolean) as Card[];
  const strong = cards.length ? cards.filter((c) => c[0] >= 3).length / cards.length : 1;
  if (s.bosses[ti.part.part] !== undefined && strong >= 0.5) return 3;
  return strong >= 0.6 ? 2 : 1;
}
