// ── PAGE NAVIGATION ──
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('tab-' + id).classList.add('active');
  if (id === 'skills') setTimeout(animateBars, 100);
  window.scrollTo(0, 0);
}

// ── RESUME TABS ──
function showTab(id, btn) {
  document.querySelectorAll('.r-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.r-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(id).classList.add('active');
}

// ── SKILL BARS ANIMATION ──
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.width = bar.getAttribute('data-w') + '%';
  });
  barsAnimated = true;
}

// ── CONTACT FORM ──
function sendMessage() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── TYPEWRITER EFFECT ──
const roles = [
  'A Cybersecurity Analyst',
  'A Penetration Tester',
  'An I.T Support Specialist',
  'A Web developer'
];
let ri = 0, ci = 0, deleting = false;
const roleEl = document.querySelector('.hero-role');

function type() {
  const current = roles[ri];
  if (!deleting) {
    ci++;
    roleEl.innerHTML = current.slice(0, ci) + '<span class="cursor">|</span>';
    if (ci === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    ci--;
    roleEl.innerHTML = current.slice(0, ci) + '<span class="cursor">|</span>';
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 55 : 80);
}

type();
