# FRAME status — server evidence edition, 2026-09-08

The full comparative FRAME evaluation is **not complete**. Phase 3 has completed a three-episode integration probe, a 12-episode paired memory sanity study, a 120-episode fresh-observation baseline, and a 360-episode paired stale/TTL/TTL+inverse population over 40 initial states for each of three fixed tasks. All 480 population episodes are complete. The full ten-arm calibrated pilot remains unrun. The attached page reports measured evidence and the remaining gates.

The first population-control submissions (jobs 4512–4514) failed before model execution because their batch launch omitted the validated headless-renderer library path. The failure is retained in `FAILURES.md`; none of those jobs contributes an episode or result. Corrected one-state smoke job 4519 completed with exit code 0 and saved a full 220-step failed TTL trajectory. Population jobs 4523–4525 and dependency-gated analysis job 4535 completed with exit code 0. The analyzer accepted 360 population episodes plus 120 fresh episodes, verified trace/trajectory and source-hash consistency, and confirmed exact TTL/inverse input and action equality in 120/120 pairs.

| Phase | Actual state | Evidence / remaining dependency |
|---|---|---|
| 0 — Audit | Source audit and key layout reproduction complete; full H1 sensitivity remains open | Claim registry; archived script retrained from 90-sequence raw feature cache; exact per-video comparison; frozen-reader controls |
| 1 — Layout | Substantial exploratory CPU/GPU serving study completed | A–G, 76 configurations per device, 11 paired run blocks, raw latencies, correct inverse/consumer output, separate read/write energy; larger payloads, more transform families, parallel tenants and confirmatory design remain |
| 2 — Theory | Updated to reflect matched fused adapters | Direct / materialize / fused-indirect; constrained utility and serving costs; no universal preservation requirement |
| 3 — Real model/pilot | Learned inference and 480 fixed-task population episodes complete | Fresh succeeds in 40/40 states per task; stale succeeds in 0/40; TTL succeeds in 2/40 Spatial, 12/40 Object and 40/40 Goal; TTL/inverse inputs and actions match exactly in 120/120 paired states; official tokenizer identity and calibrated FRAME intervention remain open |
| 4 — Full LIBERO | Not run | Requires successful Phase 3 pilot |
| 5 — RoboTwin | Not run | Requires benchmark-compatible learned model and prior gates |
| 6 — Dynamic systems baselines | Planned; not newly run | Requires fair capacity/trace/write/miss implementation and phase order |
| 7 — Paper | Final rewrite deferred | Audited research page and reports updated; final paper waits for stable results |

Advisor feedback #2: inverse and utility recovery reproduced; actual map storage and implementation-dependent costs measured; full deployment claim remains provisional.

Advisor feedback #1: **OPEN**. No new foundation-model training or calibrated FRAME task advantage has been measured. Fresh and memory-intervened episodes execute learned actions. The 480-episode fixed-task population records official success, trajectories, latency, acquisition count, gross GPU-board energy and peak memory. It establishes model sensitivity to stale and periodic-refresh inputs, while calibrated FRAME gains, consumed learned imagination, latency-aware episodes and a second benchmark remain unmeasured.

Server project: `/home/pengfei/frame_verified_20260907`. No password is stored in the project. The 120-episode baseline manifest contains all completed states and hardware/provenance hashes.

Read `SERVER_EXECUTION.md`, `artifacts/statistics/server_report.md`, `RESULTS_AUDIT.md`, and `EXPERIMENT_PLAN.md`. The existing failures remain in `FAILURES.md`. The local page and ZIP are generated from these artifacts.
