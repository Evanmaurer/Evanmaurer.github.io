export type ProjectId = 'farmvates-iot' | 'synthpest' | 'montage' | 'edge-gate'

export type Project = {
  id: ProjectId
  title: string
  subtitle: string
  tags: string[]
  href: string
  summary: string
  role: string
  status: string
}

export const projects: Project[] = [
  {
    id: 'farmvates-iot',
    title: 'FarmVates Edge-to-Cloud Platform',
    subtitle: 'Device → cellular/Wi‑Fi → MQTT → workers → YOLO inference → apps',
    tags: ['Embedded', 'IoT', 'OTA', 'MQTT', 'Docker', 'Flask', 'Swift'],
    href: '/projects/farmvates',
    summary:
      'End-to-end agricultural imaging stack: Pico 2 W camera firmware, cellular/Wi‑Fi upload, message workers, dark-image gating, YOLO inference services, Flask/Mongo backends, and iOS client.',
    role: 'Firmware + pipeline engineering (FarmVates research group)',
    status: 'Production path for cellular OTA verified; scene-gate in field eval',
  },
  {
    id: 'synthpest',
    title: 'SynthPest / Sticky-Trap CV',
    subtitle: 'Synthetic insect data → YOLOv11 training → real-trap evaluation',
    tags: ['PyTorch', 'Ultralytics YOLO', 'Blender', 'CUDA', 'Research'],
    href: '/projects/synthpest',
    summary:
      'Domain-randomized sticky-trap synthetic generation and sim-to-real YOLO training for cucurbit pest detection, with experiment logging and real-only validation protocol.',
    role: 'Undergraduate researcher — synthetic data & model training',
    status: 'Active research; contributing to SynthPest paper draft',
  },
  {
    id: 'montage',
    title: 'MontageAI',
    subtitle: 'AI-assisted gaming montage editor (Electron + FastAPI)',
    tags: ['Electron', 'React', 'FastAPI', 'PyTorch', 'FFmpeg'],
    href: '/projects/montage',
    summary:
      'Desktop product for turning raw gameplay into editable AI montage plans — media analysis, clip scoring, music sync, and Albion-specific combat intelligence.',
    role: 'Founding engineer / full-stack + AI pipeline',
    status: 'Milestones 1–5 largely complete (Albion intelligence)',
  },
  {
    id: 'edge-gate',
    title: 'On-Device Scene-Change Gate',
    subtitle: 'RP2350 preview SSIM gate before UXGA + radio',
    tags: ['C++', 'Pico SDK', 'TinyML systems', 'SSIM'],
    href: '/projects/farmvates#scene-gate',
    summary:
      'Illumination-robust upload gating on commodity Pico 2 W + ArduCAM: low-res SSIM preview decides whether expensive UXGA capture and radio are worth it.',
    role: 'Firmware systems design + field eval tooling',
    status: 'Firmware + offline ROC tools; paper draft in progress',
  },
]

export const stackBands = [
  {
    title: 'Edge / Embedded',
    items: ['Raspberry Pi Pico 2 W (RP2350)', 'ArduCAM OV2640', 'C / C++', 'Pico SDK', 'Cellular (SIM7080)', 'Wi‑Fi MQTT', 'OTA A/B flash'],
  },
  {
    title: 'AI / Computer Vision',
    items: ['PyTorch', 'Ultralytics YOLO', 'OpenCV', 'Synthetic data (Blender / TripoSR)', 'Domain randomization', 'CNN dark-image gate'],
  },
  {
    title: 'Backend / Infra',
    items: ['Python', 'Flask', 'FastAPI', 'MongoDB', 'Redis', 'ZeroMQ', 'Docker', 'Jenkins', 'S3'],
  },
  {
    title: 'Clients',
    items: ['SwiftUI iOS', 'Electron + React', 'TypeScript', 'WordPress'],
  },
]
