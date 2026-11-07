(function () {
  "use strict";

  /* STUDENT STUDY HUB — APP.JS PART 1 */

  var sb = null;

  if (
    window.supabase &&
    window.SUPABASE_URL &&
    window.SUPABASE_KEY &&
    window.SUPABASE_KEY !== "HIDDEN"
  ) {
    try {
      sb = window.supabase.createClient(
        window.SUPABASE_URL,
        window.SUPABASE_KEY
      );
    } catch (e) {
      console.error("Supabase initialization failed:", e);
    }
  }

  window.SSH = window.SSH || {
    user: null,
    profile: null,
    page: "home",
    admin: false,
    settings: {}
  };

  var S = window.SSH;

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getApp() {
    return document.getElementById("app");
  }

  function getSubjects() {
    return Array.isArray(window.SUBJECTS)
      ? window.SUBJECTS
      : [];
  }

  function getTopics(subject) {
    if (
      window.TOPICS &&
      subject &&
      Array.isArray(window.TOPICS[subject])
    ) {
      return window.TOPICS[subject];
    }

    if (
      window.LEVEL_TOPICS &&
      subject &&
      Array.isArray(window.LEVEL_TOPICS[subject])
    ) {
      return window.LEVEL_TOPICS[subject];
    }

    return [];
  }

  function getXP() {
    return Number(
      S.profile && S.profile.xp
        ? S.profile.xp
        : 0
    );
  }

  function getRank(xp) {
    if (typeof window.getRank === "function") {
      try {
        var result = window.getRank(xp);
        return typeof result === "string"
          ? result
          : result.name || "Beginners";
      } catch (e) {}
    }

    var ranks = window.RANKS;

    if (Array.isArray(ranks)) {
      for (var i = ranks.length - 1; i >= 0; i--) {
        var r = ranks[i];
        var minimum = Number(
          r.minXP || r.min || r.minimum || 0
        );

        if (xp >= minimum) {
          return r.name || "Beginners";
        }
      }
    }

    return "Beginners";
  }

  async function loadUser() {
    if (!sb) return null;

    try {
      var result = await sb.auth.getUser();

      S.user =
        result.data && result.data.user
          ? result.data.user
          : null;
    } catch (e) {
      console.error(e);
      S.user = null;
    }

    if (S.user) {
      await loadProfile();
      await checkAdmin();
    }

    return S.user;
  }

  async function loadProfile() {
    if (!sb || !S.user) return;

    try {
      var result = await sb
        .from("profiles")
        .select("*")
        .eq("id", S.user.id)
        .maybeSingle();

      if (result.data) {
        S.profile = result.data;
      } else {
        S.profile = {
          id: S.user.id,
          name:
            S.user.user_metadata &&
            S.user.user_metadata.name
              ? S.user.user_metadata.name
              : "Student",
          xp: 0,
          region: "Lagos"
        };
      }
    } catch (e) {
      console.error("Profile error:", e);

      S.profile = {
        id: S.user.id,
        name: "Student",
        xp: 0,
        region: "Lagos"
      };
    }
  }

  async function checkAdmin() {
    if (!sb || !S.user) {
      S.admin = false;
      return false;
    }

    try {
      var result = await sb
        .from("admins")
        .select("email")
        .ilike("email", S.user.email);

      S.admin = !!(
        result.data &&
        result.data.length
      );
    } catch (e) {
      S.admin = false;
    }

    return S.admin;
  }

  window.addXP = async function (amount) {
    amount = Number(amount) || 0;

    if (amount <= 0 || !S.user) return;

    await loadProfile();

    var oldXP = Number(
      S.profile && S.profile.xp
        ? S.profile.xp
        : 0
    );

    var newXP = oldXP + amount;

    if (sb) {
      try {
        var result = await sb
          .from("profiles")
          .update({ xp: newXP })
          .eq("id", S.user.id);

        if (result.error) {
          console.error(result.error);
          return;
        }
      } catch (e) {
        console.error(e);
        return;
      }
    }

    if (S.profile) {
      S.profile.xp = newXP;
    }
  };

  window.go = function (page) {
    S.page = page || "home";

    if (typeof window.render === "function") {
      window.render();
    }

    window.scrollTo(0, 0);
  };

  function headerHTML() {
    if (!S.user) return "";

    return `
      <div class="app-header">
        <div class="brand">
          <strong>STUDENTS STUDY HUB</strong>
          <small>SS1 • SS2 • SS3</small>
        </div>

        <nav class="main-nav">
          <button onclick="go('home')">🏠 Home</button>
          <button onclick="go('notes')">📚 Notes</button>
          <button onclick="go('quiz')">📝 Quiz</button>
          <button onclick="go('formulas')">📐 Formulas</button>
          <button onclick="go('leaderboard')">🏆 Leaderboard</button>
          <button onclick="go('community')">💬 Community</button>
          <button onclick="go('profile')">👤 Profile</button>
        </nav>
      </div>
    `;
  }

  function loginHTML() {
    return `
      <section class="auth-page">
        <div class="card auth-card">
          <h1>📚 STUDENTS STUDY HUB</h1>

          <p class="muted">
            Your learning, revision and practice centre.
          </p>

          <input
            id="authName"
            placeholder="Full name"
            autocomplete="name"
          >

          <input
            id="authEmail"
            type="email"
            placeholder="Email address"
            autocomplete="email"
          >

          <input
            id="authPassword"
            type="password"
            placeholder="Password"
            autocomplete="current-password"
          >

          <button
            class="btn primary"
            onclick="login()">
            🔐 Login
          </button>

          <button
            class="btn"
            onclick="register()">
            ✨ Create Account
          </button>

          <p id="authMessage" class="center"></p>
        </div>
      </section>
    `;
  }

  window.login = async function () {
    if (!sb) {
      alert(
        "Supabase is not configured correctly. Check config.js."
      );
      return;
    }

    var email =
      document.getElementById("authEmail").value.trim();

    var password =
      document.getElementById("authPassword").value;

    if (!email || !password) {
      alert("Enter your email and password.");
      return;
    }

    var result =
      await sb.auth.signInWithPassword({
        email: email,
        password: password
      });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    await loadUser();
    S.page = "home";
    window.render();
  };

  window.register = async function () {
    if (!sb) {
      alert(
        "Supabase is not configured correctly. Check config.js."
      );
      return;
    }

    var name =
      document.getElementById("authName").value.trim();

    var email =
      document.getElementById("authEmail").value.trim();

    var password =
      document.getElementById("authPassword").value;

    if (!name || !email || !password) {
      alert("Enter your name, email and password.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    var result = await sb.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name
        }
      }
    });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    if (result.data && result.data.session) {
      await loadUser();
      S.page = "home";
      window.render();
    } else {
      alert(
        "Account created. Check your email if email confirmation is required."
      );
    }
  };

  window.logout = async function () {
    if (sb) {
      try {
        await sb.auth.signOut();
      } catch (e) {}
    }

    S.user = null;
    S.profile = null;
    S.admin = false;
    S.page = "home";

    window.render();
  };

  function homeHTML() {
    var name =
      S.profile && S.profile.name
        ? S.profile.name
        : "Student";

    var xp = getXP();
    var rank = getRank(xp);

    return `
      <section class="dashboard">

        <div class="hero card">
          <p class="muted">Welcome back 👋</p>
          <h1>${esc(name)}</h1>
          <p>
            Keep learning. Keep improving. Keep rising.
          </p>
        </div>

        <div class="stats-grid">

          <div class="card stat-card">
            <strong>${xp}</strong>
            <span>XP</span>
          </div>

          <div class="card stat-card">
            <strong>${esc(rank)}</strong>
            <span>Rank</span>
          </div>

          <div class="card stat-card">
            <strong>SS1–SS3</strong>
            <span>Classes</span>
          </div>

        </div>

        <div class="card">
          <h2>🚀 Start Learning</h2>

          <div class="quick-actions">

            <button
              class="btn primary"
              onclick="go('quiz')">
              📝 Take a Quiz
            </button>

            <button
              class="btn"
              onclick="go('notes')">
              📚 Read Notes
            </button>

            <button
              class="btn"
              onclick="go('formulas')">
              📐 Formula Library
            </button>

            <button
              class="btn"
              onclick="go('leaderboard')">
              🏆 Leaderboard
            </button>

          </div>
        </div>

        <div class="card">
          <h2>📖 Subjects</h2>

          <div class="subject-grid">
            ${getSubjects().map(function (subject) {

              var name =
                typeof subject === "string"
                  ? subject
                  : subject.name;

              return `
                <button
                  class="subject-card"
                  onclick="openSubject('${esc(name)}')">
                  <strong>${esc(name)}</strong>
                </button>
              `;

            }).join("")}
          </div>
        </div>

      </section>
    `;
  }

  function notesHTML() {
    return `
      <section>

        <div class="card">
          <h2>📚 Study Notes</h2>

          <p class="muted">
            Select a subject to view its topics.
          </p>
        </div>

        <div class="subject-grid">

          ${getSubjects().map(function (subject) {

            var name =
              typeof subject === "string"
                ? subject
                : subject.name;

            return `
              <button
                class="subject-card"
                onclick="openSubject('${esc(name)}')">
                📖 ${esc(name)}
              </button>
            `;

          }).join("")}

        </div>

      </section>
    `;
  }

  window.openSubject = function (subject) {
    var list = getTopics(subject);
    var target = getApp();

    if (!target) return;

    target.innerHTML = `
      <section>

        <div class="card">

          <button
            class="btn"
            onclick="go('notes')">
            ← Back
          </button>

          <h2>📖 ${esc(subject)}</h2>

        </div>

        <div class="topic-grid">

          ${
            list.length
              ? list.map(function (topic) {

                  return `
                    <button
                      class="card topic-card"
                      onclick="openTopic('${esc(subject)}','${esc(topic)}')">

                      <strong>${esc(topic)}</strong>

                      <span>
                        Open topic →
                      </span>

                    </button>
                  `;

                }).join("")
              : `
                <div class="card">
                  <p>
                    No topics are currently loaded
                    for this subject.
                  </p>
                </div>
              `
          }

        </div>

      </section>
    `;
  };

  window.openTopic = function (subject, topic) {
    var target = getApp();

    if (!target) return;

    var questions = Array.isArray(window.QBANK)
      ? window.QBANK.filter(function (q) {
          return (
            q.subject === subject &&
            q.topic === topic
          );
        })
      : [];

    target.innerHTML = `
      <section>

        <div class="card">

          <button
            class="btn"
            onclick="openSubject('${esc(subject)}')">
            ← Back
          </button>

          <h2>${esc(topic)}</h2>

          <p class="muted">
            ${questions.length}
            related question(s) currently loaded.
          </p>

        </div>

        <div class="card">

          <h3>📘 ${esc(topic)}</h3>

          <p>
            Study material for this topic can be
            connected to the content library.
          </p>

          <button
            class="btn primary"
            onclick="startTopicQuiz('${esc(subject)}','${esc(topic)}')">
            📝 Practise This Topic
          </button>

        </div>

      </section>
    `;
  };

  window.startTopicQuiz = function (subject, topic) {
    window.go("quiz");

    setTimeout(function () {
      var subjectBox =
        document.getElementById("quizSubject");

      var topicBox =
        document.getElementById("quizTopic");

      if (subjectBox) {
        subjectBox.value = subject;

        if (
          typeof window.quizUpdateTopics ===
          "function"
        ) {
          window.quizUpdateTopics();
        }
      }

      if (topicBox) {
        topicBox.value = topic;
      }
    }, 100);
  };

  window.updateMyName = async function () {
    if (!sb || !S.user) return;

    var input =
      document.getElementById("newProfileName");

    if (!input || !input.value.trim()) return;

    var result = await sb
      .from("profiles")
      .update({
        name: input.value.trim()
      })
      .eq("id", S.user.id);

    if (result.error) {
      alert(result.error.message);
      return;
    }

    await loadProfile();

    alert("Profile updated.");

    window.render();
  };
  // Share Part 1 functions with the other app sections
  window.loadUser = loadUser;
  window.loadProfile = loadProfile;
  window.checkAdmin = checkAdmin;
  window.loginHTML = loginHTML;
  window.homeHTML = homeHTML;
  window.notesHTML = notesHTML;
})();
/* STUDENT STUDY HUB — APP.JS PART 2A */
(function () {
  "use strict";

  var S = window.SSH || {};
  var sb2 = null;

  if (
    window.supabase &&
    window.SUPABASE_URL &&
    window.SUPABASE_KEY
  ) {
    try {
      sb2 = window.supabase.createClient(
        window.SUPABASE_URL,
        window.SUPABASE_KEY
      );
    } catch (e) {
      console.error("Supabase error:", e);
    }
  }

  window.SSH_SB = sb2;

  function esc2(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function nav2() {
    return `
      <nav class="bottom-nav">
        <button onclick="go('home')">🏠<span>Home</span></button>
        <button onclick="go('notes')">📚<span>Notes</span></button>
        <button onclick="go('quiz')">📝<span>Quiz</span></button>
        <button onclick="go('formula')">📐<span>Formula</span></button>
        <button onclick="go('profile')">👤<span>Profile</span></button>
      </nav>
    `;
  }

  function formulaHTML() {
    var f = [
      ["Mathematics","Quadratic","x = (-b ± √(b² - 4ac)) / 2a"],
      ["Mathematics","Simple Interest","SI = PRT / 100"],
      ["Mathematics","Circle Area","A = πr²"],
      ["Mathematics","Circle Circumference","C = 2πr"],
      ["Mathematics","Pythagoras","a² + b² = c²"],
      ["Mathematics","Gradient","m = (y₂ - y₁) / (x₂ - x₁)"],
      ["Mathematics","AP nth term","Tₙ = a + (n - 1)d"],
      ["Mathematics","AP sum","Sₙ = n/2[2a + (n - 1)d]"],
      ["Physics","Speed","v = distance / time"],
      ["Physics","Acceleration","a = (v - u) / t"],
      ["Physics","Force","F = ma"],
      ["Physics","Work","W = Fd"],
      ["Physics","Power","P = W/t"],
      ["Physics","Density","ρ = m/V"],
      ["Physics","Ohm's Law","V = IR"],
      ["Physics","Electrical Power","P = VI"],
      ["Chemistry","Moles","n = mass / molar mass"],
      ["Chemistry","Concentration","C = moles / volume"],
      ["Chemistry","Gas Equation","PV = nRT"],
      ["Biology","Magnification","image size / actual size"]
    ];

    return `
      <section class="page-card">
        <h2>📐 Formula Library</h2>
        <p class="muted">Important formulas for quick revision.</p>
        <div class="formula-grid">
          ${f.map(function(x) {
            return `
              <article class="formula-card">
                <small>${esc2(x[0])}</small>
                <h3>${esc2(x[1])}</h3>
                <div class="formula-box">${esc2(x[2])}</div>
              </article>
            `;
          }).join("")}
        </div>
      </section>
      ${nav2()}
    `;
  }

  async function leaderboardHTML() {
    var rows = [];

    if (sb2) {
      var r = await sb2
        .from("profiles")
        .select("id,name,xp,region")
        .order("xp", { ascending:false })
        .limit(100);

      if (!r.error) rows = r.data || [];
    }

    if (!rows.length && S.profile) rows = [S.profile];

    return `
      <section class="page-card">
        <h2>🏆 Leaderboard</h2>
        <p class="muted">Students ranked by XP.</p>

        <div class="leaderboard-list">
          ${rows.map(function(u,i) {
            var rank = typeof getRank === "function"
              ? getRank(Number(u.xp || 0))
              : "Beginner";

            return `
              <div class="leader-row ${u.id === S.user?.id ? "me" : ""}">
                <div class="leader-position">${i + 1}</div>
                <div class="leader-avatar">👤</div>
                <div class="leader-info">
                  <strong>${esc2(u.name || "Student")}</strong>
                  <small>${esc2(rank)} · ${Number(u.xp || 0)} XP</small>
                </div>
                <b>${Number(u.xp || 0)}</b>
              </div>
            `;
          }).join("")}
        </div>
      </section>
      ${nav2()}
    `;
  }

  function profileHTML() {
    var p = S.profile || {};
    var xp = Number(p.xp || 0);
    var rank = typeof getRank === "function"
      ? getRank(xp)
      : "Beginner";

    return `
      <section class="page-card profile-page">
        <div class="profile-hero">
          <div class="big-avatar">👤</div>
          <h2>${esc2(p.name || "Student")}</h2>
          <p>${esc2(rank)} · ${xp} XP</p>
        </div>

        <div class="stats-grid">
          <div>
            <b>${xp}</b>
            <span>XP</span>
          </div>
          <div>
            <b>${esc2(p.region || "Lagos")}</b>
            <span>Region</span>
          </div>
          <div>
            <b>${esc2(rank)}</b>
            <span>Rank</span>
          </div>
        </div>

        <div class="form-card">
          <h3>Edit Profile</h3>
          <input
            id="my-name"
            value="${esc2(p.name || "")}"
            placeholder="Your name"
          >
          <button class="primary-btn" onclick="updateMyName()">
            Save Name
          </button>
        </div>

        <button class="secondary-btn" onclick="go('leaderboard')">
          🏆 Leaderboard
        </button>

        <button class="secondary-btn" onclick="go('friends')">
          👥 Friends
        </button>

        <button class="secondary-btn" onclick="go('suggestions')">
          💡 Suggestions
        </button>

        ${S.admin ? `
          <button class="secondary-btn" onclick="go('admin')">
            ⚙️ Admin Panel
          </button>
        ` : ""}

        <button class="danger-btn" onclick="logout()">
          Log Out
        </button>
      </section>
      ${nav2()}
    `;
  }

  window.renderFormula = function() {
    var el = document.getElementById("app");
    if (el) el.innerHTML = formulaHTML();
  };

  window.renderLeaderboard = async function() {
    var el = document.getElementById("app");
    if (el) el.innerHTML = await leaderboardHTML();
  };

  window.renderProfile = function() {
    var el = document.getElementById("app");
    if (el) el.innerHTML = profileHTML();
  };

})();
/* STUDENT STUDY HUB — APP.JS PART 2B */
(function () {
  "use strict";

  var S = window.SSH || {};
  var sb = window.SSH_SB || null;

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;")
      .replace(/'/g,"&#039;");
  }

  function nav() {
    return `
      <nav class="bottom-nav">
        <button onclick="go('home')">🏠<span>Home</span></button>
        <button onclick="go('notes')">📚<span>Notes</span></button>
        <button onclick="go('quiz')">📝<span>Quiz</span></button>
        <button onclick="go('formula')">📐<span>Formula</span></button>
        <button onclick="go('profile')">👤<span>Profile</span></button>
      </nav>
    `;
  }

  async function friendsHTML() {
    var friends = [];

    if (sb && S.user) {
      var r = await sb
        .from("friendships")
        .select("id,user_a,user_b,status")
        .or("user_a.eq." + S.user.id + ",user_b.eq." + S.user.id);

      if (!r.error) {
        var ids = [];

        (r.data || []).forEach(function(f) {
          if (f.status === "accepted") {
            ids.push(
              f.user_a === S.user.id ? f.user_b : f.user_a
            );
          }
        });

        if (ids.length) {
          var p = await sb
            .from("profiles")
            .select("id,name,xp")
            .in("id",ids);

          if (!p.error) friends = p.data || [];
        }
      }
    }

    return `
      <section class="page-card">
        <h2>👥 Friends</h2>
        <p class="muted">Your study friends.</p>

        ${
          friends.length
          ? friends.map(function(f) {
              return `
                <div class="friend-row">
                  <div class="friend-avatar">👤</div>
                  <div class="friend-info">
                    <strong>${esc(f.name || "Student")}</strong>
                    <small>${Number(f.xp || 0)} XP</small>
                  </div>
                  <button
                    onclick="openMessages('${f.id}','${esc(f.name || "Friend")}')"
                  >
                    Message
                  </button>
                </div>
              `;
            }).join("")
          : `<div class="empty-box">No accepted friends yet.</div>`
        }

        <div class="form-card">
          <h3>Send Friend Request</h3>
          <input id="friend-id" placeholder="Student user ID">
          <button class="primary-btn" onclick="sendFriendRequest()">
            Send Request
          </button>
        </div>

        <button class="secondary-btn" onclick="go('profile')">
          ← Back
        </button>
      </section>
      ${nav()}
    `;
  }

  window.sendFriendRequest = async function() {
    var input = document.getElementById("friend-id");
    var id = input ? input.value.trim() : "";

    if (!S.user) return alert("Please log in first.");
    if (!id) return alert("Enter the student's user ID.");
    if (!sb) return alert("Database is not connected.");

    var r = await sb.from("friendships").insert({
      user_a:S.user.id,
      user_b:id,
      status:"pending"
    });

    if (r.error) return alert(r.error.message);

    alert("Friend request sent.");
    go("friends");
  };

  window.openMessages = function(id,name) {
    S.messageUser = {
      id:id,
      name:name || "Friend"
    };
    go("messages");
  };

  async function messagesHTML() {
    var target = S.messageUser;

    if (!target) {
      return `
        <section class="page-card">
          <h2>💬 Messages</h2>
          <div class="empty-box">No friend selected.</div>
          <button class="secondary-btn" onclick="go('friends')">
            ← Friends
          </button>
        </section>
        ${nav()}
      `;
    }

    var messages = [];

    if (sb && S.user) {
      var r = await sb
        .from("messages")
        .select("id,from_user,to_user,body,created_at")
        .or(
          "and(from_user.eq." + S.user.id +
          ",to_user.eq." + target.id + ")," +
          "and(from_user.eq." + target.id +
          ",to_user.eq." + S.user.id + ")"
        )
        .order("created_at",{ascending:true});

      if (!r.error) messages = r.data || [];
    }

    return `
      <section class="page-card messages-page">
        <h2>💬 ${esc(target.name)}</h2>

        <div class="messages-list">
          ${
            messages.length
            ? messages.map(function(m) {
                var mine = m.from_user === S.user?.id;
                return `
                  <div class="message ${mine ? "mine" : "theirs"}">
                    ${esc(m.body)}
                  </div>
                `;
              }).join("")
            : `<div class="empty-box">
                 No messages yet. Start the conversation!
               </div>`
          }
        </div>

        <div class="message-compose">
          <input id="message-body" placeholder="Type a message...">
          <button onclick="sendMessage()">Send</button>
        </div>

        <button class="secondary-btn" onclick="go('friends')">
          ← Friends
        </button>
      </section>
      ${nav()}
    `;
  }

  window.sendMessage = async function() {
    var target = S.messageUser;
    var input = document.getElementById("message-body");
    var body = input ? input.value.trim() : "";

    if (!S.user) return alert("Please log in first.");
    if (!target) return alert("No friend selected.");
    if (!body) return;
    if (!sb) return alert("Database is not connected.");

    var r = await sb.from("messages").insert({
      from_user:S.user.id,
      to_user:target.id,
      body:body
    });

    if (r.error) return alert(r.error.message);

    input.value = "";
    go("messages");
  };

  async function communityHTML() {
    var qs = [];

    if (sb) {
      var r = await sb
        .from("community_questions")
        .select("id,user_id,subject,question,created_at")
        .order("created_at",{ascending:false})
        .limit(50);

      if (!r.error) qs = r.data || [];
    }

    return `
      <section class="page-card">
        <h2>🌍 Community</h2>
        <p class="muted">
          Ask questions and help other students.
        </p>

        <div class="form-card">
          <select id="community-subject">
            ${(window.SUBJECTS || []).map(function(x) {
              return `<option value="${esc(x)}">${esc(x)}</option>`;
            }).join("")}
          </select>

          <textarea
            id="community-question"
            placeholder="Write your question..."
          ></textarea>

          <button
            class="primary-btn"
            onclick="postCommunityQuestion()"
          >
            Post Question
          </button>
        </div>

        <div class="community-list">
          ${
            qs.length
            ? qs.map(function(q) {
                return `
                  <article class="community-card">
                    <small>${esc(q.subject || "General")}</small>
                    <h3>${esc(q.question)}</h3>
                    <button onclick="replyToCommunity('${q.id}')">
                      Add Solution
                    </button>
                  </article>
                `;
              }).join("")
            : `<div class="empty-box">
                 No community questions yet.
               </div>`
          }
        </div>
      </section>
      ${nav()}
    `;
  }

  window.postCommunityQuestion = async function() {
    if (!S.user) return alert("Please log in first.");
    if (!sb) return alert("Database is not connected.");

    var subject =
      document.getElementById("community-subject")?.value ||
      "General";

    var input =
      document.getElementById("community-question");

    var question = input ? input.value.trim() : "";

    if (!question) return alert("Write your question first.");

    var r = await sb.from("community_questions").insert({
      user_id:S.user.id,
      subject:subject,
      question:question
    });

    if (r.error) return alert(r.error.message);

    alert("Question posted.");
    go("community");
  };

  window.replyToCommunity = async function(id) {
    if (!S.user) return alert("Please log in first.");
    if (!sb) return alert("Database is not connected.");

    var body = prompt("Enter your solution:");

    if (!body || !body.trim()) return;

    var r = await sb.from("community_replies").insert({
      question_id:id,
      user_id:S.user.id,
      body:body.trim()
    });

    if (r.error) return alert(r.error.message);

    alert("Solution posted.");
    go("community");
  };

  window.renderFriends = async function() {
    var el = document.getElementById("app");
    if (el) el.innerHTML = await friendsHTML();
  };

  window.renderMessages = async function() {
    var el = document.getElementById("app");
    if (el) el.innerHTML = await messagesHTML();
  };

  window.renderCommunity = async function() {
    var el = document.getElementById("app");
    if (el) el.innerHTML = await communityHTML();
  };

})();
/* STUDENT STUDY HUB — APP.JS PART 2C */
(function () {
  "use strict";

  var S = window.SSH || {};
  var sb = window.SSH_SB || null;

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function nav() {
    return `
      <nav class="bottom-nav">
        <button onclick="go('home')">🏠<span>Home</span></button>
        <button onclick="go('notes')">📚<span>Notes</span></button>
        <button onclick="go('quiz')">📝<span>Quiz</span></button>
        <button onclick="go('formula')">📐<span>Formula</span></button>
        <button onclick="go('profile')">👤<span>Profile</span></button>
      </nav>
    `;
  }

  async function suggestionsHTML() {
    var list = [];

    if (sb && S.user) {
      var r = await sb
        .from("suggestions")
        .select("id,subject,message,reply,status,created_at")
        .order("created_at", { ascending:false });

      if (!r.error) list = r.data || [];
    }

    return `
      <section class="page-card">
        <h2>💡 Suggestions</h2>
        <p class="muted">
          Send ideas, feedback or report a problem to the admin.
        </p>

        <div class="form-card">
          <input id="suggestion-subject" placeholder="Subject">
          <textarea
            id="suggestion-message"
            placeholder="Write your suggestion..."
          ></textarea>
          <button class="primary-btn" onclick="sendSuggestion()">
            Send to Admin
          </button>
        </div>

        <h3>My Suggestions</h3>

        ${
          list.length
          ? list.map(function(x) {
              return `
                <article class="suggestion-card">
                  <b>${esc(x.subject || "Suggestion")}</b>
                  <p>${esc(x.message)}</p>
                  ${
                    x.reply
                    ? `<div class="admin-reply">
                         <b>Admin reply:</b> ${esc(x.reply)}
                       </div>`
                    : `<small>Status: ${esc(x.status || "Pending")}</small>`
                  }
                </article>
              `;
            }).join("")
          : `<div class="empty-box">No suggestions submitted yet.</div>`
        }

        <button class="secondary-btn" onclick="go('home')">
          ← Home
        </button>
      </section>
      ${nav()}
    `;
  }

  window.sendSuggestion = async function() {
    if (!S.user) return alert("Please log in first.");
    if (!sb) return alert("Database is not connected.");

    var subject =
      document.getElementById("suggestion-subject")?.value.trim();

    var message =
      document.getElementById("suggestion-message")?.value.trim();

    if (!message) return alert("Write your suggestion first.");

    var r = await sb.from("suggestions").insert({
      user_id: S.user.id,
      subject: subject || "Suggestion",
      message: message,
      status: "pending"
    });

    if (r.error) return alert(r.error.message);

    alert("Suggestion sent successfully.");
    go("suggestions");
  };

  async function adminHTML() {
    if (!S.admin) {
      return `
        <section class="page-card">
          <h2>🔒 Admin Panel</h2>
          <p>You do not have administrator access.</p>
          <button class="secondary-btn" onclick="go('home')">
            ← Home
          </button>
        </section>
        ${nav()}
      `;
    }

    var users = [];
    var suggestions = [];

    if (sb) {
      var u = await sb
        .from("profiles")
        .select("id,name,xp,region")
        .order("xp", { ascending:false })
        .limit(100);

      if (!u.error) users = u.data || [];

      var s = await sb
        .from("suggestions")
        .select("id,user_id,subject,message,reply,status")
        .order("created_at", { ascending:false })
        .limit(50);

      if (!s.error) suggestions = s.data || [];
    }

    return `
      <section class="page-card">
        <h2>⚙️ Admin Panel</h2>
        <p class="muted">Student Study Hub administration.</p>

        <div class="admin-grid">
          <div class="admin-stat">
            <b>${users.length}</b>
            <span>Students</span>
          </div>
          <div class="admin-stat">
            <b>${suggestions.length}</b>
            <span>Suggestions</span>
          </div>
        </div>

        <h3>Student Rankings</h3>

        ${
          users.slice(0, 20).map(function(u, i) {
            return `
              <div class="leader-row">
                <div class="leader-position">${i + 1}</div>
                <div class="leader-info">
                  <strong>${esc(u.name || "Student")}</strong>
                  <small>${Number(u.xp || 0)} XP</small>
                </div>
              </div>
            `;
          }).join("")
        }

        <h3>Student Suggestions</h3>

        ${
          suggestions.length
          ? suggestions.map(function(x) {
              return `
                <article class="suggestion-card">
                  <b>${esc(x.subject || "Suggestion")}</b>
                  <p>${esc(x.message)}</p>
                  <small>${esc(x.status || "Pending")}</small>
                  ${
                    x.reply
                    ? `<div class="admin-reply">
                         <b>Current reply:</b> ${esc(x.reply)}
                       </div>`
                    : ""
                  }
                  <button
                    onclick="replyToSuggestion('${x.id}')"
                  >
                    Reply
                  </button>
                </article>
              `;
            }).join("")
          : `<div class="empty-box">No suggestions yet.</div>`
        }

        <button class="secondary-btn" onclick="go('home')">
          ← Home
        </button>
      </section>
      ${nav()}
    `;
  }

  window.replyToSuggestion = async function(id) {
    if (!S.admin) return alert("Admin access required.");
    if (!sb) return alert("Database is not connected.");

    var reply = prompt("Write your reply to the student:");

    if (!reply || !reply.trim()) return;

    var r = await sb
      .from("suggestions")
      .update({
        reply: reply.trim(),
        status: "answered"
      })
      .eq("id", id);

    if (r.error) return alert(r.error.message);

    alert("Reply saved.");
    go("admin");
  };

  async function renderPage() {
    var el = document.getElementById("app");
    if (!el) return;

    if (!S.user) {
      S.page = "login";
      el.innerHTML = typeof loginHTML === "function"
        ? loginHTML()
        : "<section class='page-card'>Please log in.</section>";
      return;
    }

    var html = "";

    if (S.page === "formula") {
      window.renderFormula();
      return;
    }

    if (S.page === "leaderboard") {
      await window.renderLeaderboard();
      return;
    }

    if (S.page === "profile") {
      window.renderProfile();
      return;
    }

    if (S.page === "friends") {
      await window.renderFriends();
      return;
    }

    if (S.page === "messages") {
      await window.renderMessages();
      return;
    }

    if (S.page === "community") {
      await window.renderCommunity();
      return;
    }

    if (S.page === "suggestions") {
      html = await suggestionsHTML();
    } else if (S.page === "admin") {
      html = await adminHTML();
    } else if (S.page === "quiz") {
      el.innerHTML = `
        <section class="page-card">
          <div id="quiz-root"></div>
        </section>
        ${nav()}
      `;

      if (typeof window.renderQuizSetup === "function") {
        window.renderQuizSetup();
      }
      return;
    } else if (S.page === "papers") {
      el.innerHTML = `
        <section class="page-card">
          <div id="papers-root"></div>
        </section>
        ${nav()}
      `;

      if (typeof window.renderPastPapers === "function") {
        window.renderPastPapers();
      }
      return;
    } else if (S.page === "notes") {
      html = typeof notesHTML === "function"
        ? notesHTML()
        : "<section class='page-card'><h2>Notes</h2></section>";
    } else {
      html = typeof homeHTML === "function"
        ? homeHTML()
        : "<section class='page-card'><h2>Student Study Hub</h2></section>";
    }

    el.innerHTML = html;
  }

  window.render = renderPage;

  window.go = function(page) {
    S.page = page || "home";
    window.SSH = S;
    renderPage();
  };

  async function boot() {
    try {
      if (typeof loadUser === "function") {
        await loadUser();
      }

      if (typeof loadProfile === "function") {
        await loadProfile();
      }

      if (typeof checkAdmin === "function") {
        await checkAdmin();
      }
    } catch (e) {
      console.error("App startup error:", e);
    }

    S.page = S.user ? "home" : "login";
    await renderPage();
  }

  if (sb) {
    sb.auth.onAuthStateChange(function() {
      setTimeout(boot, 0);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();