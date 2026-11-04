/* STUDENTS STUDY HUB - app.js
   Part 1: foundation, login, home screen, countdown, admin customise. */

const sb = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);

const DEFAULTS = {
  creator: "BALOGUN MUIZ A.",
  school: "St. Peter's College",
  heroTitle: "STUDENTS STUDY HUB",
  heroSubtitle: "Practice, master every topic, revise formulas and learn with friends.",
  creatorEmail: "muizbaloo@gmail.com",
  logoUrl: "",
  bgUrl: "",
  photoUrl: ""
};

const state = { user: null, profile: null, isAdmin: false, settings: { ...DEFAULTS }, page: "home", dbError: "" };
let countdownTimer = null;

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function go(page) { state.page = page; render(); window.scrollTo(0, 0); }

/* ---------- data loading ---------- */
async function loadSettings() {
  try {
    const { data, error } = await sb.from("app_settings").select("value").eq("key", "public").maybeSingle();
    if (error) throw error;
    state.settings = { ...DEFAULTS, ...(data && data.value ? data.value : {}) };
    state.dbError = "";
  } catch (err) {
    state.dbError = "Could not reach the database: " + (err.message || err);
  }
}

async function loadUser(user) {
  state.user = user;
  state.profile = null;
  state.isAdmin = false;
  if (!user) return;
  const { data } = await sb.from("profiles").select("*").eq("id", user.id).maybeSingle();
  state.profile = data;
  const r = await sb.rpc("is_admin");
  state.isAdmin = r.data === true;
}

/* ---------- header ---------- */
function renderHeader() {
  const s = state.settings;
  const right = state.user
    ? `<button class="btn ghost" id="btn-profile">👤 ${esc(state.profile ? state.profile.name : "Me")}</button><button class="btn ghost" id="btn-logout">Log out</button>`
    : `<button class="btn primary" id="btn-login">Register / Login</button>`;
  $("#topbar").innerHTML = `<div class="bar"><button class="brand" id="btn-home"><span class="logo" id="logo">🎓</span><span>${esc(s.heroTitle)}</span></button><div class="row">${right}</div></div>`;
  if (s.logoUrl) {
    const l = $("#logo");
    l.textContent = "";
    l.style.backgroundImage = `url("${s.logoUrl}")`;
  }
  $("#btn-home").onclick = () => go("home");
  if (state.user) {
    $("#btn-logout").onclick = () => sb.auth.signOut();
    $("#btn-profile").onclick = () => alert("The profile page arrives in the next update.");
  } else {
    $("#btn-login").onclick = () => openAuth("in");
  }
}

/* ---------- home ---------- */
function renderHome() {
  const s = state.settings;
  $("#app").innerHTML = `
    ${state.dbError ? `<p class="alert">${esc(state.dbError)}</p>` : ""}
    <section class="hero" id="hero">
      <div class="photo" id="photo">🎓</div>
      <h2 class="creator">${esc(s.creator)}</h2>
      <p class="small">${esc(s.school)}</p>
      <a class="small link" href="mailto:${esc(s.creatorEmail)}">${esc(s.creatorEmail)}</a>
      <p class="levels">SS1 • SS2 • SS3</p>
      <h1>${esc(s.heroTitle)}</h1>
      <p>${esc(s.heroSubtitle)}</p>
      ${state.isAdmin ? `<button class="btn dark" id="btn-custom">⚙ Customize app</button>` : ""}
    </section>
    <section class="card">
      <h2>Study tools</h2>
      <p class="muted">Quiz, notes, past papers, leaderboard, friends and community are being added now. They will appear here.</p>
    </section>
    <section class="card center">
      <p class="eyebrow">Launch countdown</p>
      <h2>We launch on 10 November 2026</h2>
      <div class="cd">
        <div><b id="cd-d">00</b><span>Days</span></div>
        <div><b id="cd-h">00</b><span>Hours</span></div>
        <div><b id="cd-m">00</b><span>Minutes</span></div>
        <div><b id="cd-s">00</b><span>Seconds</span></div>
      </div>
      <p class="muted small" id="cd-note"></p>
    </section>`;

  if (s.bgUrl) {
    $("#hero").style.backgroundImage = `linear-gradient(125deg,rgba(6,38,77,.78),rgba(22,126,229,.65)),url("${s.bgUrl}")`;
  }
  if (s.photoUrl) {
    const img = new Image();
    img.alt = "Admin portrait";
    img.onload = () => { const p = $("#photo"); if (p) { p.textContent = ""; p.appendChild(img); } };
    img.src = s.photoUrl;
  }
  if (state.isAdmin) $("#btn-custom").onclick = openCustomize;
  startCountdown();
}

function startCountdown() {
  clearInterval(countdownTimer);
  const tick = () => {
    if (!$("#cd-d")) { clearInterval(countdownTimer); return; }
    const ms = Math.max(0, Date.parse(window.LAUNCH_DATE) - Date.now());
    const parts = {
      d: Math.floor(ms / 864e5),
      h: Math.floor((ms % 864e5) / 36e5),
      m: Math.floor((ms % 36e5) / 6e4),
      s: Math.floor((ms % 6e4) / 1e3)
    };
    for (const k in parts) $("#cd-" + k).textContent = String(parts[k]).padStart(2, "0");
    $("#cd-note").textContent = ms === 0 ? "Launch day is here!" : "Counting down to the start of launch day (Nigeria time).";
  };
  tick();
  countdownTimer = setInterval(tick, 1000);
}

/* ---------- modal helper ---------- */
function modal(html) {
  const wrap = document.createElement("div");
  wrap.className = "overlay";
  wrap.innerHTML = `<div class="sheet"><button class="x" aria-label="Close">✕</button>${html}</div>`;
  wrap.addEventListener("click", (e) => { if (e.target === wrap) wrap.remove(); });
  $(".x", wrap).onclick = () => wrap.remove();
  document.body.appendChild(wrap);
  return wrap;
}

/* ---------- login / register ---------- */
function openAuth(mode) {
  const isIn = mode === "in";
  const m = modal(`
    <h2>${isIn ? "Login" : "Create your account"}</h2>
    <form id="auth-form" class="stack">
      ${isIn ? "" : `<label>Your name<input id="a-name" required maxlength="60" autocomplete="name"></label>`}
      <label>Email<input id="a-email" type="email" required autocomplete="email"></label>
      <label>Password<input id="a-pass" type="password" required minlength="6" autocomplete="${isIn ? "current-password" : "new-password"}"></label>
      <p class="alert" id="a-msg" hidden></p>
      <button class="btn primary wide" id="a-go">${isIn ? "Login" : "Register"}</button>
    </form>
    <p class="small center">${isIn ? "New here?" : "Already registered?"} <button class="linkbtn" id="a-switch">${isIn ? "Create an account" : "Login"}</button></p>`);

  $("#a-switch", m).onclick = () => { m.remove(); openAuth(isIn ? "up" : "in"); };
  $("#auth-form", m).onsubmit = async (e) => {
    e.preventDefault();
    const msg = $("#a-msg", m), btn = $("#a-go", m);
    const email = $("#a-email", m).value.trim();
    const password = $("#a-pass", m).value;
    btn.disabled = true;
    msg.hidden = true;
    let res;
    if (isIn) {
      res = await sb.auth.signInWithPassword({ email, password });
    } else {
      const name = $("#a-name", m).value.trim();
      res = await sb.auth.signUp({ email, password, options: { data: { name } } });
    }
    btn.disabled = false;
    if (res.error) { msg.textContent = res.error.message; msg.hidden = false; return; }
    if (!res.data.session) {
      msg.textContent = "Check your email to confirm your account, then log in.";
      msg.hidden = false;
      return;
    }
    m.remove();
  };
}

/* ---------- admin: customise app ---------- */
function shrink(file, max) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * k);
      c.height = Math.round(img.height * k);
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not process that image"))), "image/jpeg", 0.85);
    };
    img.onerror = () => reject(new Error("Could not read that image"));
    img.src = url;
  });
}

async function uploadImage(file, kind) {
  const blob = await shrink(file, kind === "bgUrl" ? 1600 : 1000);
  const path = kind + "-" + Date.now() + ".jpg";
  const { error } = await sb.storage.from("site-assets").upload(path, blob, { contentType: "image/jpeg", upsert: true });
  if (error) throw error;
  return sb.storage.from("site-assets").getPublicUrl(path).data.publicUrl;
}

function openCustomize() {
  const s = state.settings;
  const m = modal(`
    <h2>Customize app</h2>
    <form id="cz-form" class="stack">
      <label>App title<input id="cz-title" maxlength="60" value="${esc(s.heroTitle)}"></label>
      <label>Subtitle<textarea id="cz-sub" rows="2" maxlength="200">${esc(s.heroSubtitle)}</textarea></label>
      <label>Admin name<input id="cz-creator" maxlength="60" value="${esc(s.creator)}"></label>
      <label>School<input id="cz-school" maxlength="80" value="${esc(s.school)}"></label>
      <label>Admin email shown<input id="cz-email" type="email" maxlength="80" value="${esc(s.creatorEmail)}"></label>
      <label>Admin picture<input id="cz-photo" type="file" accept="image/*"></label>
      <label>Logo image<input id="cz-logo" type="file" accept="image/*"></label>
      <label>Background image<input id="cz-bg" type="file" accept="image/*"></label>
      <p class="alert" id="cz-msg" hidden></p>
      <button class="btn primary wide" id="cz-save">Save changes</button>
    </form>`);

  $("#cz-form", m).onsubmit = async (e) => {
    e.preventDefault();
    const btn = $("#cz-save", m), msg = $("#cz-msg", m);
    btn.disabled = true;
    btn.textContent = "Saving…";
    msg.hidden = true;
    try {
      const next = {
        ...state.settings,
        heroTitle: $("#cz-title", m).value.trim() || DEFAULTS.heroTitle,
        heroSubtitle: $("#cz-sub", m).value.trim(),
        creator: $("#cz-creator", m).value.trim(),
        school: $("#cz-school", m).value.trim(),
        creatorEmail: $("#cz-email", m).value.trim()
      };
      const files = [["cz-photo", "photoUrl"], ["cz-logo", "logoUrl"], ["cz-bg", "bgUrl"]];
      for (const [id, key] of files) {
        const file = $("#" + id, m).files[0];
        if (file) next[key] = await uploadImage(file, key);
      }
      const { error } = await sb.from("app_settings").upsert({ key: "public", value: next, updated_at: new Date().toISOString() });
      if (error) throw error;
      state.settings = next;
      m.remove();
      render();
    } catch (err) {
      msg.textContent = err.message || "Could not save. Please try again.";
      msg.hidden = false;
      btn.disabled = false;
      btn.textContent = "Save changes";
    }
  };
}

/* ---------- start ---------- */
function render() {
  renderHeader();
  if (state.page === "home") renderHome();
}

async function boot() {
  const [sessionResult] = await Promise.all([sb.auth.getSession(), loadSettings()]);
  await loadUser(sessionResult.data.session ? sessionResult.data.session.user : null);
  render();
  sb.auth.onAuthStateChange((event, session) => {
    if (!["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) return;
    setTimeout(async () => { await loadUser(session ? session.user : null); render(); }, 0);
  });
}

boot();
