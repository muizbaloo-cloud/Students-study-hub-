
/* =========================================================
   STUDENT STUDY HUB — quiz.js VERSION 2.0
   Practice, examinations, results, XP and past papers.
   Compatible with the new data.js and app.js.
   ========================================================= */

const QZ = {
  cfg: {
    subject: "Mathematics",
    level: "All SS levels",
    topic: "",
    source: "all",
    mode: "practice",
    count: 20,
    minutes: 20
  },
  run: null,
  timer: null
};

const PP = {
  subject: "Mathematics",
  year: "2023",
  paper: "All",
  type: "All",
  picks: {}
};

const bankCache = {};

const LET = ["A", "B", "C", "D", "E"];

function stopQuizTimer() {
  if (QZ.timer) clearInterval(QZ.timer);
  QZ.timer = null;
}

function quizEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}


/* =========================================================
   QUESTION BANK
   ========================================================= */

function getBank(subject) {
  if (!bankCache[subject]) {
    const existing = Array.isArray(window.QBANK)
      ? window.QBANK.filter(q => q && q.subject === subject)
      : [];

    let generated = [];

    if (typeof window.generateBank === "function") {
      try {
        generated = window.generateBank(subject, 150) || [];
      } catch (error) {
        console.error("Generated question error:", error);
      }
    }

    bankCache[subject] = existing.concat(
      Array.isArray(generated) ? generated : []
    );
  }

  return bankCache[subject];
}

function levelOK(q, level) {
  return (
    level === "All SS levels" ||
    q.level === level ||
    q.level === "All SS levels" ||
    !q.level
  );
}

function srcOK(q, source) {
  if (source === "waec") {
    return q.exam === "WAEC";
  }

  if (source === "written") {
    return !q.generated && q.exam !== "WAEC";
  }

  if (source === "computed") {
    return !!q.generated;
  }

  return true;
}

function pool(cfg, withTopic = true) {
  return getBank(cfg.subject).filter(q => {
    return (
      levelOK(q, cfg.level) &&
      srcOK(q, cfg.source) &&
      (!withTopic || !cfg.topic || q.topic === cfg.topic)
    );
  });
}

function shuffle(array) {
  const result = array.slice();

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function pickQuestions(cfg) {
  const all = pool(cfg, true);

  const written = shuffle(all.filter(q => !q.generated));
  const generated = shuffle(all.filter(q => q.generated));

  const amount = Math.min(Number(cfg.count) || 20, all.length);

  let writtenCount = Math.min(
    written.length,
    Math.ceil(amount / 2)
  );

  let generatedCount = Math.min(
    generated.length,
    amount - writtenCount
  );

  writtenCount = Math.min(
    written.length,
    amount - generatedCount
  );

  return shuffle(
    written.slice(0, writtenCount).concat(
      generated.slice(0, generatedCount)
    )
  );
}


/* =========================================================
   ANSWER COMPATIBILITY
   ========================================================= */

function answerIndex(q) {
  if (!q) return -1;

  if (typeof q.answer === "number") {
    return q.answer;
  }

  if (typeof q.answer === "string") {
    const value = q.answer.trim().toUpperCase();

    if (/^[A-E]$/.test(value)) {
      return LET.indexOf(value);
    }

    const numeric = Number(value);

    if (Number.isInteger(numeric)) {
      return numeric;
    }
  }

  return -1;
}


/* =========================================================
   DIAGRAMS
   ========================================================= */

function diagramSvg(kind) {
  const svg = (inner, label) =>
    `<svg class="diagram" viewBox="0 0 300 190"
      role="img" aria-label="${quizEscape(label)}">${inner}</svg>`;

  const stroke = 'fill="none" stroke="#a5b4fc" stroke-width="2.5"';
  const text = 'fill="#f1f5f9" font-size="15" font-family="Noto Sans, sans-serif"';

  if (kind === "triangle") {
    return svg(
      `<path d="M40 160 L260 160 L150 30 Z" ${stroke}/>
       <text x="62" y="150" ${text}>48°</text>
       <text x="205" y="150" ${text}>67°</text>
       <text x="140" y="68" ${text}>x</text>`,
      "Triangle with two angles and an unknown angle"
    );
  }

  if (kind === "straight-line") {
    return svg(
      `<path d="M20 150 L280 150" ${stroke}/>
       <path d="M150 150 L95 40" ${stroke}/>
       <text x="108" y="140" ${text}>x</text>
       <text x="168" y="132" ${text}>128°</text>`,
      "Straight line divided into two angles"
    );
  }

  if (kind === "circle") {
    return svg(
      `<circle cx="150" cy="95" r="70" ${stroke}/>
       <path d="M150 95 L220 95" ${stroke}/>
       <circle cx="150" cy="95" r="3" fill="#f1f5f9"/>
       <text x="178" y="86" ${text}>7 cm</text>
       <text x="140" y="114" ${text}>O</text>`,
      "Circle with centre and radius"
    );
  }

  if (kind === "prism") {
    return svg(
      `<path d="M50 150 L170 150 L110 70 Z
       M50 150 L90 175 L210 175 L170 150
       M110 70 L150 95 L210 175" ${stroke}/>
       <text x="95" y="168" ${text}>6 cm</text>
       <text x="68" y="112" ${text}>4 cm</text>
       <text x="200" y="130" ${text}>10 cm</text>`,
      "Triangular prism diagram"
    );
  }

  if (kind === "circle-arc") {
    return svg(
      `<circle cx="150" cy="95" r="75" ${stroke}/>
       <path d="M150 95 L95 148 M150 95 L225 112" ${stroke}/>
       <text x="156" y="90" ${text}>O</text>
       <text x="78" y="162" ${text}>X</text>
       <text x="230" y="118" ${text}>Y</text>`,
      "Circle with two radii and an arc"
    );
  }

  return "";
}

function renderQuestionDiagram(q) {
  if (!q) return "";

  if (typeof q.diagram === "string") {
    const builtIn = diagramSvg(q.diagram);

    if (builtIn) return builtIn;
  }

  const imageUrl = q.diagramUrl || q.imageUrl || q.image;

  if (
    typeof imageUrl === "string" &&
    /^https?:\/\//i.test(imageUrl)
  ) {
    return `
      <div class="question-diagram">
        <img
          src="${quizEscape(imageUrl)}"
          alt="Question diagram"
          loading="lazy"
          style="max-width:100%;height:auto;display:block;margin:12px auto;"
        >
      </div>`;
  }

  return "";
}


/* =========================================================
   QUIZ SETUP
   ========================================================= */

function renderQuizSetup() {
  const c = QZ.cfg;

  const base = pool(c, false);
  const counts = {};

  base.forEach(q => {
    const topic = q.topic || "General";
    counts[topic] = (counts[topic] || 0) + 1;
  });

  const topics = (window.TOPICS[c.subject] || []).filter(
    topic => counts[topic]
  );

  Object.keys(counts).forEach(topic => {
    if (!topics.includes(topic)) topics.push(topic);
  });

  if (c.topic && !counts[c.topic]) {
    c.topic = "";
  }

  const available = pool(c, true).length;

  const option = (value, label, current) => `
    <option value="${quizEscape(value)}"
      ${String(current) === String(value) ? "selected" : ""}>
      ${quizEscape(label)}
    </option>`;

  $("#app").innerHTML = `
    <button class="btn ghost" id="qz-back">← Home</button>

    <section class="card">
      <p class="eyebrow">STUDENT STUDY HUB</p>
      <h2>Practice &amp; Examination Centre</h2>

      <div class="stack" style="margin-top:12px">

        <label>Subject
          <select id="qz-subject">
            ${(window.SUBJECTS || []).map(s =>
              option(s, s, c.subject)
            ).join("")}
          </select>
        </label>

        <label>Class
          <select id="qz-level">
            ${(window.LEVELS || []).map(s =>
              option(s, s, c.level)
            ).join("")}
          </select>
        </label>

        <label>Topic
          <select id="qz-topic">
            ${option("", `All topics (${base.length})`, c.topic)}
            ${topics.map(t =>
              option(t, `${t} (${counts[t]})`, c.topic)
            ).join("")}
          </select>
        </label>

        <label>Question source
          <select id="qz-source">
            ${option("all", "Everything", c.source)}
            ${option("written", "Written questions", c.source)}
            ${option("waec", "WAEC past questions", c.source)}
            ${option("computed", "Computed practice questions", c.source)}
          </select>
        </label>

        <label>Number of questions
          <select id="qz-count">
            ${(window.QUESTION_COUNTS || [10,20,30,40,50,60,70,80,90,100])
              .map(n => option(n, n, c.count)).join("")}
          </select>
        </label>

        <div class="seg" role="group" aria-label="Quiz mode">
          <button class="${c.mode === "practice" ? "on" : ""}"
            data-mode="practice">
            Practice
            <small>Answer and see corrections immediately</small>
          </button>

          <button class="${c.mode === "exam" ? "on" : ""}"
            data-mode="exam">
            Exam
            <small>Timed examination; corrections at the end</small>
          </button>
        </div>

        ${c.mode === "exam" ? `
          <label>Time allowed
            <select id="qz-min">
              ${(window.EXAM_DURATIONS || [10,20,30,40,50,60,70,80,90,100])
                .map(n => option(n, `${n} minutes`, c.minutes)).join("")}
            </select>
          </label>
        ` : ""}

        <p class="muted small">
          ${available} question${available === 1 ? "" : "s"} match your choices.
          ${state.user
            ? "Complete quizzes to earn XP."
            : "Log in to earn XP and appear on the leaderboard."}
        </p>

        <button class="btn primary wide" id="qz-start"
          ${available === 0 ? "disabled" : ""}>
          Start ${c.mode === "exam" ? "exam" : "practice"}
        </button>
      </div>
    </section>
  `;

  $("#qz-back").onclick = () => go("home");

  function bind(id, key, numeric = false) {
    const element = $(id);
    if (!element) return;

    element.onchange = e => {
      c[key] = numeric ? Number(e.target.value) : e.target.value;

      if (key === "subject" || key === "level") {
        c.topic = "";
      }

      renderQuizSetup();
    };
  }

  bind("#qz-subject", "subject");
  bind("#qz-level", "level");
  bind("#qz-topic", "topic");
  bind("#qz-source", "source");
  bind("#qz-count", "count", true);
  bind("#qz-min", "minutes", true);

  document.querySelectorAll(".seg button").forEach(button => {
    button.onclick = () => {
      c.mode = button.dataset.mode;
      renderQuizSetup();
    };
  });

  $("#qz-start").onclick = startQuiz;
}


/* =========================================================
   START QUIZ
   ========================================================= */

function startQuiz() {
  const cfg = Object.assign({}, QZ.cfg);
  const questions = pickQuestions(cfg);

  if (!questions.length) {
    alert("There are no questions matching these choices yet.");
    return;
  }

  stopQuizTimer();

  QZ.run = {
    cfg,
    items: questions.map(q => {
      const optionCount = Array.isArray(q.options)
        ? q.options.length
        : 0;

      return {
        q,
        order: shuffle(
          Array.from({ length: optionCount }, (_, i) => i)
        ),
        pick: null
      };
    }),
    i: 0,
    startedAt: Date.now(),
    endsAt: cfg.mode === "exam"
      ? Date.now() + cfg.minutes * 60000
      : 0,
    done: false,
    saved: false,
    xpEarned: 0
  };

  state.page = "quizrun";
  render();
  window.scrollTo(0, 0);

  if (cfg.mode === "exam") {
    QZ.timer = setInterval(() => {
      if (!QZ.run || QZ.run.done) {
        stopQuizTimer();
        return;
      }

      const remaining = Math.max(
        0,
        QZ.run.endsAt - Date.now()
      );

      const timer = $("#qz-timer");

      if (timer) {
        timer.textContent = fmtTime(remaining);
        timer.classList.toggle("low", remaining < 60000);
      }

      if (remaining <= 0) {
        finishQuiz(true);
      }
    }, 500);
  }
}

function fmtTime(milliseconds) {
  const seconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);

  return minutes + ":" +
    String(seconds % 60).padStart(2, "0");
}


/* =========================================================
   QUESTION DISPLAY
   ========================================================= */

function qBody(q) {
  return `
    <p class="qtext">${quizEscape(q.q || q.question || q.prompt || "")}</p>
    ${renderQuestionDiagram(q)}
  `;
}

function explainBox(item) {
  const q = item.q;
  const correct = answerIndex(q);
  const position = item.order.indexOf(correct);

  if (correct < 0 || !q.options || !q.options[correct]) {
    return `
      <div class="explain">
        <b>Correct answer information is unavailable.</b>
        ${q.explanation
          ? `<p>${quizEscape(q.explanation)}</p>`
          : ""}
      </div>`;
  }

  return `
    <div class="explain">
      <b>
        Correct answer:
        ${LET[position] || "?"}.
        ${quizEscape(q.options[correct])}
      </b>
      ${q.explanation
        ? `<p>${quizEscape(q.explanation)}</p>`
        : ""}
    </div>`;
}


/* =========================================================
   RUNNING QUIZ
   ========================================================= */

function renderQuizRun() {
  const run = QZ.run;

  if (!run) {
    go("quiz");
    return;
  }

  const item = run.items[run.i];
  const q = item.q;
  const practice = run.cfg.mode === "practice";
  const total = run.items.length;
  const answered = item.pick !== null;
  const correctAnswer = answerIndex(q);

  const optionsHTML = (q.options || []).map((original, index) => {
    const originalIndex = item.order[index];

    let className = "opt";

    if (practice && answered) {
      if (originalIndex === correctAnswer) {
        className += " right";
      } else if (originalIndex === item.pick) {
        className += " wrong";
      }
    } else if (item.pick === originalIndex) {
      className += " sel";
    }

    return `
      <button class="${className}" data-k="${index}"
        ${practice && answered ? "disabled" : ""}>
        <b>${LET[index] || ""}</b>
        <span>${quizEscape(q.options[originalIndex])}</span>
      </button>`;
  }).join("");

  const done = run.items.filter(x => x.pick !== null).length;

  const palette = practice ? "" : `
    <div class="pal">
      ${run.items.map((x, index) => `
        <button
          class="${index === run.i ? "cur" : ""}
          ${x.pick !== null ? " ans" : ""}"
          data-j="${index}">
          ${index + 1}
        </button>
      `).join("")}
    </div>`;

  const last = run.i === total - 1;

  $("#app").innerHTML = `
    <div class="runbar">
      <span class="small muted">
        ${quizEscape(run.cfg.subject)} ·
        ${practice ? "Practice" : "Exam"}
      </span>

      ${practice
        ? `<span class="small muted">
            ${run.items.filter(x =>
              x.pick !== null && x.pick === answerIndex(x.q)
            ).length} correct so far
          </span>`
        : `<span id="qz-timer" class="timer">
            ${fmtTime(Math.max(0, run.endsAt - Date.now()))}
          </span>`}
    </div>

    <div class="bar2">
      <i style="width:${Math.round(
        ((run.i + (practice && answered ? 1 : 0)) / total) * 100
      )}%"></i>
    </div>

    <section class="card">
      <p class="eyebrow">
        Question ${run.i + 1} of ${total}
        · ${quizEscape(q.topic || "General")}
        ${q.exam === "WAEC"
          ? ` · WAEC ${quizEscape(q.year || "")}`
          : ""}
      </p>

      ${qBody(q)}

      <div class="opts">${optionsHTML}</div>

      ${practice && answered ? explainBox(item) : ""}

      ${palette}

      <div class="row nav">
        ${practice ? "" : `
          <button class="btn" id="qz-prev"
            ${run.i === 0 ? "disabled" : ""}>
            ← Previous
          </button>
        `}

        ${practice
          ? (answered
            ? `<button class="btn primary" id="qz-next">
                ${last ? "Finish" : "Next question →"}
              </button>`
            : `<span class="muted small">Choose an answer to continue.</span>`)
          : (last
            ? `<button class="btn primary" id="qz-submit">
                Submit (${done}/${total} answered)
              </button>`
            : `<button class="btn primary" id="qz-next">
                Next →
              </button>`)}
      </div>

      ${practice
        ? `<button class="linkbtn small" id="qz-quit"
            style="margin-top:12px">
            End practice and see results
          </button>`
        : `<button class="linkbtn small" id="qz-submit2"
            style="margin-top:12px">
            Submit exam now
          </button>`}
    </section>
  `;

  document.querySelectorAll(".opts .opt").forEach(button => {
    button.onclick = () => {
      if (practice && item.pick !== null) return;

      const position = Number(button.dataset.k);
      item.pick = item.order[position];

      renderQuizRun();
    };
  });

  const next = $("#qz-next");
  const previous = $("#qz-prev");

  if (next) {
    next.onclick = () => {
      if (last && practice) {
        finishQuiz(false);
        return;
      }

      run.i = Math.min(total - 1, run.i + 1);
      renderQuizRun();
      window.scrollTo(0, 0);
    };
  }

  if (previous) {
    previous.onclick = () => {
      run.i = Math.max(0, run.i - 1);
      renderQuizRun();
      window.scrollTo(0, 0);
    };
  }

  document.querySelectorAll(".pal button").forEach(button => {
    button.onclick = () => {
      run.i = Number(button.dataset.j);
      renderQuizRun();
      window.scrollTo(0, 0);
    };
  });

  const submit = () => {
    const unanswered = run.items.filter(
      x => x.pick === null
    ).length;

    const message = unanswered
      ? `You have ${unanswered} unanswered question(s). Submit anyway?`
      : "Submit your examination now?";

    if (confirm(message)) finishQuiz(false);
  };

  if ($("#qz-submit")) $("#qz-submit").onclick = submit;
  if ($("#qz-submit2")) $("#qz-submit2").onclick = submit;

  if ($("#qz-quit")) {
    $("#qz-quit").onclick = () => {
      if (confirm("End this practice and see your results?")) {
        finishQuiz(false);
      }
    };
  }
}


/* =========================================================
   FINISH AND SAVE XP
   ========================================================= */

async function finishQuiz(timeUp = false) {
  const run = QZ.run;

  if (!run || run.done) return;

  run.done = true;
  run.timeUp = !!timeUp;
  run.seconds = Math.round(
    (Date.now() - run.startedAt) / 1000
  );

  stopQuizTimer();

  state.page = "result";
  render();
  window.scrollTo(0, 0);

  if (state.user && !run.saved) {
    run.saved = true;

    const correct = run.items.filter(
      item => item.pick !== null &&
        item.pick === answerIndex(item.q)
    ).length;

    const xp = typeof window.calculateQuizXP === "function"
      ? window.calculateQuizXP({
          correct,
          total: run.items.length,
          mode: run.cfg.mode,
          completed: true
        })
      : correct * (
          run.cfg.mode === "exam" ? 10 : 5
        );

    run.xpEarned = xp;

    try {
      if (typeof addXP === "function" && xp > 0) {
        await addXP(xp, "Quiz completed");
        run.xpTotal = state.studentXP;
      } else if (xp > 0) {
        run.xpError = "XP could not be saved. Please check the app setup.";
      }
    } catch (error) {
      run.xpError = error.message || "Could not save your XP.";
    }

    if (state.page === "result") {
      renderQuizResult();
    }
  }
}


/* =========================================================
   RESULTS AND CORRECTIONS
   ==========