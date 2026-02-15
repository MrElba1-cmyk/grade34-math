export type Topic = "multiplication" | "division" | "fractions" | "place_value" | "word_problems";

export const TOPICS: { id: Topic; label: string }[] = [
  { id: "multiplication", label: "Multiplication" },
  { id: "division", label: "Division" },
  { id: "fractions", label: "Fractions" },
  { id: "place_value", label: "Place Value" },
  { id: "word_problems", label: "Word Problems" },
];

export type Question =
  | { type: "mcq"; topic: Topic; prompt: string; choices: string[]; answer: string }
  | { type: "input"; topic: Topic; prompt: string; answer: string };

const rand = (n: number) => Math.floor(Math.random() * n);
const pick = <T,>(a: T[]) => a[rand(a.length)];
const gcd = (a:number,b:number)=>{while(b){[a,b]=[b,a%b]}return a};
const simplify = (n:number,d:number)=>{const g=gcd(n,d); return `${n/g}/${d/g}`};
const shuffle = <T,>(a:T[]) => { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [b[i],b[j]]=[b[j],b[i]]} return b; };

export function generateQuestion(topic: Topic): Question {
  if (topic === "multiplication") {
    const a = rand(9) + 2, b = rand(9) + 2;
    return { type: "input", topic, prompt: `${a} × ${b} = ?`, answer: String(a * b) };
  }
  if (topic === "division") {
    const b = rand(9) + 2; const a = (rand(9) + 2) * b;
    return { type: "input", topic, prompt: `${a} ÷ ${b} = ?`, answer: String(a / b) };
  }
  if (topic === "place_value") {
    const n = rand(9000) + 1000;
    const places = [
      { label: "thousands", value: Math.floor(n / 1000) },
      { label: "hundreds", value: Math.floor((n % 1000) / 100) },
      { label: "tens", value: Math.floor((n % 100) / 10) },
      { label: "ones", value: n % 10 },
    ];
    const p = pick(places);
    return {
      type: "mcq",
      topic,
      prompt: `In ${n}, what digit is in the ${p.label} place?`,
      choices: shuffle([String(p.value), String(rand(10)), String(rand(10)), String(rand(10))]),
      answer: String(p.value),
    };
  }
  if (topic === "fractions") {
    const base = pick([2,3,4,6,8,10,12]);
    const num = rand(base-1) + 1;
    const answer = simplify(num, base);
    const d1 = simplify(Math.min(num+1, base-1), base);
    const d2 = simplify(num, base+2);
    const d3 = simplify(num, Math.max(2, base-1));
    return { type: "mcq", topic, prompt: `Which is equal to ${num}/${base}?`, choices: shuffle([answer,d1,d2,d3]), answer };
  }
  const packs = rand(7)+3, each = rand(6)+4, total = packs*each;
  return {
    type: "mcq",
    topic,
    prompt: `A teacher has ${packs} packs of stickers with ${each} stickers each. How many stickers total?`,
    choices: shuffle([String(total), String(total+each), String(total-packs), String(packs+each)]),
    answer: String(total),
  };
}
