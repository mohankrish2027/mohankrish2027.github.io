import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ChevronRight, Clock, Users, Award, ArrowRight } from 'lucide-react'

import { courses } from '../data/courses'

export default function Courses() {
  const [activeId, setActiveId] = useState(courses[0].id)
  const [activeModuleIdx, setActiveModuleIdx] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const active = courses.find(c => c.id === activeId)!

  return (
    <section id="courses" ref={ref} style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '96px 32px' }}>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>
          Training Programs
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Cloud & DevOps Courses
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 48, maxWidth: 560 }}>
          9 structured training programs covering all major cloud platforms with hands-on labs and placement support.
        </motion.p>

        {/* Tab strip */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
          {courses.map(c => (
            <button key={c.id} onClick={() => { setActiveId(c.id); setActiveModuleIdx(null) }}
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: activeId === c.id ? 'var(--text)' : 'transparent',
                color: activeId === c.id ? '#fff' : 'var(--muted)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}>
              {c.title.replace(' Training Program', '').replace(' Program', '')}
            </button>
          ))}
        </motion.div>

        {/* Course Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div key={activeId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}>

            {/* Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start', marginBottom: 32, paddingBottom: 28, borderBottom: '1px solid var(--border)' }}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span className={`tag ${active.badgeColor}`}>{active.badge}</span>
                </div>
                <h3 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>{active.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 520 }}>{active.overview}</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                {[
                  { icon: Clock, label: 'Duration', value: active.duration },
                  { icon: Users, label: 'Audience', value: active.audience },
                  { icon: Award, label: 'Certification', value: active.cert },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 140 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Icon size={12} color="var(--muted)" />
                      <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>{label}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modules accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
                Curriculum · {active.modules.length} Modules
              </p>
              {active.modules.map((mod, i) => (
                <div key={i}>
                  <button
                    onClick={() => setActiveModuleIdx(activeModuleIdx === i ? null : i)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--muted)', minWidth: 24 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', textAlign: 'left' }}>{mod.title}</span>
                    </div>
                    <motion.span animate={{ rotate: activeModuleIdx === i ? 90 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronRight size={15} color="var(--muted)" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {activeModuleIdx === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}>
                        <ul style={{ padding: '14px 0 14px 36px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {mod.items.map((item, j) => (
                            <li key={j} style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                              <span style={{ color: 'var(--accent)', marginTop: 1, flexShrink: 0 }}>→</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 8, background: 'var(--text)', color: '#fff', fontWeight: 600, fontSize: 13, textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Enrol in This Course <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
