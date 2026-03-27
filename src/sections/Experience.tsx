import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'
import { Cloud, BookOpen, Server, Shield, Terminal, GitBranch } from 'lucide-react'

const fade: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
}
const stagger = (delay = 0): Variants => ({ show: { transition: { staggerChildren: 0.08, delayChildren: delay } } })

const timeline = [
  {
    period: '2024 – Present',
    role: 'Cloud Architect & Trainer',
    company: 'Independent Consultant',
    desc: 'Delivering enterprise cloud architecture consulting and hands-on training programs for AWS, Azure, GCP, and OCI platforms.',
    tags: ['AWS', 'Azure', 'GCP', 'OCI'],
  },
  {
    period: '2020 – 2024',
    role: 'Senior Cloud Engineer',
    company: 'IT Industry',
    desc: 'Designed and managed large-scale cloud infrastructure, implemented CI/CD pipelines, and led DevOps transformation initiatives across multiple enterprise clients.',
    tags: ['Kubernetes', 'Terraform', 'DevOps'],
  },
  {
    period: '2018 – 2020',
    role: 'Cloud Infrastructure Engineer',
    company: 'IT Industry',
    desc: 'Built and maintained multi-cloud environments, automated infrastructure provisioning, and implemented security best practices across cloud platforms.',
    tags: ['Cloud Migration', 'IaC', 'Security'],
  },
  {
    period: '2015 – 2018',
    role: 'Systems & Network Engineer',
    company: 'IT Industry',
    desc: 'Managed on-premise data centre infrastructure, server virtualisation, and network administration before transitioning to cloud-first architecture.',
    tags: ['VMware', 'Linux', 'Networking'],
  },
]

const skills = [
  { icon: Cloud,    label: 'Cloud Platforms',   items: ['AWS', 'Azure', 'GCP', 'OCI'] },
  { icon: Terminal, label: 'DevOps & Automation', items: ['Terraform', 'Ansible', 'Jenkins', 'GitHub Actions'] },
  { icon: Server,   label: 'Containers',          items: ['Docker', 'Kubernetes', 'Helm', 'EKS/AKS/GKE'] },
  { icon: GitBranch,label: 'CI/CD',               items: ['Jenkins', 'GitLab CI', 'Azure DevOps', 'ArgoCD'] },
  { icon: Shield,   label: 'Security & DevSecOps', items: ['IAM', 'RBAC', 'Trivy', 'SonarQube'] },
  { icon: BookOpen, label: 'Delivery & Teaching',  items: ['LMS Design', 'Curriculum Dev', 'Live Coaching', 'Mock Interviews'] },
]

function Section({ children, id }: { children: React.ReactNode; id: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id={id} ref={ref}>
      <motion.div variants={stagger()} initial="hidden" animate={inView ? 'show' : 'hidden'}>
        {children}
      </motion.div>
    </section>
  )
}

export default function Experience() {
  return (
    <Section id="experience">
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '96px 32px' }}>

        {/* Section Label */}
        <motion.p variants={fade} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>
          Experience
        </motion.p>
        <motion.h2 variants={fade} style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 64 }}>
          10+ Years Building in the Cloud
        </motion.h2>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px 64px' }}>

          {/* Timeline */}
          <div>
            <motion.p variants={fade} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 32 }}>
              Work History
            </motion.p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {timeline.map((t, i) => (
                <motion.div key={i} variants={fade}
                  style={{ paddingLeft: 16, borderLeft: '2px solid var(--border)' }}
                  data-hover>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4, fontFamily: 'monospace' }}>{t.period}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{t.role}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{t.company}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 10 }}>{t.desc}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {t.tags.map(tag => (
                      <span key={tag} className="tag blue">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills grid */}
          <div>
            <motion.p variants={fade} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 32 }}>
              Technical Skills
            </motion.p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {skills.map((s, i) => (
                <motion.div key={i} variants={fade}
                  data-hover
                  style={{
                    padding: '18px 16px',
                    borderRadius: 10,
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    cursor: 'default',
                    transition: 'box-shadow 0.25s, transform 0.25s',
                  }}
                  whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <s.icon size={15} color="var(--accent)" />
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '-0.01em' }}>{s.label}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {s.items.map(item => (
                      <span key={item} style={{ fontSize: 12, color: 'var(--muted)' }}>{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Cloud Provider Logos row */}
        <motion.div variants={fade} style={{ marginTop: 72, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 24 }}>
            Platforms I Work With
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
            {['AWS', 'Microsoft Azure', 'Google Cloud', 'Oracle Cloud', 'Kubernetes', 'Terraform', 'Docker'].map(p => (
              <span key={p} style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)', letterSpacing: '-0.01em', transition: 'color 0.2s', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
