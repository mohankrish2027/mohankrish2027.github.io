import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
}
const stagger: Variants = { show: { transition: { staggerChildren: 0.1 } } }

// Animated counter
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      let start = 0
      const step = () => {
        start += Math.ceil(target / 60)
        if (start >= target) { setCount(target); return }
        setCount(start)
        requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80 }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '80px 32px', width: '100%' }}>
        <motion.div variants={stagger} initial="hidden" animate="show">

          {/* Location tag */}
          <motion.div variants={fade} style={{ marginBottom: 32 }}>
            <span className="tag">
              <MapPin size={10} />
              Chennai, India · Available for consulting
            </span>
          </motion.div>

          {/* Name + Headline */}
          <motion.h1 variants={fade} style={{ fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 28, maxWidth: 780 }}>
            Mohanakrishnan
            <br />
            <span style={{ color: 'var(--muted)', fontWeight: 400 }}>Thiyagarajan</span>
          </motion.h1>

          {/* Role line */}
          <motion.p variants={fade} style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'var(--muted)', maxWidth: 600, lineHeight: 1.7, marginBottom: 40 }}>
            Cloud Engineer & Educator with <strong style={{ color: 'var(--text)' }}>10+ years</strong> of experience architecting
            enterprise-grade cloud infrastructure across AWS, Azure, GCP & OCI.
            Teaching professionals how to build, automate, and scale with confidence.
          </motion.p>

          {/* Stats row */}
          <motion.div variants={fade} style={{ display: 'flex', flexWrap: 'wrap', gap: '32px 48px', marginBottom: 48 }}>
            {[
              { value: 10,   suffix: '+', label: 'Years in IT' },
              { value: 5,    suffix: '+', label: 'Years Teaching' },
              { value: 2000, suffix: '+', label: 'Students Trained' },
              { value: 9,    suffix: '',  label: 'Training Programs' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1 }}>
                  <Counter target={s.value} />{s.suffix}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, fontWeight: 500, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fade} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a href="#courses"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 22px', borderRadius: 10, background: 'var(--text)', color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              Explore Courses <ArrowRight size={15} />
            </a>
            <a href="#contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 22px', borderRadius: 10, border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600, fontSize: 14, textDecoration: 'none', background: 'var(--surface)', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
              Book a Session
            </a>
          </motion.div>
        </motion.div>

        {/* Horizontal rule */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
          style={{ height: 1, background: 'var(--border)', transformOrigin: 'left', marginTop: 72 }} />
      </div>
    </section>
  )
}
