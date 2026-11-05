import data from "./content/parts.json";

export type Num = { value: number; unit: string; tol: number; approx: boolean };
export type Exercise = { n: number; q: string; a?: string; num?: Num };
export type Topic = {
  id: string;
  title: string;
  level: number;
  search: string;
  goal: string;
  checks: string[];
  ex: Exercise[];
  video?: string;
  answerAll?: string;
};
export type Part = {
  part: number;
  name: string;
  title: string;
  intro: string;
  stage: number;
  boss: string;
  topics: Topic[];
};
export type Stage = { id: number; name: string; blurb: string; parts: number[] };

export const STAGES = (data as any).stages as Stage[];
export const PARTS = (data as any).parts as Part[];

export const TOPIC_INDEX: Record<string, { topic: Topic; part: Part; index: number }> = {};
for (const p of PARTS) p.topics.forEach((t, i) => (TOPIC_INDEX[t.id] = { topic: t, part: p, index: i }));

export const TOTAL_TOPICS = PARTS.reduce((s, p) => s + p.topics.length, 0);

export const STAGE_COLORS = [0x5ee7ff, 0x7aa2ff, 0xffb547, 0x59f0a7, 0xb48cff, 0xff7ac6, 0xff6b5e];
export const stageColor = (stage: number) => STAGE_COLORS[(stage - 1) % STAGE_COLORS.length];
export const hex = (n: number) => "#" + n.toString(16).padStart(6, "0");

export const LEVEL_NAMES = ["Basics", "Foundations", "Core", "Advanced", "Graduate"];

export function topicHash(id: string) {
  return "lesson-" + id.replace(".", "-");
}
export function hashTopic(h: string) {
  const m = h.match(/^lesson-(\d+)-(\d+[a-z]?)$/);
  return m ? `${m[1]}.${m[2]}` : null;
}
export function ytSearch(q: string) {
  return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
}
