import { useEffect, useRef, useState } from "react";
import { LEVEL_NAMES, TOPIC_INDEX, topicHash, ytSearch } from "../content";
import { img } from "../assets";
import { buzz, play } from "../audio";
import { actions, getState, topicUnlocked, useGame } from "../game/store";
import { XP, pose } from "../game/rules";
import { Back, Mascot, Ring, go } from "./common";
import { ExerciseCard, Result, kindOf } from "./Exercise";
import { burstConfetti } from "./FX";

export function Lesson({ id }: { id: string }) {
  const ti = TOPIC_INDEX[id];
  const tstate = useGame((s) => s.topics[id]);
  const unlocked = useGame((s) => topicUnlocked(s, id));
  const [step, setStep] = useState(0);
  const [exi, setExi] = useState(0);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState({ right: 0, total: 0, xp: 0 });
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setStep(0); setExi(0); setScore({ right: 0, total: 0, xp: 0 }); }, [id]);
  useEffect(() => { topRef.current?.closest(".main")?.scrollTo({ top: 0, behavior: "smooth" }); }, [step, exi]);

  if (!ti) return <div className="empty">That topic doesn't exist. <button className="btn" onClick={() => go("map")}>Back to the map</button></div>;
  const { topic, part, index } = ti;
  if (!unlocked) return (
    <div className="stack" ref={topRef}>
      <Back to={`part-${part.part}`} label={part.name} />
      <div className="empty panel"><img src={img("emote_alert")} alt="" /><h2>Locked</h2><p>Finish the topic before this one to unlock {topic.id}.</p>
        <button className="btn" onClick={() => go(`part-${part.part}`)}>Open {part.name}</button></div>
    </div>
  );

  const ex = topic.ex;
  const nextT = part.topics[index + 1];

  function onResult(r: Result) {
    const c = r.ok && r.kind !== "reflect" ? combo + 1 : r.kind === "reflect" ? combo : 0;
    setCombo(c);
    const xp = actions.answer(id, ex[exi].n, { ok: r.ok, kind: r.kind, firstTry: r.firstTry, combo: c, given: r.given });
    setScore((s) => ({ right: s.right + (r.ok && r.kind !== "reflect" ? 1 : 0), total: s.total + (r.kind !== "reflect" ? 1 : 0), xp: s.xp + xp }));
  }
  function nextEx() {
    if (exi + 1 < ex.length) setExi(exi + 1);
    else { play("open", { volume: 0.5 }); setStep(topic.checks.length ? 3 : 4); if (!topic.checks.length) finish(); }
  }
  function finish() {
    const first = actions.completeTopic(id);
    setTimeout(() => { play("jingle_topic"); buzz([30, 50, 30, 50, 90]); burstConfetti(first ? 1 : 0.5); }, 250);
    setStep(4);
  }
  const checksDone = (tstate?.c?.length ?? 0) >= topic.checks.length;

  return (
    <div className="lesson" ref={topRef}>
      <div className="row spread">
        <Back to={`part-${part.part}`} label={`Part ${part.part} · ${part.name}`} />
        <span className="lvltag">{topic.id} · L{topic.level} {LEVEL_NAMES[topic.level]}</span>
      </div>
      <div className="steps" aria-label={`Step ${step + 1} of 5`}>{[0, 1, 2, 3, 4].map((i) => <i key={i} className={i <= step ? "on" : ""} />)}</div>

      {step === 0 && (
        <div className="card enter stack">
          <div className="eyebrow">Mission briefing</div>
          <h1>{topic.title}</h1>
          <p style={{ margin: 0, fontSize: 17 }}>{topic.goal}</p>
          <div className="row small dim">
            <span>{ex.length} exercises</span>·<span>{topic.checks.length} self-checks</span>·<span>~{XP.topicDone + ex.length * 12} XP</span>
          </div>
          <Mascot text={index === 0 ? `Part ${part.part} starts here. ${part.intro.split(". ")[0]}.` : undefined} />
          <button className="btn big wide" onClick={() => { play("open"); setStep(1); }}>Start</button>
        </div>
      )}

      {step === 1 && (
        <div className="card enter videobox">
          <div className="eyebrow">Step 1 · Watch</div>
          <h2>Find a video on this</h2>
          <a className="screen" href={topic.video ?? ytSearch(topic.search)} target="_blank" rel="noopener noreferrer" onClick={() => { play("select"); actions.markWatched(id); }}>
            <div className="stack" style={{ justifyItems: "center" }}>
              <div className="play" />
              <span className="small">{topic.video ? "Open the video on YouTube" : "Search YouTube in a new tab"}</span>
            </div>
          </a>
          <div className="small dim">Search for</div>
          <div className="search">{topic.search}</div>
          <div className="small dim">Watch for: {topic.goal}</div>
          <div className="row" style={{ flexWrap: "nowrap" }}>
            <button className="btn ghost wide" onClick={() => { play("tap"); setStep(2); }}>Skip for now</button>
            <button className="btn good wide" onClick={() => { actions.markWatched(id); play("correct"); setStep(2); }}>I watched it</button>
          </div>
        </div>
      )}

      {step === 2 && ex.length > 0 && (
        <ExerciseCard key={`${id}-${exi}`} topic={topic} ex={ex[exi]} index={exi} total={ex.length} combo={combo} mode="lesson" onResult={onResult} onNext={nextEx} />
      )}
      {step === 2 && ex.length === 0 && (
        <div className="card enter"><p>No exercises here. On to the self-checks.</p><button className="btn" onClick={() => setStep(3)}>Continue</button></div>
      )}

      {step === 3 && (
        <div className="card enter stack">
          <div className="eyebrow">Step 3 · Can you do this?</div>
          <h2>Tick what's true for you</h2>
          <p className="dim small" style={{ margin: 0 }}>Be honest: anything you leave unticked is fine, and you can come back.</p>
          {topic.checks.map((c, i) => {
            const on = tstate?.c?.includes(i);
            return (
              <button key={i} className={"tick" + (on ? " on" : "")} onClick={() => { play(on ? "drop" : "tick", { rate: 1 + i * 0.08 }); buzz(10); actions.tickCheck(id, i); }}>
                <span className="box" /><span>{c}</span>
              </button>
            );
          })}
          <button className="btn big wide" onClick={finish}>{checksDone ? "Complete topic" : "Complete topic anyway"}</button>
        </div>
      )}

      {step === 4 && (
        <div className="card enter reward">
          <div className="eyebrow">Topic complete</div>
          <div className="bigring">
            <Ring frac={1} size={160} stroke={9} />
            <div className="in"><img src={img(pose(getState().eq.avatar, score.total && score.right / score.total < 0.5 ? "hurt" : "cheer"))} alt="" /></div>
          </div>
          <h1>{topic.title}</h1>
          <CountUp to={score.xp + XP.topicDone} />
          <div className="row" style={{ justifyContent: "center" }}>
            <span className="chip">{score.right}/{score.total} correct</span>
            <span className="chip q"><img src={img("powerupyellow_star")} alt="" />+15</span>
          </div>
          <Mascot mood={score.total && score.right / score.total < 0.5 ? "sad" : "happy"} text={score.total && score.right / score.total < 0.5 ? "Tough one. The misses will come back in Review, which is how they stick." : undefined} />
          <div className="row" style={{ width: "100%", flexWrap: "nowrap" }}>
            <button className="btn ghost wide" onClick={() => go(`part-${part.part}`)}>Back to {part.name}</button>
            {nextT ? <button className="btn wide" onClick={() => go(topicHash(nextT.id))}>Next topic</button>
              : <button className="btn amber wide" onClick={() => go(`boss-${part.part}`)}>Face the boss</button>}
          </div>
        </div>
      )}
    </div>
  );
}

function CountUp({ to }: { to: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0; const t0 = performance.now();
    const f = (t: number) => { const k = Math.min(1, (t - t0) / 1100); setN(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <div className="count">+{n} XP</div>;
}
