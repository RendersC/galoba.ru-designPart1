/* ── Stars / particles ─────────────────────────────────── */
(function () {
  const c = document.getElementById('stars');
  const x = c.getContext('2d');
  let p = [];

  function resize() { c.width = innerWidth; c.height = innerHeight; }
  resize();
  addEventListener('resize', () => { resize(); init(); });

  function init() {
    p = [];
    const n = Math.round(innerWidth * innerHeight / 11000);
    for (let i = 0; i < n; i++) {
      p.push({
        x:  Math.random() * c.width,
        y:  Math.random() * c.height,
        r:  Math.random() * 1.2 + .2,
        vx: (Math.random() - .5) * .2,
        vy: (Math.random() - .5) * .2,
        a:  Math.random() * .4 + .08,
        g:  Math.random() > .7
      });
    }
  }
  init();

  function draw() {
    x.clearRect(0, 0, c.width, c.height);
    for (const d of p) {
      x.beginPath();
      x.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      x.fillStyle = d.g
        ? `rgba(200,164,74,${d.a})`
        : `rgba(190,210,245,${d.a * .5})`;
      x.fill();
      d.x = (d.x + d.vx + c.width)  % c.width;
      d.y = (d.y + d.vy + c.height) % c.height;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Photo parallax ─────────────────────────────────────── */
const heroPhoto = document.getElementById('heroPhoto');
setTimeout(() => heroPhoto.classList.add('loaded'), 100);

window.addEventListener('scroll', () => {
  heroPhoto.style.transform = `scale(1) translateY(${window.scrollY * 0.28}px)`;
}, { passive: true });

/* ── Sticky nav ─────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', scrollY > 60);
}, { passive: true });

/* ── Mobile burger ──────────────────────────────────────── */
const burger = document.getElementById('navBurger');
const drawer = document.getElementById('mobileDrawer');

burger.addEventListener('click', () => {
  const isOpen = drawer.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

drawer.querySelectorAll('.drawer-link, .drawer-login, .drawer-register').forEach(el => {
  el.addEventListener('click', () => {
    drawer.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Scroll reveal ──────────────────────────────────────── */
const srEls = document.querySelectorAll('[data-sr]');
const srObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      srObs.unobserve(e.target);
    }
  });
}, { threshold: 0.09 });
srEls.forEach(el => srObs.observe(el));

/* ── GSAP hero entrance ─────────────────────────────────── */
function heroIn() {
  const ids = ['#g-ey', '#g-h1', '#g-bq', '#g-bd', '#g-ai', '#g-cta'];

  if (typeof gsap === 'undefined') {
    [...ids, '#g-vis'].forEach(s => {
      const el = document.querySelector(s);
      if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.set(ids, { opacity: 0, y: 30 });
  gsap.set('#g-vis', { opacity: 0, x: 45 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('#g-ey',  { opacity: 1, y: 0, duration: .65 }, .2)
    .to('#g-h1',  { opacity: 1, y: 0, duration: .75 }, .35)
    .to('#g-bq',  { opacity: 1, y: 0, duration: .6  }, .52)
    .to('#g-bd',  { opacity: 1, y: 0, duration: .6  }, .64)
    .to('#g-ai',  { opacity: 1, y: 0, duration: .5  }, .77)
    .to('#g-cta', { opacity: 1, y: 0, duration: .5  }, .87)
    .to('#g-vis', { opacity: 1, x: 0, duration: .9, ease: 'power2.out' }, .3);
}

if (document.readyState === 'complete') { heroIn(); }
else { window.addEventListener('load', heroIn); }
