import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
}
const stagger: Variants = { show: { transition: { staggerChildren: 0.1 } } }

const services = [
  {
    category: 'Job Support',
    tag: 'For Working Professionals',
    tagColor: 'blue' as const,
    headline: 'Real-time Troubleshooting &\nArchitecture Review',
    description: 'Stuck on a production issue? Need a second set of expert eyes on your cloud architecture? I provide dedicated 1-on-1 job support for professionals working on live projects.',
    points: [
      'Live debugging sessions via screen share',
      'Cloud architecture review & cost optimisation',
      'CI/CD pipeline troubleshooting',
      'Kubernetes workload debugging',
      'Security audit & remediation guidance',
      'Weekly check-in sessions available',
    ],
  },
  {
    category: 'Placement Support',
    tag: 'For Job Seekers',
    tagColor: 'green' as const,
    headline: 'End-to-End Career\nLaunch Support',
    description: 'Beyond technical skills, I help you package your expertise and land the right role. From resume to offer letter — full support for cloud and DevOps roles.',
    points: [
      'ATS-optimised cloud engineer resume design',
      'LinkedIn profile optimisation with keywords',
      'Mock technical interviews (HR + Technical rounds)',
      'Real-world scenario & case-study practice',
      'Project portfolio building on GitHub',
      'Job referral network & application strategy',
    ],
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="services" ref={ref}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '96px 32px' }}>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>
          Services
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 48 }}>
          How I Support You
        </motion.h2>

        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>

          {services.map((s, i) => (
            <motion.div key={i} variants={fade} data-hover
              whileHover={{ y: -3, boxShadow: '0 16px 48px rgba(0,0,0,0.07)' }}
              style={{
                padding: '32px',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                transition: 'box-shadow 0.3s',
              }}>
              <span className={`tag ${s.tagColor}`} style={{ marginBottom: 20, display: 'inline-block' }}>{s.tag}</span>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
                {s.category}
              </p>
              <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 14, whiteSpace: 'pre-line' }}>
                {s.headline}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24 }}>{s.description}</p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {s.points.map((p, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--muted)' }}>
                    <CheckCircle size={14} color={s.tagColor === 'blue' ? 'var(--accent)' : 'var(--accent-em)'} style={{ flexShrink: 0, marginTop: 1 }} />
                    {p}
                  </li>
                ))}
              </ul>

              <a href="#contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: s.tagColor === 'blue' ? 'var(--accent)' : 'var(--accent-em)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.gap = '10px')}
                onMouseLeave={e => (e.currentTarget.style.gap = '6px')}>
                Get Started <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
