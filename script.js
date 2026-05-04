// ── THEME TOGGLE ──
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  document.getElementById('themeBtn').textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Apply saved theme on load (default = dark)
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    document.getElementById('themeBtn').textContent = '☀️';
  }
})();
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

// ── CONTACT FORM HANDLER ──
async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const btn = form.querySelector('.send-btn');

  // Loading state
  btn.innerHTML = '⏳ Sending...';
  btn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Success
      btn.innerHTML = '✅ Message Sent!';
      btn.style.background = '#16a34a';
      form.reset();

      setTimeout(() => {
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);

    } else {
      throw new Error('Form submission failed');
    }

  } catch (error) {
    btn.innerHTML = '❌ Failed. Try again.';
    btn.style.background = '#dc2626';
    btn.disabled = false;

    setTimeout(() => {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
      btn.style.background = '';
    }, 3000);
  }
}

// ── TYPEWRITER EFFECT ──
const roles = [
  'A Cybersecurity Analyst',
  'A Penetration Tester',
  'An I.T Support Specialist',
  'A Web developer',
  'A Graphic designer'

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
