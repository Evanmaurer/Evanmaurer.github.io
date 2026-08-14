import { Link } from 'react-router-dom'
import { Flow, Footer, Nav, Placeholder } from '../components/Layout'
import { asset } from '../lib/asset'

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
            '2D insect photos',
            'TripoSR 3D',
            'Blender textures/meshes',
            'Trap backgrounds + dims',
            'Labeled synthetic renders',
            'YOLO train / real-only val',
          ]}
        />
        <figure className="media-frame media-frame-wide" style={{ margin: '1.25rem 0 1.75rem' }}>
          <img
            src={asset('assets/cv/synthpest_pipeline.png')}
            alt="SynthPest pipeline diagram from 2D images through TripoSR and Blender to labeled synthetic data"
          />
          <figcaption>
            SynthPest generation path — 2D photo → TripoSR → Blender assets → sticky-trap synthetic
            dataset with boxes
          </figcaption>
        </figure>

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
            <img src={asset('assets/cv/trap_real_crop.jpg')} alt="Real sticky-trap background crop" />
            <figcaption>Real sticky-trap crop used as generator background</figcaption>
          </figure>
          <figure className="media-frame">
            <img src={asset('assets/cv/synthetic_sample.jpg')} alt="Synthetic sticky-trap render" />
            <figcaption>Synthetic sticky-trap sample (domain-randomized generator)</figcaption>
          </figure>
          <figure className="media-frame">
            <img
              src={asset('assets/cv/synthetic_debug_bbox.jpg')}
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
          Early work reframed evaluation around <strong>real-only validation</strong>. An honest
          baseline on a prior mixed-train checkpoint scored approximately{' '}
          <strong>mAP50 ≈ 0.09</strong> on real-only val — exposing that syn-polluted mixed metrics
          were not trustworthy. Domain-gap probes after generator v2 showed syn probe accuracy
          dropping from 1.00 → ~0.72 (harder / more realistic syn domain).
        </p>
        <p>
          <strong>Experiment 023</strong> (2026-07-29) took a checkpoint trained through the
          SynthPest / paper real-only pipeline (<code>cuc_paper_real_only</code>), applied the
          production sticky-trap fine-tune recipe (<code>imgsz=1024</code>, freeze 10,{' '}
          <code>lr0=5e-5</code>, mosaic/copy-paste), and scored a 100% real held-out val (
          <code>compare_labels ±0.2</code>):
        </p>
        <div className="metrics-table-wrap">
          <table className="metrics-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>P</th>
                <th>R</th>
                <th>F1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SynthPest paper_real_only (before sticky FT)</td>
                <td>0.822</td>
                <td>0.716</td>
                <td>0.766</td>
              </tr>
              <tr>
                <td>
                  <strong>SynthPest pipeline + sticky FT</strong> (my model)
                </td>
                <td>
                  <strong>0.930</strong>
                </td>
                <td>
                  <strong>0.847</strong>
                </td>
                <td>
                  <strong>0.887</strong>
                </td>
              </tr>
              <tr>
                <td>Inferer cuclarge.pt (production reference)</td>
                <td>0.953</td>
                <td>0.893</td>
                <td>0.922</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Sticky FT on the SynthPest pipeline model lifted F1 by <strong>+0.121</strong> vs the
          untuned paper-real checkpoint and closed most of the gap to the production Inferer
          weights (about −0.035 F1 remaining). The <strong>0.930 precision / 0.847 recall / 0.887
          F1</strong> row is the SynthPest sticky-FT result from this experiment — the figure
          behind earlier “~96%” shorthand when people quote production-side precision (~0.95 on
          Inferer), with my pipeline model landing at ~0.93 P on the same real held-out protocol.
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
