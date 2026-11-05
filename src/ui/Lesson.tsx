import { useEffect, useRef, useState } from "react";
import { LEVEL_NAMES, TOPIC_INDEX, topicHash, ytSearch } from "../content";
import { img } from "../assets";
import { buzz, play } from "../audio";
import { actions, getState, topicUnlocked, uncheckedCount, useGame } from "../game/store";
import { XP, pose } from "../game/rules";
import { Back, Mascot, Ring, go } from "./common";
import { ExerciseCard, Result, kindOf } from "./Exercise";
import { burstConfetti } from "./FX";
import { CheckList, askTutor } from "./Help";

/** Exercises (by index) still to do: everything on a replay, otherwise what isn't understood yet. */
function startQueue(id: string) {
  const ti = TOPIC_INDEX[id];
  if (!ti) return [];
  const t = getState().topics[id];
  const all = ti.topic.ex.map((_, i) => i);
  return t?.s === 2 ? all : all.filter((i) => !t?.k?.includes(ti.topic.ex[i].n));
}
/** Pick up where the learner left off instead of replaying the briefing. */
function startStep(id: string, queue: number[]) {
  const t = getState().topics[id];
  if (!t || !TOPIC_INDEX[id]) return 0;
  if (t.s === 2) return uncheckedCount(getState(), id) ? 3 : 0;
  if (!t.d?.length) return t.w ? 2 : 0;
  return queue.length ? 2 : 3;
}

export function Lesson({ id }: { id: string }) {
  const ti = TOPIC_INDEX[id];
  const tstate = useGame((s) => s.topics[id]);
  const unlocked = useGame((s) => topicUnlocked(s, id));
  const [queue, setQueue] = useState(() => startQueue(id));
  const [step, setStep] = useState(() => startStep(id, queue));
  const [qi, setQi] = useState(0);
  const [round, setRound] = useState(0);
  const [missed, setMissed] = useState<number[]>([]); // exercises answered wrong and not yet put right
  const [retry, setRetry] = useState(false);
  const [firstDone, setFirstDone] = useState(false);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState({ right: 0, total: 0, xp: 0 });
  const topRef = useRef<HTMLDivElement>(null);
  const tried = useRef(new Set<number>());
  // Already understood: going back to these never re-awards XP or undoes them.
  const earned = useRef(new Set<number>(ti && tstate?.s !== 2 ? ti.topic.ex.flatMap((e, i) => (tstate?.k?.includes(e.n) ? [i] : [])) : []));

  useEffect(() => { topRef.current?.closest(".main")?.scrollTo({ top: 0, behavior: "smooth" }); }, [step, qi, retry]);

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
    const i = queue[qi];
    if (earned.current.has(i)) return;
    const again = tried.current.has(i);
    tried.current.add(i);
    if (r.ok) earned.current.add(i);
    setMissed((m) => (r.ok ? m.filter((x) => x !== i) : Array.from(new Set([...m, i]))));
    const c = r.ok && r.kind !== "reflect" ? combo + 1 : r.kind === "reflect" ? combo : 0;
    setCombo(c);
    const xp = actions.answer(id, ex[i].n, { ok: r.ok, kind: r.kind, firstTry: r.firstTry && !again, combo: c, given: r.given });
    setScore((s) => ({ right: s.right + (!again && r.ok && r.kind !== "reflect" ? 1 : 0), total: s.total + (!again && r.kind !== "reflect" ? 1 : 0), xp: s.xp + xp }));
  }
  function nextEx() {
    if (qi + 1 < queue.length) { setQi(qi + 1); return; }
    play("open", { volume: 0.5 });
    if (missed.length) { setRetry(true); return; }
    if (topic.checks.length) setStep(3); else finish();
  }
  function retryMissed() {
    play("open", { volume: 0.5 });
    setQueue(missed); setQi(0); setMissed([]); setRound(round + 1); setRetry(false);
  }
  function back() {
    play("tap");
    if (step === 3 && ex.length) { setQueue(ex.map((_, i) => i)); setQi(ex.length - 1); setStep(2); }
    else if (step === 2 && retry) setRetry(false);
    else if (step === 2 && qi > 0) setQi(qi - 1);
    else setStep(step === 3 ? 1 : step - 1);
  }
  function finish() {
    const first = actions.completeTopic(id);
    setFirstDone(first);
    setTimeout(() => { play("jingle_topic"); buzz([30, 50, 30, 50, 90]); burstConfetti(first ? 1 : 0.5); }, 250);
    setStep(4);
  }
  const checksLeft = Math.max(0, topic.checks.length - (tstate?.c?.length ?? 0));
  const exLeft = tstate?.s === 2 ? [] : ex.flatMap((e, i) => (tstate?.k?.includes(e.n) ? [] : [i]));

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

      {step === 2 && retry && (
        <div className="card enter stack">
          <div className="eyebrow">Not done yet</div>
          <h2>{missed.length === 1 ? "One exercise" : `${missed.length} exercises`} to get right</h2>
          <p className="dim" style={{ margin: 0 }}>You can't finish this topic until you've got these. Have another go, or ask the tutor to explain them first.</p>
          {missed.map((i) => (
            <div className="stack" style={{ gap: 4 }} key={i}>
              <div className="tutor">{ex[i].q}</div>
              <button className="asklink" onClick={() => askTutor(id, `I keep getting this wrong: ${ex[i].q}`)}>Ask the tutor about this</button>
            </div>
          ))}
          <button className="btn big wide" onClick={retryMissed}>Try again</button>
        </div>
      )}
      {step === 2 && !retry && queue.length > 0 && (
        <ExerciseCard key={`${id}-${round}-${qi}`} topic={topic} ex={ex[queue[qi]]} index={qi} total={queue.length} combo={combo} mode="lesson" onResult={onResult} onNext={nextEx} />
      )}
      {step === 2 && !retry && queue.length === 0 && (
        <div className="card enter"><p>No exercises here. On to the self-checks.</p><button className="btn" onClick={() => setStep(3)}>Continue</button></div>
      )}

      {step === 3 && (
        <div className="card enter stack">
          <div className="eyebrow">Step 3 · Can you do this?</div>
          <h2>Tick what's true for you</h2>
          <p className="dim small" style={{ margin: 0 }}>Be honest: you need every one of these before moving on. If you can't do one yet, ask the tutor or go back over the lesson.</p>
          <CheckList id={id} />
          {exLeft.length > 0
            ? <button className="btn big wide" onClick={() => { setQueue(exLeft); setQi(0); setMissed([]); setRound(round + 1); setStep(2); }}>Finish the exercises first ({exLeft.length} left)</button>
            : <button className="btn big wide" disabled={checksLeft > 0} onClick={finish}>{checksLeft ? `${checksLeft} left to tick` : "Complete topic"}</button>}
        </div>
      )}

      {(step === 1 || step === 2 || step === 3) && <button className="backlink" onClick={back}>← Go back</button>}

      {step === 4 && (
        <div className="card enter reward">
          <div className="eyebrow">Topic complete</div>
          <div className="bigring">
            <Ring frac={1} size={160} stroke={9} />
            <div className="in"><img src={img(pose(getState().eq.avatar, score.total && score.right / score.total < 0.5 ? "hurt" : "cheer"))} alt="" /></div>
          </div>
          <h1>{topic.title}</h1>
          <CountUp to={score.xp + (firstDone ? XP.topicDone : 0)} />
          <div className="row" style={{ justifyContent: "center" }}>
            {score.total > 0 && <span className="chip">{score.right}/{score.total} correct</span>}
            {firstDone && <span className="chip q"><img src={img("powerupyellow_star")} alt="" />+15</span>}
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
