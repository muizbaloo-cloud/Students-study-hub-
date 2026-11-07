/* =========================================================
   STUDENT STUDY HUB — QUIZ ENGINE
   Safe compact version
   ========================================================= */

(function () {
  "use strict";

  window.QUIZ = window.QUIZ || {
    mode: "practice",
    subject: "",
    level: "",
    topic: "",
    count: 10,
    duration: 10,
    questions: [],
    index: 0,
    answers: {},
    started: false,
    submitted: false,
    timer: null,
    secondsLeft: 0,
    score: 0,
    xp: 0
  };

  var Q = window.QUIZ;

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function arr(v) {
    return Array.isArray(v) ? v : [];
  }

  function allQuestions() {
    var a = arr(window.QBANK).slice();

    if (typeof window.generateBank === "function") {
      try {
        var b = window.generateBank();
        if (Array.isArray(b)) a = a.concat(b);
      } catch (e) {}
    }

    var seen = {};
    return a.filter(function (q) {
      if (!q) return false;
      var id = q.id || [
        q.subject,
        q.topic,
        q.question || q.q,
        q.year
      ].join("|");

      if (seen[id]) return false;
      seen[id] = true;
      return true;
    });
  }

  function subjects() {
    if (Array.isArray(window.SUBJECTS)) return window.SUBJECTS;
    return [];
  }

  function levels() {
    if (Array.isArray(window.LEVELS)) return window.LEVELS;
    return ["SS1", "SS2", "SS3"];
  }

  function topicsFor(subject) {
    if (
      window.TOPICS &&
      subject &&
      Array.isArray(window.TOPICS[subject])
    ) return window.TOPICS[subject];

    if (
      window.LEVEL_TOPICS &&
      subject &&
      Array.isArray(window.LEVEL_TOPICS[subject])
    ) return window.LEVEL_TOPICS[subject];

    var qs = allQuestions()
      .filter(function (q) {
        return !subject || q.subject === subject;
      })
      .map(function (q) { return q.topic; })
      .filter(Boolean);

    return Array.from(new Set(qs));
  }

  function normalizeAnswer(q) {
    var a = q.answer;

    if (typeof a === "number") return a;

    if (typeof a === "string") {
      var s = a.trim().toUpperCase();

      if (/^[A-Z]$/.test(s)) {
        var opts = arr(q.options);
        var letters = ["A", "B", "C", "D", "E"];
        var i = letters.indexOf(s);
        if (i >= 0 && i < opts.length) return i;
      }

      var n = Number(s);
      if (!isNaN(n)) return n;
    }

    if (typeof q.correctAnswer === "number") return q.correctAnswer;

    return 0;
  }

  function questionText(q) {
    return q.question || q.q || q.text || "Question";
  }

  function options(q) {
    var o = q.options || q.choices || [];
    if (!Array.isArray(o)) {
      try { o = Object.values(o); } catch (e) { o = []; }
    }
    return o;
  }

  function shuffle(a) {
    var x = a.slice();
    for (var i = x.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = x[i];
      x[i] = x[j];
      x[j] = t;
    }
    return x;
  }

  function filterQuestions() {
    var list = allQuestions();

    return list.filter(function (q) {
      if (Q.subject && q.subject && q.subject !== Q.subject) {
        return false;
      }

      if (Q.level && q.level && q.level !== Q.level) {
        return false;
      }

      if (Q.topic && q.topic && q.topic !== Q.topic) {
        return false;
      }

      return true;
    });
  }

  function setupHTML() {
    var ss = subjects();
    var lv = levels();

    var subjectOptions =
      '<option value="">All Subjects</option>' +
      ss.map(function (s) {
        var value = typeof s === "string" ? s : s.name;
        return '<option value="' + esc(value) + '">' +
          esc(value) + "</option>";
      }).join("");

    var levelOptions =
      '<option value="">All Levels</option>' +
      lv.map(function (l) {
        var value = typeof l === "string" ? l : l.name;
        return '<option value="' + esc(value) + '">' +
          esc(value) + "</option>";
      }).join("");

    return `
      <section class="card quiz-setup">
        <h2>📝 Quiz Centre</h2>
        <p class="muted">
          Choose your subject, level and topic, then start learning.
        </p>

        <label>Mode</label>
        <select id="quizMode">
          <option value="practice">Practice Mode</option>
          <option value="exam">Timed Exam</option>
        </select>

        <label>Subject</label>
        <select id="quizSubject" onchange="quizUpdateTopics()">
          ${subjectOptions}
        </select>

        <label>Class</label>
        <select id="quizLevel">
          ${levelOptions}
        </select>

        <label>Topic</label>
        <select id="quizTopic">
          <option value="">All Topics</option>
        </select>

        <label>Number of Questions</label>
        <select id="quizCount">
          ${[10,20,30,40,50,60,70,80,90,100].map(function(n){
            return '<option value="' + n + '">' + n + '</option>';
          }).join("")}
        </select>

        <div id="quizDurationBox">
          <label>Exam Duration</label>
          <select id="quizDuration">
            ${[10,20,30,40,50,60,70,80,90,100].map(function(n){
              return '<option value="' + n + '">' + n + ' minutes</option>';
            }).join("")}
          </select>
        </div>

        <button class="btn primary" onclick="startQuiz()">
          🚀 Start Quiz
        </button>

        <div id="quizBankInfo" class="muted center"></div>
      </section>
    `;
  }

  window.renderQuizSetup = function () {
    var app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = setupHTML();
    quizUpdateTopics();

    var info = document.getElementById("quizBankInfo");
    if (info) {
      info.textContent =
        allQuestions().length + " questions currently available.";
    }

    var mode = document.getElementById("quizMode");
    if (mode) {
      mode.addEventListener("change", function () {
        var box = document.getElementById("quizDurationBox");
        if (box) {
          box.style.display =
            mode.value === "exam" ? "block" : "none";
        }
      });
    }
  };

  window.quizUpdateTopics = function () {
    var subjectEl = document.getElementById("quizSubject");
    var topicEl = document.getElementById("quizTopic");
    if (!topicEl) return;

    var subject = subjectEl ? subjectEl.value : "";
    var list = topicsFor(subject);

    topicEl.innerHTML =
      '<option value="">All Topics</option>' +
      list.map(function (t) {
        return '<option value="' + esc(t) + '">' +
          esc(t) + "</option>";
      }).join("");
  };

  window.startQuiz = function () {
    var mode = document.getElementById("quizMode");
    var subject = document.getElementById("quizSubject");
    var level = document.getElementById("quizLevel");
    var topic = document.getElementById("quizTopic");
    var count = document.getElementById("quizCount");
    var duration = document.getElementById("quizDuration");

    Q.mode = mode ? mode.value : "practice";
    Q.subject = subject ? subject.value : "";
    Q.level = level ? level.value : "";
    Q.topic = topic ? topic.value : "";
    Q.count = Number(count ? count.value : 10);
    Q.duration = Number(duration ? duration.value : 10);

    var list = filterQuestions();

    if (!list.length) {
      alert("No questions were found for this selection.");
      return;
    }

    Q.questions = shuffle(list).slice(0, Math.min(Q.count, list.length));
    Q.index = 0;
    Q.answers = {};
    Q.started = true;
    Q.submitted = false;
    Q.score = 0;
    Q.xp = 0;

    if (Q.mode === "exam") {
      Q.secondsLeft = Q.duration * 60;
      startTimer();
    } else {
      stopTimer();
    }

    renderQuizQuestion();
  };

  function startTimer() {
    stopTimer();

    Q.timer = setInterval(function () {
      Q.secondsLeft--;

      var timer = document.getElementById("quizTimer");
      if (timer) timer.textContent = formatTime(Q.secondsLeft);

      if (Q.secondsLeft <= 0) {
        stopTimer();
        submitQuiz(true);
      }
    }, 1000);
  }

  function stopTimer() {
    if (Q.timer) {
      clearInterval(Q.timer);
      Q.timer = null;
    }
  }

  function formatTime(sec) {
    sec = Math.max(0, Number(sec) || 0);
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return String(m).padStart(2, "0") + ":" +
      String(s).padStart(2, "0");
  }

  function diagramHTML(q) {
    var src = q.diagramUrl || q.imageUrl;

    if (!src && typeof q.diagram === "string" &&
        /^https?:\/\//i.test(q.diagram)) {
      src = q.diagram;
    }

    if (src) {
      return '<div class="quiz-diagram">' +
        '<img src="' + esc(src) +
        '" alt="Question diagram" loading="lazy">' +
        "</div>";
    }

    if (q.diagram && typeof q.diagram === "string") {
      return '<div class="quiz-diagram">' +
        esc(q.diagram) + "</div>";
    }

    return "";
  }

  function selectedAnswer() {
    return Q.answers[Q.index];
  }

  function saveCurrentAnswer() {
    var chosen = document.querySelector(
      'input[name="quizAnswer"]:checked'
    );

    if (chosen) {
      Q.answers[Q.index] = Number(chosen.value);
    }
  }

  window.selectQuizAnswer = function (i) {
    Q.answers[Q.index] = Number(i);

    if (Q.mode === "practice") {
      renderQuizQuestion();
    }
  };

  function practiceFeedback(q, correct, chosen) {
    if (chosen === undefined) {
      return '<p class="muted">Choose an answer to see the explanation.</p>';
    }

    if (correct) {
      return '<div class="quiz-correct">✅ Correct!</div>';
    }

    var answer = normalizeAnswer(q);
    var opts = options(q);
    var correctText =
      opts[answer] !== undefined ? opts[answer] : "Correct answer";

    return '<div class="quiz-wrong">❌ Not quite.</div>' +
      '<p><strong>Correct answer:</strong> ' +
      esc(correctText) + "</p>" +
      (q.explanation ?
        '<div class="explanation"><strong>Explanation:</strong><br>' +
        esc(q.explanation) + "</div>" : "");
  }

  window.renderQuizQuestion = function () {
    var app = document.getElementById("app");
    if (!app || !Q.questions.length) return;

    var q = Q.questions[Q.index];
    var opts = options(q);
    var chosen = selectedAnswer();
    var answer = normalizeAnswer(q);
    var correct = chosen !== undefined &&
      Number(chosen) === Number(answer);

    var choices = opts.map(function (o, i) {
      var checked = chosen !== undefined &&
        Number(chosen) === i;

      var cls = "";

      if (Q.mode === "practice" && chosen !== undefined) {
        if (i === answer) cls = " correct-option";
        else if (checked) cls = " wrong-option";
      }

      return `
        <label class="quiz-option${cls}">
          <input
            type="radio"
            name="quizAnswer"
            value="${i}"
            ${checked ? "checked" : ""}
            onchange="selectQuizAnswer(${i})">
          <span>${esc(o)}</span>
        </label>
      `;
    }).join("");

    var palette = Q.questions.map(function (_, i) {
      var active = i === Q.index ? " active" : "";
      var answered = Q.answers[i] !== undefined ? " answered" : "";

      return '<button class="quiz-palette-btn' +
        active + answered +
        '" onclick="quizGoTo(' + i + ')">' +
        (i + 1) + "</button>";
    }).join("");

    var nav =
      '<div class="quiz-nav">' +
      '<button class="btn" onclick="quizPrevious()" ' +
      (Q.index === 0 ? "disabled" : "") + '>← Previous</button>' +
      '<span>Question ' + (Q.index + 1) +
      " of " + Q.questions.length + "</span>" +
      '<button class="btn" onclick="quizNext()">' +
      (Q.index === Q.questions.length - 1 ? "Finish" : "Next →") +
      "</button></div>";

    app.innerHTML = `
      <section class="quiz-screen">
        <div class="quiz-top card">
          <div>
            <strong>${esc(Q.subject || "General Quiz")}</strong>
            <span class="muted"> • ${esc(Q.mode)}</span>
          </div>
          ${Q.mode === "exam"
            ? '<strong id="quizTimer">' +
              formatTime(Q.secondsLeft) + "</strong>"
            : "<span>Practice</span>"}
        </div>

        <div class="quiz-palette card">
          ${palette}
        </div>

        <article class="card quiz-question">
          <div class="muted">
            Question ${Q.index + 1} of ${Q.questions.length}
          </div>

          <h3>${esc(questionText(q))}</h3>

          ${diagramHTML(q)}

          <div class="quiz-options">
            ${choices}
          </div>

          ${Q.mode === "practice"
            ? practiceFeedback(q, correct, chosen)
            : ""}
        </article>

        ${nav}

        <button class="btn danger quiz-submit"
          onclick="submitQuiz(false)">
          Submit Quiz
        </button>
      </section>
    `;
  };

  window.quizGoTo = function (i) {
    saveCurrentAnswer();
    if (i >= 0 && i < Q.questions.length) {
      Q.index = i;
      renderQuizQuestion();
    }
  };

  window.quizPrevious = function () {
    saveCurrentAnswer();
    if (Q.index > 0) {
      Q.index--;
      renderQuizQuestion();
    }
  };

  window.quizNext = function () {
    saveCurrentAnswer();

    if (Q.index < Q.questions.length - 1) {
      Q.index++;
      renderQuizQuestion();
    } else {
      submitQuiz(false);
    }
  };

  window.submitQuiz = function (automatic) {
    if (Q.submitted) return;

    saveCurrentAnswer();

    if (!automatic) {
      var ok = confirm(
        "Submit your quiz now? You will not be able to change your answers."
      );
      if (!ok) return;
    }

    stopTimer();
    Q.submitted = true;

    var score = 0;

    Q.questions.forEach(function (q, i) {
      if (
        Q.answers[i] !== undefined &&
        Number(Q.answers[i]) === Number(normalizeAnswer(q))
      ) {
        score++;
      }
    });

    Q.score = score;

    if (typeof window.calculateQuizXP === "function") {
      try {
        Q.xp = window.calculateQuizXP(
          score,
          Q.questions.length,
          Q.mode
        );
      } catch (e) {
        Q.xp = Math.max(0, score * 2);
      }
    } else {
      Q.xp = Math.max(0, score * 2);
    }

    if (typeof window.addXP === "function" && Q.xp > 0) {
      try {
        window.addXP(Q.xp);
      } catch (e) {}
    }

    renderQuizResults();
  };

  window.renderQuizResults = function () {
    var app = document.getElementById("app");
    if (!app) return;

    var percent = Q.questions.length
      ? Math.round((Q.score / Q.questions.length) * 100)
      : 0;

    var message =
      percent >= 80 ? "Excellent work! 🔥" :
      percent >= 60 ? "Good job! Keep pushing. 💪" :
      percent >= 40 ? "Nice attempt. Review your weak areas. 📚" :
      "Keep studying. You can improve from here. 🚀";

    var corrections = Q.questions.map(function (q, i) {
      var correct = normalizeAnswer(q);
      var chosen = Q.answers[i];
      var opts = options(q);

      var userText = chosen !== undefined &&
        opts[chosen] !== undefined
        ? opts[chosen]
        : "Not answered";

      var correctText = opts[correct] !== undefined
        ? opts[correct]
        : "Correct answer";

      var ok = Number(chosen) === Number(correct);

      return `
        <article class="card correction">
          <strong>Question ${i + 1}</strong>
          <p>${esc(questionText(q))}</p>
          <p>
            <strong>Your answer:</strong>
            ${esc(userText)}
          </p>
          <p>
            <strong>Correct answer:</strong>
            ${esc(correctText)}
          </p>
          ${q.explanation
            ? "<p><strong>Explanation:</strong> " +
              esc(q.explanation) + "</p>"
            : ""}
          <div>${ok ? "✅ Correct" : "❌ Incorrect"}</div>
        </article>
      `;
    }).join("");

    app.innerHTML = `
      <section class="quiz-results">
        <div class="card center">
          <h2>🎉 Quiz Complete</h2>
          <h1>${Q.score} / ${Q.questions.length}</h1>
          <h2>${percent}%</h2>
          <p>${message}</p>
          <p><strong>XP earned: +${Q.xp}</strong></p>

          <button class="btn primary" onclick="renderQuizSetup()">
            🔄 Try Another Quiz
          </button>

          <button class="btn" onclick="quizReview()">
            📖 Review Answers
          </button>
        </div>

        <div id="quizCorrections" style="display:none">
          ${corrections}
        </div>
      </section>
    `;
  };

  window.quizReview = function () {
    var box = document.getElementById("quizCorrections");
    if (!box) return;

    box.style.display =
      box.style.display === "none" ? "block" : "none";
  };

  window.renderPastPapers = function () {
    var app = document.getElementById("app");
    if (!app) return;

    var papers = Array.isArray(window.PAST_PAPERS)
      ? window.PAST_PAPERS
      : [];

    app.innerHTML = `
      <section class="card">
        <h2>📚 Past Papers</h2>
        <p class="muted">
          Past-paper questions available in this version.
        </p>

        ${
          papers.length
          ? papers.map(function (p) {
              return `
                <article class="card">
                  <h3>${esc(p.exam || p.name || "Past Paper")}</h3>
                  <p>${esc(p.year || "")}</p>
                  ${p.url
                    ? '<a class="btn" href="' +
                      esc(p.url) +
                      '" target="_blank" rel="noopener">' +
                      "Open Paper</a>"
                    : ""}
                </article>
              `;
            }).join("")
          : `
            <p>
              Past-paper content will appear here when loaded.
            </p>
          `
        }
      </section>
    `;
  };

  window.getQuizState = function () {
    return Q;
  };

  window.resetQuiz = function () {
    stopTimer();
    Q.mode = "practice";
    Q.questions = [];
    Q.index = 0;
    Q.answers = {};
    Q.started = false;
    Q.submitted = false;
    Q.score = 0;
    Q.xp = 0;
  };

})();