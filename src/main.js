import './style.css'

/* =============================================
   FlavorLab — Main JS
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

// Close mobile nav on link click
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
    const offset = nav?.offsetHeight ?? 68
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  })
})

// Scroll reveal animation
const revealElements = () => {
  const elements = document.querySelectorAll(
    '.step-card, .benefit-card, .example-card, .audience-card, .article-card, .compound-card, .how-feature, .two-col-text, .two-col-visual, .section-header, .intro-lead, .share-bar'
  )
  elements.forEach(el => el.classList.add('reveal'))
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger cards within the same grid
        const siblings = entry.target.parentElement?.querySelectorAll('.reveal') ?? []
        let delay = 0
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80
        })
        setTimeout(() => entry.target.classList.add('visible'), delay)
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
)

// Init after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

function init() {
  revealElements()
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
}
