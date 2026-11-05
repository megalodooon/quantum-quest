import { useEffect, useRef, useState } from "react";
import type { Exercise, Topic } from "../content";
import { buzz, play } from "../audio";
import { gradeNumeric } from "../game/grading";
import { actions } from "../game/store";
import { getSample } from "../cloud";

export type Result = { ok: boolean; kind: "numeric" | "self" | "reflect"; firstTry: boolean; given?: string };

export function kindOf(e: Exercise): Result["kind"] {
  return e.num ? "numeric" : e.a ? "self" : "reflect";
}

export function ExerciseCard({ topic, ex, index, total, combo, mode, onResult, onNext }: {
  topic: Topic; ex: Exercise; index: number; total: number; combo: number; mode: "lesson" | "review" | "boss";
  onResult: (r: Result) => void; onNext: () => void;
}) {
  const kind = kindOf(ex);
  const [val, setVal] = useState("");
  const [tries, setTries] = useState(0);
  const [state, setState] = useState<"ask" | "wrong" | "right" | "revealed" | "graded">("ask");
  const [reason, setReason] = useState<string | undefined>();
  const [shake, setShake] = useState(false);
  const [graded, setGraded] = useState<boolean | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reported = useRef(false);

  useEffect(() => { if (kind === "numeric" && mode !== "boss") setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300); }, []);

  const report = (r: Result) => { if (!reported.current) { reported.current = true; onResult(r); } };

  function check() {
    if (!ex.num || !val.trim()) return;
    const v = gradeNumeric(val, ex.num);
    if (v.ok) {
      setState("right");
      const c = combo + 1;
      play("correct", { rate: 1 + Math.min(c, 12) * 0.045 });
      if (c >= 3) setTimeout(() => play("combo", { rate: 1 + Math.min(c, 10) * 0.05, volume: 0.4 }), 140);
      buzz(18);
      report({ ok: true, kind: "numeric", firstTry: tries === 0, given: val });
    } else {
      play("wrong"); buzz([30, 40, 60]);
      setShake(true); setTimeout(() => setShake(false), 400);
      setReason(v.reason);
      const t = tries + 1;
      setTries(t);
      if (mode === "boss" || t >= 2) { setState("revealed"); report({ ok: false, kind: "numeric", firstTry: false, given: val }); }
      else setState("wrong");
    }
  }
  function reveal() {
    play("flip");
    setState("revealed");
    if (kind === "numeric") report({ ok: false, kind: "numeric", firstTry: false, given: val || "(revealed)" });
  }
  function selfGrade(ok: boolean) {
    setGraded(ok); setState("graded");
    if (ok) { play("correct", { rate: 1 + Math.min(combo + 1, 12) * 0.04 }); buzz(18); } else play("drop");
    report({ ok, kind: "self", firstTry: true, given: val || "(self-graded)" });
  }
  function reflectDone() {
    play("select");
    report({ ok: true, kind: "reflect", firstTry: true });
    onNext();
  }

  const done = state === "right" || state === "graded" || (state === "revealed" && kind === "numeric");
  const cls = "card enter" + (shake ? " shake" : "") + (state === "right" || graded ? " right" : "");

  return (
    <div className={cls} ref={cardRef} key={topic.id + ex.n}>
      {combo >= 2 && <div className={"combo" + (combo % 5 === 0 ? " big" : "")}>COMBO ×{combo}</div>}
      <div className="stack">
        <div className="eyebrow">{mode === "review" ? `Review · ${topic.id} ${topic.title}` : `${mode === "boss" ? "Question" : "Exercise"} ${index + 1} of ${total}`}{kind === "numeric" ? " · auto-graded" : kind === "self" ? " · self-check" : " · think it through"}</div>
        <div className="qtext">{ex.q}</div>

        {kind === "numeric" && state !== "revealed" && state !== "right" && (
          <form className="answerrow" onSubmit={(e) => { e.preventDefault(); check(); }}>
            <input id={`ans-${topic.id}-${ex.n}`} ref={inputRef} className="input" inputMode="text" autoComplete="off" autoCorrect="off" spellCheck={false}
              placeholder={ex.num?.unit ? `number in ${ex.num.unit}` : "your answer"} value={val} onChange={(e) => setVal(e.target.value)} aria-label="Your answer" />
            <button className="btn" type="submit" disabled={!val.trim()}>Check</button>
          </form>
        )}
        {kind === "numeric" && state === "ask" && ex.num && (
          <div className="small dim">Type a number{ex.num.unit ? ` in ${ex.num.unit}` : ""}. Forms like 3.2e-12, 3.2×10^-12 or 5/6 work{ex.num.approx ? "; a close estimate counts" : ""}.</div>
        )}

        {kind === "self" && state === "ask" && (
          <>
            <textarea id={`notes-${topic.id}-${ex.n}`} className="input" rows={2} placeholder="Work it out here or on paper (optional)" value={val} onChange={(e) => setVal(e.target.value)} style={{ resize: "vertical", fontFamily: "var(--body)" }} />
            <button className="btn wide" onClick={reveal}>Reveal the answer</button>
          </>
        )}
        {kind === "reflect" && (
          <>
            <textarea id={`refl-${topic.id}-${ex.n}`} className="input" rows={3} placeholder="Write your thoughts (optional; this one has no single answer)" value={val} onChange={(e) => setVal(e.target.value)} style={{ resize: "vertical", fontFamily: "var(--body)" }} />
            <div className="row"><button className="btn wide" onClick={reflectDone}>Done, next</button></div>
            <Tutor topic={topic} ex={ex} given={val} label="Talk it through with Claude" />
          </>
        )}

        {state === "wrong" && (
          <div className="feedback bad">
            <b>Not quite.</b>
            <span>{reason ?? "Check your working and try once more."}</span>
            <div className="row">
              <button className="btn ghost" onClick={reveal}>Show answer</button>
              <Tutor topic={topic} ex={ex} given={val} label="Explain it" compact />
            </div>
          </div>
        )}
        {state === "right" && (
          <div className="feedback good">
            <b>Correct{tries === 0 ? "!" : " on the second try."}</b>
            {ex.a && <span className="answer">Answer key: {ex.a}</span>}
            <button className="btn good wide big" onClick={() => { play("tap"); onNext(); }}>Continue</button>
          </div>
        )}
        {state === "revealed" && (
          <div className={"feedback " + (kind === "numeric" ? "bad" : "info")}>
            <span className="dim small">{kind === "numeric" ? "The answer" : "Answer key"}</span>
            <span className="answer">{ex.a}</span>
            {kind === "numeric" && reason && <span className="small">{reason}</span>}
            {kind === "self" ? (
              <>
                <span>Did you get it?</span>
                <div className="row" style={{ flexWrap: "nowrap" }}>
                  <button className="btn bad wide" onClick={() => selfGrade(false)}>Not yet</button>
                  <button className="btn good wide" onClick={() => selfGrade(true)}>I got it</button>
                </div>
              </>
            ) : (
              <button className="btn wide" onClick={() => { play("tap"); onNext(); }}>Continue</button>
            )}
            <Tutor topic={topic} ex={ex} given={val} label="Explain this step by step" />
          </div>
        )}
        {state === "graded" && (
          <div className={"feedback " + (graded ? "good" : "info")}>
            <b>{graded ? "Nice work." : mode === "lesson" ? "No problem. You'll get another go before finishing this topic." : "No problem. It will come back in your reviews."}</b>
            <button className={"btn wide big " + (graded ? "good" : "")} onClick={() => { play("tap"); onNext(); }}>Continue</button>
            {!graded && <Tutor topic={topic} ex={ex} given={val} label="Explain this step by step" />}
          </div>
        )}
        {!done && state === "ask" && kind !== "reflect" && mode !== "boss" && (
          <div className="row" style={{ justifyContent: "flex-end" }}><Tutor topic={topic} ex={ex} given={val} label="I don't get it" compact hintOnly /></div>
        )}
      </div>
    </div>
  );
}

/** Claude as tutor, through the artifact's sample capability. */
export function Tutor({ topic, ex, given, label, compact, hintOnly }: { topic: Topic; ex?: Exercise; given?: string; label: string; compact?: boolean; hintOnly?: boolean }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [follow, setFollow] = useState("");
  const history = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  const ctl = useRef<AbortController | null>(null);

  async function ask(question?: string) {
    setOpen(true); setErr(null); setLoading(true); setText("");
    const sample = await getSample();
    if (!sample) { setLoading(false); setErr("The tutor works when this app is open in Claude (claude.ai or the Claude app)."); return; }
    if (!question) {
      const brief = [
        "You are Schrö, a warm, sharp tutor inside a quantum-mechanics learning game. The learner is self-taught and learns visually.",
        `Topic ${topic.id}: ${topic.title}. Goal: ${topic.goal}`,
        ex ? `Exercise: ${ex.q}` : "",
        ex?.a ? `Answer key: ${ex.a}` : "This exercise has no single answer; help them reason about it.",
        given ? `The learner wrote: ${given}` : "",
        hintOnly
          ? "Give a short hint that gets them unstuck WITHOUT giving the final answer. Under 90 words. Plain text, no markdown headings; use simple symbols like ×, ², √."
          : "Explain how to get the answer step by step, as for a curious beginner. Point out the likely mistake if their answer was wrong. Under 170 words. Plain text, no markdown headings; use simple symbols like ×, ², √. End with one quick question to check understanding.",
      ].filter(Boolean).join("\n");
      history.current = [{ role: "user", content: brief }];
      actions.tutorUsed();
    } else {
      history.current.push({ role: "user", content: question + "\n(Answer in under 120 words, plain text.)" });
    }
    ctl.current?.abort();
    ctl.current = new AbortController();
    try {
      const res = await sample(history.current, { onText: ({ text }: { text: string }) => setText(text), signal: ctl.current.signal, cache: false });
      setText(res.text);
      history.current.push({ role: "assistant", content: res.text });
      play("pluck", { volume: 0.4 });
    } catch (e: any) {
      if (e?.code === "not_granted") setErr("The tutor needs permission to ask Claude. You can allow it from the artifact's permissions.");
      else if (e?.code === "rate_limited") setErr("The tutor is busy. Try again in a minute.");
      else if (e?.name !== "AbortError") setErr(e?.text || "The tutor couldn't answer right now.");
    } finally { setLoading(false); }
  }

  useEffect(() => () => ctl.current?.abort(), []);

  if (!open) return <button className={"btn ghost" + (compact ? "" : " wide")} onClick={() => { play("open", { volume: 0.5 }); ask(); }}>{label}</button>;
  return (
    <div className="stack" style={{ width: "100%" }}>
      <div className="eyebrow">Claude explains</div>
      {err ? <div className="tutor">{err}</div> : <div className={"tutor" + (loading ? " loading" : "")}>{text || (loading ? "Thinking" : "")}</div>}
      {!err && !loading && text && (
        <form className="answerrow" onSubmit={(e) => { e.preventDefault(); if (follow.trim()) { const q = follow; setFollow(""); ask(q); } }}>
          <input id={`follow-${topic.id}-${ex?.n ?? 0}`} className="input" style={{ fontFamily: "var(--body)", fontSize: 16 }} placeholder="Ask a follow-up" value={follow} onChange={(e) => setFollow(e.target.value)} />
          <button className="btn ghost" type="submit" disabled={!follow.trim()}>Ask</button>
        </form>
      )}
    </div>
  );
}
