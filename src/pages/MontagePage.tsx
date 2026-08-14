import { Link } from 'react-router-dom'
import { Flow, Footer, Nav, Placeholder } from '../components/Layout'

export function MontagePage() {
  return (
    <>
      <Nav />
      <main className="shell prose">
        <Link className="back-link" to="/#projects">
          ← Projects
        </Link>
        <p className="mono">Product · AI application</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.03em' }}>
          MontageAI
        </h1>
        <p>
          AI-powered desktop montage editor for gaming creators. Starting with Albion Online, it
          turns large libraries of raw clips into <strong>editable montage plans</strong> — every
          AI decision scored, inspectable, and revisable — rather than opaque one-click renders.
        </p>

        <div className="meta-grid">
          <div className="meta-item">
            <span>Role</span>
            Founding engineer — architecture, Electron/React UI, FastAPI backend, AI modules
          </div>
          <div className="meta-item">
            <span>Repo</span>
            <a href="https://github.com/Evanmaurer/video_editor" target="_blank" rel="noreferrer">
              github.com/Evanmaurer/video_editor
            </a>
          </div>
          <div className="meta-item">
            <span>Status</span>
            M1 shell complete; M3 analysis + M4 planning + M5 Albion intelligence largely complete
          </div>
        </div>

        <h2>Problem</h2>
        <p>
          Creators dump hundreds of clips and need highlights, pacing, music sync, and game-aware
          moments (bombs, wipes, loot) without losing editorial control. MontageAI keeps a
          first-class plan object (EDL-style) that modules update with confidence and reasoning.
        </p>

        <h2>Architecture</h2>
        <Flow
          nodes={[
            'Electron + React UI',
            'FastAPI backend',
            'Media analysis (M3)',
            'Planning modules (M4)',
            'Albion detectors (M5)',
            'Editable montage plan',
          ]}
        />
        <ul>
          <li>pnpm monorepo: <code>apps/desktop</code>, <code>apps/backend</code>, shared types</li>
          <li>SQLite project DBs; token auth; health/readiness; GPU auto-detect with CPU fallback</li>
          <li>
            Planning framework: clip scoring, highlights, music sync, transitions, pacing, effects,
            draft + timeline generation
          </li>
          <li>
            Albion plugin path: combat timelines, ability recognition, bomb multi-signal fusion,
            engagement tags, highlight ranking, search, timeline annotation
          </li>
        </ul>

        <div className="media-grid">
          <Placeholder
            title="MontageAI app screenshot"
            need="Capture the Electron shell (media / preview / timeline / inspector) and drop it in public/assets/montage/shell.png."
          />
          <Placeholder
            title="Plan / AI suggestions UI"
            need="Screenshot of a montage plan, clip scores, or Albion combat timeline view."
          />
        </div>

        <h2>Stack</h2>
        <div className="tag-row" style={{ marginBottom: '2rem' }}>
          {[
            'Electron',
            'React',
            'TypeScript',
            'Tailwind',
            'Python',
            'FastAPI',
            'SQLite',
            'FFmpeg',
            'OpenCV',
            'PyTorch',
            'ONNX Runtime',
            'Whisper',
            'EasyOCR',
          ].map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>

        <h2>What “done” looks like so far</h2>
        <ul>
          <li>Milestone 1: launchable shell, project lifecycle, 32 automated tests at M1 exit</li>
          <li>Milestone 3: scene/motion/audio/OCR/object/embedding analysis + job queue</li>
          <li>Milestone 4: replaceable planning modules writing reproducible, editable plans</li>
          <li>Milestone 5: Albion-specific detectors and searchable fight intelligence</li>
        </ul>
      </main>
      <Footer />
    </>
  )
}
