import { Link } from 'react-router-dom'
import { Flow, Footer, Nav, Placeholder } from '../components/Layout'

export function SynthPestPage() {
  return (
    <>
      <Nav />
      <main className="shell prose">
        <Link className="back-link" to="/#projects">
          ← Projects
        </Link>
        <p className="mono">Research · Computer vision</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.03em' }}>
          SynthPest &amp; sticky-trap detection
        </h1>
        <p>
          Undergraduate research in the FarmVates group on detecting cucurbit pests on sticky traps
          when labeled real images are scarce. Focus: synthetic generation with domain
          randomization, honest real-only validation, and YOLOv11 training curricula that transfer
          to the field.
        </p>

        <div className="meta-grid">
          <div className="meta-item">
            <span>Role</span>
            Synthetic data pipelines, training scripts, experiment design / logging
          </div>
          <div className="meta-item">
            <span>Paper</span>
            Contributing to “SynthPest: A Framework for Generating and Using Synthetic Insect Data
            for Real-World Smart Agriculture Applications.”
          </div>
          <div className="meta-item">
            <span>Hardware</span>
            Mac (generator) · Missouri S&amp;T cluster (Tesla V100 / RTX A5000)
          </div>
        </div>

        <h2>Problem</h2>
        <p>
          Sticky-trap boards are hard to label at scale. Models that look strong on synthetic or
          mixed validation can fail on real traps — especially when early stopping optimizes for
          synthetic mAP. Class imbalance (e.g., many real <code>flys</code> labels vs syn classes
          0–3) and domain gap (clean renders vs noisy boards) make the problem worse.
        </p>

        <h2>Pipeline</h2>
        <Flow
          nodes={[
            '3D insect GLBs',
            'Trap background crops',
            'Domain-rand render',
            'YOLO labels',
            'Syn pretrain',
            'Real finetune',
            'Real-only val',
          ]}
        />

        <h2>What I implemented / drove</h2>
        <ul>
          <li>
            Preferred generator <code>creatdata_withcuda.py</code>: sticky-trap backgrounds,
            randomized lighting color/power, camera FX (noise, blur, JPEG, vignette, HSV),
            occlusion/clustering, label hygiene
          </li>
          <li>
            Class maps aligned to <code>data.yaml</code> (sbeetle, sbug, spotedc, stripedcucumber,
            flys)
          </li>
          <li>
            Training recipes: syn pretrain → real finetune (<code>trainModelcuc.py</code>), mixed
            baseline, 50/50 ablation; experiment log format under <code>experiments/</code>
          </li>
          <li>
            Tools for regen, dataset prep, domain-gap reporting, and real-only eval
          </li>
        </ul>

        <div className="media-grid">
          <figure className="media-frame">
            <img src="/assets/cv/trap_real_crop.jpg" alt="Real sticky-trap background crop" />
            <figcaption>Real sticky-trap crop used as generator background</figcaption>
          </figure>
          <figure className="media-frame">
            <img src="/assets/cv/synthetic_sample.jpg" alt="Synthetic sticky-trap render" />
            <figcaption>Synthetic sticky-trap sample (domain-randomized generator)</figcaption>
          </figure>
          <figure className="media-frame">
            <img
              src="/assets/cv/synthetic_debug_bbox.jpg"
              alt="Synthetic sample with debug bounding boxes"
            />
            <figcaption>Debug overlay with YOLO-format boxes</figcaption>
          </figure>
          <Placeholder
            title="Real inference overlay"
            need="Add a real sticky-trap photo with model predictions once a strong real-val checkpoint is selected."
          />
        </div>

        <h2>Experimentation (supported by logs)</h2>
        <p>
          Experiment 001 reframed evaluation around <strong>real-only validation</strong>. An honest
          baseline on the prior mixed-train checkpoint scored approximately{' '}
          <strong>mAP50 ≈ 0.09</strong> on real-only val — exposing that mixed/syn-polluted metrics
          were not trustworthy. Domain-gap probes after generator v2 showed syn probe accuracy
          dropping from 1.00 → ~0.72 (harder / more realistic syn domain). Full cluster
          pretrain→finetune with larger v2 syn sets is the ongoing training track.
        </p>
        <p>
          I am not listing an unverified “96% accuracy” here; portfolio and resume emphasize the
          methodology and measured real-only baseline instead of optimistic syn scores.
        </p>

        <h2>Technologies</h2>
        <div className="tag-row" style={{ marginBottom: '2rem' }}>
          {[
            'Python',
            'PyTorch',
            'Ultralytics YOLO',
            'OpenCV',
            'Blender / GLB',
            'TripoSR',
            'CUDA',
            'Domain randomization',
          ].map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
