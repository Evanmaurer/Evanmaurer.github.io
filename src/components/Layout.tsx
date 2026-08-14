import { Link } from 'react-router-dom'
import { asset } from '../lib/asset'

const links = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#stack', label: 'Stack' },
  { href: 'https://github.com/Evanmaurer', label: 'GitHub', external: true },
  {
    href: 'https://www.linkedin.com/in/evan-maurer',
    label: 'LinkedIn',
    external: true,
  },
]

export function Nav() {
  return (
    <header className="site-nav">
      <div className="shell inner">
        <Link to="/" className="brand">
          Evan Maurer
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) =>
            l.external ? (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ) : (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ),
          )}
          <a className="cta" href={asset('Evan_Maurer_Resume.html')} target="_blank" rel="noreferrer">
            Resume
          </a>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell inner">
        <div>
          Evan Maurer · Missouri S&amp;T · B.S. Computer Science (AI/ML) · May 2027
        </div>
        <div>
          <a href="mailto:Evanm807@gmail.com">Evanm807@gmail.com</a>
          {' · '}
          <a href="https://github.com/Evanmaurer" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

export function Placeholder({
  title,
  need,
}: {
  title: string
  need: string
}) {
  return (
    <div className="placeholder">
      <strong>Add later — {title}</strong>
      {need}
    </div>
  )
}

export function Flow({ nodes }: { nodes: string[] }) {
  return (
    <div className="flow" role="list">
      <div className="flow-row">
        {nodes.map((n, i) => (
          <span key={n} role="listitem" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            <span className="flow-node">{n}</span>
            {i < nodes.length - 1 ? <span className="flow-arrow">→</span> : null}
          </span>
        ))}
      </div>
    </div>
  )
}
