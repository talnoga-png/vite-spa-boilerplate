import './style.css'

/* =============================================
   FlavorLab — Enhanced Main JS
   ============================================= */

// Nav: scroll shadow + mobile toggle
const nav = document.getElementById('main-nav')
const toggle = document.getElementById('nav-toggle')
const navLinks = document.getElementById('nav-links')

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20)
}, { passive: true })

toggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open')
  toggle.classList.toggle('active', isOpen)
  toggle.setAttribute('aria-expanded', isOpen)
})

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open')
    toggle?.classList.remove('active')
    toggle?.setAttribute('aria-expanded', 'false')
  })
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href')
    if (id === '#') return
    const target = document.querySelector(id)
    if (!target) return
    e.preventDefault()
    const offset = nav?.offsetHeight ?? 72
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  })
})

/* =============================================
   PARTICLE SYSTEM
   ============================================= */
function initParticles() {
  const container = document.getElementById('particles')
  if (!container) return

  const PARTICLE_COUNT = 38

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div')
    p.className = 'particle'

    // Random properties
    const size = Math.random() * 3 + 1       // 1–4px
    const x = Math.random() * 100            // % horizontal
    const startY = Math.random() * 100       // % starting vertical
    const duration = Math.random() * 20 + 15 // 15–35s
    const delay = Math.random() * -30        // stagger
    const isGold = Math.random() > 0.6

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${startY}%;
      background: ${isGold
        ? `rgba(200,164,90,${Math.random() * 0.5 + 0.2})`
        : `rgba(77,217,208,${Math.random() * 0.4 + 0.15})`};
      box-shadow: 0 0 ${size * 3}px ${isGold ? 'rgba(200,164,90,0.4)' : 'rgba(77,217,208,0.35)'};
      animation: particleFloat ${duration}s ${delay}s linear infinite;
    `
    container.appendChild(p)
  }

  // Add keyframes dynamically if not already present
  if (!document.getElementById('particle-keyframes')) {
    const style = document.createElement('style')
    style.id = 'particle-keyframes'
    style.textContent = `
      @keyframes particleFloat {
        0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
        5%   { opacity: 1; }
        50%  { transform: translateY(-45vh) translateX(${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random()*40+10)}px); }
        95%  { opacity: 0.8; }
        100% { transform: translateY(-100vh) translateX(0px); opacity: 0; }
      }
    `
    document.head.appendChild(style)
  }
}

/* =============================================
   PARALLAX HERO
   ============================================= */
function initParallax() {
  const heroMolecule = document.querySelector('.hero-molecule')

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY
    if (scrollY > window.innerHeight * 1.5) return

    // Parallax molecule (moves slower than scroll)
    if (heroMolecule) {
      heroMolecule.style.transform = `translateY(calc(-50% + ${scrollY * 0.25}px))`
    }
  }, { passive: true })
}

/* =============================================
   MOLECULE ELECTRON ORBIT ANIMATION
   ============================================= */
function initMoleculeAnimation() {
  const electron = document.querySelector('.mol-electron')
  if (!electron) return

  let angle = 0
  const centerX = 220
  const centerY = 190
  const rx = 55
  const ry = 20
  const tiltDeg = -35
  const tiltRad = tiltDeg * Math.PI / 180

  function animate() {
    angle += 0.015
    // Parametric ellipse
    const ex = centerX + rx * Math.cos(angle)
    const ey = centerY + ry * Math.sin(angle)

    // Apply tilt rotation
    const cosT = Math.cos(tiltRad)
    const sinT = Math.sin(tiltRad)
    const dx = ex - centerX
    const dy = ey - centerY
    const rx2 = dx * cosT - dy * sinT + centerX
    const ry2 = dx * sinT + dy * cosT + centerY

    electron.setAttribute('cx', rx2.toFixed(2))
    electron.setAttribute('cy', ry2.toFixed(2))

    requestAnimationFrame(animate)
  }
  animate()
}

/* =============================================
   PAIRING DEMO ACTIVATION
   ============================================= */
function initPairingDemo() {
  const demoSection = document.querySelector('.pairing-demo')
  if (!demoSection) return

  let activated = false

  const demoObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !activated) {
          activated = true
          // Small delay for dramatic effect
          setTimeout(() => {
            demoSection.classList.add('demo-active')
          }, 400)
          demoObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.4 }
  )

  demoObserver.observe(demoSection)
}

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealElements = () => {
  const elements = document.querySelectorAll(
    '.step-card, .benefit-card, .example-card, .audience-card, .article-card, .compound-card, .how-feature, .two-col-text, .two-col-visual, .section-header, .intro-lead, .share-bar, .demo-ingredient, .demo-connection'
  )
  elements.forEach(el => el.classList.add('reveal'))
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement?.querySelectorAll('.reveal') ?? []
        let delay = 0
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 90
        })
        setTimeout(() => entry.target.classList.add('visible'), delay)
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
)

/* =============================================
   INIT
   ============================================= */
function init() {
  revealElements()
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
  initParticles()
  initParallax()
  initMoleculeAnimation()
  initPairingDemo()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
