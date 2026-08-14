import { Link } from 'react-router-dom'
import { Footer, Nav } from '../components/Layout'
import { projects, stackBands } from '../data/projects'
import { asset } from '../lib/asset'

export function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <section className="hero shell">
          <p className="hero-kicker">AI · Computer Vision · Embedded Systems</p>
          <h1>Evan Maurer</h1>
          <p className="hero-lead">
            Computer Science student at Missouri S&amp;T building complete technical systems —
            from on-device firmware and cellular IoT, through backends and inference services,
            to research-grade computer vision pipelines and AI-powered desktop products.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View projects
            </a>
            <a className="btn" href={asset('Evan_Maurer_Resume.html')} target="_blank" rel="noreferrer">
              Resume
            </a>
            <a className="btn" href="https://github.com/Evanmaurer" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              className="btn"
              href="https://www.linkedin.com/in/evan-maurer"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="shell">
            <div className="section-head">
              <p className="mono">Featured work</p>
              <h2>Systems across the stack</h2>
              <p>
                Summer research and product work spanning FarmVates agri-IoT, synthetic-data CV
                research, and MontageAI — not isolated demos, but connected pipelines.
              </p>
            </div>
            <div className="project-list">
              {projects.map((p) => (
                <Link key={p.id} to={p.href} className="project-row">
                  <div>
                    <h3>{p.title}</h3>
                    <p className="sub">{p.subtitle}</p>
                    <div className="tag-row">
                      {p.tags.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="sub" style={{ margin: 0 }}>
                    {p.summary}
                  </p>
                  <span className="arrow" aria-hidden>
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="stack">
          <div className="shell">
            <div className="section-head">
              <p className="mono">Capabilities</p>
              <h2>Where I work</h2>
              <p>
                Comfortable moving between MCU firmware, Dockerized services, model training, and
                product UI — especially when the pieces have to talk to each other in the field.
              </p>
            </div>
            <div className="stack-grid">
              {stackBands.map((b) => (
                <div className="stack-band" key={b.title}>
                  <h3>{b.title}</h3>
                  <ul>
                    {b.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="shell">
            <div className="section-head">
              <p className="mono">About</p>
              <h2>Building under real constraints</h2>
              <p>
                Through the FarmVates research group I ship code that has to survive battery power,
                flaky cellular links, scarce labeled data, and production Docker/Jenkins
                deployments. Independently I built MontageAI far enough to run as a real app shell
                with analysis and planning modules — still evolving, with transparent editable AI
                decisions as the core idea.
              </p>
              <p>
                Expected graduation May 2027 · Concentration in Artificial Intelligence &amp;
                Machine Learning · US Citizen ·{' '}
                <a href="mailto:Evanm807@gmail.com">Evanm807@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
