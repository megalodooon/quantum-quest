import { useEffect, useMemo, useRef, useState } from "react";
import { PARTS, TOPIC_INDEX, stageColor } from "../content";
import { ENEMIES, img } from "../assets";
import { buzz, play } from "../audio";
import { actions, bossUnlocked, dueCards, getState, useGame } from "../game/store";
import { BossScene } from "../pixi/BossScene";
import { Back, Mascot, go } from "./common";
import { ExerciseCard, Result } from "./Exercise";
import { burstConfetti } from "./FX";

// ---------------- REVIEW ----------------
export function Review() {
  const [keys] = useState(() => dueCards(getState(), 12));
  const [i, setI] = useState(0);
  const [combo, setCombo] = useState(0);
  const [right, setRight] = useState(0);
  const [done, setDone] = useState(false);
  if (!keys.length) return (
    <div className="stack"><Back to="today" label="Today" />
      <div className="empty panel"><img src={img("emote_sleep")} alt="" /><h2>Nothing to review</h2><p>Answer questions in lessons and they'll come back here on a schedule.</p><button className="btn" onClick={() => go("today")}>Back to Today</button></div></div>
  );
  if (done) return (
    <div className="stack"><div className="card enter reward"><div className="eyebrow">Review complete</div><h1>{right} of {keys.length} remembered</h1>
      <Mascot mood={right / keys.length >= 0.6 ? "happy" : "sad"} text={right / keys.length >= 0.6 ? "Your memory is getting stronger." : "The misses will come back sooner. That's how they stick."} />
      <button className="btn big wide" onClick={() => go("today")}>Done</button></div></div>
  );
  const [tid, n] = keys[i].split("#");
  const ti = TOPIC_INDEX[tid];
  const ex = ti?.topic.ex.find((e) => e.n === +n);
  const next = () => {
    if (i + 1 < keys.length) setI(i + 1);
    else { actions.finishReview(keys.length); play("jingle_topic"); burstConfetti(0.6); setDone(true); }
  };
  if (!ti || !ex) { setTimeout(next, 0); return null; }
  return (
    <div className="stack">
      <div className="row spread"><Back to="today" label="Today" /><span className="mono small dim">{i + 1}/{keys.length}</span></div>
      <div className="steps" style={{ gridTemplateColumns: `repeat(${keys.length}, 1fr)` }}>{keys.map((_, k) => <i key={k} className={k <= i ? "on" : ""} />)}</div>
      <ExerciseCard key={keys[i]} topic={ti.topic} ex={ex} index={i} total={keys.length} combo={combo} mode="review"
        onResult={(r: Result) => {
          const c = r.ok ? combo + 1 : 0; setCombo(c); if (r.ok) setRight((x) => x + 1);
          actions.answer(tid, ex.n, { ok: r.ok, kind: r.kind, firstTry: r.firstTry, combo: c, given: r.given, review: true });
        }}
        onNext={next} />
    </div>
  );
}

// ---------------- BOSS ----------------
const BOSS_HP = 6;
const SHIELDS = 3;

export function Boss({ p }: { p: number }) {
  const part = PARTS[p];
  const s = useGame((s) => s);
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<BossScene | null>(null);
  const [phase, setPhase] = useState<"intro" | "fight" | "won" | "lost">("intro");
  const [hp, setHp] = useState(BOSS_HP);
  const [shields, setShields] = useState(SHIELDS);
  const [qi, setQi] = useState(0);
  const [combo, setCombo] = useState(0);
  const pending = useRef<{ hp: number; shields: number }>({ hp: BOSS_HP, shields: SHIELDS });

  const questions = useMemo(() => {
    if (!part) return [];
    const all = part.topics.flatMap((t) => t.ex.filter((e) => e.a).map((e) => ({ t, e })));
    const done = all.filter(({ t }) => s.topics[t.id]?.s === 2);
    const pool = (done.length >= 10 ? done : all);
    const num = pool.filter((x) => x.e.num), self = pool.filter((x) => !x.e.num);
    const shuffle = <T,>(a: T[]) => a.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
    return [...shuffle(num).slice(0, 8), ...shuffle(self).slice(0, 4)].sort(() => Math.random() - 0.5).slice(0, BOSS_HP + SHIELDS - 1);
  }, [p]);

  useEffect(() => {
    if (!host.current || !part) return;
    const sc = new BossScene(host.current, ENEMIES[p], s.eq.ship, stageColor(part.stage), s.settings.calm);
    scene.current = sc;
    sc.onHit = (target) => {
      if (target === "boss") { play("boom", { volume: 0.6 }); buzz(30); }
      else { play("hit", { volume: 0.7 }); buzz([50, 30, 80]); }
    };
    sc.init().then(() => sc.shieldPulse(SHIELDS));
    return () => { sc.destroy(); scene.current = null; };
  }, [p]);

  if (!part) return null;
  if (!bossUnlocked(s, p)) return <div className="stack"><Back to={`part-${p}`} label={part.name} /><div className="empty panel"><h2>Not yet</h2><p>Finish more topics in {part.name} to challenge {part.boss}.</p></div></div>;

  function onResult(r: Result) {
    const ok = r.ok;
    const sc = scene.current;
    const c = ok ? combo + 1 : 0;
    setCombo(c);
    const q = questions[qi];
    actions.answer(q.t.id, q.e.n, { ok, kind: r.kind, firstTry: r.firstTry, combo: c, given: r.given, review: true });
    if (ok) {
      play("laser", { rate: 1 + Math.min(c, 6) * 0.06 });
      sc?.fireAtBoss(c >= 3);
      const nh = Math.max(0, pending.current.hp - (c >= 3 ? 2 : 1));
      pending.current.hp = nh;
      setTimeout(() => setHp(nh), 350);
      if (nh === 0) setTimeout(() => { sc?.bossDies(); play("jingle_win"); setTimeout(() => play("vo_win"), 900); burstConfetti(1.4); actions.bossResult(p, true, BOSS_HP + pending.current.shields); setPhase("won"); }, 700);
    } else {
      play("phaser", { volume: 0.6 });
      sc?.bossFires();
      const ns = pending.current.shields - 1;
      pending.current.shields = ns;
      setTimeout(() => { setShields(ns); sc?.shieldPulse(Math.max(0, ns)); }, 400);
      if (ns <= 0) setTimeout(() => { sc?.playerDies(); play("jingle_lose"); setTimeout(() => play("vo_lose"), 600); actions.bossResult(p, false, 0); setPhase("lost"); }, 800);
    }
  }
  function next() {
    if (phase !== "fight") return;
    if (qi + 1 < questions.length) setQi(qi + 1);
    else if (pending.current.hp > 0) { scene.current?.playerDies(); play("jingle_lose"); actions.bossResult(p, false, 0); setPhase("lost"); }
  }

  return (
    <div className="boss">
      <div className="bossstage">
        <div ref={host} style={{ position: "absolute", inset: 0 }} />
        <div className="bosshud">
          <div className="row spread"><b style={{ fontFamily: "var(--display)", fontSize: 14 }}>{part.boss}</b><span className="mono small">{hp}/{BOSS_HP}</span></div>
          <div className="hp"><i style={{ width: `${(hp / BOSS_HP) * 100}%` }} /></div>
          <div className="row spread">
            <div className="shields">{Array.from({ length: SHIELDS }, (_, k) => <img key={k} className={k < shields ? "" : "gone"} src={img("powerupgreen_shield")} alt={k < shields ? "shield" : "shield lost"} />)}</div>
            {combo >= 3 && <span className="combo big" style={{ position: "static" }}>CRIT ×{combo}</span>}
          </div>
        </div>
      </div>
      <div className="bossq">
        {phase === "intro" && (
          <div className="stack">
            <div className="eyebrow" style={{ color: "var(--bad)" }}>Boss battle · Part {p}</div>
            <h2>{part.boss}</h2>
            <p className="dim" style={{ margin: 0 }}>Right answers fire your lasers. Three in a row land critical hits for double damage. Each wrong answer costs a shield, and you have {SHIELDS}. No hints in battle.</p>
            <div className="row" style={{ flexWrap: "nowrap" }}>
              <button className="btn ghost wide" onClick={() => go(`part-${p}`)}>Retreat</button>
              <button className="btn bad wide big" onClick={() => { play("vo_ready"); setTimeout(() => play("vo_go"), 700); setPhase("fight"); }}>Engage</button>
            </div>
          </div>
        )}
        {phase === "fight" && questions[qi] && (
          <ExerciseCard key={qi} topic={questions[qi].t} ex={questions[qi].e} index={qi} total={questions.length} combo={combo} mode="boss" onResult={onResult} onNext={next} />
        )}
        {phase === "won" && (
          <div className="stack reward">
            <div className="eyebrow" style={{ color: "var(--amber)" }}>Victory</div>
            <h1>{part.boss} is down</h1>
            <div className="row" style={{ justifyContent: "center" }}><span className="chip">+300 XP</span><span className="chip q"><img src={img("powerupyellow_star")} alt="" />+150</span><span className="chip">+1 mystery box</span></div>
            <div className="row" style={{ width: "100%", flexWrap: "nowrap" }}>
              <button className="btn ghost wide" onClick={() => go("map")}>Map</button>
              <button className="btn amber wide" onClick={() => go("shop")}>Open the box</button>
            </div>
          </div>
        )}
        {phase === "lost" && (
          <div className="stack reward">
            <div className="eyebrow" style={{ color: "var(--bad)" }}>Shields down</div>
            <h2>{part.boss} survives, for now</h2>
            <Mascot mood="sad" text="Every question you missed is now in your review queue. Clear it, then come back stronger." />
            <div className="row" style={{ width: "100%", flexWrap: "nowrap" }}>
              <button className="btn ghost wide" onClick={() => go("review")}>Review misses</button>
              <button className="btn bad wide" onClick={() => go(`boss-${p}`)}>Rematch</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
