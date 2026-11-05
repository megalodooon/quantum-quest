"""Turn the roadmap + workbook markdown into app content JSON.

Inputs:  content-src/roadmap.json, content-src/workbook-NN.md, content-src/fixes.json
Output:  src/content/parts.json  (one file, all 25 parts)
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "content-src"
OUT = ROOT / "src" / "content"
OUT.mkdir(parents=True, exist_ok=True)

roadmap = json.load(open(SRC / "roadmap.json"))
fixes = json.load(open(SRC / "fixes.json"))

STAGES = [
    {"id": 1, "name": "Number Nebula", "blurb": "The maths toolkit", "parts": [0, 1, 2, 3]},
    {"id": 2, "name": "Calculus Cluster", "blurb": "Fields, waves of maths, chance", "parts": [4, 5, 6, 7]},
    {"id": 3, "name": "Classical Belt", "blurb": "The physics before quantum", "parts": [8, 9, 10, 11, 12]},
    {"id": 4, "name": "Chemistry Reef", "blurb": "Atoms, bonds and reactions", "parts": [13]},
    {"id": 5, "name": "Quantum Rift", "blurb": "Where classical physics broke", "parts": [14, 15, 16]},
    {"id": 6, "name": "Entangled Expanse", "blurb": "Matter, computing, meaning", "parts": [17, 18, 19, 20, 21]},
    {"id": 7, "name": "The Frontier", "blurb": "Gravity, oddities, life", "parts": [22, 23, 24]},
]
SHORT = ["Basics", "Algebra to Complex", "Calculus", "Linear Algebra", "Vector Calculus",
         "ODEs and Fourier", "Probability", "Advanced Math", "Classical Mechanics", "Waves and Optics",
         "Thermodynamics", "Electromagnetism", "Relativity", "Chemistry", "Key Experiments",
         "QM Concepts", "QM Formalism", "Quantum Matter", "Quantum Computing", "Interpretations",
         "Quantum Field Theory", "Particles and Nuclei", "Quantum Gravity", "Strange Phenomena",
         "Quantum Biology"]
BOSSES = ["Order-of-Magnitude Ogre", "The Imaginary Hydra", "Limit Leviathan", "Eigen Golem",
          "Curl Kraken", "Fourier Phantom", "Dice Demon", "Hilbert Hound", "Lagrange Juggernaut",
          "Interference Wraith", "Entropy Engine", "Maxwell's Storm", "Lorentz Warden",
          "Orbital Chimera", "Photoelectric Sentinel", "Uncertainty Wraith", "Operator Overlord",
          "Fermi Sea Serpent", "Decoherence Daemon", "Wigner's Doppelganger", "Virtual Swarm",
          "Higgs Colossus", "Singularity Maw", "Casimir Twins", "Radical Pair Moth"]

SUP = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺", "0123456789-+")

def norm_num(s):
    s = s.replace("−", "-").replace("–", "-").replace(" ", "").replace(" ", " ")
    return s

NUM_RE = re.compile(
    r"^(?P<approx>(about|roughly|approximately|around|nearly|almost|just over|just under|≈|~)\s*)?"
    r"(?P<num>[-+]?(\d{1,3}(,\d{3})+|\d+)(\.\d+)?|[-+]?\.\d+)"
    r"(?P<sci>\s*[×x]\s*10(?P<exp>[⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+))?"
    r"(?P<frac>\s*/\s*\d+)?"
    r"(?P<unit>\s*[A-Za-zµμΩ°%/·²³⁻¹\s\-]{0,18})?$",
    re.I,
)

UNIT_WORDS_BAD = re.compile(r"\b(and|or|the|is|so|than|of|both|times|it|no|yes|for|per cent of)\b", re.I)

def parse_numeric(ans):
    a = norm_num(ans.strip().rstrip("."))
    a = re.sub(r"\s+", " ", a)
    m = NUM_RE.match(a)
    if not m:
        return None
    unit = (m.group("unit") or "").strip()
    if unit and (UNIT_WORDS_BAD.search(unit) or len(unit.split()) > 3):
        return None
    if re.search(r"\d", unit.translate(SUP)) and not re.fullmatch(r"[A-Za-zµμΩ°/·²³⁻¹\-]+", unit):
        return None
    num = float(m.group("num").replace(",", ""))
    if m.group("frac"):
        den = float(m.group("frac").replace("/", "").strip())
        if den == 0:
            return None
        num = num / den
    if m.group("sci"):
        num = num * 10 ** int(m.group("exp").translate(SUP))
    approx = bool(m.group("approx"))
    sig = len(re.sub(r"[^0-9]", "", m.group("num")).lstrip("0")) or 1
    tol = 0.05 if approx else (0.02 if sig <= 2 else 0.01)
    if m.group("frac") and not approx:
        tol = 0.005
    return {"value": num, "unit": unit, "tol": tol, "approx": approx}


def split_answers(text, count):
    """Split '1. foo 2. bar' into {1: 'foo', 2: 'bar'} keeping order strictly increasing."""
    parts = {}
    toks = list(re.finditer(r"(?:(?<=\s)|^)(\d{1,2})\.\s+(?=\S)", text))
    chosen = []
    expect = None
    for t in toks:
        n = int(t.group(1))
        if not chosen:
            if n >= 1 and n <= max(count, 1) and t.start() == 0:
                chosen.append(t); expect = n + 1
        elif n >= expect and n <= max(count, n):
            # accept a jump if numbers increase (answers may skip open questions)
            chosen.append(t); expect = n + 1
    if not chosen:
        return None
    for i, t in enumerate(chosen):
        end = chosen[i + 1].start() if i + 1 < len(chosen) else len(text)
        parts[int(t.group(1))] = text[t.end():end].strip()
    return parts


def clean_md(s):
    s = s.strip()
    return s


topics_total = 0
numeric_total = 0
ex_total = 0
parts = []
for p in range(25):
    md = open(SRC / f"workbook-{p:02d}.md").read()
    for a, b in fixes:
        if a in md:
            md = md.replace(a, b)
    title_line = md.splitlines()[0]
    title = re.sub(r"^# Part \d+ workbook:\s*", "", title_line).strip()
    title = title[:1].upper() + title[1:]
    body, _, key = md.partition("\n## Answer key")
    intro = body.split("\n### ", 1)[0].split("\n", 1)[1].strip()
    answers = {}
    for line in key.splitlines():
        m = re.match(r"^- \*\*(\d+\.\d+[a-z]?):\*\*\s*(.*)$", line.strip())
        if m:
            answers[m.group(1)] = m.group(2).strip()
    sections = re.split(r"\n### ", body)[1:]
    topics = []
    for sec in sections:
        head, _, rest = sec.partition("\n")
        hm = re.match(r"(\d+\.\d+[a-z]?)\s+(.*)", head.strip())
        tid, ttitle = hm.group(1), hm.group(2).strip()
        checks = re.findall(r"^- \[ \] (.+)$", rest, re.M)
        ex_block = rest.split("**Exercises**", 1)[1] if "**Exercises**" in rest else ""
        items = []
        cur = None
        for line in ex_block.splitlines():
            mm = re.match(r"^(\d+)\.\s+(.*)$", line)
            if mm:
                cur = {"n": int(mm.group(1)), "text": mm.group(2).strip()}
                items.append(cur)
            elif cur and line.strip():
                cur["text"] += "\n" + line.strip()
        akey = answers.get(tid, "")
        amap = split_answers(akey, len(items)) if akey else None
        whole = None
        if akey and not amap:
            if len(items) == 1:
                amap = {1: akey}
            else:
                whole = akey
        exercises = []
        for it in items:
            a = (amap or {}).get(it["n"])
            e = {"n": it["n"], "q": it["text"]}
            if a:
                e["a"] = a
                num = parse_numeric(a)
                if not num and re.search(r"[≈=]", a) and not re.search(r"\d\.\s", a) and ";" not in a and " and " not in a:
                    tail = re.split(r"[≈=]", a)[-1]
                    num = parse_numeric(tail)
                    if num and "≈" in a:
                        num["tol"] = max(num["tol"], 0.03)
                if num:
                    e["num"] = num
                    numeric_total += 1
            exercises.append(e)
            ex_total += 1
        rm = roadmap.get(tid, {})
        t = {
            "id": tid,
            "title": ttitle,
            "level": int(rm.get("level", "L1")[1:]) if rm else 1,
            "search": re.sub(r"\s*\(\[verified link\]\((https?://[^)]+)\)\)", "", rm.get("search", ttitle)),
            "goal": rm.get("goal", ""),
            "checks": checks,
            "ex": exercises,
        }
        vl = re.search(r"\[verified link\]\((https?://[^)]+)\)", rm.get("search", ""))
        if vl:
            t["video"] = vl.group(1)
        if whole:
            t["answerAll"] = whole
        topics.append(t)
        topics_total += 1
    # keep roadmap order: base ids in numeric order, lettered rows right after their base
    def sk(t):
        a, b = t["id"].split(".")
        m = re.match(r"(\d+)([a-z]?)", b)
        return (int(m.group(1)), m.group(2))
    topics.sort(key=sk)
    stage = next(s["id"] for s in STAGES if p in s["parts"])
    parts.append({"part": p, "name": SHORT[p], "title": title, "intro": intro, "stage": stage,
                  "boss": BOSSES[p], "topics": topics})

json.dump({"stages": STAGES, "parts": parts}, open(OUT / "parts.json", "w"), ensure_ascii=False, separators=(",", ":"))
print("topics", topics_total, "exercises", ex_total, "numeric", numeric_total)
no_ans = sum(1 for p in parts for t in p["topics"] for e in t["ex"] if "a" not in e)
print("exercises without answer", no_ans)
