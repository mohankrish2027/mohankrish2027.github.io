import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About',     href: '#about' },
  { label: 'Experience',href: '#experience' },
  { label: 'Courses',   href: '#courses' },
  { label: 'Services',  href: '#services' },
  { label: 'Contact',   href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      style={{
        position:  'fixed',
        top: 0, left: 0, right: 0,
        zIndex:    1000,
        background: scrolled ? 'rgba(250,250,250,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <nav style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none' }}>
          MT<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop Nav */}
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }} className="hidden-mobile">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          style={{
            fontSize: 13, fontWeight: 600,
            padding: '7px 16px',
            borderRadius: 8,
            background: 'var(--text)',
            color: '#fff',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          className="hidden-mobile"
        >
          Get in Touch
        </a>

        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(o => !o)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          className="show-mobile"
          aria-label="Menu">
          <span style={{ display: 'block', width: 20, height: 1.5, background: 'var(--text)', marginBottom: 5, transition: 'all 0.2s' }} />
          <span style={{ display: 'block', width: 20, height: 1.5, background: 'var(--text)', transition: 'all 0.2s' }} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', overflow: 'hidden' }}
          >
            <ul style={{ listStyle: 'none', padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {links.map(l => (
                <li key={l.label}>
                  <a href={l.href} onClick={() => setOpen(false)}
                    style={{ fontSize: 15, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 680px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  )
}
