/* ═══════════════════════════════════════════════
   main.js — Retro 90s Portfolio
   Isvi Rahmatul Mustafa
═══════════════════════════════════════════════ */

// ── 1. MOBILE NAV BURGER ─────────────────────
const navBurger = document.getElementById('navBurger');
const navLinks  = document.getElementById('navLinks');

navBurger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navBurger.textContent = isOpen ? '✕' : '☰';
  navBurger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navBurger.textContent = '☰';
    navBurger.setAttribute('aria-expanded', 'false');
  });
});

// ── 2. SMOOTH SCROLL (fixed nav offset) ──────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('nav').offsetHeight + 16;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});

// ── 3. SCROLL REVEAL ─────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 80, 360));
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// ── 4. ACTIVE NAV HIGHLIGHT ──────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const activeObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(a => a.style.cssText = '');
    const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
    if (active) {
      active.style.color = 'var(--red-hi)';
      active.style.textShadow = 'var(--glow-sm)';
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => activeObs.observe(s));

// ── 5. TYPEWRITER on hero eyebrow ────────────
const eyebrow = document.querySelector('.hero__eyebrow');
if (eyebrow) {
  const messages = [
    '>> LOADING PROFILE...',
    '>> DATA_ANALYST.EXE',
    '>> BASED IN MALANG...',
    '>> READY TO WORK...'
  ];
  let mi = 0, ci = 0, deleting = false;
  eyebrow.textContent = '';

  function type() {
    const msg = messages[mi];
    if (!deleting) {
      eyebrow.textContent = msg.slice(0, ++ci);
      if (ci === msg.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      eyebrow.textContent = msg.slice(0, --ci);
      if (ci === 0) { deleting = false; mi = (mi + 1) % messages.length; }
    }
    setTimeout(type, deleting ? 40 : 70);
  }
  setTimeout(type, 600);
}

// ── 6. RETRO GLITCH on name hover ────────────
const heroName = document.querySelector('.hero__name');
if (heroName) {
  const orig = heroName.innerHTML;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%';
  let glitchTimer;

  heroName.addEventListener('mouseenter', () => {
    let ticks = 0;
    clearInterval(glitchTimer);
    glitchTimer = setInterval(() => {
      if (ticks++ > 10) { clearInterval(glitchTimer); heroName.innerHTML = orig; return; }
      heroName.innerHTML = orig.replace(/[A-Z]/g, c =>
        Math.random() > .6 ? chars[Math.floor(Math.random() * chars.length)] : c
      );
    }, 60);
  });

  heroName.addEventListener('mouseleave', () => {
    clearInterval(glitchTimer);
    heroName.innerHTML = orig;
  });
}

// ── 7. CONTACT FORM ──────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '[ SENDING... ]';
    btn.disabled = true;

    try {
      const action = contactForm.getAttribute('action');
      if (action.includes('YOUR_FORM_ID')) {
        await new Promise(r => setTimeout(r, 700));
        btn.textContent = '[ SENT! // DEMO MODE ]';
        btn.style.background = '#003300';
        btn.style.borderColor = '#00cc00';
        btn.style.color = '#00ff00';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.cssText = '';
          btn.disabled = false;
        }, 3000);
        return;
      }

      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        btn.textContent = '[ MESSAGE_SENT.EXE ]';
        btn.style.background = '#003300';
        contactForm.reset();
      } else throw new Error();
    } catch {
      btn.textContent = '[ ERROR — EMAIL ME DIRECTLY ]';
      btn.style.background = '#330000';
    } finally {
      btn.disabled = false;
      setTimeout(() => { btn.textContent = orig; btn.style.cssText = ''; }, 4000);
    }
  });
}

// ── 8. CONSOLE EASTER EGG ────────────────────
console.log('%c ISVI RAHMATUL MUSTAFA ', 'background:#cc0000;color:#fff;font-size:18px;font-family:monospace;padding:4px 12px;');
console.log('%c Data Analyst · Malang, East Java · isvirahmatulmustafa@gmail.com ', 'color:#ff6600;font-family:monospace;');
console.log('%c > You found the source code. Hire her. ', 'color:#b08080;font-family:monospace;');
