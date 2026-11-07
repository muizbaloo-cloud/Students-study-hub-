/* =========================================================
   STUDENT STUDY HUB — app.js
   STABLE FRONTEND CONTROLLER
   ========================================================= */

"use strict";

/* =========================================================
   SUPABASE
   ========================================================= */

const sb = supabase.createClient(
  window.SUPABASE_URL,
  window.SUPABASE_KEY
);

/* =========================================================
   DEFAULT SETTINGS
   ========================================================= */

const DEFAULTS = {
  creator: "BALOGUN MUIZ",
  school: "ST PETER'S COLLEGE OLOMORE",
  session: "2026/27 ACADEMIC SESSION",
  heroTitle: "STUDENT STUDY HUB",
  heroSubtitle:
    "Practice, master every topic, revise formulas and learn with friends.",
  creatorEmail: "muizbaloo@gmail.com",
  logoUrl: "",
  bgUrl: "",
  photoUrl: ""
};

/* =========================================================
   STATE
   ========================================================= */

const state = {
  user: null,
  profile: null,
  isAdmin: false,

  settings: {
    ...DEFAULTS
  },

  page: "home",

  dbError: "",

  studentXP: 0,

  rank: window.getRank
    ? window.getRank(0)
    : {
        name: "Beginners",
        icon: "🌱"
      },

  notifications: [],

  friends: [],

  selectedSubject: "",
  selectedLevel: "",
  selectedTopic: ""
};

let countdownTimer = null;

/* =========================================================
   HELPERS
   ========================================================= */

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];

function esc(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    char =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[char]
  );
}

function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function showError(message) {
  console.error(message);

  const app = $("#app");

  if (app) {
    app.innerHTML = `
      <section class="card center">
        <h2>Student Study Hub</h2>
        <p class="alert">${esc(message)}</p>
        <button class="btn primary" onclick="location.reload()">
          Reload app
        </button>
      </section>
    `;
  }
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function go(page) {
  if (
    page !== "quizrun" &&
    typeof stopQuizTimer === "function"
  ) {
    try {
      stopQuizTimer();
    } catch (e) {
      console.warn(e);
    }
  }

  state.page = page;

  render();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function leaveTo(page) {
  const running =
    state.page === "quizrun" &&
    typeof QZ !== "undefined" &&
    QZ.run &&
    !QZ.run.done;

  if (
    running &&
    !confirm(
      "Leave this quiz? Your answers so far will be lost."
    )
  ) {
    return;
  }

  go(page);
}

/* =========================================================
   SETTINGS
   ========================================================= */

async function loadSettings() {
  try {
    const { data, error } = await sb
      .from("app_settings")
      .select("value")
      .eq("key", "public")
      .maybeSingle();

    if (error) throw error;

    state.settings = {
      ...DEFAULTS,
      ...(data?.value || {})
    };

    state.dbError = "";
  } catch (error) {
    console.warn("Settings load failed:", error);

    state.settings = {
      ...DEFAULTS
    };

    state.dbError =
      "Online settings could not be loaded. Default settings are being used.";
  }
}

/* =========================================================
   USER / PROFILE
   ========================================================= */

async function loadUser(user) {
  state.user = user;
  state.profile = null;
  state.isAdmin = false;
  state.studentXP = 0;

  if (!user) {
    state.rank = window.getRank
      ? window.getRank(0)
      : state.rank;

    return;
  }

  try {
    const { data, error } = await sb
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.warn("Profile read:", error);
    }

    state.profile = data || null;

    if (data) {
      state.studentXP = safeNumber(
        data.xp ??
        data.total_xp ??
        data.points ??
        data.experience ??
        0
      );
    }

    try {
      const { data: adminData, error: adminError } =
        await sb.rpc("is_admin");

      if (!adminError) {
        state.isAdmin = adminData === true;
      }
    } catch (error) {
      console.warn("Admin check failed:", error);
    }

    state.rank = window.getRank
      ? window.getRank(state.studentXP)
      : state.rank;
  } catch (error) {
    console.warn("Could not load profile:", error);
  }
}

/* =========================================================
   XP
   ========================================================= */

async function addXP(amount, reason = "Learning") {
  if (!state.user) return false;

  amount = safeNumber(amount);

  if (amount <= 0) return false;

  const oldXP = state.studentXP;
  const newXP = oldXP + amount;

  state.studentXP = newXP;

  state.rank = window.getRank
    ? window.getRank(newXP)
    : state.rank;

  try {
    const { error } = await sb
      .from("profiles")
      .update({
        xp: newXP
      })
      .eq("id", state.user.id);

    if (error) {
      console.warn(
        "XP could not be saved:",
        error.message
      );
    }
  } catch (error) {
    console.warn("XP save failed:", error);
  }

  if (window.getRankUpMessage) {
    const rankChange =
      window.getRankUpMessage(oldXP, newXP);

    if (rankChange) {
      setTimeout(() => {
        alert(
          `${rankChange.title}\n\n${rankChange.message}`
        );
      }, 100);
    }
  }

  console.log(`+${amount} XP — ${reason}`);

  return true;
}

/* Make XP available to quiz.js */
window.addXP = addXP;

/* =========================================================
   HEADER
   ========================================================= */

function renderHeader() {
  const s = state.settings;

  const right = state.user
    ? `
      <span class="rank-mini">
        ${esc(state.rank.icon || "🌱")}
        ${esc(state.rank.name || "Beginners")}
      </span>

      <button class="btn ghost" id="btn-profile">
        👤 ${esc(
          state.profile?.name ||
          state.user.user_metadata?.name ||
          "Me"
        )}
      </button>

      <button class="btn ghost" id="btn-logout">
        Log out
      </button>
    `
    : `
      <button class="btn primary" id="btn-login">
        Register / Login
      </button>
    `;

  $("#topbar").innerHTML = `
    <div class="bar">

      <button class="brand" id="btn-home">
        <span class="logo" id="logo">🎓</span>

        <span>
          ${esc(s.heroTitle)}
        </span>
      </button>

      <div class="row">
        ${right}
      </div>

    </div>
  `;

  if (s.logoUrl) {
    const logo = $("#logo");

    if (logo) {
      logo.textContent = "";
      logo.style.backgroundImage =
        `url("${s.logoUrl}")`;
      logo.style.backgroundSize = "cover";
      logo.style.backgroundPosition = "center";
    }
  }

  $("#btn-home").onclick =
    () => leaveTo("home");

  if (state.user) {
    $("#btn-logout").onclick = async () => {
      await sb.auth.signOut();
    };

    $("#btn-profile").onclick =
      () => go("profile");
  } else {
    $("#btn-login").onclick =
      () => openAuth("in");
  }
}

/* =========================================================
   HOME
   ========================================================= */

function renderHome() {
  const s = state.settings;

  const rank = window.getRank
    ? window.getRank(state.studentXP)
    : state.rank;

  const progress = window.getRankProgress
    ? window.getRankProgress(state.studentXP)
    : {
        percentage: 0,
        neededXP: 100,
        nextRank: "Intermediate"
      };

  $("#app").innerHTML = `
    ${
      state.dbError
        ? `<p class="alert">${esc(state.dbError)}</p>`
        : ""
    }

    <section class="hero" id="hero">

      <div class="photo" id="photo">
        🎓
      </div>

      <h2 class="creator">
        ${esc(s.creator)}
      </h2>

      <p class="small">
        ${esc(s.school)}
      </p>

      <p class="small">
        ${esc(s.session)}
      </p>

      <a
        class="small link"
        href="mailto:${esc(s.creatorEmail)}"
      >
        ${esc(s.creatorEmail)}
      </a>

      <p class="levels">
        SS1 • SS2 • SS3
      </p>

      <h1>
        ${esc(s.heroTitle)}
      </h1>

      <p>
        ${esc(s.heroSubtitle)}
      </p>

      ${
        state.user
          ? `
            <div class="rank-card">

              <div class="rank-icon">
                ${esc(rank.icon || "🌱")}
              </div>

              <div>
                <strong>
                  ${esc(rank.name)}
                </strong>

                <div class="small">
                  ${state.studentXP} XP
                </div>
              </div>

            </div>

            <div class="rank-progress">
              <div
                class="rank-progress-bar"
                style="width:${Math.min(
                  100,
                  Math.max(
                    0,
                    Math.round(
                      progress.percentage || 0
                    )
                  )
                )}%"
              ></div>
            </div>

            ${
              progress.nextRank
                ? `
                  <p class="small">
                    ${progress.neededXP || 0} XP to
                    ${esc(progress.nextRank)}
                  </p>
                `
                : `
                  <p class="small">
                    Highest rank reached! 🧠
                  </p>
                `
            }
          `
          : ""
      }

      ${
        state.isAdmin
          ? `
            <button
              class="btn dark"
              id="btn-custom"
            >
              ⚙ Customize app
            </button>
          `
          : ""
      }

    </section>

    <section class="card">

      <h2>Study tools</h2>

      <div class="tiles">

        <button class="tile" id="tile-quiz">
          <b>📝 Practice & Exam</b>
          <span>
            Quizzes by subject, class and topic
          </span>
        </button>

        <button class="tile" id="tile-notes">
          <b>📒 Notes</b>
          <span>
            Learn every topic with detailed notes
          </span>
        </button>

        <button class="tile" id="tile-formulas">
          <b>📐 Formula Library</b>
          <span>
            Important formulas and rules
          </span>
        </button>

        <button class="tile" id="tile-papers">
          <b>📚 WAEC Past Papers</b>
          <span>
            Browse past questions by year
          </span>
        </button>

        <button class="tile" id="tile-leaderboard">
          <b>🏆 Leaderboard</b>
          <span>
            See students and ranks
          </span>
        </button>

        <button class="tile" id="tile-friends">
          <b>👥 Friends & Community</b>
          <span>
            Connect, ask and discuss
          </span>
        </button>

      </div>

    </section>

    <section class="card">

      <h2>Your learning</h2>

      <div class="stats-grid">

        <div class="stat-box">
          <b>${state.studentXP}</b>
          <span>XP</span>
        </div>

        <div class="stat-box">
          <b>${esc(rank.name)}</b>
          <span>Rank</span>
        </div>

        <div class="stat-box">
          <b>${window.QBANK?.length || 0}</b>
          <span>Questions loaded</span>
        </div>

        <div class="stat-box">
          <b>${window.SUBJECTS?.length || 0}</b>
          <span>Subjects</span>
        </div>

      </div>

    </section>

    <section class="card center">

      <p class="eyebrow">
        Launch countdown
      </p>

      <h2>
        We launch on 10 November 2026
      </h2>

      <div class="cd">

        <div>
          <b id="cd-d">00</b>
          <span>Days</span>
        </div>

        <div>
          <b id="cd-h">00</b>
          <span>Hours</span>
        </div>

        <div>
          <b id="cd-m">00</b>
          <span>Minutes</span>
        </div>

        <div>
          <b id="cd-s">00</b>
          <span>Seconds</span>
        </div>

      </div>

      <p class="muted small" id="cd-note"></p>

    </section>
  `;

  if (s.bgUrl) {
    const hero = $("#hero");

    if (hero) {
      hero.style.backgroundImage =
        `linear-gradient(
          125deg,
          rgba(6,38,77,.78),
          rgba(22,126,229,.65)
        ),
        url("${s.bgUrl}")`;
    }
  }

  if (s.photoUrl) {
    const img = new Image();

    img.alt = "Admin portrait";

    img.onload = () => {
      const photo = $("#photo");

      if (!photo) return;

      photo.textContent = "";
      photo.appendChild(img);
    };

    img.src = s.photoUrl;
  }

  if (state.isAdmin) {
    $("#btn-custom").onclick =
      openCustomize;
  }

  $("#tile-quiz").onclick =
    () => go("quiz");

  $("#tile-notes").onclick =
    () => go("notes");

  $("#tile-formulas").onclick =
    () => go("formulas");

  $("#tile-papers").onclick =
    () => go("papers");

  $("#tile-leaderboard").onclick =
    () => go("leaderboard");

  $("#tile-friends").onclick =
    () => go("friends");

  startCountdown();
}

/* =========================================================
   COUNTDOWN
   ========================================================= */

function startCountdown() {
  clearInterval(countdownTimer);

  const tick = () => {
    const days = $("#cd-d");

    if (!days) {
      clearInterval(countdownTimer);
      return;
    }

    const launchDate =
      window.LAUNCH_DATE ||
      "2026-11-10T00:00:00+01:00";

    const ms = Math.max(
      0,
      Date.parse(launchDate) - Date.now()
    );

    const parts = {
      d: Math.floor(ms / 864e5),
      h: Math.floor(
        (ms % 864e5) / 36e5
      ),
      m: Math.floor(
        (ms % 36e5) / 6e4
      ),
      s: Math.floor(
        (ms % 6e4) / 1e3
      )
    };

    for (const key in parts) {
      const el = $(`#cd-${key}`);

      if (el) {
        el.textContent =
          String(parts[key]).padStart(2, "0");
      }
    }

    const note = $("#cd-note");

    if (note) {
      note.textContent =
        ms === 0
          ? "Launch day is here! 🎉"
          : "Counting down to launch day.";
    }
  };

  tick();

  countdownTimer =
    setInterval(tick, 1000);
}

/* =========================================================
   MODAL
   ========================================================= */

function modal(html) {
  const wrap =
    document.createElement("div");

  wrap.className = "overlay";

  wrap.innerHTML = `
    <div class="sheet">

      <button
        class="x"
        aria-label="Close"
      >
        ✕
      </button>

      ${html}

    </div>
  `;

  wrap.addEventListener(
    "click",
    event => {
      if (event.target === wrap) {
        wrap.remove();
      }
    }
  );

  const close = $(".x", wrap);

  if (close) {
    close.onclick =
      () => wrap.remove();
  }

  document.body.appendChild(wrap);

  return wrap;
}

/* =========================================================
   AUTHENTICATION
   ========================================================= */

function openAuth(mode = "in") {
  const isLogin = mode === "in";

  const m = modal(`
    <h2>
      ${
        isLogin
          ? "Login"
          : "Create your account"
      }
    </h2>

    <form id="auth-form" class="stack">

      ${
        isLogin
          ? ""
          : `
            <label>
              Your name

              <input
                id="a-name"
                required
                maxlength="60"
                autocomplete="name"
              >
            </label>
          `
      }

      <label>
        Email

        <input
          id="a-email"
          type="email"
          required
          autocomplete="email"
        >
      </label>

      <label>
        Password

        <input
          id="a-pass"
          type="password"
          required
          minlength="6"
          autocomplete="${
            isLogin
              ? "current-password"
              : "new-password"
          }"
        >
      </label>

      <p
        class="alert"
        id="a-msg"
        hidden
      ></p>

      <button
        class="btn primary wide"
        id="a-go"
        type="submit"
      >
        ${
          isLogin
            ? "Login"
            : "Register"
        }
      </button>

    </form>

    <p class="small center">

      ${
        isLogin
          ? "New here?"
          : "Already registered?"
      }

      <button
        class="linkbtn"
        id="a-switch"
        type="button"
      >
        ${
          isLogin
            ? "Create an account"
            : "Login"
        }
      </button>

    </p>
  `);

  $("#a-switch", m).onclick = () => {
    m.remove();
    openAuth(isLogin ? "up" : "in");
  };

  $("#auth-form", m).onsubmit =
    async event => {
      event.preventDefault();

      const msg = $("#a-msg", m);
      const btn = $("#a-go", m);

      const email =
        $("#a-email", m).value.trim();

      const password =
        $("#a-pass", m).value;

      btn.disabled = true;
      msg.hidden = true;

      let result;

      try {
        if (isLogin) {
          result =
            await sb.auth.signInWithPassword({
              email,
              password
            });
        } else {
          const name =
            $("#a-name", m).value.trim();

          result =
            await sb.auth.signUp({
              email,
              password,
              options: {
                data: {
                  name
                }
              }
            });
        }
      } catch (error) {
        result = {
          error
        };
      }

      btn.disabled = false;

      if (result?.error) {
        msg.textContent =
          result.error.message;

        msg.hidden = false;
        return;
      }

      if (!result?.data?.session) {
        msg.textContent =
          "Check your email to confirm your account, then log in.";

        msg.hidden = false;
        return;
      }

      m.remove();
    };
}

/* =========================================================
   ADMIN IMAGE HELPERS
   ========================================================= */

function fileToDataURL(file) {
  return new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = () =>
        resolve(reader.result);

      reader.onerror = reject;

      reader.readAsDataURL(file);
    }
  );
}

async function uploadAdminFile(file, filename) {
  if (!file) return "";

  const safeName =
    String(filename || file.name)
      .replace(/[^a-zA-Z0-9._-]/g, "_");

  const path =
    `admin/${Date.now()}_${safeName}`;

  const { error } =
    await sb.storage
      .from("site-assets")
      .upload(path, file, {
        upsert: true,
        contentType: file.type
      });

  if (error) {
    throw error;
  }

  const { data } =
    sb.storage
      .from("site-assets")
      .getPublicUrl(path);

  return data.publicUrl;
}

/* =========================================================
   ADMIN CUSTOMIZATION
   ========================================================= */

function openCustomize() {
  if (!state.isAdmin) {
    alert("Admin access required.");

