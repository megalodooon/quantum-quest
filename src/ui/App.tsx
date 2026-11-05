import { useEffect, useState } from "react";
import { hashTopic } from "../content";
import { retrySync, useCloudStatus } from "../cloud";
import { img } from "../assets";
import { setHaptics, setSound, unlockAudio, play } from "../audio";
import { dueCards, onFX, useGame } from "../game/store";
import { THEMES, levelFromXp, pose, questsForDay, rankIcon } from "../game/rules";
import { go, useHash } from "./common";
import { FXLayer } from "./FX";
import { Lesson } from "./Lesson";
import { MapView, PartView, Today } from "./Screens";
import { Boss, Review } from "./Battle";
import { Badges, Onboarding, Profile, Shop } from "./Meta";
import { ChecksScreen, TutorScreen } from "./Help";

const TABS = [
  { id: "today", label: "Today", icon: "icon_home" },
  { id: "map", label: "Map", icon: "icon_target" },
  { id: "tutor", label: "Tutor", icon: "icon_question" },
  { id: "badges", label: "Badges", icon: "icon_trophy" },
  { id: "shop", label: "Shop", icon: "icon_shoppingcart" },
  { id: "profile", label: "Profile", icon: "icon_singleplayer" },
];

export function App() {
  const hash = useHash();
  const [nav, setNav] = useState(0);
  const s = useGame((s) => s);
  const cloud = useCloudStatus();
  const [startAnyway, setStartAnyway] = useState(false);
  const { level, into, need } = levelFromXp(s.xp);
  const [mood, setMood] = useState<"idle" | "cheer" | "hurt">("idle");
  useEffect(() => {
    let t: any;
    const off = onFX((e) => { if (e.type === "mood") { setMood(e.ok ? "cheer" : "hurt"); clearTimeout(t); t = setTimeout(() => setMood("idle"), 1400); } });
    return () => { off(); clearTimeout(t); };
  }, []);

  useEffect(() => { const f = () => setNav((n) => n + 1); window.addEventListener("hashchange", f); return () => window.removeEventListener("hashchange", f); }, []);
  useEffect(() => {
    const u = () => unlockAudio();
    window.addEventListener("pointerdown", u, { capture: true });
    window.addEventListener("keydown", u, { capture: true });
    return () => { window.removeEventListener("pointerdown", u, { capture: true }); window.removeEventListener("keydown", u, { capture: true }); };
  }, []);
  useEffect(() => { setSound(s.settings.sound); setHaptics(s.settings.haptics); }, [s.settings.sound, s.settings.haptics]);
  useEffect(() => {
    const t = THEMES[s.eq.theme.replace("theme_", "")] ?? THEMES.cyan;
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--accent2", t.accent2);
    document.documentElement.classList.toggle("calm", s.settings.calm);
  }, [s.eq.theme, s.settings.calm]);

  // A new browser has no local save yet: look in the Claude account before offering a fresh start.
  if (!s.onboarded && cloud === "connecting") return <div className="app"><main className="main"><div className="empty">Loading your progress…</div></main></div>;
  if (!s.onboarded && cloud === "offline" && !startAnyway) return (
    <div className="app"><main className="main"><div className="empty panel">
      <h2>Couldn't load your progress</h2>
      <p>Your Claude account can't be reached right now. Your progress isn't lost.</p>
      <button className="btn wide" onClick={retrySync}>Try again</button>
      <button className="btn ghost wide" onClick={() => setStartAnyway(true)}>Play anyway for now</button>
    </div></main></div>
  );
  if (!s.onboarded) return <div className="app"><main className="main"><Onboarding /></main><FXLayer /></div>;

  const route = hash || "today";
  const tid = hashTopic(route);
  const part = route.match(/^part-(\d+)$/);
  const boss = route.match(/^boss-(\d+)$/);
  const tutor = route.match(/^tutor(?:-(.+))?$/);
  const full = route === "map" || !!boss;
  let screen;
  if (tid) screen = <Lesson key={tid + nav} id={tid} />;
  else if (part) screen = <PartView p={+part[1]} />;
  else if (boss) screen = <Boss key={nav} p={+boss[1]} />;
  else if (route === "map") screen = <MapView />;
  else if (tutor) screen = <TutorScreen key={route} topicId={tutor[1] ? hashTopic("lesson-" + tutor[1]) ?? tutor[1] : null} />;
  else if (route === "checks") screen = <ChecksScreen />;
  else if (route === "review") screen = <Review key={nav} />;
  else if (route === "badges") screen = <Badges />;
  else if (route === "shop") screen = <Shop />;
  else if (route === "profile") screen = <Profile />;
  else screen = <Today />;
  const activeTab = tid || part ? "map" : boss ? "map" : tutor ? "tutor" : route === "review" || route === "checks" ? "today" : route;
  const flame = s.streak.last === s.day.d ? (s.streak.count >= 30 ? "violet" : s.streak.count >= 7 ? "blue" : "") : "cold";
  const quests = questsForDay(s.day.d);
  const claimable = quests.filter((q) => ((s.day as any)[q.stat] ?? 0) >= q.target && !s.day.claimed.includes(q.id)).length;
  const due = dueCards(s, 99).length;

  return (
    <div className="app">
      <header className="hud">
        <button className={"avatar" + (mood !== "idle" ? " pop" : "")} key={mood} onClick={() => go("profile")} aria-label="Profile"><img src={img(pose(s.eq.avatar, mood))} alt="" /></button>
        <div className="xpwrap">
          <div className="xpline"><span className="lvl"><img src={img(rankIcon(level))} alt="" />LVL {level}</span><span className="mono">{into}/{need}</span></div>
          <div className="bar"><i style={{ width: `${(into / need) * 100}%` }} /></div>
        </div>
        <span className={"chip flame " + flame} title="Daily streak"><span className="f" />{s.streak.count}</span>
        <span className="chip q" title="Quanta"><img src={img("powerupyellow_star")} alt="" />{s.quanta.toLocaleString()}</span>
      </header>
      <main className={"main" + (full ? " full" : "")} key={full ? "full" : "page"}>{screen}</main>
      <nav className="tabs">
        {TABS.map((t) => (
          <button key={t.id} className={activeTab === t.id ? "on" : ""} onClick={() => { play("select", { volume: 0.45 }); go(t.id); }} aria-current={activeTab === t.id ? "page" : undefined}>
            <img src={img(t.icon)} alt="" />{t.label}
            {t.id === "today" && claimable + (due ? 1 : 0) > 0 && <span className="dot">{claimable + (due ? 1 : 0)}</span>}
            {t.id === "shop" && s.boxes > 0 && <span className="dot">{s.boxes}</span>}
          </button>
        ))}
      </nav>
      <FXLayer />
    </div>
  );
}
