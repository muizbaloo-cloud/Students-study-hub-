/* gen.js (part 1 of 2): helpers and Mathematics / Further Mathematics generators. Every answer is COMPUTED by code, so it is always correct.
   window.generateBank(subject) returns generated questions (labelled "Practice"). */
(function () {
  const SUPM = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };
  const SUBM = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉" };
  const sup = (n) => String(n).split("").map((c) => SUPM[c] || c).join("");
  const sub = (n) => String(n).split("").map((c) => SUBM[c] || c).join("");
  const n2 = (x) => String(+(+x).toFixed(2));
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const frac = (n, d) => { const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : n + "/" + d; };
  const money = (n) => "₦" + Number(n).toLocaleString("en-US");
  const pad3 = (n) => String(((n % 360) + 360) % 360).padStart(3, "0") + "°";
  function poly(terms, v) {
    v = v || "x";
    let s = "";
    terms.forEach(([c, p]) => {
      if (c === 0) return;
      const neg = c < 0, ab = Math.abs(c);
      const body = p === 0 ? String(ab) : (ab === 1 ? "" : ab) + v + (p === 1 ? "" : sup(p));
      if (!s) s = (neg ? "−" : "") + body; else s += (neg ? " − " : " + ") + body;
    });
    return s || "0";
  }
  const cx = (re, im) => (re === 0 && im === 0) ? "0" : (re !== 0 ? String(re).replace("-", "−") : "") + (im === 0 ? "" : (im < 0 ? (re === 0 ? "−" : " − ") : (re === 0 ? "" : " + ")) + (Math.abs(im) === 1 ? "" : Math.abs(im)) + "i");

  function mulberry32(a) {
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function build(r, q, correct, wrongs, exp) {
    const c = String(correct), seen = new Set([c]), w = [];
    wrongs.forEach((x) => { const s = String(x); if (!seen.has(s) && !/NaN|Infinity|undefined/.test(s)) { seen.add(s); w.push(s); } });
    if (w.length < 3 || /NaN|Infinity|undefined/.test(c)) return null;
    const opts = [c].concat(w.slice(0, 3));
    for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = opts[i]; opts[i] = opts[j]; opts[j] = t; }
    const fix = (t) => String(t).replace(/(^|[\s(=,\[])-(?=\d)/g, "$1−").replace(/(^|[^\d.])1([xy])\b/g, "$1$2");
    return { q: fix(q), options: opts.map(fix), answer: opts.indexOf(c), explanation: fix(exp) };
  }

  const REG = [];
  const reg = (subject, topic, level, fn) => REG.push({ subject, topic, level, fn });
  const M = "Mathematics", F = "Further Mathematics";

  /* ===================== MATHEMATICS ===================== */
  reg(M, "Linear Equations & Inequalities", "SS1", (ri, pick, b) => {
    const x = ri(-6, 9), a = ri(2, 9), bb = ri(1, 15), c = a * x + bb;
    return b(`Solve the equation ${a}x + ${bb} = ${c}.`, "x = " + x, ["x = " + (x + 1), "x = " + (x - 1), "x = " + (-x), "x = " + (x + 2)], `Subtract ${bb} from both sides: ${a}x = ${c - bb}. Divide by ${a}: x = ${x}.`);
  });
  reg(M, "Linear Equations & Inequalities", "SS1", (ri, pick, b) => {
    const x = ri(-5, 8), a = ri(3, 8), c = ri(1, a - 1), bb = ri(1, 9), d = (a - c) * x + bb;
    return b(`Solve ${poly([[a, 1], [bb, 0]])} = ${poly([[c, 1], [d, 0]])}.`, "x = " + x, ["x = " + (x + 1), "x = " + (x - 1), "x = " + (-x), "x = " + (x + 2)], `Collect x terms on one side: ${a - c}x = ${d - bb}, so x = ${x}.`);
  });
  reg(M, "Linear Equations & Inequalities", "SS1", (ri, pick, b) => {
    const a = ri(2, 6), k = ri(-4, 7), bb = ri(1, 9), flip = ri(0, 1);
    if (!flip) return b(`Solve the inequality ${a}x + ${bb} > ${a * k + bb}.`, "x > " + k, ["x < " + k, "x > " + (k + 1), "x < " + (-k), "x > " + (-k)], `Subtract ${bb}: ${a}x > ${a * k}. Divide by ${a} (positive, so the sign stays): x > ${k}.`);
    return b(`Solve the inequality −${a}x + ${bb} > ${-a * k + bb}.`, "x < " + k, ["x > " + k, "x < " + (k + 1), "x > " + (-k), "x < " + (-k)], `Subtract ${bb}: −${a}x > ${-a * k}. Dividing by −${a} reverses the sign: x < ${k}.`);
  });
  reg(M, "Simultaneous Equations", "SS1", (ri, pick, b) => {
    const x = ri(-4, 9), y = ri(-4, 9);
    if (ri(0, 1) === 0) return b(`Solve x + y = ${x + y} and x − y = ${x - y}. Find x.`, x, [y, x + 1, x - 1, -x, x + 2], `Add the equations: 2x = ${2 * x}, so x = ${x}.`);
    return b(`Solve 2x + y = ${2 * x + y} and x + y = ${x + y}. Find x.`, x, [y, x + 1, x - 1, -x, x + 2], `Subtract the second equation from the first: x = ${2 * x + y} − ${x + y} = ${x}.`);
  });
  reg(M, "Simultaneous Equations", "SS1", (ri, pick, b) => {
    const x = ri(1, 8), y = ri(1, 8), a = ri(2, 4), c = ri(1, 3);
    if (a === c) return null;
    return b(`If ${a}x + y = ${a * x + y} and ${c}x + y = ${c * x + y}, find x + y.`, x + y, [x, y, x * y, x + y + 1, x - y], `Subtract the equations: ${a - c}x = ${(a - c) * x}, so x = ${x}. Then y = ${y}, and x + y = ${x + y}.`);
  });
  reg(M, "Quadratic Equations", "SS2", (ri, pick, b) => {
    const p = pick([-7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7]), q = pick([-7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7]);
    if (p === q || p === -q) return null;
    const lo = Math.min(p, q), hi = Math.max(p, q), t = (n) => "x = " + String(n).replace("-", "−");
    return b(`Solve ${poly([[1, 2], [-(p + q), 1], [p * q, 0]])} = 0.`, `${t(lo)} or ${t(hi)}`, [`${t(-lo)} or ${t(-hi)}`, `${t(lo)} or ${t(-hi)}`, `${t(-lo)} or ${t(hi)}`], `Factorise: (x ${p < 0 ? "+" : "−"} ${Math.abs(p)})(x ${q < 0 ? "+" : "−"} ${Math.abs(q)}) = 0, so the roots are ${lo} and ${hi}.`);
  });
  reg(M, "Quadratic Equations", "SS2", (ri, pick, b) => {
    const a = ri(1, 4), bb = ri(-9, 9), c = ri(-6, 6), d = bb * bb - 4 * a * c;
    return b(`Find the discriminant of ${poly([[a, 2], [bb, 1], [c, 0]])} = 0.`, d, [bb * bb + 4 * a * c, 2 * bb - 4 * a * c, bb * bb - 2 * a * c, -d], `Discriminant = b² − 4ac = (${bb})² − 4(${a})(${c}) = ${d}.`);
  });
  reg(M, "Quadratic Equations", "SS3", (ri, pick, b) => {
    const a = ri(1, 3), s = ri(2, 9) * a, pr = ri(-8, 12) * a;
    return b(`Find the sum of the roots of ${poly([[a, 2], [-s, 1], [pr, 0]])} = 0.`, frac(s, a), [frac(-s, a), frac(pr, a), frac(-pr, a), s + a], `For ax² + bx + c = 0 the sum of the roots is −b/a = ${s}/${a} = ${frac(s, a)}.`);
  });
  reg(M, "Indices & Logarithms", "SS2", (ri, pick, b) => {
    const m = ri(2, 9), n = ri(2, 6), t = ri(0, 2);
    if (t === 0) return b(`Simplify x${sup(m)} × x${sup(n)}.`, "x" + sup(m + n), ["x" + sup(m * n), "x" + sup(Math.abs(m - n)), "2x" + sup(m + n), "x" + sup(m + n + 1)], `Add the powers when multiplying: ${m} + ${n} = ${m + n}.`);
    if (t === 1) return b(`Simplify (x${sup(m)})${sup(n)}.`, "x" + sup(m * n), ["x" + sup(m + n), "x" + sup(m * n + 1), "x" + sup(Math.abs(m - n)), "nx" + sup(m)], `Multiply the powers: ${m} × ${n} = ${m * n}.`);
    const hi = m + n;
    return b(`Simplify x${sup(hi)} ÷ x${sup(n)}.`, "x" + sup(m), ["x" + sup(hi * n), "x" + sup(hi + n), "x" + sup(m + 1), "x" + sup(n)], `Subtract the powers when dividing: ${hi} − ${n} = ${m}.`);
  });
  reg(M, "Indices & Logarithms", "SS2", (ri, pick, b) => {
    const base = pick([2, 3, 5, 10]), k = ri(2, 5);
    return b(`Evaluate log${sub(base)} ${Math.pow(base, k)}.`, k, [k + 1, k - 1, base * k, Math.pow(base, k) / base], `${base}${sup(k)} = ${Math.pow(base, k)}, so log${sub(base)} ${Math.pow(base, k)} = ${k}.`);
  });
  reg(M, "Indices & Logarithms", "SS3", (ri, pick, b) => {
    const pr = pick([[4, 25, 2], [2, 50, 2], [5, 20, 2], [8, 125, 3], [20, 50, 3], [4, 250, 3], [25, 40, 3], [2, 500, 3]]);
    return b(`Evaluate log₁₀ ${pr[0]} + log₁₀ ${pr[1]}.`, pr[2], [pr[2] + 1, pr[2] - 1, pr[0] + pr[1], pr[2] * 2], `log a + log b = log(ab): log₁₀ ${pr[0] * pr[1]} = ${pr[2]}.`);
  });
  reg(M, "Number Bases", "SS1", (ri, pick, b) => {
    const n = ri(5, 60), s = n.toString(2);
    return b(`Convert ${n} in base ten to base two.`, s + sub(2), [(n + 1).toString(2) + sub(2), (n - 1).toString(2) + sub(2), s.split("").reverse().join("") === s ? (n + 2).toString(2) + sub(2) : s.split("").reverse().join("") + sub(2), (n * 2).toString(2) + sub(2)], `Divide ${n} repeatedly by 2 and read the remainders upwards: ${s}${sub(2)}.`);
  });
  reg(M, "Number Bases", "SS1", (ri, pick, b) => {
    const n = ri(5, 63), s = n.toString(2);
    return b(`Convert ${s}${sub(2)} to a number in base ten.`, n, [n + 1, n - 1, n + 2, n * 2], `Add the place values of the 1s: ${s}${sub(2)} = ${n}.`);
  });
  reg(M, "Number Bases", "SS1", (ri, pick, b) => {
    const base = pick([5, 8]), n = ri(10, 90), s = n.toString(base);
    return b(`Convert ${n} in base ten to base ${base === 5 ? "five" : "eight"}.`, s + sub(base), [(n + 1).toString(base) + sub(base), (n - 1).toString(base) + sub(base), (n + base).toString(base) + sub(base)], `Divide ${n} repeatedly by ${base} and read the remainders upwards: ${s}${sub(base)}.`);
  });
  reg(M, "Fractions, Decimals & Percentages", "SS1", (ri, pick, b) => {
    const p = pick([5, 10, 12, 15, 20, 25, 30, 40, 45, 60, 75]), y = ri(2, 30) * 20;
    return b(`Find ${p}% of ${y}.`, n2(p * y / 100), [n2(p * y / 10), n2(y - p * y / 100), n2(p * y / 1000), n2(p + y / 100)], `${p}% of ${y} = ${p}/100 × ${y} = ${n2(p * y / 100)}.`);
  });
  reg(M, "Fractions, Decimals & Percentages", "SS1", (ri, pick, b) => {
    const p = pick([10, 15, 20, 25, 30, 40, 50]), cp = ri(2, 20) * 100, sp = cp * (100 + p) / 100;
    return b(`A trader buys an item for ${money(cp)} and sells it for ${money(sp)}. Find the percentage profit.`, p + "%", [(p + 5) + "%", (p - 5) + "%", n2(100 * p / (100 + p)) + "%", (p * 2) + "%"], `Profit = ${money(sp - cp)}. Percentage profit = ${sp - cp}/${cp} × 100 = ${p}%.`);
  });
  reg(M, "Ratio & Proportion", "SS1", (ri, pick, b) => {
    const a = ri(1, 5), c = ri(2, 7);
    if (a === c) return null;
    const t = ri(2, 12) * (a + c) * 10, big = Math.max(a, c), small = Math.min(a, c);
    return b(`Share ${money(t)} in the ratio ${a} : ${c}. What is the larger share?`, money(t * big / (a + c)), [money(t * small / (a + c)), money(t / big), money(t / 2), money(t * big / (a + c) + 100)], `Total parts = ${a + c}. Larger share = ${big}/${a + c} × ${t} = ${money(t * big / (a + c))}.`);
  });
  reg(M, "Approximation", "SS1", (ri, pick, b) => {
    const w = ri(1, 99), d = [ri(0, 9), ri(0, 9), ri(0, 9), ri(1, 9)], s = w + "." + d.join("");
    const base = w * 100 + d[0] * 10 + d[1] + (d[2] >= 5 ? 1 : 0), ans = (base / 100).toFixed(2), tr = w + "." + d[0] + d[1];
    return b(`Round ${s} to 2 decimal places.`, ans, [tr === ans ? ((base + 1) / 100).toFixed(2) : tr, ((base + 1) / 100).toFixed(2), ((base - 1) / 100).toFixed(2), w + "." + d[0]], `Look at the third decimal digit (${d[2]}): ${d[2] >= 5 ? "5 or more, so round up" : "less than 5, so keep the digits"}. Answer ${ans}.`);
  });
  reg(M, "Approximation", "SS1", (ri, pick, b) => {
    const a = ri(11, 99) / 10, k = ri(3, 7), v = Math.round(a * Math.pow(10, k));
    const ds = String(a).replace(".", ""), ds2 = ds.length === 2 ? ds : ds.padEnd(2, "0");
    const lead = ds2[0] + "." + ds2[1];
    return b(`Express ${v.toLocaleString("en-US").replace(/,/g, "")} in standard form.`, lead + " × 10" + sup(String(v).length - 1), [ds2 + " × 10" + sup(String(v).length - 2), "0." + ds2 + " × 10" + sup(String(v).length), lead + " × 10" + sup(String(v).length), lead + " × 10" + sup(String(v).length - 2)], `Move the decimal point so that the number is between 1 and 10: ${lead} × 10${sup(String(v).length - 1)}.`);
  });
  reg(M, "Sets", "SS1", (ri, pick, b) => {
    const a = ri(10, 30), bb = ri(10, 30), both = ri(2, 8), none = ri(1, 6), n = a + bb - both + none;
    return b(`In a class of ${n} students, ${a} offer Physics, ${bb} offer Chemistry and ${both} offer both. How many offer neither?`, none, [none + both, a + bb - both, none + 1, none - 1 >= 0 ? none - 1 : none + 2], `Students in at least one subject = ${a} + ${bb} − ${both} = ${a + bb - both}. Neither = ${n} − ${a + bb - both} = ${none}.`);
  });
  reg(M, "Sequences & Series", "SS1", (ri, pick, b) => {
    const a = ri(-5, 12), d = ri(2, 7), n = ri(8, 20), t = ri(0, 1);
    const list = [a, a + d, a + 2 * d].map(String).join(", ").replace(/-/g, "−");
    if (t === 0) return b(`Find the ${n}th term of the arithmetic progression ${list}, …`, a + (n - 1) * d, [a + n * d, a + (n - 2) * d, a + (n - 1) * d + d, a * n], `Tn = a + (n − 1)d = ${a} + ${n - 1}(${d}) = ${a + (n - 1) * d}.`);
    const s = n * (2 * a + (n - 1) * d) / 2;
    return b(`Find the sum of the first ${n} terms of the arithmetic progression ${list}, …`, s, [s + n, s - n, n * (a + (n - 1) * d), s + d], `Sn = n/2 [2a + (n − 1)d] = ${n}/2 [${2 * a} + ${(n - 1) * d}] = ${s}.`);
  });
  reg(M, "Sequences & Series", "SS2", (ri, pick, b) => {
    const a = ri(1, 5), r = pick([2, 3]), n = ri(4, 6), v = a * Math.pow(r, n - 1);
    return b(`Find the ${n}th term of the geometric progression ${a}, ${a * r}, ${a * r * r}, …`, v, [a * Math.pow(r, n), a * r * n, a + (n - 1) * a * (r - 1), v + a], `Tn = arⁿ⁻¹ = ${a} × ${r}${sup(n - 1)} = ${v}.`);
  });
  reg(M, "Variation", "SS1", (ri, pick, b) => {
    const k = ri(2, 9), x1 = ri(2, 6), x2 = ri(7, 15), y1 = k * x1;
    return b(`y varies directly as x. If y = ${y1} when x = ${x1}, find y when x = ${x2}.`, k * x2, [n2(y1 * x1 / x2), k * x2 + k, y1 + x2, n2(y1 / x2)], `y = kx, so k = ${y1}/${x1} = ${k}. When x = ${x2}, y = ${k} × ${x2} = ${k * x2}.`);
  });
  reg(M, "Variation", "SS2", (ri, pick, b) => {
    const m = ri(2, 9) * 12, x1 = pick([2, 3, 4, 6]), x2 = pick([12, 6, 4, 3]);
    if (x1 === x2) return null;
    return b(`y varies inversely as x. If y = ${m / x1} when x = ${x1}, find y when x = ${x2}.`, m / x2, [n2(m / x1 * x2 / x1), n2(m / x1 * x2), n2(m / x2 + x1), n2(m / x1 + x2)], `y = k/x, so k = ${m / x1} × ${x1} = ${m}. When x = ${x2}, y = ${m}/${x2} = ${m / x2}.`);
  });
  reg(M, "Mensuration", "SS1", (ri, pick, b) => {
    const r = pick([7, 14, 21]), t = ri(0, 2);
    if (t === 0) return b(`Find the area of a circle of radius ${r} cm. (Take π = 22/7)`, (22 * r * r / 7) + " cm²", [(2 * 22 * r / 7) + " cm²", (22 * r / 7) + " cm²", (22 * r * r / 14) + " cm²"], `Area = πr² = 22/7 × ${r} × ${r} = ${22 * r * r / 7} cm².`);
    if (t === 1) return b(`Find the circumference of a circle of radius ${r} cm. (Take π = 22/7)`, (44 * r / 7) + " cm", [(22 * r * r / 7) + " cm", (22 * r / 7) + " cm", (88 * r / 7) + " cm"], `Circumference = 2πr = 2 × 22/7 × ${r} = ${44 * r / 7} cm.`);
    const h = ri(3, 12);
    return b(`Find the volume of a cylinder of radius ${r} cm and height ${h} cm. (Take π = 22/7)`, (22 * r * r * h / 7) + " cm³", [(22 * r * r * h / 21) + " cm³", (2 * 22 * r * h / 7) + " cm³", (22 * r * h / 7) + " cm³"], `V = πr²h = 22/7 × ${r}² × ${h} = ${22 * r * r * h / 7} cm³.`);
  });
  reg(M, "Mensuration", "SS3", (ri, pick, b) => {
    const k = ri(2, 9), h = 3 * k, v = 154 * k, th = pick([60, 90, 120, 180, 270]);
    if (ri(0, 1)) return b(`Find the volume of a cone of base radius 7 cm and height ${h} cm. (Take π = 22/7)`, v + " cm³", [(3 * v) + " cm³", (v / 2) + " cm³", (v + 154) + " cm³"], `V = ⅓πr²h = ⅓ × 22/7 × 49 × ${h} = ${v} cm³.`);
    return b(`Find the area of a sector of angle ${th}° in a circle of radius 7 cm. (Take π = 22/7)`, n2(th / 360 * 154) + " cm²", [n2(th / 360 * 44) + " cm²", n2(th / 180 * 154) + " cm²", n2(154 - th / 360 * 154) + " cm²"], `Area = θ/360 × πr² = ${th}/360 × 154 = ${n2(th / 360 * 154)} cm².`);
  });
  reg(M, "Trigonometry", "SS2", (ri, pick, b) => {
    const tr = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), o = tr[0], a = tr[1], h = tr[2];
    const w = ri(0, 2);
    const nm = ["sin θ", "cos θ", "tan θ"][w], ans = [frac(o, h), frac(a, h), frac(o, a)][w];
    const all = [frac(o, h), frac(a, h), frac(o, a), frac(a, o), frac(h, o), frac(h, a)];
    return b(`In a right-angled triangle, the side opposite θ is ${o} cm, the side adjacent to θ is ${a} cm and the hypotenuse is ${h} cm. Find ${nm}.`, ans, all, `${nm} = ${["opposite ÷ hypotenuse", "adjacent ÷ hypotenuse", "opposite ÷ adjacent"][w]} = ${ans}.`);
  });
  reg(M, "Trigonometry", "SS2", (ri, pick, b) => {
    const L = ri(2, 12) * 2;
    return b(`A ladder ${L} m long leans against a wall and makes an angle of 30° with the ground. How high up the wall does it reach?`, (L / 2) + " m", [(L / 2) + "√3 m", L + " m", (L * 2) + " m", (L / 2 + 1) + " m"], `Height = L sin 30° = ${L} × ½ = ${L / 2} m.`);
  });
  reg(M, "Bearings & Distances", "SS2", (ri, pick, b) => {
    const be = ri(5, 35) * 10 + (ri(0, 1) ? 5 : 0), back = (be + 180) % 360;
    return b(`The bearing of B from A is ${pad3(be)}. What is the bearing of A from B?`, pad3(back), [pad3(be + 90), pad3(360 - be), pad3(be + 270), pad3(be - 90)], `Back bearing: ${be < 180 ? "add" : "subtract"} 180°: ${pad3(back)}.`);
  });
  reg(M, "Coordinate Geometry", "SS2", (ri, pick, b) => {
    const m = pick([-4, -3, -2, -1, 1, 2, 3, 4, 5]), x1 = ri(-4, 4), y1 = ri(-5, 5), dx = ri(1, 4), x2 = x1 + dx, y2 = y1 + m * dx;
    const w = (x) => String(x).replace("-", "−");
    return b(`Find the gradient of the line joining (${w(x1)}, ${w(y1)}) and (${w(x2)}, ${w(y2)}).`, m, [-m, m + 1, m - 1, n2(dx / (m * dx))], `Gradient = (y₂ − y₁)/(x₂ − x₁) = ${y2 - y1}/${dx} = ${m}.`);
  });
  reg(M, "Coordinate Geometry", "SS2", (ri, pick, b) => {
    const tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10]]), x1 = ri(-3, 3), y1 = ri(-3, 3);
    const w = (x) => String(x).replace("-", "−");
    return b(`Find the distance between (${w(x1)}, ${w(y1)}) and (${w(x1 + tr[0])}, ${w(y1 + tr[1])}).`, tr[2], [tr[0] + tr[1], tr[2] + 1, tr[2] - 1, tr[0] * tr[1]], `d = √(${tr[0]}² + ${tr[1]}²) = √${tr[0] * tr[0] + tr[1] * tr[1]} = ${tr[2]}.`);
  });
  reg(M, "Coordinate Geometry", "SS3", (ri, pick, b) => {
    const m = pick([-3, -2, -1, 1, 2, 3, 4]), x1 = ri(-3, 4), y1 = ri(-4, 5), c = y1 - m * x1;
    const w = (x) => String(x).replace("-", "−");
    return b(`Find the equation of the line through (${w(x1)}, ${w(y1)}) with gradient ${w(m)}.`, "y = " + poly([[m, 1], [c, 0]]), ["y = " + poly([[m, 1], [y1 + m * x1, 0]]), "y = " + poly([[-m, 1], [c, 0]]), "y = " + poly([[m, 1], [-c, 0]])], `y − ${y1} = ${m}(x − ${x1}) gives y = ${poly([[m, 1], [c, 0]])}.`);
  });
  reg(M, "Statistics", "SS1", (ri, pick, b) => {
    const mu = ri(8, 30), arr = [ri(3, 20), ri(3, 20), ri(3, 20), ri(3, 20)], last = 5 * mu - arr.reduce((x, y) => x + y, 0);
    if (last < 1) return null;
    const all = arr.concat([last]);
    return b(`Find the mean of ${all.join(", ")}.`, mu, [mu + 1, mu - 1, mu + 2, Math.max.apply(null, all)], `Sum = ${5 * mu}; mean = ${5 * mu}/5 = ${mu}.`);
  });
  reg(M, "Statistics", "SS2", (ri, pick, b) => {
    const s = new Set(); while (s.size < 7) s.add(ri(2, 40));
    const a = Array.from(s), sorted = a.slice().sort((x, y) => x - y);
    return b(`Find the median of ${a.join(", ")}.`, sorted[3], [sorted[2], sorted[4], a[3], sorted[3] + 1], `Arrange in order: ${sorted.join(", ")}. The middle (4th) value is ${sorted[3]}.`);
  });
  reg(M, "Statistics", "SS2", (ri, pick, b) => {
    const s = new Set(); while (s.size < 5) s.add(ri(2, 30));
    const base = Array.from(s), mode = base[0], list = base.concat([mode, mode]).sort(() => ri(0, 1) - 0.5);
    return b(`Find the mode of ${list.join(", ")}.`, mode, [base[1], base[2], base[3], Math.max.apply(null, list)], `The mode is the most frequent value: ${mode} appears 3 times.`);
  });
  reg(M, "Probability", "SS1", (ri, pick, b) => {
    const r = ri(2, 9), bl = ri(2, 9), g = ri(1, 6), n = r + bl + g, w = ri(0, 1);
    if (w === 0) return b(`A bag contains ${r} red, ${bl} blue and ${g} green balls. One ball is picked at random. Find the probability that it is red.`, frac(r, n), [frac(bl, n), frac(n - r, n), frac(r, n - r), frac(g, n)], `P(red) = ${r}/${n}${frac(r, n) !== r + "/" + n ? " = " + frac(r, n) : ""}.`);
    return b(`A bag contains ${r} red, ${bl} blue and ${g} green balls. One ball is picked at random. Find the probability that it is NOT red.`, frac(n - r, n), [frac(r, n), frac(bl, n), frac(n - r, r), frac(g, n)], `P(not red) = 1 − ${frac(r, n)} = ${frac(n - r, n)}.`);
  });
  reg(M, "Plane Geometry & Polygons", "SS1", (ri, pick, b) => {
    const n = ri(5, 14), t = ri(0, 1);
    if (t === 0) return b(`Find the sum of the interior angles of a polygon with ${n} sides.`, (n - 2) * 180 + "°", [(n - 1) * 180 + "°", n * 180 + "°", (n - 2) * 90 + "°"], `Sum = (n − 2) × 180° = ${n - 2} × 180° = ${(n - 2) * 180}°.`);
    const k = pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24]);
    return b(`Find each exterior angle of a regular polygon with ${k} sides.`, 360 / k + "°", [(180 - 360 / k) + "°", 180 / k + "°", 360 / (k - 1) + "°"], `Each exterior angle = 360° ÷ ${k} = ${360 / k}°.`);
  });
  reg(M, "Matrices", "SS2", (ri, pick, b) => {
    const a = ri(1, 9), bb = ri(1, 9), c = ri(1, 9), d = ri(1, 9), det = a * d - bb * c;
    return b(`Find the determinant of the matrix [[${a}, ${bb}], [${c}, ${d}]].`, det, [a * d + bb * c, -det, a * c - bb * d, a + d - bb - c], `Determinant = ad − bc = ${a}×${d} − ${bb}×${c} = ${det}.`);
  });
  reg(M, "Matrices", "SS3", (ri, pick, b) => {
    const x = ri(1, 9), bb = ri(1, 5), c = ri(1, 5), d = ri(2, 6), D = x * d - bb * c;
    return b(`The determinant of [[x, ${bb}], [${c}, ${d}]] is ${D}. Find x.`, x, [x + 1, x - 1, D, x * 2], `${d}x − ${bb * c} = ${D}, so ${d}x = ${D + bb * c} and x = ${x}.`);
  });
  reg(M, "Vectors", "SS2", (ri, pick, b) => {
    const tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]);
    return b(`Find the magnitude of the vector (${tr[0]}, ${tr[1]}).`, tr[2], [tr[0] + tr[1], tr[2] + 1, tr[0] * tr[1], tr[1] - tr[0]], `|v| = √(${tr[0]}² + ${tr[1]}²) = √${tr[0] * tr[0] + tr[1] * tr[1]} = ${tr[2]}.`);
  });
  reg(M, "Vectors", "SS3", (ri, pick, b) => {
    const a1 = ri(-4, 6), a2 = ri(-4, 6), b1 = ri(-4, 6), b2 = ri(-4, 6), d = a1 * b1 + a2 * b2;
    const w = (x) => String(x).replace("-", "−");
    return b(`Find the scalar (dot) product of (${w(a1)}, ${w(a2)}) and (${w(b1)}, ${w(b2)}).`, d, [a1 * b2 + a2 * b1, a1 + b1 + a2 + b2, d + 1, -d], `a · b = (${a1})(${b1}) + (${a2})(${b2}) = ${d}.`);
  });
  reg(M, "Calculus", "SS3", (ri, pick, b) => {
    const a = ri(2, 7), n = ri(2, 4), bb = ri(2, 9), c = ri(2, 9);
    return b(`Differentiate y = ${poly([[a, n], [bb, 1], [c, 0]])} with respect to x.`, poly([[a * n, n - 1], [bb, 0]]), [poly([[a, n - 1], [bb, 0]]), poly([[a * n, n - 1], [bb, 0], [c, 0]]), poly([[a * n, n], [bb, 0]]), poly([[a * n, n - 1], [bb, 1]])], `Multiply by the power and reduce it by 1: ${poly([[a * n, n - 1]])}; the term ${bb}x gives ${bb}; the constant gives 0.`);
  });
  reg(M, "Calculus", "SS3", (ri, pick, b) => {
    const a = ri(1, 4), bb = ri(-6, 6), c = ri(1, 9), k = ri(1, 5), g = 2 * a * k + bb;
    return b(`Find the gradient of the curve y = ${poly([[a, 2], [bb, 1], [c, 0]])} at x = ${k}.`, g, [a * k * k + bb * k + c, 2 * a * k, g + 1, a * k + bb], `dy/dx = ${poly([[2 * a, 1], [bb, 0]])}. At x = ${k}: ${g}.`);
  });
  reg(M, "Calculus", "SS3", (ri, pick, b) => {
    const n = ri(1, 4), a = ri(1, 4) * (n + 1);
    return b(`Evaluate ∫ ${poly([[a, n]])} dx.`, poly([[a / (n + 1), n + 1]]) + " + C", [poly([[a * n, n - 1]]) + " + C", poly([[a, n + 1]]) + " + C", poly([[a / (n + 1), n]]) + " + C"], `Increase the power by 1 and divide by the new power: ${a}/${n + 1} = ${a / (n + 1)}.`);
  });
  reg(M, "Calculus", "SS3", (ri, pick, b) => {
    const k = ri(2, 6), a = ri(1, 4);
    return b(`Evaluate the definite integral of ${2 * a}x from x = 0 to x = ${k}.`, a * k * k, [2 * a * k * k, a * k, a * k * k + a, 2 * a * k], `∫ ${2 * a}x dx = ${a}x². Between 0 and ${k}: ${a} × ${k * k} = ${a * k * k}.`);
  });

  /* ===================== FURTHER MATHEMATICS ===================== */
  reg(F, "Polynomial Equations", "SS1", (ri, pick, b) => {
    const a = ri(-3, 4), bb = ri(-5, 6), c = ri(-6, 6), k = ri(1, 4), v = k * k * k + a * k * k + bb * k + c, vn = -k * k * k + a * k * k - bb * k + c;
    return b(`Find the remainder when ${poly([[1, 3], [a, 2], [bb, 1], [c, 0]])} is divided by (x − ${k}).`, v, [vn, v + k, v - k, c], `By the remainder theorem, substitute x = ${k}: ${k}³ ${a < 0 ? "−" : "+"} ${Math.abs(a)}(${k})² ${bb < 0 ? "−" : "+"} ${Math.abs(bb)}(${k}) ${c < 0 ? "−" : "+"} ${Math.abs(c)} = ${v}.`);
  });
  reg(F, "Polynomial Equations", "SS1", (ri, pick, b) => {
    const k = ri(1, 5), m = pick([-6, -5, -4, -3, -2, -1, 2, 3, 4, 5, 6]);
    if (m === k) return null;
    const p = -(k + m), q = k * m;
    return b(`(x − ${k}) is a factor of x² + px ${q < 0 ? "−" : "+"} ${Math.abs(q)}. Find p.`, p, [-p, p + 1, p - 1, q], `Since (x − ${k}) is a factor, f(${k}) = 0: ${k * k} + ${k}p ${q < 0 ? "−" : "+"} ${Math.abs(q)} = 0, so p = ${p}.`);
  });
  reg(F, "Complex Numbers", "SS2", (ri, pick, b) => {
    const a = ri(1, 5), bb = ri(-4, 4), c = ri(1, 5), d = ri(-4, 4);
    if (!bb || !d) return null;
    const re = a * c - bb * d, im = a * d + bb * c;
    return b(`Simplify (${cx(a, bb)})(${cx(c, d)}).`, cx(re, im), [cx(a * c + bb * d, im), cx(re, -im), cx(a * c, bb * d), cx(re, a * d - bb * c)], `Expand and use i² = −1: real part ${a}×${c} − (${bb})(${d}) = ${re}; imaginary part ${a}×${d} + ${bb}×${c} = ${im}.`);
  });
  reg(F, "Complex Numbers", "SS2", (ri, pick, b) => {
    const tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10]]);
    return b(`Find the modulus of the complex number ${cx(tr[0], tr[1])}.`, tr[2], [tr[0] + tr[1], tr[2] + 1, tr[0] * tr[1], tr[1] - tr[0]], `|z| = √(${tr[0]}² + ${tr[1]}²) = ${tr[2]}.`);
  });
  reg(F, "Differentiation", "SS3", (ri, pick, b) => {
    const a = ri(1, 6), bb = ri(1, 6);
    return b(`Differentiate y = (x + ${a})(x + ${bb}).`, poly([[2, 1], [a + bb, 0]]), [poly([[2, 1], [a * bb, 0]]), poly([[1, 1], [a + bb, 0]]), poly([[2, 1], [a, 0]]), poly([[2, 2], [a + bb, 0]])], `Expand: x² + ${a + bb}x + ${a * bb}. Differentiate: 2x + ${a + bb}.`);
  });
  reg(F, "Differentiation", "SS3", (ri, pick, b) => {
    const k = ri(2, 9), f = pick(["sin", "cos"]);
    const ans = f === "sin" ? `${k} cos ${k}x` : `−${k} sin ${k}x`;
    return b(`Differentiate y = ${f} ${k}x with respect to x.`, ans, [f === "sin" ? `−${k} cos ${k}x` : `${k} sin ${k}x`, f === "sin" ? `cos ${k}x` : `−sin ${k}x`, f === "sin" ? `${k} sin ${k}x` : `${k} cos ${k}x`], `Use the chain rule: the derivative of ${f} ${k}x is ${ans}.`);
  });
  reg(F, "Integration", "SS3", (ri, pick, b) => {
    const a = ri(1, 6) * 2, bb = ri(1, 9);
    return b(`Evaluate ∫ (${a}x + ${bb}) dx.`, `${a / 2}x² + ${bb}x + C`, [`${a}x² + ${bb}x + C`, `${a}x + C`, `${a / 2}x² + C`], `Integrate term by term: ${a}x → ${a / 2}x², ${bb} → ${bb}x.`);
  });
  reg(F, "Series", "SS3", (ri, pick, b) => {
    const pr = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4]]), a = ri(1, 6) * (pr[1] - pr[0]), S = a * pr[1] / (pr[1] - pr[0]);
    return b(`Find the sum to infinity of the geometric series with first term ${a} and common ratio ${pr[0]}/${pr[1]}.`, n2(S), [n2(a * (1 - pr[0] / pr[1])), n2(a / (1 + pr[0] / pr[1])), n2(a + S)], `S∞ = a/(1 − r) = ${a}/(1 − ${pr[0]}/${pr[1]}) = ${n2(S)}.`);
  });
  reg(F, "Mechanics", "SS2", (ri, pick, b) => {
    const u = ri(0, 12), a = ri(2, 6), t = ri(2, 9);
    return b(`A particle starts with velocity ${u} m/s and accelerates uniformly at ${a} m/s² for ${t} s. Find its final velocity.`, (u + a * t) + " m/s", [(u + a * t + a) + " m/s", (a * t) + (u ? " m/s" : "0 m/s"), (u + a / t) + " m/s", (u * t + a) + " m/s"], `v = u + at = ${u} + ${a}×${t} = ${u + a * t} m/s.`);
  });
  reg(F, "Mechanics", "SS3", (ri, pick, b) => {
    const u = ri(0, 10), a = ri(2, 8) * 2, t = ri(2, 8), s = u * t + a * t * t / 2;
    return b(`A body moves with initial velocity ${u} m/s and uniform acceleration ${a} m/s². Find the distance covered in ${t} s.`, s + " m", [(u * t + a * t * t) + " m", (u + a * t) + " m", (a * t * t / 2) + (u ? 1 : 0) + " m", (u * t + a * t) + " m"], `s = ut + ½at² = ${u}×${t} + ½×${a}×${t}² = ${s} m.`);
  });
  reg(F, "Probability", "SS2", (ri, pick, b) => {
    const pa = pick([0.3, 0.4, 0.5, 0.6]), pb = pick([0.2, 0.3, 0.4, 0.5]), pab = pick([0.05, 0.1, 0.15, 0.2]);
    return b(`If P(A) = ${pa}, P(B) = ${pb} and P(A ∩ B) = ${pab}, find P(A ∪ B).`, n2(pa + pb - pab), [n2(pa + pb), n2(pa * pb), n2(pa + pb + pab), n2(pa - pab)], `P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = ${pa} + ${pb} − ${pab} = ${n2(pa + pb - pab)}.`);
  });

  window.__GEN = { sup, sub, n2, gcd, frac, money, pad3, poly, cx, mulberry32, build, REG, reg };
})();
