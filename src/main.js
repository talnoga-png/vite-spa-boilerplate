import './style.css'

/* =============================================
   FlavorLab — Interaction Layer v3.0
   ============================================= */

// ── Reduced motion preference ─────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ── Nav: scroll + mobile ──────────────────────
const nav      = document.getElementById('main-nav')
const toggle   = document.getElementById('nav-toggle')
const navLinks = document.getElementById('nav-links')

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20)
}, { passive: true })

toggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open')
  toggle.classList.toggle('active', isOpen)
  toggle.setAttribute('aria-expanded', String(isOpen))
})

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open')
    toggle?.classList.remove('active')
    toggle?.setAttribute('aria-expanded', 'false')
  })
})

// ── Smooth scroll ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href')
    if (id === '#') return
    const target = document.querySelector(id)
    if (!target) return
    e.preventDefault()
    const offset = nav?.offsetHeight ?? 72
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  })
})

/* ── Particle system ─────────────────────────── */
function initParticles() {
  if (prefersReducedMotion) return
  const container = document.getElementById('particles')
  if (!container) return

  const COUNT = 28
  for (let i = 0; i < COUNT; i++) {
    const p    = document.createElement('div')
    p.className = 'particle'
    const size   = Math.random() * 2.5 + 1
    const x      = Math.random() * 100
    const startY = Math.random() * 100
    const dur    = Math.random() * 22 + 14
    const delay  = Math.random() * -35
    const isTeal = Math.random() > 0.55

    p.style.cssText = `
      width:${size}px; height:${size}px; left:${x}%; top:${startY}%;
      background:${isTeal
        ? `rgba(31,122,140,${(Math.random()*0.3+0.08).toFixed(2)})`
        : `rgba(255,122,89,${(Math.random()*0.25+0.08).toFixed(2)})`};
      box-shadow:0 0 ${size*3}px ${isTeal ? 'rgba(31,122,140,0.2)' : 'rgba(255,122,89,0.18)'};
      animation:particleFloat ${dur}s ${delay}s linear infinite;
    `
    container.appendChild(p)
  }

  if (!document.getElementById('particle-kf')) {
    const s = document.createElement('style')
    s.id = 'particle-kf'
    s.textContent = `
      @keyframes particleFloat {
        0%   { transform:translateY(0) translateX(0); opacity:0; }
        5%   { opacity:1; }
        50%  { transform:translateY(-45vh) translateX(${Math.floor(Math.random()*30+5)}px); }
        95%  { opacity:0.7; }
        100% { transform:translateY(-100vh) translateX(0); opacity:0; }
      }
    `
    document.head.appendChild(s)
  }
}

/* ── Parallax ────────────────────────────────── */
function initParallax() {
  if (prefersReducedMotion) return
  const mol = document.querySelector('.hero-molecule')
  if (!mol) return
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 1.2) return
    mol.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.22}px))`
  }, { passive: true })
}

/* ── Molecule electron orbit ─────────────────── */
function initMolecule() {
  if (prefersReducedMotion) return
  const el = document.querySelector('.mol-electron')
  if (!el) return
  const cx = 220, cy = 190, rx = 55, ry = 20, tilt = -35 * Math.PI / 180
  let angle = 0
  const cosT = Math.cos(tilt), sinT = Math.sin(tilt)
  ;(function tick() {
    angle += 0.015
    const ex = cx + rx * Math.cos(angle)
    const ey = cy + ry * Math.sin(angle)
    const dx = ex - cx, dy = ey - cy
    el.setAttribute('cx', (dx * cosT - dy * sinT + cx).toFixed(2))
    el.setAttribute('cy', (dx * sinT + dy * cosT + cy).toFixed(2))
    requestAnimationFrame(tick)
  })()
}

/* ── Pairing demo spark ──────────────────────── */
function initPairingDemo() {
  const demo = document.querySelector('.pairing-demo')
  if (!demo) return
  let fired = false
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !fired) {
        fired = true
        setTimeout(() => demo.classList.add('demo-active'),
          prefersReducedMotion ? 0 : 350)
      }
    })
  }, { threshold: 0.38 }).observe(demo)
}

/* ── Stat counter animation ──────────────────── */
function initCounters() {
  if (prefersReducedMotion) return
  const counters = document.querySelectorAll('.stat-number')
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const el  = entry.target
      const raw = el.textContent.trim()
      // Extract number and suffix
      const match = raw.match(/^([\d,.]+)(\S*)$/)
      if (!match) return
      const end    = parseFloat(match[1].replace(/,/g, ''))
      const suffix = match[2]
      const duration = 1800
      const startTime = performance.now()
      const tick = (now) => {
        const elapsed  = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.round(eased * end)
        // Format with + if original had +
        const hasPlus = raw.includes('+')
        const hasStar = raw.includes('★')
        if (hasStar) {
          el.textContent = `${current}★`
        } else if (end >= 1000) {
          el.textContent = current.toLocaleString() + (hasPlus ? '+' : '') + suffix.replace(/^\+/, '')
        } else {
          el.textContent = current + (hasPlus ? '+' : '') + suffix.replace(/^\+/, '')
        }
        if (progress < 1) requestAnimationFrame(tick)
        else el.textContent = raw  // restore exact original
      }
      requestAnimationFrame(tick)
      obs.unobserve(el)
    })
  }, { threshold: 0.5 })
  counters.forEach(c => obs.observe(c))
}

/* ── Scroll reveal ───────────────────────────── */
function initReveal() {
  const targets = document.querySelectorAll(
    '.step-card, .benefit-card, .example-card, .audience-card, ' +
    '.article-card, .compound-card, .how-feature, ' +
    '.two-col-text, .two-col-visual, .section-header, ' +
    '.intro-lead, .share-bar, .demo-ingredient, .demo-connection, ' +
    '.testimonial-card, .stat-item'
  )

  if (prefersReducedMotion) {
    targets.forEach(el => el.classList.add('visible'))
    return
  }

  targets.forEach(el => el.classList.add('reveal'))

  // Named observer to allow unobserve
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const siblings = [...(entry.target.parentElement?.querySelectorAll('.reveal') ?? [])]
      const idx = siblings.indexOf(entry.target)
      setTimeout(() => entry.target.classList.add('visible'), idx * 80)
      revealObs.unobserve(entry.target)
    })
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' })

  targets.forEach(el => revealObs.observe(el))
}

/* ── Init ────────────────────────────────────── */
function init() {
  initReveal()
  initParticles()
  initParallax()
  initMolecule()
  initPairingDemo()
  initCounters()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
