// The tutor screen (free conversation with Claude about any topic) and the list of
// self-checks still to tick. Both can be opened from a lesson and lead back to it.
import { useEffect, useRef, useState } from "react";
import { PARTS, TOPIC_INDEX, topicHash } from "../content";
import { img } from "../assets";
import { buzz, play } from "../audio";
import { getSample } from "../cloud";
import { actions, getState, nextTopic, topicsToCheck, uncheckedCount, useGame } from "../game/store";
import { Back, go } from "./common";

// The tutor needs Claude, which only the version hosted on claude.ai can reach.
const CLAUDE_VERSION_URL = "https://claude.ai/artifact/BZKZ5eGb4N4r6kQkNERVwi";

type Msg = { role: "user" | "assistant"; content: string };
const GENERAL = "general";
const threads = new Map<string, Msg[]>(); // kept while the app is open, so leaving the tab doesn't lose the talk
let prefill = "";

const tutorHash = (id: string) => "tutor-" + id.replace(".", "-");
/** Open the tutor on a topic, with an optional question already typed in. */
export function askTutor(id: string, question = "") {
  prefill = question;
  go(tutorHash(id));
}

function briefFor(topicId: string) {
  const lines = [
    "You are Schrö, a warm, sharp tutor inside a game-style course that goes from counting to quantum gravity. The learner is self-taught and learns visually.",
    "This is a conversation about something they don't understand. Find what's actually confusing them, explain it simply with a concrete example, and check understanding with one quick question.",
    "Keep each reply under 170 words. Plain text, no markdown headings; use simple symbols like ×, ², √.",
  ];
  const ti = TOPIC_INDEX[topicId];
  if (ti) {
    const ticked = getState().topics[topicId]?.c ?? [];
    lines.push(`Topic ${ti.topic.id}: ${ti.topic.title} (Part ${ti.part.part}, ${ti.part.name}). Goal: ${ti.topic.goal}`);
    lines.push("What the learner should be able to do:\n" + ti.topic.checks.map((c, i) => `- [${ticked.includes(i) ? "can do" : "not yet"}] ${c}`).join("\n"));
  }
  return lines.join("\n");
}

export function TutorScreen({ topicId }: { topicId: string | null }) {
  const s = useGame((s) => s);
  const key = topicId && TOPIC_INDEX[topicId] ? topicId : topicId === null ? nextTopic(s).id : GENERAL;
  const ti = TOPIC_INDEX[key];
  const [available, setAvailable] = useState<boolean | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>(() => threads.get(key) ?? []);
  const [input, setInput] = useState(() => { const p = prefill; prefill = ""; return p; });
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const ctl = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { let on = true; getSample().then((f) => { if (on) setAvailable(!!f); }); return () => { on = false; ctl.current?.abort(); }; }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [msgs, reply]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const sample = await getSample();
    if (!sample) return;
    const before = msgs;
    const next: Msg[] = [...before, { role: "user", content: q }];
    setMsgs(next); setInput(""); setErr(null); setReply(""); setLoading(true);
    if (!before.length) actions.tutorUsed();
    ctl.current?.abort();
    ctl.current = new AbortController();
    const convo = next.map((m, i) => (i === 0 ? { ...m, content: briefFor(key) + "\n\nThe learner says: " + m.content } : m));
    try {
      const res = await sample(convo, { onText: ({ text }: { text: string }) => setReply(text), signal: ctl.current.signal, cache: false });
      const done: Msg[] = [...next, { role: "assistant", content: res.text }];
      threads.set(key, done);
      setMsgs(done); setReply("");
      play("pluck", { volume: 0.4 });
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      setMsgs(before); setInput(q); setReply(""); // nothing lost: the question goes back in the box
      if (e?.code === "not_granted") setErr("The tutor needs your permission to ask Claude. You can allow it from this page's Permissions menu.");
      else if (e?.code === "rate_limited") setErr("The tutor is busy. Try again in a minute.");
      else setErr("The tutor couldn't answer right now. Try again.");
    } finally { setLoading(false); }
  }

  const unticked = ti ? ti.topic.checks.filter((_, i) => !s.topics[key]?.c?.includes(i)) : [];
  const toCheck = topicsToCheck(s).length;

  return (
    <div className="stack chatscreen">
      <div className="panel stack" style={{ gap: 10 }}>
        <span className="eyebrow">Talk to your tutor</span>
        <label className="small dim" htmlFor="tutor-topic">What do you want to talk about?</label>
        <select id="tutor-topic" className="input picker" value={key} onChange={(e) => go(e.target.value === GENERAL ? "tutor-general" : tutorHash(e.target.value))}>
          <option value={GENERAL}>Anything at all</option>
          {PARTS.map((p) => (
            <optgroup key={p.part} label={`Part ${p.part} · ${p.name}`}>
              {p.topics.map((t) => <option key={t.id} value={t.id}>{t.id} {t.title}</option>)}
            </optgroup>
          ))}
        </select>
        <div className="row">
          {ti && <button className="btn ghost" onClick={() => go(topicHash(key))}>Go to this lesson</button>}
          <button className="btn ghost" onClick={() => go("checks")}>Things to check{toCheck ? ` (${toCheck})` : ""}</button>
        </div>
      </div>

      {available === false && (
        <div className="panel stack">
          <b>The tutor only works in the Claude version</b>
          <span className="dim">It talks to Claude, which this copy of the game can't reach. Open the Claude version to chat. It keeps its own progress, separate from this one.</span>
          <a className="btn wide" href={CLAUDE_VERSION_URL} target="_blank" rel="noopener noreferrer">Open in Claude</a>
        </div>
      )}

      {available && (
        <>
          {!msgs.length && !loading && (
            <div className="stack" style={{ gap: 8 }}>
              <span className="small dim">Say what's confusing you in your own words, or start from one of these:</span>
              {ti && <button className="btn ghost starter" onClick={() => send(`I don't understand ${ti.topic.title}. Can you explain it from the start?`)}>I don't understand this topic</button>}
              {unticked.slice(0, 4).map((c) => <button key={c} className="btn ghost starter" onClick={() => send(`I can't do this yet: ${c}`)}>Help me with: {c}</button>)}
            </div>
          )}
          <div className="chat" aria-live="polite">
            {msgs.map((m, i) => <div key={i} className={"msg " + (m.role === "user" ? "me" : "bot")}>{m.content}</div>)}
            {loading && <div className="msg bot tutor loading">{reply || "Thinking"}</div>}
            {err && <div className="msg bot">{err}</div>}
            <div ref={endRef} />
          </div>
          <form className="answerrow chatform" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <input id="tutor-input" className="input picker" placeholder="What don't you get?" autoComplete="off" value={input} onChange={(e) => setInput(e.target.value)} aria-label="Message to the tutor" />
            <button className="btn" type="submit" disabled={!input.trim() || loading}>Send</button>
          </form>
        </>
      )}
    </div>
  );
}

/** One topic's self-checks: tap to tick, or ask the tutor about the ones you can't do yet. */
export function CheckList({ id }: { id: string }) {
  const { topic } = TOPIC_INDEX[id];
  const ticked = useGame((s) => s.topics[id]?.c);
  return (
    <div className="stack" style={{ gap: 8 }}>
      {topic.checks.map((c, i) => {
        const on = ticked?.includes(i);
        return (
          <div className="stack" style={{ gap: 4 }} key={i}>
            <button className={"tick" + (on ? " on" : "")} onClick={() => { play(on ? "drop" : "tick", { rate: 1 + i * 0.08 }); buzz(10); actions.tickCheck(id, i); }}>
              <span className="box" /><span>{c}</span>
            </button>
            {!on && <button className="asklink" onClick={() => askTutor(id, `I can't do this yet: ${c}`)}>Don't get it? Ask the tutor</button>}
          </div>
        );
      })}
    </div>
  );
}

export function ChecksScreen() {
  const list = useGame((s) => topicsToCheck(s).join());
  // Keep a topic on screen after its last tick, so the list doesn't jump under your finger.
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => { setIds((old) => Array.from(new Set([...old, ...(list ? list.split(",") : [])]))); }, [list]);
  const left = list ? list.split(",").length : 0;
  return (
    <div className="stack">
      <Back to="today" label="Today" />
      <h1>Things to check</h1>
      <p className="dim" style={{ margin: 0 }}>{left ? "Everything you haven't ticked yet. Tick it once you can really do it. The next topic stays locked until you do." : "You've ticked everything in the topics you've started."}</p>
      {!ids.length && <div className="empty"><img src={img("emote_star")} alt="" /></div>}
      {ids.map((id) => {
        const { topic } = TOPIC_INDEX[id];
        const n = uncheckedCount(getState(), id);
        return (
          <div className="panel stack" key={id}>
            <div className="row spread">
              <b>{topic.id} {topic.title}</b>
              <span className="mono small dim">{n ? `${n} left` : "done"}</span>
            </div>
            <CheckList id={id} />
            <button className="btn ghost wide" onClick={() => go(topicHash(id))}>Open lesson</button>
          </div>
        );
      })}
    </div>
  );
}
