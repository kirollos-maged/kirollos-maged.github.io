import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ===== Data ===== */
const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
]

const TYPING_PHRASES = [
  'Cybersecurity Student',
  'Founder & CEO @ Program',
  'CTF Competitor',
  'Network Security Enthusiast',
  'Aspiring Security Engineer',
]

const EXPERIENCES = [
  {
    title: 'Founder & CEO — Program',
    date: 'April 2026 – Present',
    company: 'Ed-Tech Venture',
    points: [
      'Lead strategy, product roadmap, and day-to-day execution for Program, an Arabic-language e-learning platform serving Egyptian CS students and professionals.',
      'Coordinate a 4-person founding team across security, instruction, marketing, and product development while managing budgets, partnerships, and launch priorities.',
      "Design the platform's security architecture, access-control model, and dashboard analytics flow, covering 120+ controls across multiple user tiers.",
      'Define market positioning, pricing, feature prioritization, and founder equity structure, including sweat equity, vesting, and long-term growth planning.',
    ],
  },
  {
    title: 'Network Security Training',
    date: 'Aug – Sep 2026',
    company: 'National Telecommunication Institute (NTI) — 120 hr',
    points: [
      'Built deeper expertise in threat detection, network monitoring, and defensive security operations using real-world network scenarios.',
      'Studied firewall design, VPN deployment, IDS/IPS tuning, packet analysis, and secure architecture practices for enterprise environments.',
      'Strengthened operational thinking around incident response, logging, and proactive security hardening across layered infrastructures.',
    ],
  },
  {
    title: 'CCNA v7 Internship',
    date: 'Aug – Sep 2026',
    company: 'WE (Telecom Egypt) — 100 hr',
    points: [
      'Applied the CCNA v7 curriculum within a live enterprise telecom environment, covering switch and router operations in a production-oriented setting.',
      'Practiced IP addressing, subnetting, VLAN segmentation, routing fundamentals, ACLs, and network troubleshooting under supervised lab conditions.',
      'Connected theoretical networking knowledge to real infrastructure design and problem-solving in telecom systems.',
    ],
  },
  {
    title: 'ICMTC 2026 CTF Competition',
    date: 'June 2026',
    company: 'Hack The Box',
    points: [
      'Placed 30th of 87 teams by solving 19/20 challenges and earning 7,525 points in a high-pressure competitive environment.',
      'Independently solved 5 flags across multiple categories, including cryptography, reverse engineering, and system exploitation scenarios.',
      'Improved speed, teamwork, and analytical reasoning under tournament conditions while handling multi-stage security tasks.',
    ],
  },
  {
    title: 'Core Team Member — Alexandria Quantum Mini-Hackathon',
    date: 'May 2026',
    company: 'Quantum Security Track',
    points: [
      'Built a QKD prototype in Qiskit implementing the BB84 and E91 quantum key exchange protocols as part of a high-impact security concept project.',
      'Collaborated with a multidisciplinary team to translate quantum security theory into a practical, demonstrable solution.',
      "Contributed to the team's 2nd-place finish in the Quantum Security track by combining technical research, implementation, and presentation.",
    ],
  },
  {
    title: 'Cybersecurity & CTF Achievement',
    date: '2026',
    company: 'Hack The Box / LinkedIn Activity',
    points: [
      'Shared a recent CTF-focused cybersecurity milestone as part of my continuous growth in penetration testing, problem solving, and adversarial thinking.',
      'Used the experience to strengthen my technical confidence in challenge-based learning, offensive security workflows, and structured analysis.',
    ],
    link: 'https://www.linkedin.com/posts/kirollos-maged1_cybersecurity-ctf-hackthebox-activity-7488229790769106946-TX2q',
  },
  {
    title: 'Global Cyber Championship (Egyptian Qualifiers)',
    date: 'Feb 2026',
    company: 'Competitive CTF',
    points: [
      'Ranked 27th in my first competitive CTF participation, validating my ability to perform under time pressure in adversarial security scenarios.',
      'Gained early exposure to structured challenge solving across multiple categories and developed stronger problem decomposition and troubleshooting habits.',
    ],
  },
]

const PROJECTS = [
  {
    icon: 'fa-lock',
    title: 'No Way Out',
    desc: 'Security-focused challenge / CTF-style project involving cryptography and system hardening concepts.',
    tags: ['Cryptography', 'Security'],
    link: 'https://github.com/kirom8914',
  },
  {
    icon: 'fa-school',
    title: 'School Management System',
    desc: 'Database-driven desktop application for managing student records, courses, and administrative tasks using Java and SQL.',
    tags: ['Java', 'JDBC', 'SQL', 'Swing'],
    link: 'https://github.com/kirom8914',
  },
  {
    icon: 'fa-envelope-open-text',
    title: 'CN Email Client',
    desc: 'Custom email client implementation focusing on network protocols, secure communication, and GUI development.',
    tags: ['Networking', 'Java', 'GUI'],
    link: 'https://github.com/kirom8914',
  },
  {
    icon: 'fa-car',
    title: 'Car Rental System',
    desc: 'Full-featured rental management system with database backend, OOP design, and user-friendly interface.',
    tags: ['Java', 'SQL', 'OOP', 'MVC'],
    link: 'https://github.com/kirom8914',
  },
  {
    icon: 'fa-atom',
    title: 'Quantum Hackathon (QKD)',
    desc: 'Quantum Key Distribution solution built with Qiskit implementing BB84 and E91 protocols. Achieved 2nd place in Quantum Security.',
    tags: ['Qiskit', 'Quantum', 'BB84', 'E91'],
    link: 'https://github.com/kirom8914',
  },
  {
    icon: 'fa-comments',
    title: 'Cryptographic Chat',
    desc: 'Secure messaging application implementing encryption protocols for end-to-end protected communication.',
    tags: ['Cryptography', 'Python', 'Security'],
    link: 'https://github.com/kirom8914',
  },
]

const SKILLS = [
  {
    icon: 'fa-network-wired',
    title: 'Networking',
    items: ['CCNA v7 (routing, switching, VLANs, IP addressing)', 'Enterprise network troubleshooting'],
  },
  {
    icon: 'fa-shield-alt',
    title: 'Network Security',
    items: ['Firewalls, VPNs, IDS/IPS', 'Threat detection & vulnerability analysis', 'Incident response'],
  },
  {
    icon: 'fa-user-secret',
    title: 'Offensive Security',
    items: [
      'CTF: cryptography, reverse engineering',
      'Binary exploitation, digital forensics & steganography',
      'HackTheBox, CrowdSecurity',
    ],
  },
  {
    icon: 'fa-lock',
    title: 'Security Fundamentals',
    items: ['CIA Triad', 'Secure coding & input validation', 'Authentication & access control'],
  },
  {
    icon: 'fa-database',
    title: 'Databases',
    items: ['SQL, SQLite, JDBC'],
  },
  {
    icon: 'fa-code',
    title: 'Software Development',
    items: ['OOP, MVC basics', 'GUI development (Swing)', 'Python'],
  },
  {
    icon: 'fa-server',
    title: 'Backend',
    items: ['API fundamentals', 'Data handling', 'System design basics'],
  },
]

const CERTS = [
  { icon: 'fab fa-cisco', title: 'CCNA v7 Certificate', org: 'Cisco Networking Academy', date: 'Sep 2026' },
  { icon: 'fas fa-network-wired', title: 'Network Security Certificate', org: 'NTI', date: 'Sep 2026' },
  { icon: 'fas fa-certificate', title: 'ISC2 Certified in Cybersecurity (CC)', org: 'Pre-Assessment', date: 'Apr 2026' },
  { icon: 'fas fa-chart-line', title: 'McKinsey Forward Program', org: 'McKinsey.org', date: 'Dec 2025' },
  { icon: 'fas fa-shield-virus', title: 'Cybersecurity for Beginners', org: 'MaharaTech (ITI)', date: 'Nov 2025' },
  { icon: 'fas fa-globe', title: 'Digital Awareness', org: 'Cisco & OpenEDG', date: 'Oct 2025' },
  { icon: 'fas fa-user-shield', title: 'Introduction to Cybersecurity', org: 'Cisco Networking Academy', date: 'Oct 2025' },
  { icon: 'fas fa-language', title: 'EF SET English Certificate', org: 'B2 Level', date: 'Aug 2025' },
]

/* ===== Custom Hooks ===== */
function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggle }
}

function useTyping(phrases, speed = 100) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[index]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
      timeout = setTimeout(() => {}, 400)
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length + (deleting ? -1 : 1)))
      }, deleting ? 40 : speed)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, phrases, speed])

  return text
}

function useScrollSpy(sectionIds) {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 100
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollY >= top && scrollY < top + height) {
            setActive(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [sectionIds])

  return active
}

function useIntersection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

/* ===== Components ===== */
function Navbar({ theme, toggleTheme, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="logo">
          KM<span className="accent">.</span>
        </a>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeSection === link.href.slice(1) ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'} />
          </button>
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const typed = useTyping(TYPING_PHRASES)

  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">Kirollos Maged</h1>
          <h2 className="hero-title">
            <span className="typed-text">{typed}</span>
            <span className="cursor">|</span>
          </h2>
          <p className="hero-description">
            Computer Science student specializing in cybersecurity. Founder & CEO of Program — an
            Arabic-language e-learning platform. Passionate about penetration testing, secure system
            design, and CTF competitions.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline">Get In Touch</a>
          </div>
          <div className="hero-social">
            <a href="https://www.linkedin.com/in/kirollos-maged" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="https://github.com/kirom8914" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github" />
            </a>
            <a href="mailto:kirom8914@gmail.com" aria-label="Email">
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-window">
            <div className="window-header">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="window-title">security.py</span>
            </div>
            <pre className="code-content">
              <code>
                <span className="code-keyword">class</span>{' '}
                <span className="code-class">SecurityEngineer</span>:{'\n'}
                {'    '}<span className="code-keyword">def</span>{' '}
                <span className="code-function">__init__</span>(self):{'\n'}
                {'        '}self.name = <span className="code-string">"Kirollos Maged"</span>{'\n'}
                {'        '}self.role = <span className="code-string">"Cybersecurity"</span>{'\n'}
                {'        '}self.focus = [{'\n'}
                {'            '}<span className="code-string">"Penetration Testing"</span>,{'\n'}
                {'            '}<span className="code-string">"Secure Design"</span>,{'\n'}
                {'            '}<span className="code-string">"CTF Challenges"</span>{'\n'}
                {'        '}]{'\n'}
                {'\n'}
                {'    '}<span className="code-keyword">def</span>{' '}
                <span className="code-function">build</span>(self):{'\n'}
                {'        '}<span className="code-keyword">return</span>{' '}
                <span className="code-string">"Secure Systems"</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <a href="#about"><i className="fas fa-chevron-down" /></a>
      </div>
    </section>
  )
}

function FadeIn({ children, className = '', delay = 0 }) {
  const [ref, visible] = useIntersection()
  return (
    <div
      ref={ref}
      className={`fade-in ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm a Computer Science student at <strong>Alexandria National University</strong> specializing
              in Cyber Security (CGPA: 3.30). I combine hands-on experience in database-driven development
              (Java/JDBC, SQL), CTF challenge solving (cryptography, reverse engineering), and enterprise
              networking (CCNA) toward a career in security engineering.
            </p>
            <p>
              Currently leading <strong>Program</strong>, an Arabic-language e-learning platform for Egyptian
              CS students and professionals, while continuously building skills in penetration testing and
              secure system design.
            </p>
            <div className="about-stats">
              <FadeIn className="stat"><span className="stat-number">19/20</span><span className="stat-label">CTF Challenges Solved</span></FadeIn>
              <FadeIn className="stat" delay={0.1}><span className="stat-number">30th</span><span className="stat-label">of 87 Teams (ICMTC)</span></FadeIn>
              <FadeIn className="stat" delay={0.2}><span className="stat-number">2nd</span><span className="stat-label">Quantum Security</span></FadeIn>
            </div>
          </div>
          <div className="about-info">
            <FadeIn className="info-card"><i className="fas fa-map-marker-alt" /><div><h4>Location</h4><p>Alexandria, Egypt</p></div></FadeIn>
            <FadeIn className="info-card" delay={0.08}><i className="fas fa-graduation-cap" /><div><h4>Education</h4><p>BSc Computer & Data Science<br />2024 – 2028 (Expected)</p></div></FadeIn>
            <FadeIn className="info-card" delay={0.16}><i className="fas fa-briefcase" /><div><h4>Current Role</h4><p>Founder & CEO — Program</p></div></FadeIn>
            <FadeIn className="info-card" delay={0.24}><i className="fas fa-envelope" /><div><h4>Email</h4><p>kirom8914@gmail.com</p></div></FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {EXPERIENCES.map((exp, i) => (
            <FadeIn key={i} className="timeline-item" delay={i * 0.06}>
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{exp.title}</h3>
                  <span className="timeline-date">{exp.date}</span>
                </div>
                <p className="timeline-company">{exp.company}</p>
                <ul>
                  {exp.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
                {exp.link && (
                  <a href={exp.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    View LinkedIn post
                  </a>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((proj, i) => (
            <FadeIn key={i} className="project-card" delay={i * 0.08}>
              <div className="project-icon"><i className={`fas ${proj.icon}`} /></div>
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
              <div className="project-tags">
                {proj.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <a href={proj.link} target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <FadeIn key={i} className="skill-category" delay={i * 0.07}>
              <div className="skill-header">
                <i className={`fas ${skill.icon}`} />
                <h3>{skill.title}</h3>
              </div>
              <ul>
                {skill.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <h2 className="section-title">Certifications & Programs</h2>
        <div className="certs-grid">
          {CERTS.map((cert, i) => (
            <FadeIn key={i} className="cert-card" delay={i * 0.06}>
              <div className="cert-icon"><i className={cert.icon} /></div>
              <h3>{cert.title}</h3>
              <p>{cert.org}</p>
              <span className="cert-date">{cert.date}</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Languages() {
  return (
    <section className="section section-alt languages-section">
      <div className="container">
        <h2 className="section-title">Languages</h2>
        <div className="languages-grid">
          <FadeIn className="lang-card">
            <h3>Arabic</h3>
            <p>Native</p>
            <div className="lang-bar"><div className="lang-fill" style={{ width: '100%' }} /></div>
          </FadeIn>
          <FadeIn className="lang-card" delay={0.1}>
            <h3>English</h3>
            <p>Good (Technical proficiency)</p>
            <div className="lang-bar"><div className="lang-fill" style={{ width: '80%' }} /></div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = (formData.get('name') || '').toString().trim()
    const email = (formData.get('email') || '').toString().trim()
    const message = (formData.get('message') || '').toString().trim()

    if (!name || !email || !message) return

    setStatus('sending')

    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
    window.location.href = `mailto:kirom8914@gmail.com?subject=${subject}&body=${body}`

    setTimeout(() => {
      setStatus('sent')
      e.target.reset()
      setTimeout(() => setStatus('idle'), 2500)
    }, 1200)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-intro">
          I'm currently open to cybersecurity internships, security engineering roles, and collaboration
          opportunities. Feel free to reach out!
        </p>
        <div className="contact-grid">
          <div className="contact-info">
            <a href="mailto:kirom8914@gmail.com" className="contact-item">
              <i className="fas fa-envelope" />
              <div><h4>Email</h4><p>kirom8914@gmail.com</p></div>
            </a>
            <a href="tel:+201034725478" className="contact-item">
              <i className="fas fa-phone" />
              <div><h4>Phone</h4><p>+20 1034725478</p></div>
            </a>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt" />
              <div><h4>Location</h4><p>Alexandria, Egypt</p></div>
            </div>
            <div className="contact-social">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github" />
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required placeholder="your.email@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required placeholder="Your message..." />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={status !== 'idle'}>
              {status === 'idle' && 'Send Message'}
              {status === 'sending' && 'Sending...'}
              {status === 'sent' && 'Message Sent! ✓'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Kirollos Maged. Built with React & passion for cybersecurity.</p>
        <p className="footer-note">Designed & developed as a professional portfolio.</p>
      </div>
    </footer>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up" />
    </button>
  )
}

/* ===== Main App ===== */
export default function App() {
  const { theme, toggle } = useTheme()
  const activeSection = useScrollSpy([
    'home', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact',
  ])

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggle} activeSection={activeSection} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Languages />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  )
}
