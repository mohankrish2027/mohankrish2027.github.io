import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ChevronRight, Clock, Users, Award, ArrowRight } from 'lucide-react'

const courses = [
  {
    id: 'aws',
    title: 'AWS Cloud Training Program',
    badge: 'Most Popular',
    badgeColor: 'blue' as const,
    duration: '45 Days',
    audience: 'Beginners to Advanced',
    cert: 'AWS Solutions Architect / Developer',
    overview: 'A complete, hands-on AWS cloud program designed to take you from cloud fundamentals to architecting production-grade solutions. Covers all major AWS services with real-world labs and projects.',
    modules: [
      { title: 'Cloud Fundamentals & AWS Overview', items: ['Cloud computing models (IaaS, PaaS, SaaS)', 'AWS Global Infrastructure', 'IAM – Users, Groups, Roles, Policies', 'AWS Free Tier & Cost Management'] },
      { title: 'Compute & Networking', items: ['EC2 – Instance Types, AMIs, Auto Scaling', 'VPC – Subnets, Route Tables, NAT, IGW', 'Elastic Load Balancing (ALB, NLB)', 'Route 53 – DNS & Routing Policies'] },
      { title: 'Storage & Databases', items: ['S3 – Buckets, Versioning, Lifecycle, Replication', 'EBS, EFS, FSx Storage Options', 'RDS, Aurora, DynamoDB', 'ElastiCache & Redshift'] },
      { title: 'Serverless & Application Services', items: ['Lambda – Functions, Triggers, Layers', 'API Gateway, SQS, SNS, EventBridge', 'Step Functions & AppSync', 'CloudFront CDN & WAF'] },
      { title: 'DevOps & Automation on AWS', items: ['CodeCommit, CodeBuild, CodeDeploy, CodePipeline', 'CloudFormation & CDK (Infrastructure as Code)', 'Systems Manager & Config', 'CloudWatch Monitoring & CloudTrail Audit'] },
      { title: 'Security & Compliance', items: ['AWS Security Hub, GuardDuty, Inspector', 'KMS, Secrets Manager, Certificate Manager', 'VPC Security Groups & NACLs', 'AWS Well-Architected Framework'] },
    ],
  },
  {
    id: 'aws-devops',
    title: 'AWS Cloud + DevOps Program',
    badge: 'Combo Course',
    badgeColor: 'green' as const,
    duration: '60 Days',
    audience: 'Intermediate – IT Professionals',
    cert: 'AWS DevOps Engineer Professional',
    overview: 'Combines core AWS cloud skills with a full DevOps engineering track. Master CI/CD, Kubernetes on EKS, Terraform, and advanced monitoring to become a complete cloud DevOps professional.',
    modules: [
      { title: 'AWS Foundation (Weeks 1–2)', items: ['EC2, VPC, IAM, S3, RDS essentials', 'Auto Scaling Groups & Load Balancers', 'Monitoring with CloudWatch & SNS alerts'] },
      { title: 'DevOps Core Principles', items: ['DevOps culture, SDLC, and Agile practices', 'Git & GitHub – branching strategies, pull requests', 'Linux fundamentals for DevOps engineers'] },
      { title: 'CI/CD Pipeline Engineering', items: ['Jenkins – pipelines, plugins, agents, shared libraries', 'AWS CodePipeline end-to-end automation', 'SonarQube, Trivy – code & container security scans'] },
      { title: 'Containerisation & Kubernetes', items: ['Docker – Dockerfile, multi-stage builds, Docker Compose', 'Kubernetes architecture – Pods, Deployments, Services', 'Amazon EKS – cluster setup, node groups, AutoScaler', 'Helm charts for application packaging & deployment'] },
      { title: 'Infrastructure as Code', items: ['Terraform – providers, resources, state management, modules', 'AWS CDK basics', 'Ansible – playbooks, roles, inventory management'] },
      { title: 'Monitoring & Observability', items: ['Prometheus + Grafana stack on EKS', 'AWS CloudWatch Container Insights', 'ELK Stack (Elasticsearch, Logstash, Kibana)', 'Alerting, dashboards & on-call runbooks'] },
    ],
  },
  {
    id: 'azure',
    title: 'Azure Cloud Training Program',
    badge: 'Enterprise Ready',
    badgeColor: 'blue' as const,
    duration: '45 Days',
    audience: 'Beginners to Advanced',
    cert: 'AZ-900 / AZ-104 / AZ-204',
    overview: 'A comprehensive Microsoft Azure program covering compute, networking, storage, identity, and enterprise governance. Aligned with Microsoft certification paths for real-world enterprise roles.',
    modules: [
      { title: 'Azure Fundamentals', items: ['Azure portal, subscriptions & resource groups', 'Azure Active Directory & Entra ID', 'RBAC – Role-Based Access Control', 'Azure Cost Management & Pricing Calculator'] },
      { title: 'Compute & Networking', items: ['Virtual Machines, Availability Sets & Zones', 'Azure Virtual Network, NSGs, Peering', 'Azure Bastion, VPN Gateway, ExpressRoute', 'Azure DNS & Traffic Manager'] },
      { title: 'Azure Storage & Databases', items: ['Blob Storage, File Shares, Queues, Tables', 'Azure SQL Database & Managed Instance', 'Cosmos DB – multi-model, global distribution', 'Azure Cache for Redis'] },
      { title: 'App Services & Serverless', items: ['Azure App Service Plans & Web Apps', 'Azure Functions – HTTP, Timer, Blob triggers', 'Logic Apps & Event Grid', 'Azure API Management & Service Bus'] },
      { title: 'Kubernetes & DevOps on Azure', items: ['Azure Kubernetes Service (AKS)', 'Azure Container Registry (ACR)', 'Azure DevOps – Repos, Pipelines, Boards', 'Azure Monitor, Log Analytics & Application Insights'] },
      { title: 'Security & Governance', items: ['Microsoft Defender for Cloud', 'Azure Key Vault & Managed Identities', 'Azure Policy & Blueprints', 'Compliance, GDPR & Azure Security Benchmark'] },
    ],
  },
  {
    id: 'azure-devops',
    title: 'Azure Cloud + DevOps Program',
    badge: 'Combo Course',
    badgeColor: 'green' as const,
    duration: '60 Days',
    audience: 'Intermediate – IT Professionals',
    cert: 'AZ-400 DevOps Engineer Expert',
    overview: 'Full-stack Azure + DevOps program combining AKS, Azure DevOps pipelines, Terraform, Helm, and enterprise-grade monitoring to prepare you for senior DevOps Engineer roles.',
    modules: [
      { title: 'Azure Core Services', items: ['VMs, App Services, ACI, AKS overview', 'Networking: VNet, NSG, Load Balancer', 'Storage & Identity fundamentals'] },
      { title: 'Azure DevOps Platform', items: ['Azure Repos – Git workflows & branch policies', 'Azure Pipelines – YAML pipelines, build agents', 'Azure Artifacts & Package Management', 'Azure Boards – Kanban, sprints, work items'] },
      { title: 'CI/CD & Automation', items: ['End-to-end pipeline: source → build → test → deploy', 'Blue-green & canary deployments on AKS', 'Infrastructure pipeline with Terraform & Azure DevOps'] },
      { title: 'Kubernetes on Azure (AKS)', items: ['AKS cluster provisioning & upgrade management', 'Ingress controllers, cert-manager, TLS termination', 'Horizontal Pod Autoscaler & KEDA', 'Persistent volumes with Azure Disk & Files'] },
      { title: 'Monitoring & Observability', items: ['Azure Monitor & Log Analytics Workspace', 'Application Insights – distributed tracing', 'Prometheus + Grafana on AKS', 'Alerts, dashboards & SLA reporting'] },
      { title: 'Security & DevSecOps', items: ['Microsoft Defender for DevOps', 'SAST with SonarQube, DAST scanning', 'Secret management with Azure Key Vault in pipelines', 'OWASP top 10 for cloud applications'] },
    ],
  },
  {
    id: 'gcp',
    title: 'GCP Cloud Training Program',
    badge: 'Google Cloud',
    badgeColor: 'blue' as const,
    duration: '45 Days',
    audience: 'Beginners to Advanced',
    cert: 'Associate Cloud Engineer / PCA',
    overview: 'Deep-dive into Google Cloud Platform covering cloud-native architecture, GKE, BigQuery, and Google\'s AI/ML services. Aligned with Google Cloud certification tracks.',
    modules: [
      { title: 'GCP Fundamentals', items: ['GCP console, projects, billing accounts', 'IAM – Service Accounts, roles, permissions', 'Cloud SDK & gcloud CLI', 'GCP pricing models & Committed Use Discounts'] },
      { title: 'Compute & Networking', items: ['Compute Engine – instances, templates, managed groups', 'VPC networks, firewall rules, shared VPC', 'Cloud Load Balancing (HTTP, TCP, SSL)', 'Cloud DNS & Cloud Armor (DDoS protection)'] },
      { title: 'Storage & Databases', items: ['Cloud Storage – buckets, IAM, lifecycle rules', 'Cloud SQL, Cloud Spanner, Bigtable', 'Firestore, Datastore, Memorystore (Redis)', 'BigQuery – data warehouse & analytics'] },
      { title: 'Serverless & Event-Driven', items: ['Cloud Functions (Gen1 & Gen2)', 'Cloud Run – containerised serverless', 'Pub/Sub – messaging & integrations', 'Cloud Scheduler & Cloud Tasks'] },
      { title: 'GKE & DevOps on GCP', items: ['Google Kubernetes Engine – Autopilot vs Standard', 'Cloud Build CI/CD, Artifact Registry', 'Cloud Deploy – continuous delivery', 'Config Management with GitOps (Config Sync)'] },
      { title: 'Observability & Security', items: ['Cloud Monitoring, Cloud Logging, Error Reporting', 'Cloud Trace & Profiler', 'Security Command Center', 'Binary Authorization & Container Analysis'] },
    ],
  },
  {
    id: 'gcp-devops',
    title: 'GCP Cloud + DevOps Program',
    badge: 'Combo Course',
    badgeColor: 'green' as const,
    duration: '60 Days',
    audience: 'Intermediate – IT Professionals',
    cert: 'Professional Cloud DevOps Engineer',
    overview: 'Combines GCP fundamentals with advanced DevOps engineering on Google Cloud. Master GKE, Cloud Build, Terraform, and SRE practices for production-grade cloud systems.',
    modules: [
      { title: 'GCP Core Services', items: ['GCE, GCS, Cloud SQL, VPC essentials', 'IAM, Service Accounts & org policies', 'Cloud Run & App Engine overview'] },
      { title: 'DevOps Toolchain on GCP', items: ['Cloud Source Repositories & GitHub integration', 'Cloud Build – triggers, steps, caching', 'Artifact Registry for container & package storage', 'Cloud Deploy – managed release pipelines'] },
      { title: 'Kubernetes on GKE', items: ['GKE cluster architecture & node pools', 'Workload Identity & Pod Security', 'Horizontal & Vertical Pod Autoscaling', 'Anthos Service Mesh (Istio)'] },
      { title: 'Infrastructure as Code on GCP', items: ['Terraform with GCP provider', 'Config Connector (Kubernetes-native GCP resources)', 'Deployment Manager comparison', 'GitOps with Config Sync & ArgoCD'] },
      { title: 'SRE & Reliability Engineering', items: ['SLIs, SLOs, Error Budgets', 'Incident management & postmortem culture', 'Chaos Engineering principles', 'Cloud Monitoring advanced alerting'] },
      { title: 'Security & Compliance on GCP', items: ['VPC Service Controls & organisation policies', 'Cloud KMS, Cloud HSM, Secret Manager', 'Binary Authorization for supply chain security', 'DAST/SAST integration in Cloud Build'] },
    ],
  },
  {
    id: 'oci',
    title: 'OCI Cloud Training Program',
    badge: 'Oracle Cloud',
    badgeColor: 'blue' as const,
    duration: '45 Days',
    audience: 'Beginners to Advanced',
    cert: 'OCI Foundations / Architect Associate',
    overview: 'Comprehensive Oracle Cloud Infrastructure training covering compute, storage, networking, databases, and OCI-native DevOps tooling for enterprise cloud professionals.',
    modules: [
      { title: 'OCI Fundamentals', items: ['OCI Console, tenancy, compartments', 'IAM – users, groups, dynamic groups, policies', 'OCI Free Tier & cost management', 'OCI CLI & SDK setup'] },
      { title: 'Compute & Networking', items: ['Bare Metal, VM, & Dedicated VM Hosts', 'VCN – subnets, gateways, security lists, NSGs', 'OCI Load Balancer (flexible & network)', 'FastConnect & Site-to-Site VPN'] },
      { title: 'Storage Solutions', items: ['Block Volume, Object Storage, File Storage', 'Object storage lifecycle & replication', 'Vault – key & secret management', 'Data Transfer & Storage Gateway'] },
      { title: 'Database Services', items: ['Oracle Autonomous Database (ATP, ADW)', 'Oracle Database System (Exadata, RAC)', 'MySQL HeatWave & NoSQL Database', 'GoldenGate – real-time data replication'] },
      { title: 'OCI DevOps & Container Services', items: ['OCI DevOps – code repos, build pipelines, deploy', 'OCI Container Registry (OCIR)', 'Oracle Kubernetes Engine (OKE)', 'OCI Functions (serverless)'] },
      { title: 'Observability & Security', items: ['OCI Monitoring, Logging & Notifications', 'Logging Analytics & Application Performance', 'Cloud Guard & Security Zones', 'Vulnerability Scanning & Bastion service'] },
    ],
  },
  {
    id: 'oci-devops',
    title: 'OCI Cloud + DevOps Program',
    badge: 'Combo Course',
    badgeColor: 'green' as const,
    duration: '60 Days',
    audience: 'Intermediate – IT Professionals',
    cert: 'OCI DevOps Professional',
    overview: 'Full OCI + DevOps journey combining Oracle Cloud infrastructure with modern DevOps engineering — CI/CD pipelines, OKE, Terraform and OCI DevOps service.',
    modules: [
      { title: 'OCI Core Services Recap', items: ['Compute, Networking, Storage, IAM', 'Key OCI services for DevOps context', 'OCI CLI & Terraform provider setup'] },
      { title: 'OCI DevOps Service', items: ['Code Repository (Git)', 'Build Pipeline – managed build runners', 'Deploy Pipeline – blue-green, canary strategies', 'Triggers & integrations with GitHub/GitLab'] },
      { title: 'Kubernetes on OKE', items: ['Oracle Kubernetes Engine cluster setup', 'Node pool management & autoscaling', 'Persistent volume with OCI Block Volumes', 'Ingress with OCI Load Balancer'] },
      { title: 'Infrastructure as Code', items: ['Terraform on OCI – state, modules, workspaces', 'Resource Manager (OCI-native Terraform)', 'Ansible for configuration management on OCI'] },
      { title: 'Monitoring & Alerting', items: ['OCI Monitoring service – metrics, alarms', 'Logging & Log Analytics', 'Application Performance Monitoring (APM)', 'Grafana integration with OCI'] },
      { title: 'Security automation', items: ['Cloud Guard – detector & responder rules', 'Vulnerability scanning in OCI DevOps pipelines', 'OCI Vault in CI/CD for secret injection', 'Security Zones & maximum security compartments'] },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps Foundation Program',
    badge: 'Bestseller',
    badgeColor: 'green' as const,
    duration: '30 Days',
    audience: 'Freshers & Career Switchers',
    cert: 'DevOps Foundation Certificate',
    overview: 'An intensive 30-day bootcamp covering the complete DevOps toolchain from Git to Kubernetes. Perfect for freshers and professionals transitioning into DevOps roles.',
    modules: [
      { title: 'DevOps Culture & Linux Basics', items: ['What is DevOps – culture, principles, metrics', 'Linux commands, shell scripting essentials', 'SSH, file permissions, process management', 'Package management (apt/yum)'] },
      { title: 'Version Control with Git', items: ['Git init, clone, commit, push, pull', 'Branching strategies (Git Flow, trunk-based)', 'Pull Requests, code reviews & merge conflicts', 'GitHub Actions overview'] },
      { title: 'CI/CD with Jenkins', items: ['Jenkins architecture – master, agents, executors', 'Declarative pipeline syntax (Jenkinsfile)', 'Build triggers, parameters & shared libraries', 'Integrating SonarQube & Trivy scans'] },
      { title: 'Docker & Containers', items: ['Container concepts vs VMs', 'Dockerfile – layers, caching, multi-stage builds', 'Docker Compose for multi-service apps', 'Container registries – Docker Hub, ECR, ACR'] },
      { title: 'Kubernetes Fundamentals', items: ['Kubernetes architecture – control plane & worker nodes', 'Pods, ReplicaSets, Deployments, Services', 'ConfigMaps, Secrets, Namespaces', 'kubectl commands & YAML manifest writing'] },
      { title: 'Monitoring & Real Projects', items: ['Prometheus metrics & Grafana dashboards', 'Alertmanager – routing & silencing alerts', 'End-to-end project: app → CI/CD → Kubernetes', 'Resume & interview preparation'] },
    ],
  },
]

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
