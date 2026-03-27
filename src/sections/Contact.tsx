import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Mail, MessageSquare, Send } from 'lucide-react'

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
}
const stagger: Variants = { show: { transition: { staggerChildren: 0.09 } } }

const socials = [
  { icon: Mail,      label: 'Email',    href: 'mailto:Mohankrish2027@gmail.com', value: 'Mohankrish2027@gmail.com' },
  // { icon: Globe,     label: 'LinkedIn', href: 'https://linkedin.com/in/mohanakrishnan', value: 'linkedin.com/in/mohanakrishnan' },
  // { icon: MessageCircle, label: 'Twitter',  href: 'https://twitter.com/mohanakrishnan', value: 'twitter.com/mohanakrishnan' },
  { icon: MessageSquare, label: 'WhatsApp', href: 'https://wa.me/918248095167', value: 'WhatsApp / Direct Call' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder – wire to your preferred form backend
    setSent(true)
  }

  return (
    <section id="contact" ref={ref} style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '96px 32px 80px' }}>

        {/* Big CTA heading */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ marginBottom: 72 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
            Contact
          </p>
          <h2 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, maxWidth: 700 }}>
            Let's build something{' '}
            <span style={{ color: 'var(--accent)' }}>together.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--muted)', marginTop: 20, maxWidth: 500, lineHeight: 1.7 }}>
            Whether you're looking to enrol in a training program, need cloud architecture guidance, or want career support — I'd love to hear from you.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px 80px' }}>

          {/* Contact form */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            {!sent ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { id: 'name',    label: 'Your Name',    type: 'text',  placeholder: 'Mohan Kumar' },
                  { id: 'email',   label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                ].map(f => (
                  <motion.div key={f.id} variants={fade} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label htmlFor={f.id} style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{f.label}</label>
                    <input
                      id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} required
                      style={{
                        padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)',
                        background: 'var(--bg)', fontSize: 14, color: 'var(--text)', outline: 'none',
                        fontFamily: 'inherit', transition: 'border-color 0.2s',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </motion.div>
                ))}

                <motion.div variants={fade} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="interest" style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Interested In</label>
                  <select id="interest" name="interest"
                    style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', fontSize: 14, color: 'var(--text)', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}>
                    <option>AWS Training Program</option>
                    <option>Azure Training Program</option>
                    <option>GCP Training Program</option>
                    <option>OCI Training Program</option>
                    <option>AWS + DevOps Combo</option>
                    <option>Azure + DevOps Combo</option>
                    <option>GCP + DevOps Combo</option>
                    <option>OCI + DevOps Combo</option>
                    <option>DevOps Foundation (30 Days)</option>
                    <option>Job Support</option>
                    <option>Placement Support</option>
                    <option>Cloud Architecture Consulting</option>
                  </select>
                </motion.div>

                <motion.div variants={fade} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="message" style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Message</label>
                  <textarea id="message" name="message" placeholder="Tell me about your background and goals…" rows={4}
                    style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', fontSize: 14, color: 'var(--text)', fontFamily: 'inherit', resize: 'vertical', outline: 'none', transition: 'border-color 0.2s', lineHeight: 1.6 }}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </motion.div>

                <motion.div variants={fade}>
                  <button type="submit"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 8, background: 'var(--text)', color: '#fff', fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                    Send Message <Send size={14} />
                  </button>
                </motion.div>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ padding: '32px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg)', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Message sent!</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)' }}>I'll get back to you within 24 hours.</p>
              </motion.div>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <motion.p variants={fade} style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
              Reach me directly
            </motion.p>
            {socials.map((s, i) => (
              <motion.a key={i} variants={fade} href={s.href} target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg)', textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                <s.icon size={15} color="var(--muted)" />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{s.value}</div>
                </div>
              </motion.a>
            ))}

            {/* Availability note */}
            <motion.div variants={fade}
              style={{ marginTop: 16, padding: '16px', borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 10, marginTop: 2 }}>🟢</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1d4ed8', marginBottom: 3 }}>Currently Available</div>
                  <div style={{ fontSize: 12, color: '#2563eb', lineHeight: 1.5 }}>
                    Open to new training batches, consulting engagements, and job/placement support.
                    Response time: within 24 hours.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '24px 32px', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>
            © 2026 Mohanakrishnan Thiyagarajan. All rights reserved.
          </span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            Cloud Architect · Educator · Trainer
          </span>
        </div>
      </div>
    </section>
  )
}
