"use client";
import { useMemo, useState } from "react";
import { TOPICS, generateQuestion, type Topic, type Question } from "@/lib/curriculum";

type Stat = { correct: number; total: number; streak: number; stars: number };
type Store = Record<string, Stat>;
const KEY = "g34_progress_v1";

function load(): Store { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } }
function save(s: Store) { localStorage.setItem(KEY, JSON.stringify(s)); }
function record(topic: Topic, ok: boolean) {
  const s = load();
  const cur = s[topic] ?? { correct: 0, total: 0, streak: 0, stars: 0 };
  cur.total += 1;
  if (ok) { cur.correct += 1; cur.streak += 1; if (cur.streak % 5 === 0) cur.stars += 1; }
  else { cur.streak = 0; }
  s[topic] = cur; save(s);
  return cur;
}

export default function Practice() {
  const [topic, setTopic] = useState<Topic>("multiplication");
  const [q, setQ] = useState<Question>(() => generateQuestion("multiplication"));
  const [pick, setPick] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const stats = useMemo(() => {
    if (typeof window === "undefined") return null;
    const s = load(); return s[topic] ?? null;
  }, [topic, msg]);

  const next = () => { setPick(""); setMsg(""); setQ(generateQuestion(topic)); };
  const check = () => {
    const ok = (q.type === "input") ? pick.trim() === q.answer : pick === q.answer;
    record(topic, ok);
    setMsg(ok ? "✅ Correct!" : `❌ Answer: ${q.answer}`);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24">
      <div className="pt-10">
        <h1 className="text-2xl md:text-3xl font-bold">Practice</h1>
        <p className="mt-2 text-sm opacity-80">Pick a topic, build streaks, earn stars.</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {TOPICS.map(t => (
            <button
              key={t.id}
              onClick={() => { setTopic(t.id); setQ(generateQuestion(t.id)); setPick(""); setMsg(""); }}
              className={`px-3 py-2 rounded-2xl text-sm border transition ${
                topic === t.id ? "bg-white text-black border-white" : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm opacity-80">Topic</div>
              <div className="text-lg font-semibold">{TOPICS.find(t=>t.id===topic)?.label}</div>
            </div>
            <div className="text-right text-sm opacity-85">
              ✅ {stats?.correct ?? 0}/{stats?.total ?? 0} · 🔥 {stats?.streak ?? 0} · ⭐ {stats?.stars ?? 0}
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-sm opacity-70">Question</div>
            <div className="mt-2 text-3xl md:text-4xl font-bold">{q.prompt}</div>

            {q.type === "mcq" ? (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.choices.map(c => (
                  <button
                    key={c}
                    onClick={() => setPick(c)}
                    className={`rounded-2xl border px-4 py-4 text-lg font-semibold transition ${
                      pick === c ? "bg-white text-black border-white" : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-6 flex items-center justify-center gap-3">
                <input
                  value={pick}
                  onChange={(e) => setPick(e.target.value)}
                  className="w-48 rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-lg outline-none"
                  placeholder="Type answer"
                  inputMode="numeric"
                />
              </div>
            )}

            <div className="mt-6 flex justify-center gap-3">
              <button onClick={check} className="rounded-2xl bg-white text-black px-5 py-3 text-sm font-semibold hover:opacity-90 transition">
                Check
              </button>
              <button onClick={next} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition">
                Next
              </button>
            </div>

            {msg && <div className="mt-4 text-sm">{msg}</div>}
          </div>
        </div>
      </div>
    </main>
  );
}
