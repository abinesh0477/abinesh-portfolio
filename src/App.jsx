import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080c14;
    --bg2: #0d1420;
    --surface: #111827;
    --border: rgba(255,255,255,0.07);
    --gold: #c9a84c;
    --gold2: #e8c97a;
    --text: #e8e8e8;
    --muted: #6b7280;
    --accent: #1e3a5f;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }

  
  .cursor {
    width: 10px; height: 10px;
    background: var(--gold);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    mix-blend-mode: difference;
  }

  .nav {
    position: fixed; top: 0; width: 100%; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 60px;
    background: rgba(8,12,20,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: all 0.3s ease;
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--gold);
    text-decoration: none;
  }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.85rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 500;
    transition: color 0.3s;
    position: relative;
  }
  .nav-links a::after {
    content: '';
    position: absolute; bottom: -4px; left: 0;
    width: 0; height: 1px;
    background: var(--gold);
    transition: width 0.3s ease;
  }
  .nav-links a:hover { color: var(--gold); }
  .nav-links a:hover::after { width: 100%; }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    position: relative;
    overflow: hidden;
    text-align: center;
    padding: 0 20px;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 120%, rgba(201,168,76,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 20%, rgba(30,58,95,0.3) 0%, transparent 60%);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  }
  .hero-content { position: relative; z-index: 1; }
  .hero-tag {
    display: inline-block;
    border: 1px solid var(--gold);
    color: var(--gold);
    font-size: 0.7rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    padding: 6px 18px;
    margin-bottom: 32px;
    border-radius: 2px;
    animation: fadeUp 0.8s ease both;
  }
  .hero-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3.5rem, 9vw, 8rem);
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -2px;
    animation: fadeUp 0.8s 0.15s ease both;
    background: linear-gradient(135deg, #fff 30%, var(--gold2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero-title {
    margin-top: 24px;
    font-size: 1rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 400;
    animation: fadeUp 0.8s 0.3s ease both;
  }
  .hero-desc {
    margin-top: 20px;
    max-width: 480px;
    margin-left: auto; margin-right: auto;
    font-size: 1rem;
    color: #9ca3af;
    line-height: 1.7;
    animation: fadeUp 0.8s 0.45s ease both;
  }
  .hero-cta {
    display: inline-flex; gap: 16px;
    margin-top: 44px;
    animation: fadeUp 0.8s 0.6s ease both;
    flex-wrap: wrap; justify-content: center;
  }
  .btn-primary {
    background: var(--gold);
    color: #080c14;
    border: none;
    padding: 14px 36px;
    font-size: 0.8rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    transition: all 0.3s ease;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-primary:hover { background: var(--gold2); transform: translateY(-2px); box-shadow: 0 10px 30px rgba(201,168,76,0.3); }
  .btn-secondary {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
    padding: 14px 36px;
    font-size: 0.8rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    transition: all 0.3s ease;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-secondary:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }

  .scroll-indicator {
    position: absolute; bottom: 40px; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    color: var(--muted); font-size: 0.65rem; letter-spacing: 3px; text-transform: uppercase;
    animation: fadeIn 1s 1.2s ease both;
  }
  .scroll-line {
    width: 1px; height: 50px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollPulse 2s infinite;
  }

  
  .section {
    padding: 120px 60px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .section-label {
    font-size: 0.65rem;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .section-label::before {
    content: '';
    width: 30px; height: 1px;
    background: var(--gold);
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 60px;
  }

  /* ── ABOUT ── */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .about-text p {
    font-size: 1.05rem;
    line-height: 1.85;
    color: #9ca3af;
    margin-bottom: 20px;
  }
  .about-text p strong { color: var(--text); font-weight: 500; }
  .about-skills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
  .skill-tag {
    border: 1px solid var(--border);
    padding: 7px 16px;
    font-size: 0.75rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    border-radius: 2px;
    transition: all 0.3s;
  }
  .skill-tag:hover { border-color: var(--gold); color: var(--gold); }
  .about-stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }
  .stat-box {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 32px 28px;
    transition: all 0.3s;
  }
  .stat-box:hover { border-color: rgba(201,168,76,0.3); background: #151e30; }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 8px;
  }
  .stat-label { font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }

  /* ── EXPERIENCE ── */
  .experience-wrap { background: var(--bg2); padding: 120px 0; }
  .experience-inner { max-width: 1200px; margin: 0 auto; padding: 0 60px; }
  .exp-timeline { position: relative; padding-left: 40px; }
  .exp-timeline::before {
    content: ''; position: absolute; left: 0; top: 8px; bottom: 0;
    width: 1px; background: linear-gradient(to bottom, var(--gold), transparent);
  }
  .exp-item {
    position: relative;
    padding-bottom: 60px;
  }
  .exp-item::before {
    content: ''; position: absolute; left: -44px; top: 8px;
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--gold);
    box-shadow: 0 0 12px rgba(201,168,76,0.5);
  }
  .exp-date {
    font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 12px;
  }
  .exp-role {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem; font-weight: 700;
    margin-bottom: 4px;
  }
  .exp-company { font-size: 0.85rem; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
  .exp-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .exp-list li {
    display: flex; align-items: flex-start; gap: 14px;
    font-size: 0.95rem; color: #9ca3af; line-height: 1.6;
  }
  .exp-list li::before {
    content: '→'; color: var(--gold); flex-shrink: 0; margin-top: 2px;
  }

  /* ── PROJECTS ── */
  .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
  .project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 44px 40px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
    cursor: default;
  }
  .project-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }
  .project-card:hover::before { transform: scaleX(1); }
  .project-card:hover {
    background: #151e30;
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    border-color: rgba(201,168,76,0.2);
  }
  .project-num {
    font-family: 'Playfair Display', serif;
    font-size: 4rem; font-weight: 900;
    color: rgba(201,168,76,0.08);
    line-height: 1;
    margin-bottom: 16px;
  }
  .project-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem; font-weight: 700;
    margin-bottom: 10px;
  }
  .project-stack {
    font-size: 0.7rem; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 16px;
  }
  .project-highlights { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .project-highlights li {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 0.88rem; color: #9ca3af; line-height: 1.5;
  }
  .project-highlights li::before {
    content: '—'; color: var(--gold); flex-shrink: 0;
  }
  .project-links { display: flex; gap: 14px; margin-top: 20px; }
  .project-link {
    font-size: 0.7rem; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--gold); text-decoration: none;
    border-bottom: 1px solid rgba(201,168,76,0.35);
    padding-bottom: 2px;
    transition: border-color 0.3s;
  }
  .project-link:hover { border-color: var(--gold); }
  .project-arrow {
    position: absolute; bottom: 32px; right: 36px;
    font-size: 1.5rem; color: var(--border);
    transition: all 0.3s;
  }
  .project-card:hover .project-arrow { color: var(--gold); transform: translate(3px, -3px); }

  /* ── EDUCATION ── */
  .edu-grid { display: flex; flex-direction: column; gap: 2px; }
  .edu-row {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 24px;
    align-items: baseline;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 24px 32px;
    transition: all 0.3s;
  }
  .edu-row:hover { border-color: rgba(201,168,76,0.25); background: #151e30; }
  .edu-degree { font-size: 1rem; font-weight: 500; color: var(--text); }
  .edu-school { font-size: 0.85rem; color: var(--muted); margin-top: 4px; }
  .edu-score { font-size: 0.8rem; color: var(--gold); letter-spacing: 1px; white-space: nowrap; }
  .edu-year { font-size: 0.8rem; color: var(--muted); letter-spacing: 1px; white-space: nowrap; }

  /* ── CONTACT ── */
  .contact-wrap { background: var(--bg2); padding: 120px 0; }
  .contact-inner { max-width: 1200px; margin: 0 auto; padding: 0 60px; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: start; }
  .contact-headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700; line-height: 1.15;
    margin-bottom: 24px;
  }
  .contact-sub { font-size: 0.95rem; color: #9ca3af; line-height: 1.75; }
  .contact-links { display: flex; flex-direction: column; gap: 20px; margin-top: 48px; }
  .contact-link {
    display: flex; align-items: center; gap: 18px;
    color: var(--text); text-decoration: none;
    padding: 20px 24px;
    border: 1px solid var(--border);
    border-radius: 2px;
    transition: all 0.3s;
    font-size: 0.9rem;
  }
  .contact-link:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.04); }
  .contact-link-icon { font-size: 1.1rem; width: 20px; text-align: center; }
  .contact-link-text { display: flex; flex-direction: column; }
  .contact-link-label { font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 2px; }
  .contact-link-value { font-size: 0.85rem; }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid var(--border);
    padding: 32px 60px;
    display: flex; justify-content: space-between; align-items: center;
    background: var(--bg);
    font-size: 0.75rem; color: var(--muted); letter-spacing: 1px;
    flex-wrap: wrap; gap: 12px;
  }
  .footer-logo { font-family: 'Playfair Display', serif; color: var(--gold); font-size: 1rem; }

  /* ── DIVIDER ── */
  .divider {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; }
    50%       { opacity: 1; }
  }
  .reveal {
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
    .reveal { opacity: 1; transform: none; }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .nav { padding: 18px 24px; }
    .nav-links { gap: 20px; }
    .section { padding: 80px 24px; }
    .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 48px; }
    .projects-grid { grid-template-columns: 1fr; }
    .about-stat-grid { grid-template-columns: 1fr 1fr; }
    .experience-inner, .contact-inner { padding: 0 24px; }
    .experience-wrap, .contact-wrap { padding: 80px 0; }
    .edu-row { grid-template-columns: 1fr; gap: 6px; }
    .footer { padding: 24px; flex-direction: column; text-align: center; }
    .hero-name { letter-spacing: -1px; }
  }
  @media (max-width: 480px) {
    .nav-links { display: none; }
    .about-stat-grid { grid-template-columns: 1fr; }
  }
`;

const projects = [
  {
    num: "01",
    title: "Rental Property Portal",
    stack: "React · Node js · MongoDB",
    highlights: [
      "Full-stack rental management system",
      "Authentication and role-based access control",
      "Property listing, booking, and admin dashboard",
      "Responsive UI with integrated REST APIs",
    ],
    demo: "#",
    repo: "https://github.com/abinesh0477",
  },
  {
    num: "02",
    title: "Employee Management System",
    stack: "React · Node js",
    highlights: [
      "Employee registration with full CRUD operations",
      "REST APIs for backend communication",
      "Responsive, user-friendly interface",
    ],
    demo: "#",
    repo: "https://github.com/abinesh0477",
  },
];

const education = [
  { degree: "B.E. — Mechanical Engineering", school: "Government College of Engineering, Tirunelveli", score: "7.6 CGPA", year: "2024" },
  { degree: "HSC", school: "Sri Jayendra Golden Jubilee School, Tirunelveli", score: "62%", year: "2020" },
  { degree: "SSLC", school: "Sri Jayendra Golden Jubilee School, Tirunelveli", score: "75%", year: "2018" },
];

const skills = ["React", "Angular", "TypeScript", "Java", "Spring Boot", "Node.js", "MySQL", "Oracle SQL", "MongoDB", "REST API", "Git", "Postman", "Swagger", "Bootstrap", "Material UI"];

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const revealRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onMouse = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouse);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMouse); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  return (
    <>
      <style>{style}</style>

      <div className="cursor" style={{ left: cursorPos.x - 5, top: cursorPos.y - 5 }} />

      <nav className="nav" style={{ boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none" }}>
        <a href="#hero" className="nav-logo">A.</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section id="hero" className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-tag">Available for opportunities</div>
          <h1 className="hero-name">Abinesh A</h1>
          <p className="hero-title">Trainee Software Engineer · Full Stack Developer</p>
          <p className="hero-desc">
            Crafting scalable and secure web applications — from pixel-perfect frontends to robust backend architectures.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-secondary">Get In Touch</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="divider" />

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div ref={addRef} className="reveal">
          <div className="section-label">Who I am</div>
          <h2 className="section-title">About Me</h2>
        </div>
        <div className="about-grid">
          <div ref={addRef} className="reveal reveal-delay-1 about-text">
            <p>
              I'm a <strong>Software Engineer</strong> with hands-on experience in full-stack web development using React, Java, Node.js, and Spring Boot. Currently working as a Trainee Software Engineer, contributing to REST API development, UI enhancement, and database management.
            </p>
            <p>
              Passionate about building <strong>scalable, secure, and high-performance applications</strong> — I bridge the gap between design and logic to deliver complete, production-ready systems.
            </p>
            <div className="about-skills">
              {skills.map((s) => <span key={s} className="skill-tag">{s}</span>)}
            </div>
          </div>
          <div ref={addRef} className="reveal reveal-delay-2 about-stat-grid">
            {[
              { num: "2+", label: "Projects Shipped" },
              { num: "3+", label: "Tech Stacks" },
              { num: "1", label: "Company Worked" },
              { num: "∞", label: "Lines to Write" },
            ].map((s) => (
              <div key={s.label} className="stat-box">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="experience" className="experience-wrap">
        <div className="experience-inner">
          <div ref={addRef} className="reveal">
            <div className="section-label">Career</div>
            <h2 className="section-title">Experience</h2>
          </div>
          <div className="exp-timeline">
            <div ref={addRef} className="reveal reveal-delay-1 exp-item">
              <div className="exp-date">Nov 2025 – Present</div>
              <h3 className="exp-role">Trainee Software Engineer</h3>
              <div className="exp-company">Aadasteck · Chennai, India</div>
              <ul className="exp-list">
                <li>Contributed to both frontend and backend module development using <strong>Java</strong>, <strong>Node js</strong>, <strong>Angular</strong>, and <strong>React</strong>.</li>
                <li>Designed and integrated RESTful APIs, ensuring smooth communication between application layers.</li>
                <li>Assisted in debugging, testing, and database schema optimization using <strong>MySQL</strong> and <strong>MongoDB</strong>.</li>
                <li>Gained hands-on experience with Git version control, Swagger API documentation, and database optimization techniques.</li>
                <li>Improved UI/UX design and responsiveness using <strong>Bootstrap</strong> and <strong>Material UI</strong>.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section id="projects" className="section">
        <div ref={addRef} className="reveal">
          <div className="section-label">Work</div>
          <h2 className="section-title">Featured Projects</h2>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div ref={addRef} key={p.num} className={`reveal reveal-delay-${i + 1} project-card`}>
              <div className="project-num">{p.num}</div>
              <h3 className="project-title">{p.title}</h3>
              <div className="project-stack">{p.stack}</div>
              <ul className="project-highlights">
                {p.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
              <div className="project-links">
                <a href={p.demo} className="project-link">Live Demo</a>
                <a href={p.repo} target="_blank" rel="noreferrer" className="project-link">Source</a>
              </div>
              <div className="project-arrow">↗</div>
            </div>
          ))}
        </div>
      </section>

      <section id="education" className="section">
        <div ref={addRef} className="reveal">
          <div className="section-label">Background</div>
          <h2 className="section-title">Education</h2>
        </div>
        <div className="edu-grid">
          {education.map((e, i) => (
            <div ref={addRef} key={e.degree} className={`reveal reveal-delay-${i + 1} edu-row`}>
              <div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-school">{e.school}</div>
              </div>
              <div className="edu-score">{e.score}</div>
              <div className="edu-year">{e.year}</div>
            </div>
          ))}
        </div>
      </section>

      <div id="contact" className="contact-wrap">
        <div className="contact-inner">
          <div ref={addRef} className="reveal">
            <div className="section-label">Let's talk</div>
          </div>
          <div className="contact-grid">
            <div ref={addRef} className="reveal reveal-delay-1">
              <h2 className="contact-headline">Have a project in mind? Let's build it together.</h2>
              <p className="contact-sub">
                I'm currently open to full-time roles and freelance projects, including relocation. Whether you have a product idea or need a reliable engineer on your team, I'd love to hear from you.
              </p>
            </div>
            <div ref={addRef} className="reveal reveal-delay-2">
              <div className="contact-links">
                <a href="tel:+919095676346" className="contact-link">
                  <span className="contact-link-icon">☎</span>
                  <span className="contact-link-text">
                    <span className="contact-link-label">Phone</span>
                    <span className="contact-link-value">+91 90956 76346</span>
                  </span>
                </a>
                <a href="mailto:abia80798@gmail.com" className="contact-link">
                  <span className="contact-link-icon">✉</span>
                  <span className="contact-link-text">
                    <span className="contact-link-label">Email</span>
                    <span className="contact-link-value">abia80798@gmail.com</span>
                  </span>
                </a>
                <a href="https://github.com/abinesh0477" target="_blank" rel="noreferrer" className="contact-link">
                  <span className="contact-link-icon">⌥</span>
                  <span className="contact-link-text">
                    <span className="contact-link-label">GitHub</span>
                    <span className="contact-link-value">github.com/abinesh0477</span>
                  </span>
                </a>
                <a href="https://www.linkedin.com/in/abi-abinesh04" target="_blank" rel="noreferrer" className="contact-link">
                  <span className="contact-link-icon">in</span>
                  <span className="contact-link-text">
                    <span className="contact-link-label">LinkedIn</span>
                    <span className="contact-link-value">linkedin.com/in/abi-abinesh04</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <span className="footer-logo">Abinesh A</span>
        <span>© {new Date().getFullYear()} · Crafted with precision & passion</span>
        <span>Chennai, India</span>
      </footer>
    </>
  );
}