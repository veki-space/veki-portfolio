import { useEffect, useRef, useState } from 'react'
import { profile, vekiProjects, personalProjects, services, skills, education, achievements, howIWork } from './data.js'

function Reveal({ children, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>{children}</Tag>
}

function VekiLogo({ footer = false }) {
  return (
    <a className={`brand ${footer ? 'footer-brand' : ''}`} href="#home" aria-label={footer ? 'VEKI home' : 'Likhitha home'}>
      {footer ? (
        <img className="brand-wordmark" src="/veki-wordmark.png" alt="VEKI" />
      ) : (
        <span className="nav-name">Likhitha<span className="brand-dot">.</span></span>
      )}
    </a>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const update = (key) => (event) => setForm(current => ({ ...current, [key]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    const body = `${form.message}\n\nFrom: ${form.name} (${form.email})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`VEKI enquiry from ${form.name}`)}&body=${encodeURIComponent(body)}`
  }
  return <form className="contact-form" onSubmit={submit}>
    <label>Your name<input required value={form.name} onChange={update('name')} placeholder="Enter your name" /></label>
    <label>Email address<input required type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" /></label>
    <label>How can we help?<textarea required rows="5" value={form.message} onChange={update('message')} placeholder="Tell me a little about your project..." /></label>
    <button className="button button-primary" type="submit">Send an enquiry ↗</button>
    <p className="form-note">This opens your email app with the enquiry prepared.</p>
  </form>
}

function ProjectCard({ project, company = false }) {
  return <article className="project-card">
    <div className="project-mark">{project.mark || (company ? 'V' : 'AI')}</div>
    <div className="project-content">
      <span className="eyebrow">{project.category}</span>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      {project.tech && <p className="project-tech"><strong>Tech:</strong> {project.tech}</p>}
      {project.url && <a className="text-link" href={project.url} target="_blank" rel="noreferrer">{project.label} ↗</a>}
    </div>
  </article>
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <>
    <div className="scroll-progress" style={{ width: `${progress}%` }} />
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <VekiLogo />
      <nav aria-label="Main navigation">
        <a href="#about">About</a><a href="#veki">VEKI</a><a href="#work">Work</a><a href="#skills">Skills</a><a href="#contact" className="nav-cta">Let's talk ↗</a>
      </nav>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="status-dot" /> CO-FOUNDER AT VEKI</p>
          <h1>Hey, I'm <span className="gradient-text">Likhitha.</span><br />I build things<br />that <span className="serif-italic">matter.</span></h1>
          <p className="hero-description">{profile.short}</p><p className="hero-note"><span className="hero-note-star">✳</span> Curious about ideas. Serious about making them work.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work ↗</a><a className="button button-ghost" href="#contact">Get in touch</a></div>
          <div className="hero-meta"><span>Based in Mysuru, India</span><span className="meta-divider" /><span>Web · AI/ML · Digital</span></div>
        </div>
        <div className="hero-art" aria-label="VEKI visual identity"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="portrait-card">
          <img src="/profile.jpg" alt="Likhitha" className="hero-portrait" />
          <div className="portrait-overlay">
            <span className="art-small">CO-FOUNDER · VEKI</span>
            <strong>Hi, I'm Likhitha<span>.</span></strong>
            <span className="art-caption">Curious mind. Creative builder.</span>
          </div>
          <span className="portrait-stamp">V / 01</span>
        </div><span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✦</span><span className="art-label">CREATIVE × TECHNOLOGY</span></div>
      </section>

      <section className="intro-strip"><p>Curious by nature. Builders by choice. <span>People-first technology.</span></p><div className="strip-tags"><span>WEB DEVELOPMENT</span><i>✳</i><span>AI SOLUTIONS</span><i>✳</i><span>DIGITAL EXPERIENCES</span></div></section>

      <section className="section-wrap about-section" id="about">
        <Reveal className="section-heading"><span className="eyebrow">A LITTLE ABOUT ME</span><h2>Technology is my tool.<br /><span className="gradient-text">Creating impact is the goal.</span></h2></Reveal>
        <div className="about-grid"><Reveal><p className="large-copy">{profile.intro}</p></Reveal><Reveal className="about-side"><div className="about-number">01</div><h3>Developer by curiosity.<br />Co-founder by ambition.</h3><p>I’m interested in the space where thoughtful design, useful software and emerging technology meet.</p><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a></Reveal></div>
      </section>

      <section className="veki-section" id="veki"><div className="section-wrap veki-inner"><Reveal><span className="eyebrow light-eyebrow">THE WORK WE'RE BUILDING</span><h2>Co-Founder at <span>VEKI.</span></h2><p className="veki-lead">VEKI brings creativity and technology together to help businesses and organisations show up, work smarter and grow online. From thoughtful websites to practical AI-powered ideas, we turn the “what if?” into a “what’s next?”.</p><div className="veki-pillars"><span>01 / Web development</span><span>02 / AI & automation</span><span>03 / Digital & creative</span></div><a className="button button-light" href="#contact">Build something with VEKI ↗</a></Reveal><div className="veki-visual" aria-hidden="true"><div className="veki-big-v">V</div><div className="veki-orbit"/><div className="veki-caption">VISION · EXECUTION · KNOW-HOW · IMPACT</div></div></div></section>

      <section className="section-wrap services-section" id="services"><Reveal className="section-heading"><span className="eyebrow">WHAT VEKI DOES</span><h2>Ideas, meet execution.</h2><p>Good ideas deserve more than a nice-looking screen. We help turn them into useful, memorable digital experiences.</p></Reveal><div className="services-grid">{services.map(([n, title, desc, tags]) => <Reveal className="service-card" key={n}><span className="service-number">{n}</span><h3>{title}</h3><p>{desc}</p><span className="service-tags">{tags}</span><span className="service-arrow">↗</span></Reveal>)}</div></section>

      <section className="work-section" id="work"><div className="section-wrap"><Reveal className="section-heading"><span className="eyebrow">SELECTED WORK · VEKI</span><h2>Work we're proud of.</h2><p>A snapshot of digital work associated with VEKI. Client engagements and contributions are represented at studio level.</p></Reveal><div className="projects-grid">{vekiProjects.map(p => <ProjectCard key={p.title} project={p} company />)}</div><div className="personal-work-heading"><span className="eyebrow">ACADEMIC & PERSONAL PROJECTS</span><h2>Things I've explored and built.</h2><p>Experiments, coursework and team builds that have helped me grow as a developer and problem-solver.</p></div><div className="projects-grid personal-grid">{personalProjects.map(p => <ProjectCard key={p.title} project={p} />)}</div></div></section>

      <section className="section-wrap skills-section" id="skills"><Reveal className="section-heading"><span className="eyebrow">MY TOOLKIT</span><h2>Tools I use to bring ideas to life.</h2></Reveal><div className="skills-grid">{skills.map(([title, list], i) => <Reveal className="skill-card" key={title}><span className="service-number">0{i + 1}</span><h3>{title}</h3><p>{list}</p></Reveal>)}</div><Reveal className="work-approach"><span className="eyebrow light-eyebrow">MY APPROACH</span><h3>Understand the problem.<br />Build with purpose. Keep improving.</h3><p>{howIWork}</p></Reveal></section>

      <section className="section-wrap background-section"><div className="background-grid"><Reveal><span className="eyebrow">EDUCATION</span><h2>Learning that<br />keeps me moving.</h2>{education.map(([degree, school, detail]) => <div className="timeline-item" key={degree}><h3>{degree}</h3><p className="timeline-meta">{school}</p><p>{detail}</p></div>)}</Reveal><Reveal><span className="eyebrow">MILESTONES</span><h2>Small wins.<br />Big motivation.</h2>{achievements.map(([title, detail]) => <div className="timeline-item" key={title}><h3>{title}</h3><p>{detail}</p></div>)}</Reveal></div></section>

      <section className="contact-section" id="contact"><div className="section-wrap contact-grid"><Reveal className="contact-copy"><span className="eyebrow light-eyebrow">HAVE A PROJECT IN MIND?</span><h2>Let's make<br /><span>something great.</span></h2><p>Have a big idea, a tricky problem or a collaboration in mind? Let’s start with a conversation — no 40-slide pitch deck required.</p><div className="contact-details"><a href={`mailto:${profile.email}`}>{profile.email}</a><span>{profile.location}</span><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></Reveal><Reveal><ContactForm /></Reveal></div><footer className="site-footer section-wrap"><VekiLogo footer /><span>Curiosity in motion · R. M. Likhitha · Co-Founder, VEKI</span><span>© {new Date().getFullYear()} VEKI</span></footer></section>
    </main>
  </>
}
