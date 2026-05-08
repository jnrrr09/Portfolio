// ── THEME TOGGLE ──
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  document.querySelector('.theme-icon').textContent = isLight ? '☀️' : '🌙';
  document.querySelector('.theme-label').textContent = isLight ? 'Light' : 'Dark';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Apply saved theme on load (default = dark)
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    const icon = document.querySelector('.theme-icon');
    const label = document.querySelector('.theme-label');
    if (icon) icon.textContent = '☀️';
    if (label) label.textContent = 'Light';
  }
})();
// ── PAGE NAVIGATION ──
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.mob-link').forEach(t => t.classList.remove('active'));

  const page = document.getElementById(id);
  page.classList.add('active');

  // Trigger re-animation for project cards
  if (id === 'projects') {
    page.querySelectorAll('.project-card').forEach(c => {
      c.style.animation = 'none';
      c.offsetHeight; // reflow
      c.style.animation = '';
    });
  }

  const tabEl = document.getElementById('tab-' + id);
  if (tabEl) tabEl.classList.add('active');
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');
  const mobEl = document.getElementById('mob-' + id);
  if (mobEl) mobEl.classList.add('active');

  if (id === 'skills') setTimeout(animateBars, 100);
  window.scrollTo(0, 0);
}

// ── MOBILE MENU ──
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  const btn = document.getElementById('hamburgerBtn');
  const isOpen = menu.classList.toggle('open');
  overlay.classList.toggle('open', isOpen);
  btn.classList.toggle('open', isOpen);
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('menuOverlay').classList.remove('open');
  document.getElementById('hamburgerBtn').classList.remove('open');
}

// ── RESUME TABS ──
function showTab(id, btn) {
  document.querySelectorAll('.r-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.r-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(id).classList.add('active');
}

// ── SKILL BARS ANIMATION ──
function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.width = '0%';
  });
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.getAttribute('data-w') + '%';
    });
  }, 80);
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
// ── AUTO YEAR IN FOOTER ──
document.getElementById('year').textContent = new Date().getFullYear();