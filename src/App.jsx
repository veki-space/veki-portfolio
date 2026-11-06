import { useEffect, useRef, useState } from 'react'
import {
  profile,
  vekiProjects,
  personalProjects,
  services,
  skills,
  education,
  achievements,
  howIWork,
  veki,
} from './data.js'

/* ---------- Constants ---------- */

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#veki', label: 'VEKI' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
]

const STRIP_TAGS = ['WEB DEVELOPMENT', 'AI SOLUTIONS', 'DIGITAL EXPERIENCES']
const VEKI_PILLARS = ['01 / Web development', '02 / AI & automation', '03 / Digital & creative']
const CURRENT_YEAR = new Date().getFullYear()

/* ---------- Hooks ---------- */

function useScrollState(threshold = 30) {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > threshold)
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { scrolled, progress }
}

function useRevealOnce(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}

/* ---------- Small components ---------- */

function Reveal({ children, className = '', as: Tag = 'div' }) {
  const [ref, visible] = useRevealOnce()
  return (
    <Tag ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  )
}

function ExternalLink({ href, className, children }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="Likhitha home">
      <span className="nav-name">
        Likhitha<span className="brand-dot">.</span>
      </span>
    </a>
  )
}

function ProjectCard({ project, company = false }) {
  const { mark, category, title, summary, tech, url, label } = project
  return (
    <article className="project-card">
      <div className="project-mark">{mark || (company ? 'V' : 'AI')}</div>
      <div className="project-content">
        <span className="eyebrow">{category}</span>
        <h3>{title}</h3>
        <p>{summary}</p>
        {tech && (
          <p className="project-tech">
            <strong>Tech:</strong> {tech}
          </p>
        )}
        {url && (
          <ExternalLink className="text-link" href={url}>
            {label} ↗
          </ExternalLink>
        )}
      </div>
    </article>
  )
}

function TimelineItem({ title, meta, detail }) {
  return (
    <div className="timeline-item">
      <h3>{title}</h3>
      {meta && <p className="timeline-meta">{meta}</p>}
      <p>{detail}</p>
    </div>
  )
}

function SectionHeading({ eyebrow, title, children, className = '' }) {
  return (
    <Reveal className={`section-heading ${className}`.trim()}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children}
    </Reveal>
  )
}

/* ---------- Page chrome ---------- */

function Header({ scrolled }) {
  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`.trim()}>
      <Brand />
      <nav aria-label="Main navigation">
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
        <a href="#contact" className="nav-cta">
          Let's talk ↗
        </a>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer section-wrap">
      <span>Curiosity in motion · R. M. Likhitha · Co-Founder, VEKI</span>
      <span>© {CURRENT_YEAR} VEKI</span>
    </footer>
  )
}

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">
          <span className="status-dot" /> CO-FOUNDER AT VEKI
        </p>
        <h1>
          Hey, I'm <span className="gradient-text">Likhitha.</span>
          <br />
          I build things
          <br />
          that <span className="serif-italic">matter.</span>
        </h1>
        <p className="hero-description">{profile.short}</p>
        <p className="hero-note">
          <span className="hero-note-star">✳</span> Curious about ideas. Serious about making them work.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            Explore my work ↗
          </a>
          <a className="button button-ghost" href="#contact">
            Get in touch
          </a>
        </div>
        <div className="hero-meta">
          <span>Based in Mysuru, India</span>
          <span className="meta-divider" />
          <span>Web · AI/ML · Digital</span>
        </div>
      </div>

      <div className="hero-art" aria-label="VEKI visual identity">
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="portrait-card">
          <img src="/profile.jpg" alt="Likhitha" className="hero-portrait" />
          <div className="portrait-overlay">
            <span className="art-small">CO-FOUNDER · VEKI</span>
            <strong>
              Hi, I'm Likhitha<span>.</span>
            </strong>
            <span className="art-caption">Curious mind. Creative builder.</span>
          </div>
          <span className="portrait-stamp">V / 01</span>
        </div>
        <span className="art-spark spark-one">✳</span>
        <span className="art-spark spark-two">✦</span>
        <span className="art-label">CREATIVE × TECHNOLOGY</span>
      </div>
    </section>
  )
}

function IntroStrip() {
  return (
    <section className="intro-strip">
      <p>
        Curious by nature. Builders by choice. <span>People-first technology.</span>
      </p>
      <div className="strip-tags">
        {STRIP_TAGS.map((tag, i) => (
          <span key={tag} className="strip-tag-group">
            {i > 0 && <i>✳</i>}
            <span>{tag}</span>
          </span>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section-wrap about-section" id="about">
      <Reveal className="section-heading">
        <span className="eyebrow">A LITTLE ABOUT ME</span>
        <h2>
          Technology is my tool.
          <br />
          <span className="gradient-text">Creating impact is the goal.</span>
        </h2>
      </Reveal>

      <div className="about-grid">
        <Reveal>
          <p className="large-copy">{profile.intro}</p>
        </Reveal>
        <Reveal className="about-side">
          <div className="about-number">01</div>
          <h3>
            Developer by curiosity.
            <br />
            Co-founder by ambition.
          </h3>
          <p>
            I’m interested in the space where thoughtful design, useful software and emerging technology meet.
          </p>
          <ExternalLink className="text-link" href={profile.linkedin}>
            Connect on LinkedIn ↗
          </ExternalLink>
        </Reveal>
      </div>
    </section>
  )
}

function VekiSection() {
  return (
    <section className="veki-section" id="veki">
      <div className="section-wrap veki-inner">
        <Reveal>
          <span className="eyebrow light-eyebrow">THE WORK WE'RE BUILDING</span>
          <h2>
            Co-Founder at <span>VEKI.</span>
          </h2>
          <p className="veki-lead">
            VEKI brings creativity and technology together to help businesses and organisations show up, work
            smarter and grow online. From thoughtful websites to practical AI-powered ideas, we turn the “what
            if?” into a “what’s next?”.
          </p>
          <div className="veki-pillars">
            {VEKI_PILLARS.map((pillar) => (
              <span key={pillar}>{pillar}</span>
            ))}
          </div>
          <a className="button button-light" href="#contact">
            Build something with VEKI ↗
          </a>
           <a
    className="button button-outline-light"
    href="https://veki-website-8zq8.vercel.app/"
    target="_blank"
    rel="noreferrer"
  >
    Visit website ↗
  </a>
        </Reveal>

       <div className="veki-visual">
  <div className="veki-orbit" aria-hidden="true" />
  <img className="veki-logo" src="/veki-wordmark.png" alt="VEKI" />
  <div className="veki-caption" aria-hidden="true">VISION · EXECUTION · KNOW-HOW · IMPACT</div>
</div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section-wrap services-section" id="services">
      <SectionHeading eyebrow="WHAT VEKI DOES" title="Ideas, meet execution.">
        <p>
          Good ideas deserve more than a nice-looking screen. We help turn them into useful, memorable digital
          experiences.
        </p>
      </SectionHeading>

      <div className="services-grid">
        {services.map(([number, title, description, tags]) => (
          <Reveal className="service-card" key={number}>
            <span className="service-number">{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="service-tags">{tags}</span>
            <span className="service-arrow">↗</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="work-section" id="work">
      <div className="section-wrap">
        <SectionHeading eyebrow="SELECTED WORK · VEKI" title="Work we're proud of.">
          <p>
            A snapshot of digital work associated with VEKI. Client engagements and contributions are
            represented at studio level.
          </p>
        </SectionHeading>

        <div className="projects-grid">
          {vekiProjects.map((project) => (
            <ProjectCard key={project.title} project={project} company />
          ))}
        </div>

        <div className="personal-work-heading">
          <span className="eyebrow">ACADEMIC & PERSONAL PROJECTS</span>
          <h2>Things I've explored and built.</h2>
          <p>
            Experiments, coursework and team builds that have helped me grow as a developer and problem-solver.
          </p>
        </div>

        <div className="projects-grid personal-grid">
          {personalProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section-wrap skills-section" id="skills">
      <SectionHeading eyebrow="MY TOOLKIT" title="Tools I use to bring ideas to life." />

      <div className="skills-grid">
        {skills.map(([title, list], i) => (
          <Reveal className="skill-card" key={title}>
            <span className="service-number">{String(i + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{list}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="work-approach">
        <span className="eyebrow light-eyebrow">MY APPROACH</span>
        <h3>
          Understand the problem.
          <br />
          Build with purpose. Keep improving.
        </h3>
        <p>{howIWork}</p>
      </Reveal>
    </section>
  )
}

function Background() {
  return (
    <section className="section-wrap background-section">
      <div className="background-grid">
        <Reveal>
          <span className="eyebrow">EDUCATION</span>
          <h2>
            Learning that
            <br />
            keeps me moving.
          </h2>
          {education.map(([degree, school, detail]) => (
            <TimelineItem key={degree} title={degree} meta={school} detail={detail} />
          ))}
        </Reveal>

        <Reveal>
          <span className="eyebrow">MILESTONES</span>
          <h2>
            Small wins.
            <br />
            Big motivation.
          </h2>
          {achievements.map(([title, detail]) => (
            <TimelineItem key={title} title={title} detail={detail} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="section-wrap contact-grid">
        <Reveal className="contact-copy">
          <span className="eyebrow light-eyebrow">HAVE A PROJECT IN MIND?</span>
          <h2>
            Let's make
            <br />
            <span>something great.</span>
          </h2>
          <p>
            Have a big idea, a tricky problem or a collaboration in mind? Let’s start with a conversation — no
            40-slide pitch deck required.
          </p>


          <div className="contact-groups">
            <div className="contact-group">
              <h3 className="contact-group-title">Contact me</h3>
              <div className="contact-details">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <span>{profile.location}</span>
                <ExternalLink href={profile.linkedin}>LinkedIn ↗</ExternalLink>
                <ExternalLink href={profile.github}>GitHub ↗</ExternalLink>
              </div>
            </div>

            <div className="contact-group">
              <h3 className="contact-group-title">Contact VEKI</h3>
              <div className="contact-details">
                <a href={`mailto:${veki.email}`}>{veki.email}</a>
                <ExternalLink href={veki.website}>Website ↗</ExternalLink>
                <ExternalLink href={veki.github}>GitHub ↗</ExternalLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Footer />
    </section>
  )
}
/* ---------- App ---------- */

export default function App() {
  const { scrolled, progress } = useScrollState()

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <Header scrolled={scrolled} />
      <main>
        <Hero />
        <IntroStrip />
        <About />
        <VekiSection />
        <Services />
        <Work />
        <Skills />
        <Background />
        <Contact />
      </main>
    </>
  )
}