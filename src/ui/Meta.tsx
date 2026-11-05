import { useRef, useState } from "react";
import { PARTS, TOPIC_INDEX, TOTAL_TOPICS, topicHash } from "../content";
import { img } from "../assets";
import { buzz, play } from "../audio";
import { actions, useGame } from "../game/store";
import { ACHIEVEMENTS, AVATARS, BOX_ODDS, CONSUMABLES, SHIPS, THEME_ITEMS, levelFromXp, rankIcon, titleFor, ShopItem } from "../game/rules";
import { exportBackup, importBackup, cloudStatus } from "../cloud";
import { Quanta, Switch, go } from "./common";
import { burstConfetti } from "./FX";

// ---------------- BADGES (quests tab) ----------------
export function Badges() {
  const s = useGame((s) => s);
  const got = ACHIEVEMENTS.filter((a) => s.ach[a.id]).length;
  return (
    <div className="stack">
      <div className="row spread"><h1>Badges</h1><span className="chip">{got}/{ACHIEVEMENTS.length}</span></div>
      <p className="dim" style={{ margin: 0 }}>Daily quests live on Today. Badges are for the long run.</p>
      <div className="medalrow">
        {ACHIEVEMENTS.map((a) => (
          <div key={a.id} className={"medal" + (s.ach[a.id] ? "" : " off")}>
            <img src={img(`medal${a.medal}`)} alt="" />
            <b>{a.name}</b>
            <span>{a.desc}</span>
          </div>
        ))}
      </div>
      <div className="panel stack">
        <span className="eyebrow">Streak</span>
        <div className="row"><b style={{ fontSize: 28, fontFamily: "var(--mono)" }}>{s.streak.count}</b><span className="dim">days now · best {s.streak.best}</span></div>
        <span className="small dim">Streak freezes held: {s.streak.freezes}/2. A freeze covers a missed day automatically.</span>
      </div>
    </div>
  );
}

// ---------------- SHOP ----------------
const TABS = ["Boxes", "Avatars", "Ships", "Themes", "Power-ups"] as const;
export function Shop() {
  const s = useGame((s) => s);
  const [tab, setTab] = useState<(typeof TABS)[number]>(s.boxes > 0 ? "Boxes" : "Avatars");
  const [msg, setMsg] = useState<string | null>(null);
  const items: ShopItem[] = tab === "Avatars" ? AVATARS : tab === "Ships" ? SHIPS : tab === "Themes" ? THEME_ITEMS : tab === "Power-ups" ? CONSUMABLES : [];
  function buy(it: ShopItem) {
    if (actions.buy(it.id)) {
      play("coin"); buzz(20);
      setMsg(`Bought ${it.name}.`);
      if (it.kind === "avatar" || it.kind === "ship" || it.kind === "theme") actions.equip(it.id);
    } else { play("wrong"); setMsg(it.kind === "freeze" && s.streak.freezes >= 2 ? "You already hold 2 freezes." : "Not enough quanta yet. Lessons, quests and bosses pay out."); }
    setTimeout(() => setMsg(null), 2400);
  }
  return (
    <div className="stack">
      <div className="row spread"><h1>Shop</h1><span className="chip q"><img src={img("powerupyellow_star")} alt="" />{s.quanta.toLocaleString()}</span></div>
      <div className="segs" role="tablist">
        {TABS.map((t) => <button key={t} role="tab" aria-selected={tab === t} className={"seg" + (tab === t ? " on" : "")} onClick={() => { play("select", { volume: 0.5 }); setTab(t); }}>{t}{t === "Boxes" && s.boxes ? ` (${s.boxes})` : ""}</button>)}
      </div>
      {msg && <div className="feedback info">{msg}</div>}
      {tab === "Boxes" ? <BoxOpener /> : (
        <div className="grid">
          {items.map((it) => {
            const owned = s.owned.includes(it.id);
            const equipped = s.eq.avatar === it.id || s.eq.ship === it.id || s.eq.theme === it.id;
            return (
              <div className="item" key={it.id}>
                <div className="pic">{it.kind === "theme" ? <span className="swatch" style={{ background: it.color, color: it.color }} /> : <img src={img(it.img!)} alt="" />}</div>
                <b>{it.name}</b>
                <span className="small dim">{it.desc}</span>
                {it.kind === "freeze" || it.kind === "focus" || it.kind === "box" || !owned ? (
                  <button className="btn amber" onClick={() => buy(it)} disabled={s.quanta < it.price}>
                    {it.price === 0 ? "Free" : <Quanta n={it.price} />}
                  </button>
                ) : equipped ? <button className="btn ghost" disabled>Equipped</button>
                  : <button className="btn" onClick={() => { play("select"); actions.equip(it.id); }}>Equip</button>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BoxOpener() {
  const boxes = useGame((s) => s.boxes);
  const [stage, setStage] = useState<"idle" | "wobble" | "open">("idle");
  const [res, setRes] = useState<ReturnType<typeof actions.openBox>>(null);
  function open() {
    if (boxes <= 0 || stage !== "idle") return;
    setRes(null); setStage("wobble");
    play("jingle_box"); buzz([20, 40, 20, 40, 20, 40, 80]);
    setTimeout(() => {
      const r = actions.openBox();
      setStage("open"); setRes(r);
      play(r?.rarity === "Legendary" || r?.rarity === "Epic" ? "power" : "coin");
      burstConfetti(r?.rarity === "Legendary" ? 2 : r?.rarity === "Epic" ? 1.2 : 0.6);
      setTimeout(() => setStage("idle"), 700);
    }, 1400);
  }
  return (
    <div className="panel stack" style={{ justifyItems: "center", textAlign: "center" }}>
      <div className={"box3d" + (stage === "wobble" ? " wobble" : stage === "open" ? " open" : "")}>
        <img src={img("powerupyellow_star")} alt="Mystery box" style={{ filter: "drop-shadow(0 0 24px var(--amber))" }} />
      </div>
      {res && (
        <div className="stack" style={{ justifyItems: "center", animation: "modalin .5s var(--spring)" }}>
          <span className="eyebrow" style={{ color: res.color }}>{res.rarity}</span>
          {res.img && <img src={img(res.img)} alt="" style={{ width: 64, height: 64 }} />}
          <h2>{res.label}</h2>
        </div>
      )}
      <b>{boxes ? `${boxes} ${boxes === 1 ? "box" : "boxes"} to open` : "No boxes right now"}</b>
      <button className="btn amber big" disabled={!boxes || stage !== "idle"} onClick={open}>Open a box</button>
      <div className="odds">
        <div className="eyebrow">Odds</div>
        {BOX_ODDS.map((o) => <div key={o.rarity}><span style={{ color: o.color, fontWeight: 700 }}>{o.rarity} · {Math.round(o.p * 100)}%</span><span className="dim">{o.what}</span></div>)}
      </div>
      <span className="small dim">Boxes come from boss wins, or 300 quanta in Power-ups.</span>
    </div>
  );
}

// ---------------- PROFILE ----------------
export function Profile() {
  const s = useGame((s) => s);
  const { level, into, need } = levelFromXp(s.xp);
  const [note, setNote] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [name, setName] = useState(s.name);
  const file = useRef<HTMLInputElement>(null);
  const done = Object.values(s.topics).filter((t) => t.s === 2).length;
  const acc = s.stats.correct + s.stats.wrong ? Math.round((s.stats.correct / (s.stats.correct + s.stats.wrong)) * 100) : 0;
  return (
    <div className="stack">
      <div className="panel glow row" style={{ flexWrap: "nowrap" }}>
        <img src={img(s.eq.avatar)} alt="" style={{ width: 84, height: 84, objectFit: "contain" }} />
        <div className="stack" style={{ gap: 4, minWidth: 0 }}>
          <h1 style={{ overflowWrap: "anywhere" }}>{s.name}</h1>
          <div className="row"><img src={img(rankIcon(level))} alt="" style={{ width: 22 }} /><b>Level {level} · {titleFor(level)}</b></div>
          <span className="small dim">{into}/{need} XP to level {level + 1} · {s.xp.toLocaleString()} XP total</span>
        </div>
      </div>
      <div className="tiles">
        <div className="tile"><b>{done}</b><span>topics of {TOTAL_TOPICS}</span></div>
        <div className="tile"><b>{acc}%</b><span>accuracy</span></div>
        <div className="tile"><b>{s.stats.bestCombo}</b><span>best combo</span></div>
        <div className="tile"><b>{s.stats.answered}</b><span>answers</span></div>
        <div className="tile"><b>{s.stats.reviews}</b><span>reviews</span></div>
        <div className="tile"><b>{s.streak.best}</b><span>best streak</span></div>
      </div>

      <div className="panel stack">
        <div className="row spread"><span className="eyebrow">Mistake journal</span><span className="small dim">{s.journal.length} saved</span></div>
        {s.journal.length === 0 ? <span className="dim small">Questions you miss land here with your answer, so you can retry them.</span> : (
          <div className="journal">
            {s.journal.slice(0, 8).map((j) => {
              const [tid, n] = j.k.split("#"); const ti = TOPIC_INDEX[tid]; const ex = ti?.topic.ex.find((e) => e.n === +n);
              if (!ti || !ex) return null;
              return (
                <button key={j.k} className="tick" style={{ gridTemplateColumns: "1fr auto" }} onClick={() => go(topicHash(tid))}>
                  <span><span className="small dim">{tid} {ti.topic.title}</span><br />{ex.q.slice(0, 110)}{ex.q.length > 110 ? "…" : ""}<br /><span className="small">You: <span className="mono">{j.g}</span> · Key: <span className="mono">{ex.a}</span></span></span>
                  <span className="lvltag">Retry</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="panel">
        <span className="eyebrow">Settings</span>
        <div className="setting"><label htmlFor="nm">Name</label><form className="row" style={{ flexWrap: "nowrap" }} onSubmit={(e) => { e.preventDefault(); actions.rename(name); setNote("Name saved."); }}><input id="nm" className="input" style={{ fontFamily: "var(--body)", maxWidth: 170, padding: "8px 10px", fontSize: 16 }} value={name} onChange={(e) => setName(e.target.value)} /><button className="btn ghost" type="submit">Save</button></form></div>
        <div className="setting"><span>Sound</span><Switch label="Sound" on={s.settings.sound} onChange={(v) => actions.setting("sound", v)} /></div>
        <div className="setting"><span>Vibration (Android)</span><Switch label="Vibration" on={s.settings.haptics} onChange={(v) => actions.setting("haptics", v)} /></div>
        <div className="setting"><span>Calm mode <span className="small dim">(less motion and particles)</span></span><Switch label="Calm mode" on={s.settings.calm} onChange={(v) => actions.setting("calm", v)} /></div>
        <div className="setting"><span>Free roam <span className="small dim">(unlock every part and topic)</span></span><Switch label="Free roam" on={s.settings.freeRoam} onChange={(v) => actions.setting("freeRoam", v)} /></div>
        <div className="setting"><span>Progress <span className="small dim">({cloudStatus === "synced" || cloudStatus === "saving" ? "saved to your Claude account" : "saved in this browser"})</span></span>
          <div className="row"><button className="btn ghost" onClick={async () => setNote(await exportBackup())}>Back up</button><button className="btn ghost" onClick={() => file.current?.click()}>Restore</button></div></div>
        <input ref={file} id="restore" type="file" accept="application/json,.json" hidden onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = () => setNote(importBackup(String(r.result))); r.readAsText(f); }} />
        <div className="setting"><span>Start over</span>
          {confirmReset ? <div className="row"><button className="btn ghost" onClick={() => setConfirmReset(false)}>Cancel</button><button className="btn bad" onClick={() => { actions.reset(); setConfirmReset(false); go("today"); }}>Erase everything</button></div>
            : <button className="btn ghost" onClick={() => setConfirmReset(true)}>Reset progress</button>}
        </div>
        {note && <div className="feedback info small">{note}</div>}
      </div>
      <p className="small dim" style={{ margin: 0 }}>Art, sounds and font: Kenney (kenney.nl), CC0. Course content: your Quantum Mechanics from Zero roadmap, {PARTS.length} parts.</p>
    </div>
  );
}

// ---------------- ONBOARDING ----------------
export function Onboarding() {
  const [name, setName] = useState("");
  const [av, setAv] = useState("toon_femaleadventurer_idle");
  const free = AVATARS.filter((a) => a.price === 0);
  return (
    <div className="onb">
      <img src={img(av)} alt="" style={{ width: 120, height: 120, objectFit: "contain", animation: "float 4s ease-in-out infinite" }} />
      <div className="logo">QUANTUM QUEST</div>
      <p className="dim" style={{ margin: 0, maxWidth: 380 }}>929 missions from counting to quantum gravity. Watch, answer, level up, and fight a boss at the end of every part.</p>
      <input id="onb-name" className="textin" placeholder="Your explorer name" value={name} onChange={(e) => setName(e.target.value)} maxLength={24} />
      <div className="small dim">Pick an avatar</div>
      <div className="avatars">{free.map((a) => <button key={a.id} className={av === a.id ? "on" : ""} onClick={() => { play("select"); setAv(a.id); }} aria-label={a.name}><img src={img(a.img!)} alt="" /></button>)}</div>
      <button className="btn big" onClick={() => { play("vo_go"); actions.onboard(name, av); burstConfetti(0.8); go("today"); }}>Launch</button>
    </div>
  );
}
