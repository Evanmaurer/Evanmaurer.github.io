import { Link } from 'react-router-dom'
import { Flow, Footer, Nav } from '../components/Layout'
import { asset } from '../lib/asset'

export function FarmVatesPage() {
  return (
    <>
      <Nav />
      <main className="shell prose">
        <Link className="back-link" to="/#projects">
          ← Projects
        </Link>
        <p className="mono">FarmVates · Edge to cloud</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.03em' }}>
          FarmVates imaging platform
        </h1>
        <p>
          End-to-end system for agricultural sticky-trap / field cameras: capture on a Raspberry Pi
          Pico 2 W, transmit over Wi‑Fi MQTT or cellular, process through Dockerized workers, run
          YOLO inference, store results, and surface them in web/mobile clients.
        </p>

        <div className="meta-grid">
          <div className="meta-item">
            <span>Role</span>
            Firmware, OTA, scene gate, message-worker dark-image gate, CV training support
          </div>
          <div className="meta-item">
            <span>Problem</span>
            Field devices need reliable capture, remote updates, and useful pest detections without
            constant USB access
          </div>
          <div className="meta-item">
            <span>Status</span>
            Cellular OTA path verified on device; scene-change gate under field evaluation
          </div>
        </div>

        <h2>Architecture</h2>
        <Flow
          nodes={[
            'Pico 2 W + OV2640',
            'JPEG capture',
            'Wi‑Fi MQTT / Cellular',
            'Message worker',
            'Dark-image CNN gate',
            'YOLO inferer',
            'S3 + Mongo/API',
            'iOS / Web',
          ]}
        />
        <p>
          Firmware lives in <code>farmvatesiot_pico2w</code>. Images land in a Redis/ZeroMQ worker
          path (<code>FarmVates_Message_Worker</code>), which fans out to inference and S3 bridges
          after a PyTorch dark-image classifier. Inference services (
          <code>FarmVates_Image_Inferer</code>) run YOLO models; Flask backends (
          <code>FarmVates_Backend</code>) expose auth and metadata; SwiftUI iOS (
          <code>FarmVatesIOS</code>) consumes image/metadata APIs.
        </p>

        <h2>Physical device &amp; firmware</h2>
        <ul>
          <li>Pico 2 W (RP2350) + ArduCAM OV2640 UXGA JPEG capture</li>
          <li>Wi‑Fi MQTT upload and/or SIM7080 cellular path</li>
          <li>OLED status UI, watchdog phases, power-save sleep between cycles</li>
          <li>Configurable build flags via <code>build.sh</code> (interval, radio, OTA, OLED)</li>
        </ul>

        <div className="media-grid">
          <figure className="media-frame media-frame-tall">
            <img
              src={asset('assets/iot/device_cad.png')}
              alt="CAD model of FarmVates enclosure with Pico, camera, OLED, and power board"
            />
            <figcaption>
              Device enclosure CAD — Pico board, camera module, OLED, and power/interface bay
            </figcaption>
          </figure>
          <figure className="media-frame">
            <img src={asset('assets/iot/field_capture.jpg')} alt="Field JPEG captured by FarmVates Pico camera" />
            <figcaption>Field capture from device serial 0E646AFB… (UXGA JPEG)</figcaption>
          </figure>
        </div>

        <h2 id="scene-gate">On-device scene-change gate</h2>
        <p>
          Battery cameras waste energy re-uploading near-duplicate frames. The gate switches the
          sensor to 160×120, decodes luminance to 96×96 (picojpeg), scores structural similarity
          (SSIM / MAE / hist ablations) with optional mean matching, and only then restores UXGA
          for capture + radio. Fail-open on decode errors. Previous frame commits after a kept
          capture (or immediately in capture-only test builds).
        </p>
        <ul>
          <li>Firmware detectors selectable at build time; serial <code>SCENE_EVAL</code> telemetry</li>
          <li>Offline parity tools + ROC helpers under <code>tools/</code></li>
          <li>
            Field dump: 245 uploaded JPEGs scored as consecutive pairs; night static sequences
            score ~0.97–0.99 global SSIM (skip); large lighting/scene shifts upload
          </li>
        </ul>

        <h2>Cellular OTA (RP2350 A/B)</h2>
        <Flow
          nodes={[
            'HTTPS manifest',
            'Version compare',
            'HTTPTOFS UF2 → modem FS',
            'Stream to inactive slot',
            'SHA256 verify',
            'FLASH_UPDATE reboot',
          ]}
        />
        <ul>
          <li>One-time A/B partition table; dual UF2 artifacts (USB absolute vs OTA family ID)</li>
          <li>SHA256 integrity before reboot; metadata sector for pending state</li>
          <li>Production host: <code>farmvates.com/ota</code>; TLS cipher work for SIM7080 + ECDSA certs</li>
          <li>
            Note: Try-Before-You-Buy / <code>rom_explicit_buy</code> temporarily disabled for USB
            stability — designed, not fully re-enabled yet
          </li>
        </ul>

        <h2>Cloud pipeline pieces I worked in</h2>
        <ul>
          <li>
            <strong>Message worker:</strong> ZeroMQ/Redis ingest, device registry, fan-out to
            infer + S3 + backend cache invalidate
          </li>
          <li>
            <strong>Dark-image gate:</strong> SimpleCNN (PyTorch) with configurable threshold;
            dark frames diverted before expensive inference
          </li>
          <li>
            <strong>Image inferer:</strong> YOLO inference service wired to the bridge topology
          </li>
          <li>
            <strong>Backend / iOS:</strong> Flask auth + metadata APIs; SwiftUI client for login and
            paginated image metadata (MapKit/device views in app)
          </li>
        </ul>

        <div className="media-grid">
          <figure className="media-frame media-frame-tall">
            <img
              src={asset('assets/web/dashboard.png')}
              alt="FarmVates web dashboard showing online devices and daily insect trend chart"
            />
            <figcaption>
              Web dashboard — live devices, GPS, insect trend chart, and image gallery entry points
            </figcaption>
          </figure>
          <figure className="media-frame media-frame-phone">
            <img
              src={asset('assets/mobile/ios_devices.png')}
              alt="FarmVates iOS TestFlight Devices screen with online and offline cameras"
            />
            <figcaption>
              iOS app (TestFlight) — device list with last-seen status and image/edit actions
            </figcaption>
          </figure>
        </div>

        <h2>Technical challenges</h2>
        <ul>
          <li>OV2640 JPEG FIFO mode thrash when switching preview ↔ UXGA (CAP_DONE / len=8 failures)</li>
          <li>Modem TLS cipher mismatch with Let’s Encrypt ECDSA on production OTA host</li>
          <li>Large UF2 downloads through small modem TLS buffers → HTTPTOFS + CFSRFILE framing</li>
          <li>Keeping OTA checks off the critical path of 400 KB image allocations</li>
        </ul>

        <h2>Technologies</h2>
        <div className="tag-row" style={{ marginBottom: '2rem' }}>
          {[
            'C/C++',
            'Pico SDK',
            'MQTT',
            'SIM7080',
            'Python',
            'PyTorch',
            'YOLO',
            'Flask',
            'MongoDB',
            'Redis',
            'ZeroMQ',
            'Docker',
            'Jenkins',
            'SwiftUI',
            'S3',
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
