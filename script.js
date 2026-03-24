/* ══════════════════════════════════════════
   NADIR HUSSAIN — DATA PIPELINE PORTFOLIO
   script.js
══════════════════════════════════════════ */

/* ── THEME TOGGLE ── */
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('nh-theme');
if (savedTheme === 'light') document.body.classList.add('light');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('nh-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

/* ── CURSOR ── */
const dot = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.transform = `translate(${mx}px,${my}px)`;
});
(function tick() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.transform = `translate(${rx}px,${ry}px)`;
  requestAnimationFrame(tick);
})();

document.querySelectorAll('a,button,.proj-card,.talk-card,.ach-card,.tool-chip').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '44px'; ring.style.height = '44px';
    ring.style.borderColor = 'rgba(0,229,255,.8)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '28px'; ring.style.height = '28px';
    ring.style.borderColor = 'rgba(0,229,255,.5)';
  });
});

/* ── HERO CANVAS PARTICLES ── */
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function initCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = document.getElementById('hero').offsetHeight || window.innerHeight;
}
initCanvas();
window.addEventListener('resize', initCanvas);

class P {
  constructor() { this.r(); }
  r() {
    this.x = Math.random() * W; this.y = Math.random() * H;
    this.vx = (Math.random() - .5) * .35; this.vy = (Math.random() - .5) * .35;
    this.s = Math.random() * 1.4 + .3;
    this.o = Math.random() * .35 + .05;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.r();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,229,255,${this.o})`;
    ctx.fill();
  }
}

for (let i = 0; i < 90; i++) particles.push(new P());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,229,255,${.05 * (1 - d / 110)})`;
        ctx.lineWidth = .5;
        ctx.stroke();
      }
    }
  }
}

(function animP() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animP);
})();

/* ── LIVE COUNTERS ── */
const tpEl = document.getElementById('throughput');
if (tpEl) {
  setInterval(() => {
    tpEl.textContent = (1100 + Math.floor(Math.random() * 400)).toLocaleString();
  }, 1800);
}
const rowsEl = document.getElementById('rows-sec');
if (rowsEl) {
  setInterval(() => {
    const base = 900000 + Math.floor(Math.random() * 120000);
    rowsEl.textContent = base.toLocaleString();
  }, 2200);
}

/* ── PIPELINE BAND: animate active node ── */
const phNodes = document.querySelectorAll('.ph-node');
let activeIdx = 0;
if (phNodes.length) {
  setInterval(() => {
    phNodes[activeIdx].classList.remove('active-node');
    activeIdx = (activeIdx + 1) % phNodes.length;
    phNodes[activeIdx].classList.add('active-node');
  }, 1800);
}

/* ── TYPEWRITER ── */
const roles = [
  '"Data Consultant & Engineer"',
  '"Big Data Specialist"',
  '"Azure Data Engineer"',
  '"Gold MLSA @ Microsoft"',
  '"Tech Speaker & Mentor"'
];
let ri = 0, ci = 0, del = false;
const typer = document.getElementById('typer');
function typeIt() {
  const cur = roles[ri];
  typer.textContent = del ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
  del ? ci-- : ci++;
  if (!del && ci === cur.length) { del = true; setTimeout(typeIt, 2200); return; }
  if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(typeIt, del ? 40 : 75);
}
setTimeout(typeIt, 1200);

/* ── COUNTER ANIMATION ── */
function animCount(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const dur = 1800;
  const start = performance.now();
  (function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(ease * target);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  })(start);
}

const counters = document.querySelectorAll('.hc-num');
const cObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animCount(e.target); cObs.unobserve(e.target); }});
}, { threshold: .5 });
counters.forEach(c => cObs.observe(c));

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── HAMBURGER ── */
const burger = document.getElementById('burger');
const navList = document.getElementById('nav-list');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navList.classList.toggle('open');
  document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : '';
});
navList.querySelectorAll('.nl').forEach(l => {
  l.addEventListener('click', () => {
    burger.classList.remove('open');
    navList.classList.remove('open');
    document.body.style.overflow = '';
  });
});
document.addEventListener('click', e => {
  if (!nav.contains(e.target)) {
    burger.classList.remove('open');
    navList.classList.remove('open');
    document.body.style.overflow = '';
  }
});
burger.querySelector && (burger.addEventListener('click', e => e.stopPropagation()));

/* ── PIPELINE PROGRESS ── */
const stages = ['source','ingestion','processing','serving','analytics','terminal','contact'];
const ppStages = document.querySelectorAll('.pp-stage');

window.addEventListener('scroll', () => {
  let current = '';
  stages.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });
  ppStages.forEach(s => {
    s.classList.toggle('active', s.getAttribute('data-section') === current);
  });
}, { passive: true });

/* ── ACTIVE NAV ── */
const navLinks = document.querySelectorAll('.nl');
window.addEventListener('scroll', () => {
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 150) cur = s.id;
  });
  navLinks.forEach(l => {
    const href = l.getAttribute('href');
    l.style.color = href === '#' + cur ? 'var(--acc)' : '';
  });
}, { passive: true });

/* ── SKILL TOOLTIP ── */
const tooltip = document.getElementById('tool-tooltip');
document.querySelectorAll('.tool-chip[data-tooltip]').forEach(chip => {
  chip.addEventListener('mouseenter', e => {
    tooltip.textContent = '// ' + chip.getAttribute('data-tooltip');
    tooltip.classList.add('visible');
  });
  chip.addEventListener('mousemove', e => {
    tooltip.style.left = (e.clientX + 14) + 'px';
    tooltip.style.top = (e.clientY - 30) + 'px';
  });
  chip.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
});


/* ── SCROLL REVEAL ── */
document.querySelectorAll('section,.proj-card,.talk-card,.ach-card,.stack-layer,.source-grid,.mini-card').forEach(el => {
  el.classList.add('reveal');
});
const revObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('vis'), i * 50);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ── TERMINAL ── */
const termBody = document.getElementById('term-body');
const termInput = document.getElementById('term-input');
const termPrompt = 'nadir@pipeline:~$';

const cmds = {
  whoami: () => [
    { text: 'Nadir Hussain', color: 'var(--acc)' },
    { text: 'Data Consultant & Engineer', color: 'var(--text)' },
    { text: 'Location: Karachi, Pakistan', color: 'var(--text2)' },
    { text: 'Company: Techlogix (Mashreq Bank)', color: 'var(--text2)' },
    { text: 'Email: nadirarain111@gmail.com', color: 'var(--text2)' },
    { text: 'Status: open_to_opportunities ✓', color: 'var(--g)' },
  ],
  skills: () => [
    { text: '── Big Data & Streaming ──', color: 'var(--acc)' },
    { text: 'Apache Spark · PySpark · Kafka · Hadoop/Hive · Cloudera', color: 'var(--text2)' },
    { text: '── Cloud & Azure ──', color: 'var(--acc)' },
    { text: 'Azure Databricks · ADF · Synapse · Fabric · Cosmos DB', color: 'var(--text2)' },
    { text: '── Databases & ETL ──', color: 'var(--acc)' },
    { text: 'SQL Server · Oracle/PL-SQL · SSIS · SSAS · Talend · dbt', color: 'var(--text2)' },
    { text: '── Languages & Tools ──', color: 'var(--acc)' },
    { text: 'Python · SQL · Flask · Power BI · Git · Linux', color: 'var(--text2)' },
  ],
  projects: () => [
    { text: '11 pipeline projects built:', color: 'var(--acc)' },
    { text: '01 — Kafka & Azure Real-Time Stock Market Pipeline', color: 'var(--text2)' },
    { text: '02 — Smart Meter Azure IoT Streaming', color: 'var(--text2)' },
    { text: '03 — Azure Medallion Architecture (dbt + ADF + Databricks)', color: 'var(--text2)' },
    { text: '04 — MySQL → SQL Server Migration with Talend', color: 'var(--text2)' },
    { text: '05 — Weather ETL with Apache Airflow & S3', color: 'var(--text2)' },
    { text: '06 — Tokyo Olympics Data Analytics (Azure)', color: 'var(--text2)' },
    { text: '07 — PSL Data Analysis using PySpark', color: 'var(--text2)' },
    { text: '...and more → github.com/NADIRHUSSAIN11', color: 'var(--g)' },
  ],
  certifications: () => [
    { text: '19+ Certifications earned:', color: 'var(--acc)' },
    { text: 'DP-203 Azure Data Engineer Associate', color: 'var(--text2)' },
    { text: 'DP-600 Fabric Analytics Engineer Associate', color: 'var(--text2)' },
    { text: 'AZ-900 Azure Fundamentals', color: 'var(--text2)' },
    { text: 'DP-900 Data Fundamentals', color: 'var(--text2)' },
    { text: 'PL-900 Power Platform Fundamentals', color: 'var(--text2)' },
    { text: 'Databricks Certified Data Engineer Associate (95%)', color: 'var(--text2)' },
    { text: 'ISC2 Certified in Cybersecurity (CC)', color: 'var(--text2)' },
    { text: '→ credly.com/users/nadir-hussain.3543f8a6/badges', color: 'var(--g)' },
  ],
  talks: () => [
    { text: '10+ talks delivered:', color: 'var(--acc)' },
    { text: 'Azure Data Engineering — Microsoft & HEC (2024)', color: 'var(--text2)' },
    { text: 'Azure Data Factory Advanced — Microsoft & HEC (2024)', color: 'var(--text2)' },
    { text: 'Data Engineering Mastery — Tech Fest NED (Dec 2023)', color: 'var(--text2)' },
    { text: 'DevCon Pakistan — Guest & Panellist (Oct 2023)', color: 'var(--text2)' },
    { text: 'Data Engineering in the Light of Azure — SMIU (Apr 2023)', color: 'var(--text2)' },
    { text: 'Data Storage Solutions in Azure — NED (Jun 2024)', color: 'var(--text2)' },
    { text: '...and more → nadirhussain.social/#talks', color: 'var(--g)' },
  ],
  contact: () => [
    { text: 'GET /contact/nadir-hussain', color: 'var(--g)' },
    { text: '200 OK — Contact details:', color: 'var(--acc)' },
    { text: 'email:    nadirarain111@gmail.com', color: 'var(--text2)' },
    { text: 'linkedin: linkedin.com/in/nadir-hussain-/', color: 'var(--text2)' },
    { text: 'github:   github.com/NADIRHUSSAIN11', color: 'var(--text2)' },
    { text: 'topmate:  topmate.io/nadir_hussain', color: 'var(--text2)' },
    { text: 'medium:   medium.com/@nadirhussainarain', color: 'var(--text2)' },
  ],
  clear: () => 'CLEAR',
  help: () => [
    { text: 'Available commands:', color: 'var(--acc)' },
    { text: 'whoami · skills · projects · certifications · talks · contact · clear', color: 'var(--text2)' },
  ],
};

function addTermLine(prompt, input, outputs) {
  const cmdLine = document.createElement('div');
  cmdLine.className = 'term-line';
  cmdLine.innerHTML = `<span class="term-prompt mono">${prompt}</span><span class="mono" style="color:var(--text)"> ${input}</span>`;
  termBody.appendChild(cmdLine);

  if (outputs === 'CLEAR') {
    termBody.innerHTML = '';
    return;
  }

  outputs.forEach((o, i) => {
    setTimeout(() => {
      const l = document.createElement('div');
      l.className = 'term-line mono';
      l.style.color = o.color;
      l.style.fontSize = '.78rem';
      l.textContent = o.text;
      termBody.appendChild(l);
      termBody.scrollTop = termBody.scrollHeight;
    }, i * 40);
  });
}

termInput.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const val = termInput.value.trim().toLowerCase();
  termInput.value = '';
  if (!val) return;

  const fn = cmds[val];
  if (fn) {
    const result = fn();
    addTermLine(termPrompt, val, result);
  } else {
    addTermLine(termPrompt, val, [
      { text: `command not found: ${val}`, color: '#ff5f57' },
      { text: 'type "help" to see available commands', color: 'var(--text3)' },
    ]);
  }
  termBody.scrollTop = termBody.scrollHeight;
});

/* ── CONTACT FORM — Formspree ── */
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('api-submit');
const submitText = document.getElementById('submit-text');
const apiResp = document.getElementById('api-response');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Sending request...';
    apiResp.style.display = 'none';

    // Collect form data as JSON
    const payload = {
      name:    form.querySelector('[name="name"]').value,
      email:   form.querySelector('[name="email"]').value,
      subject: form.querySelector('[name="subject"]').value || 'Portfolio Contact',
      message: form.querySelector('[name="message"]').value,
    };

    try {
      const res = await fetch('https://formspree.io/f/mqeygypz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();

      if (res.ok) {
        submitText.textContent = 'Execute Request →';
        submitBtn.disabled = false;
        apiResp.style.display = 'block';
        apiResp.className = 'api-response success';
        apiResp.innerHTML = `<span class="mono" style="color:var(--g);font-weight:700;">200 OK</span><span class="mono" style="color:var(--text2);margin-left:1rem;">// Message sent. Nadir will respond within 24h.</span>`;
        form.reset();
      } else {
        const errMsg = json?.errors?.[0]?.message || 'Submission failed';
        throw new Error(errMsg);
      }
    } catch (err) {
      submitText.textContent = 'Execute Request →';
      submitBtn.disabled = false;
      apiResp.style.display = 'block';
      apiResp.className = 'api-response error';
      apiResp.innerHTML = `<span class="mono" style="color:#ff5f57;font-weight:700;">500 ERROR</span><span class="mono" style="color:var(--text2);margin-left:1rem;">// ${err.message || 'Failed to send. Try nadirarain111@gmail.com directly.'}</span>`;
    }
  });
}
