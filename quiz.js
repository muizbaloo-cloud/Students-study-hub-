/* quiz.js: question bank, Practice / Exam quiz, results, and the Past Papers page. */

const QZ = {
  cfg: { subject: "Mathematics", level: "All SS levels", topic: "", source: "all", mode: "practice", count: 20, minutes: 20 },
  run: null,
  timer: null
};
const PP = { subject: "Mathematics", year: "2023", paper: "All", type: "All", picks: {} };
const bankCache = {};

function stopQuizTimer() { clearInterval(QZ.timer); QZ.timer = null; }

/* ---------- bank ---------- */
function getBank(subject) {
  if (!bankCache[subject]) {
    bankCache[subject] = window.QBANK.filter((q) => q.subject === subject).concat(window.generateBank ? window.generateBank(subject, 150) : []);
  }
  return bankCache[subject];
}
const levelOK = (q, lv) => lv === "All SS levels" || q.level === lv || q.level === "All SS levels";
function srcOK(q, src) {
  if (src === "waec") return q.exam === "WAEC";
  if (src === "written") return !q.generated && q.exam !== "WAEC";
  if (src === "computed") return !!q.generated;
  return true;
}
const pool = (cfg, withTopic) => getBank(cfg.subject).filter((q) => levelOK(q, cfg.level) && srcOK(q, cfg.source) && (!withTopic || !cfg.topic || q.topic === cfg.topic));
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

function pickQuestions(cfg) {
  const all = pool(cfg, true);
  const W = shuffle(all.filter((q) => !q.generated)), G = shuffle(all.filter((q) => q.generated));
  const n = Math.min(cfg.count, all.length);
  let wN = Math.min(W.length, Math.ceil(n / 2));
  let gN = Math.min(G.length, n - wN);
  wN = Math.min(W.length, n - gN);
  return shuffle(W.slice(0, wN).concat(G.slice(0, gN)));
}

/* ---------- diagrams ---------- */
function diagramSvg(kind) {
  const s = (inner, label) => `<svg class="diagram" viewBox="0 0 300 190" role="img" aria-label="${esc(label)}">${inner}</svg>`;
  const st = 'fill="none" stroke="#a5b4fc" stroke-width="2.5"';
  const tx = 'fill="#f1f5f9" font-size="15" font-family="Noto Sans, sans-serif"';
  if (kind === "triangle") return s(`<path d="M40 160 L260 160 L150 30 Z" ${st}/><text x="62" y="150" ${tx}>48°</text><text x="205" y="150" ${tx}>67°</text><text x="140" y="68" ${tx}>x</text>`, "Triangle with two angles 48 and 67 degrees and the third angle x");
  if (kind === "straight-line") return s(`<path d="M20 150 L280 150" ${st}/><path d="M150 150 L95 40" ${st}/><text x="108" y="140" ${tx}>x</text><text x="168" y="132" ${tx}>128°</text>`, "A straight line divided into angles x and 128 degrees");
  if (kind === "circle") return s(`<circle cx="150" cy="95" r="70" ${st}/><path d="M150 95 L220 95" ${st}/><circle cx="150" cy="95" r="3" fill="#f1f5f9"/><text x="178" y="86" ${tx}>7 cm</text><text x="140" y="114" ${tx}>O</text>`, "Circle of radius 7 centimetres");
  if (kind === "prism") return s(`<path d="M50 150 L170 150 L110 70 Z M50 150 L90 175 L210 175 L170 150 M110 70 L150 95 L210 175" ${st}/><text x="95" y="168" ${tx}>6 cm</text><text x="68" y="112" ${tx}>4 cm</text><text x="200" y="130" ${tx}>10 cm</text>`, "Triangular prism with base 6 cm, height 4 cm and length 10 cm");
  if (kind === "circle-arc") return s(`<circle cx="150" cy="95" r="75" ${st}/><path d="M150 95 L95 148 M150 95 L225 112" ${st}/><text x="156" y="90" ${tx}>O</text><text x="78" y="162" ${tx}>X</text><text x="230" y="118" ${tx}>Y</text><text x="112" y="182" ${tx}>36 cm (minor arc)</text>`, "Circle with centre O, radii OX and OY and minor arc XY of 36 cm");
  return "";
}

/* ---------- setup page ---------- */
function renderQuizSetup() {
  const c = QZ.cfg;
  const base = pool(c, false);
  const counts = {};
  base.forEach((q) => { counts[q.topic] = (counts[q.topic] || 0) + 1; });
  const topics = (window.TOPICS[c.subject] || []).filter((t) => counts[t]);
  Object.keys(counts).forEach((t) => { if (topics.indexOf(t) < 0) topics.push(t); });
  if (c.topic && !counts[c.topic]) c.topic = "";
  const avail = pool(c, true).length;
  const opt = (v, l, cur) => `<option value="${esc(v)}"${String(cur) === String(v) ? " selected" : ""}>${esc(l)}</option>`;

  $("#app").innerHTML = `
    <button class="btn ghost" id="qz-back">← Home</button>
    <section class="card">
      <p class="eyebrow">Practice &amp; Exam</p>
      <h2>Start a quiz</h2>
      <div class="stack" style="margin-top:12px">
        <label>Subject<select id="qz-subject">${window.SUBJECTS.map((s) => opt(s, s, c.subject)).join("")}</select></label>
        <label>Class<select id="qz-level">${window.LEVELS.map((s) => opt(s, s, c.level)).join("")}</select></label>
        <label>Topic<select id="qz-topic">${opt("", "All topics (" + base.length + ")", c.topic)}${topics.map((t) => opt(t, t + " (" + counts[t] + ")", c.topic)).join("")}</select></label>
        <label>Questions from<select id="qz-source">
          ${opt("all", "Everything", c.source)}${opt("written", "Written questions", c.source)}${opt("waec", "WAEC past questions", c.source)}${opt("computed", "Computed practice (new numbers each time)", c.source)}</select></label>
        <label>Number of questions<select id="qz-count">${[5, 10, 20, 30, 40, 50].map((n) => opt(n, n, c.count)).join("")}</select></label>
        <div class="seg" role="group" aria-label="Mode">
          <button class="${c.mode === "practice" ? "on" : ""}" data-mode="practice">Practice<small>Answer, then see the explanation</small></button>
          <button class="${c.mode === "exam" ? "on" : ""}" data-mode="exam">Exam<small>Timed. Corrections at the end</small></button>
        </div>
        ${c.mode === "exam" ? `<label>Time allowed<select id="qz-min">${[5, 10, 15, 20, 30, 45, 60, 90].map((n) => opt(n, n + " minutes", c.minutes)).join("")}</select></label>` : ""}
        <p class="muted small">${avail} question${avail === 1 ? "" : "s"} match these choices.${state.user ? " You earn XP for each finished quiz." : " Log in to earn XP and appear on the leaderboard."}</p>
        <button class="btn primary wide" id="qz-start"${avail ? "" : " disabled"}>Start ${c.mode === "exam" ? "exam" : "practice"}</button>
      </div>
    </section>
    <section class="card"><p class="muted small">Written questions are checked by hand. Computed practice questions are produced by code with the answer worked out, so the working is always right. WAEC items come from the past papers.</p></section>`;

  $("#qz-back").onclick = () => go("home");
  const bind = (id, key, num) => { $(id).onchange = (e) => { c[key] = num ? Number(e.target.value) : e.target.value; if (key === "subject") c.topic = ""; renderQuizSetup(); }; };
  bind("#qz-subject", "subject"); bind("#qz-level", "level"); bind("#qz-topic", "topic"); bind("#qz-source", "source"); bind("#qz-count", "count", true);
  if ($("#qz-min")) bind("#qz-min", "minutes", true);
  document.querySelectorAll(".seg button").forEach((b) => { b.onclick = () => { c.mode = b.dataset.mode; renderQuizSetup(); }; });
  $("#qz-start").onclick = startQuiz;
}

/* ---------- run ---------- */
function startQuiz() {
  const cfg = Object.assign({}, QZ.cfg);
  const qs = pickQuestions(cfg);
  if (!qs.length) return;
  stopQuizTimer();
  QZ.run = {
    cfg: cfg,
    items: qs.map((q) => ({ q: q, order: shuffle([0, 1, 2, 3].slice(0, q.options.length)), pick: null })),
    i: 0,
    startedAt: Date.now(),
    endsAt: cfg.mode === "exam" ? Date.now() + cfg.minutes * 60000 : 0,
    done: false,
    saved: false
  };
  state.page = "quizrun";
  render();
  window.scrollTo(0, 0);
  if (cfg.mode === "exam") {
    QZ.timer = setInterval(() => {
      const left = Math.max(0, QZ.run.endsAt - Date.now());
      const el = $("#qz-timer");
      if (el) { el.textContent = fmtTime(left); el.classList.toggle("low", left < 60000); }
      if (left <= 0) finishQuiz(true);
    }, 500);
  }
}
const fmtTime = (ms) => { const s = Math.ceil(ms / 1000), m = Math.floor(s / 60); return m + ":" + String(s % 60).padStart(2, "0"); };
const LET = ["A", "B", "C", "D", "E"];

function qBody(q) { return `<p class="qtext">${esc(q.q)}</p>${q.diagram ? diagramSvg(q.diagram) : ""}`; }

function explainBox(it) {
  const q = it.q, ci = it.order.indexOf(q.answer);
  return `<div class="explain"><b>Correct answer: ${LET[ci]}. ${esc(q.options[q.answer])}</b>${q.explanation ? `<p>${esc(q.explanation)}</p>` : ""}</div>`;
}

function renderQuizRun() {
  const r = QZ.run;
  if (!r) return go("quiz");
  const it = r.items[r.i], q = it.q, practice = r.cfg.mode === "practice", n = r.items.length;
  const answered = it.pick !== null;
  const optHtml = it.order.map((orig, k) => {
    let cls = "opt";
    if (practice && answered) { if (orig === q.answer) cls += " right"; else if (orig === it.pick) cls += " wrong"; }
    else if (it.pick === orig) cls += " sel";
    return `<button class="${cls}" data-k="${k}"${practice && answered ? " disabled" : ""}><b>${LET[k]}</b><span>${esc(q.options[orig])}</span></button>`;
  }).join("");
  const done = r.items.filter((x) => x.pick !== null).length;
  const palette = practice ? "" : `<div class="pal">${r.items.map((x, j) => `<button class="${j === r.i ? "cur" : ""}${x.pick !== null ? " ans" : ""}" data-j="${j}">${j + 1}</button>`).join("")}</div>`;
  const last = r.i === n - 1;
  $("#app").innerHTML = `
    <div class="runbar">
      <span class="small muted">${esc(r.cfg.subject)} · ${practice ? "Practice" : "Exam"}</span>
      ${practice ? `<span class="small muted">${r.items.filter((x) => x.pick === x.q.answer).length} correct so far</span>` : `<span id="qz-timer" class="timer">${fmtTime(Math.max(0, r.endsAt - Date.now()))}</span>`}
    </div>
    <div class="bar2"><i style="width:${Math.round(((r.i + (practice && answered ? 1 : 0)) / n) * 100)}%"></i></div>
    <section class="card">
      <p class="eyebrow">Question ${r.i + 1} of ${n} · ${esc(q.topic)}${q.exam === "WAEC" ? " · WAEC " + esc(q.year) : ""}</p>
      ${qBody(q)}
      <div class="opts">${optHtml}</div>
      ${practice && answered ? explainBox(it) : ""}
      ${palette}
      <div class="row nav">
        ${practice ? "" : `<button class="btn" id="qz-prev"${r.i === 0 ? " disabled" : ""}>← Previous</button>`}
        ${practice
          ? (answered ? `<button class="btn primary" id="qz-next">${last ? "Finish" : "Next question →"}</button>` : `<span class="muted small">Pick an answer</span>`)
          : (last ? `<button class="btn primary" id="qz-submit">Submit (${done}/${n} answered)</button>` : `<button class="btn primary" id="qz-next">Next →</button>`)}
      </div>
      ${practice ? `<button class="linkbtn small" id="qz-quit" style="margin-top:12px">End practice and see results</button>` : `<button class="linkbtn small" id="qz-submit2" style="margin-top:12px">Submit exam now</button>`}
    </section>`;

  document.querySelectorAll(".opt").forEach((b) => {
    b.onclick = () => {
      if (practice && it.pick !== null) return;
      it.pick = it.order[Number(b.dataset.k)];
      renderQuizRun();
    };
  });
  const nx = $("#qz-next"), pv = $("#qz-prev");
  if (nx) nx.onclick = () => { if (last && practice) return finishQuiz(false); r.i = Math.min(n - 1, r.i + 1); renderQuizRun(); window.scrollTo(0, 0); };
  if (pv) pv.onclick = () => { r.i = Math.max(0, r.i - 1); renderQuizRun(); window.scrollTo(0, 0); };
  document.querySelectorAll(".pal button").forEach((b) => { b.onclick = () => { r.i = Number(b.dataset.j); renderQuizRun(); window.scrollTo(0, 0); }; });
  const submit = () => {
    const un = r.items.length - r.items.filter((x) => x.pick !== null).length;
    if (confirm(un ? `You have ${un} unanswered question${un > 1 ? "s" : ""}. Submit anyway?` : "Submit your exam now?")) finishQuiz(false);
  };
  if ($("#qz-submit")) $("#qz-submit").onclick = submit;
  if ($("#qz-submit2")) $("#qz-submit2").onclick = submit;
  if ($("#qz-quit")) $("#qz-quit").onclick = () => { if (confirm("End this practice and see your results?")) finishQuiz(false); };
}

async function finishQuiz(timeUp) {
  const r = QZ.run;
  if (!r || r.done) return;
  r.done = true;
  r.timeUp = !!timeUp;
  r.seconds = Math.round((Date.now() - r.startedAt) / 1000);
  stopQuizTimer();
  state.page = "result";
  render();
  window.scrollTo(0, 0);
  if (state.user && !r.saved) {
    r.saved = true;
    const score = r.items.filter((x) => x.pick === x.q.answer).length;
    try {
      const res = await sb.rpc("submit_session", { p_subject: r.cfg.subject, p_score: score, p_total: r.items.length, p_seconds: r.seconds });
      if (res.error) throw res.error;
      r.xpTotal = res.data;
      r.xpEarned = score * 10 + Math.floor(r.seconds / 60);
      if (state.profile) state.profile.xp = res.data;
    } catch (e) { r.xpError = e.message || "Could not save your XP."; }
    if (state.page === "result") renderQuizResult();
  }
}

function renderQuizResult() {
  const r = QZ.run;
  if (!r) return go("quiz");
  const n = r.items.length, score = r.items.filter((x) => x.pick === x.q.answer).length, pct = Math.round((score / n) * 100);
  const msg = pct >= 70 ? "Excellent work!" : pct >= 50 ? "Good effort. Review the corrections below." : "Keep practising. Read each explanation carefully.";
  const xp = !state.user
    ? `<p class="muted small">Log in to earn XP for your quizzes. <button class="linkbtn" id="rs-login">Register / Login</button></p>`
    : r.xpError ? `<p class="alert">${esc(r.xpError)}</p>`
    : r.xpEarned !== undefined ? `<p class="xp">+${r.xpEarned} XP earned · total ${r.xpTotal} XP</p>` : `<p class="muted small">Saving your XP…</p>`;
  const review = r.items.map((it, j) => {
    const q = it.q, ok = it.pick === q.answer, skipped = it.pick === null;
    return `<article class="rev ${ok ? "ok" : "no"}">
      <p class="eyebrow">Question ${j + 1} · ${esc(q.topic)} · ${ok ? "Correct" : skipped ? "Not answered" : "Wrong"}</p>
      ${qBody(q)}
      <p class="small">${skipped ? "You did not answer this question." : `Your answer: <b>${LET[it.order.indexOf(it.pick)]}. ${esc(q.options[it.pick])}</b>`}</p>
      ${explainBox(it)}
    </article>`;
  }).join("");
  $("#app").innerHTML = `
    <section class="card center">
      <p class="eyebrow">${esc(r.cfg.subject)} · ${r.cfg.mode === "exam" ? "Exam" : "Practice"}${r.timeUp ? " · time up" : ""}</p>
      <h2 style="font-size:2.4rem;margin-top:6px">${score} / ${n}</h2>
      <p style="font-size:1.2rem;font-weight:900;margin:4px 0">${pct}%</p>
      <p class="muted">${msg}</p>
      <p class="muted small">Time used: ${fmtTime(r.seconds * 1000)}</p>
      ${xp}
      <div class="row" style="justify-content:center;flex-wrap:wrap;margin-top:12px">
        <button class="btn primary" id="rs-again">Try again</button>
        <button class="btn" id="rs-new">New quiz</button>
        <button class="btn ghost" id="rs-home">Home</button>
      </div>
    </section>
    <h2 style="margin:22px 4px 0">Corrections</h2>
    ${review}`;
  $("#rs-again").onclick = () => { QZ.cfg = Object.assign({}, r.cfg); startQuiz(); };
  $("#rs-new").onclick = () => go("quiz");
  $("#rs-home").onclick = () => go("home");
  if ($("#rs-login")) $("#rs-login").onclick = () => openAuth("in");
}

/* ---------- past papers ---------- */
function renderPapers() {
  const all = window.PAST_PAPERS || [];
  const years = Array.from(new Set(all.map((p) => p.year))).sort().reverse();
  if (years.indexOf(PP.year) < 0) PP.year = years[0];
  const maths = PP.subject === "Mathematics";
  let list = all.filter((p) => p.year === PP.year && (PP.paper === "All" || p.paper === PP.paper) && (PP.type === "All" || p.type === PP.type));
  const opt = (v, cur) => `<option${v === cur ? " selected" : ""}>${esc(v)}</option>`;
  const card = (p) => {
    const picked = PP.picks[p.id];
    const objective = p.options && !p.flag;
    const opts = p.options ? `<div class="opts">${p.options.map((o, k) => {
      let cls = "opt";
      if (objective && picked !== undefined) { if (k === p.answer) cls += " right"; else if (k === picked) cls += " wrong"; }
      return `<button class="${cls}" data-id="${esc(p.id)}" data-k="${k}"${!objective || picked !== undefined ? " disabled" : ""}><b>${LET[k]}</b><span>${esc(o)}</span></button>`;
    }).join("")}</div>` : "";
    const reveal = objective && picked !== undefined ? `<div class="explain"><b>Correct answer: ${LET[p.answer]}. ${esc(p.options[p.answer])}</b><p>${esc(p.explanation || "")}</p></div>` : "";
    const key = !p.options && p.answer ? `<div class="explain"><b>Answer / marking reference: ${esc(p.answer)}</b></div>` : "";
    return `<article class="card pq">
      <div class="row" style="justify-content:space-between;flex-wrap:wrap"><span class="eyebrow">${esc(p.year)} · ${esc(p.paper)} · ${esc(p.type)}</span><span class="chip">${esc(p.topic)}</span></div>
      <h3>Question ${esc(p.number)}</h3>
      <p class="qtext">${esc(p.prompt)}</p>
      ${p.diagram ? diagramSvg(p.diagram) : ""}
      ${p.flag ? `<p class="alert" style="margin-top:10px">⚠ ${esc(p.flag)}</p>` : ""}
      ${opts}${reveal}${key}
      ${p.source ? `<a class="small link" href="${esc(p.source)}" target="_blank" rel="noreferrer">${esc(p.sourceLabel || "Official source")}</a>` : ""}
    </article>`;
  };
  $("#app").innerHTML = `
    <button class="btn ghost" id="pp-back">← Home</button>
    <section class="card">
      <p class="eyebrow">WAEC</p><h2>Past-paper library</h2>
      <p class="muted small" style="margin:8px 0 12px">Questions are listed by year and paper. Pick an answer to see the explanation. This is a first batch; more years are being added.</p>
      <div class="stack">
        <label>Subject<select id="pp-subject">${window.SUBJECTS.map((s) => opt(s, PP.subject)).join("")}</select></label>
        ${maths ? `<div class="two"><label>Year<select id="pp-year">${years.map((y) => opt(y, PP.year)).join("")}</select></label>
        <label>Paper<select id="pp-paper">${["All", "Paper 1", "Paper 2"].map((y) => opt(y, PP.paper)).join("")}</select></label></div>
        <label>Type<select id="pp-type">${["All", "Objective", "Theory"].map((y) => opt(y, PP.type)).join("")}</select></label>` : ""}
      </div>
      ${maths ? `<button class="btn primary wide" id="pp-quiz" style="margin-top:12px">Practise all WAEC objectives as a quiz</button>` : ""}
    </section>
    ${maths ? (list.length ? list.map(card).join("") : `<section class="card"><p class="muted">No questions for this selection yet.</p></section>`)
      : `<section class="card"><h2>${esc(PP.subject)}</h2><p class="muted" style="margin-top:8px">Past questions for this subject have not been added yet. The official portal has the papers in the meantime.</p><a class="btn wide center" style="display:block;margin-top:12px;text-decoration:none" href="https://waeconline.org.ng/e-learning/" target="_blank" rel="noreferrer">Open the official WAEC e-learning portal</a></section>`}`;

  $("#pp-back").onclick = () => go("home");
  $("#pp-subject").onchange = (e) => { PP.subject = e.target.value; renderPapers(); };
  if (maths) {
    $("#pp-year").onchange = (e) => { PP.year = e.target.value; renderPapers(); };
    $("#pp-paper").onchange = (e) => { PP.paper = e.target.value; renderPapers(); };
    $("#pp-type").onchange = (e) => { PP.type = e.target.value; renderPapers(); };
    $("#pp-quiz").onclick = () => { QZ.cfg = Object.assign({}, QZ.cfg, { subject: "Mathematics", level: "All SS levels", topic: "", source: "waec", mode: "practice" }); go("quiz"); };
  }
  document.querySelectorAll(".pq .opt").forEach((b) => {
    b.onclick = () => { PP.picks[b.dataset.id] = Number(b.dataset.k); const y = window.scrollY; renderPapers(); window.scrollTo(0, y); };
  });
}
