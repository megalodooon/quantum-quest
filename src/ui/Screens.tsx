import { useEffect, useMemo, useRef, useState } from "react";
import { PARTS, STAGES, TOTAL_TOPICS, hex, stageColor, topicHash, LEVEL_NAMES } from "../content";
import { ENEMIES, img } from "../assets";
import { play } from "../audio";
import { bossUnlocked, dueCards, mastery, nextTopic, partProgress, partUnlocked, topicUnlocked, useGame, actions } from "../game/store";
import { levelFromXp, questsForDay, titleFor } from "../game/rules";
import { MapScene, PlanetInfo } from "../pixi/MapScene";
import { Back, Mascot, Quanta, Ring, go } from "./common";

export function Today() {
  const s = useGame((s) => s);
  const next = nextTopic(s);
  const due = dueCards(s, 99).length;
  const quests = questsForDay(s.day.d);
  const done = Object.values(s.topics).filter((t) => t.s === 2).length;
  const { level } = levelFromXp(s.xp);
  const fact = useMemo(() => {
    const ps = PARTS.slice(14);
    const p = ps[Math.floor(Math.random() * ps.length)];
    return p.topics[Math.floor(Math.random() * p.topics.length)];
  }, []);
  const greet = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";
  return (
    <div className="stack">
      <div className="panel glow hero corner">
        <div className="stack" style={{ gap: 8 }}>
          <div className="eyebrow">{greet}, {s.name}</div>
          <h1>{s.streak.count > 0 && s.streak.last === s.day.d ? "Streak safe for today." : s.streak.count > 0 ? `Keep your ${s.streak.count}-day streak alive.` : "Start your first streak today."}</h1>
          <div className="small dim">Level {level} · {titleFor(level)}</div>
        </div>
        <img className="astro" src={img(s.eq.avatar)} alt="" />
      </div>

      <div className="panel stack">
        <div className="row spread"><span className="eyebrow">Next mission</span><span className="lvltag">Part {next.id.split(".")[0]} · L{next.level}</span></div>
        <h2>{next.id} {next.title}</h2>
        <p className="dim" style={{ margin: 0 }}>{next.goal}</p>
        <button className="btn big wide" onClick={() => go(topicHash(next.id))}>{s.topics[next.id]?.s ? "Continue" : "Start"} {next.id}</button>
      </div>

      <div className="tiles">
        <div className="tile"><b>{done}</b><span>of {TOTAL_TOPICS} topics</span></div>
        <div className="tile"><b>{s.stats.correct}</b><span>right answers</span></div>
        <div className="tile"><b>{Object.keys(s.bosses).length}</b><span>bosses beaten</span></div>
      </div>

      <div className="panel stack">
        <div className="row spread"><span className="eyebrow">Daily quests</span><span className="small dim">New ones tomorrow</span></div>
        <div>
          {quests.map((q) => {
            const v = Math.min(q.target, (s.day as any)[q.stat] ?? 0);
            const claimed = s.day.claimed.includes(q.id);
            const ready = v >= q.target && !claimed;
            return (
              <div className="quest" key={q.id}>
                <div className="stack" style={{ gap: 6 }}>
                  <b style={{ fontSize: 15 }}>{q.text}</b>
                  <div className="bar"><i style={{ width: `${(v / q.target) * 100}%` }} /></div>
                </div>
                {claimed ? <span className="small dim">Claimed</span> : ready ? (
                  <button className="btn amber claim" onClick={() => { play("power"); actions.claimQuest(q.id, q.reward); }}>Claim <Quanta n={q.reward} /></button>
                ) : <span className="mono small dim">{v}/{q.target}</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel row spread">
        <div className="stack" style={{ gap: 4 }}>
          <span className="eyebrow">Review queue</span>
          <b>{due ? `${due} ${due === 1 ? "question is" : "questions are"} due` : "Nothing due right now"}</b>
          <span className="small dim">Spaced repetition brings answers back just before you'd forget them.</span>
        </div>
        <button className="btn" disabled={!due} onClick={() => go("review")}>Review</button>
      </div>

      {s.boxes > 0 && (
        <button className="panel row spread" style={{ cursor: "pointer", textAlign: "left", width: "100%" }} onClick={() => go("shop")}>
          <div className="row"><img src={img("powerupyellow_star")} alt="" style={{ width: 40 }} /><div><b>{s.boxes} mystery {s.boxes === 1 ? "box" : "boxes"} waiting</b><div className="small dim">Open in the shop</div></div></div>
          <span className="btn amber">Open</span>
        </button>
      )}

      <div className="panel stack">
        <span className="eyebrow">From the frontier · {fact.id}</span>
        <b>{fact.title}</b>
        <span className="dim">{fact.goal}</span>
      </div>
    </div>
  );
}

// ---------------- MAP ----------------
export function MapView() {
  const host = useRef<HTMLDivElement>(null);
  const s = useGame((s) => s);
  const [list, setList] = useState(false);
  const sceneRef = useRef<MapScene | null>(null);
  const info: PlanetInfo[] = PARTS.map((p) => ({ part: p.part, unlocked: partUnlocked(s, p.part), frac: partProgress(s, p.part).frac, boss: s.bosses[p.part] !== undefined, current: false }));
  const cur = Number(nextTopic(s).id.split(".")[0]);
  info[cur].current = true;
  const key = info.map((i) => `${+i.unlocked}${Math.round(i.frac * 100)}${+i.boss}`).join("") + s.eq.ship + s.settings.calm;

  useEffect(() => {
    if (list || !host.current) return;
    const scene = new MapScene(host.current, (p) => { play("select"); go(`part-${p}`); }, s.settings.calm);
    sceneRef.current = scene;
    scene.init(info, s.eq.ship).catch(() => setList(true));
    return () => { scene.destroy(); sceneRef.current = null; };
  }, [key, list]);

  if (list) return (
    <div className="stack">
      <div className="row spread"><h1>The map</h1><button className="btn ghost" onClick={() => setList(false)}>Space view</button></div>
      {STAGES.map((st) => (
        <div key={st.id} className="stack" style={{ gap: 8 }}>
          <div className="eyebrow" style={{ color: hex(stageColor(st.id)) }}>Stage {st.id} · {st.name}</div>
          <div className="partlist">
            {st.parts.map((p) => {
              const pr = partProgress(s, p); const ul = partUnlocked(s, p);
              return (
                <button key={p} className={"partrow" + (ul ? "" : " locked")} onClick={() => go(`part-${p}`)}>
                  <span className="n" style={{ background: hex(stageColor(st.id)) }}>{p}</span>
                  <span><b>{PARTS[p].name}</b><div className="small dim">{pr.done}/{pr.total} topics{s.bosses[p] !== undefined ? " · boss defeated" : ""}</div></span>
                  <span className="mono small">{ul ? `${Math.round(pr.frac * 100)}%` : "Locked"}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="mapwrap">
      <div ref={host} className="mapwrap" />
      <div className="mapover">
        <div className="legend">Drag to fly · tap a planet</div>
        <div className="row">
          <button className="btn ghost" style={{ padding: "8px 12px" }} onClick={() => sceneRef.current?.focus(cur)}>Find me</button>
          <button className="btn ghost" style={{ padding: "8px 12px" }} onClick={() => setList(true)}>List</button>
        </div>
      </div>
    </div>
  );
}

// ---------------- PART ----------------
export function PartView({ p }: { p: number }) {
  const s = useGame((s) => s);
  const part = PARTS[p];
  if (!part) return <div className="empty">No such part.</div>;
  const ul = partUnlocked(s, p);
  const pr = partProgress(s, p);
  const col = hex(stageColor(part.stage));
  const stage = STAGES.find((x) => x.id === part.stage)!;
  const bossOk = bossUnlocked(s, p);
  const nextId = part.topics.find((t) => s.topics[t.id]?.s !== 2 && topicUnlocked(s, t.id))?.id;
  return (
    <div className="stack">
      <Back to="map" label="Map" />
      <div className="panel glow parthead" style={{ borderColor: col }}>
        <div className="eyebrow" style={{ color: col }}>Stage {stage.id} · {stage.name} · Part {p}</div>
        <h1>{part.name}</h1>
        <p className="dim" style={{ margin: 0 }}>{part.intro}</p>
        <div className="row"><div className="bar" style={{ flex: 1, margin: 0 }}><i style={{ width: `${pr.frac * 100}%`, background: col, boxShadow: `0 0 12px ${col}` }} /></div><span className="mono small">{pr.done}/{pr.total}</span></div>
      </div>
      {!ul && <Mascot mood="sad" text={`Part ${p} unlocks when you finish half of Part ${p - 1} or defeat its boss. Turn on free roam in Profile to skip ahead.`} />}

      <div className="panel bosscard" style={{ borderColor: bossOk ? "var(--bad)" : "var(--line)" }}>
        <img src={img(ENEMIES[p])} alt="" style={{ transform: ENEMIES[p].startsWith("alien") ? "none" : "rotate(180deg)" }} />
        <div className="stack" style={{ gap: 6 }}>
          <span className="eyebrow" style={{ color: "var(--bad)" }}>Boss</span>
          <b>{part.boss}</b>
          <span className="small dim">{s.bosses[p] !== undefined ? `Defeated · best ${s.bosses[p]} hits` : bossOk ? "Ready to fight. Questions come from this part." : `Finish ${Math.min(8, pr.total)} topics here to challenge it.`}</span>
          <button className="btn bad" disabled={!bossOk || !ul} onClick={() => go(`boss-${p}`)}>{s.bosses[p] !== undefined ? "Rematch" : "Fight"}</button>
        </div>
      </div>

      <div className="path">
        {part.topics.map((t) => {
          const st = s.topics[t.id];
          const m = mastery(s, t.id);
          const open = topicUnlocked(s, t.id);
          const cls = "stone" + (st?.s === 2 ? (m >= 3 ? " gold done" : " done") : "") + (t.id === nextId ? " next" : "") + (open ? "" : " locked");
          const frac = st?.s === 2 ? m / 3 : st?.d ? st.d.length / Math.max(1, t.ex.length) * 0.9 : 0;
          return (
            <button key={t.id} className={cls} disabled={!open} onClick={() => go(topicHash(t.id))}>
              <span className="node"><Ring frac={frac} color={m >= 3 ? "var(--amber)" : col} /><span className="core">{t.id.split(".")[1]}</span></span>
              <span className="t"><b>{t.title}</b><span>{st?.s === 2 ? ["", "Complete", "Strong", "Mastered"][Math.floor(m)] ?? "Complete" : st?.s === 1 ? "In progress" : t.goal}</span></span>
              <span className="lvltag">L{t.level}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
