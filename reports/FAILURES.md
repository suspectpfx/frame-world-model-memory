# Negative results and unresolved failures

No unfavorable result is removed to improve FRAME's appearance. Historical effect sizes below are documentary descriptions, not newly verified estimates; exact original prose is retained in the registry and input DOCX.

| Finding | Evidence | Required disposition |
|---|---|---|
| Pipeline hurts planner at tight tolerance | Old draft status table, approximately -7.6 percentage points | Retain; reproduce with paired video resampling |
| Planner/verifier expiry recalibration changes sign across sources | Old draft limitations and status table | No cross-consumer universal expiry claim |
| Verifier saturates at metric ceiling in layout study | `relayout*.json`, old correction log | Floor/ceiling controls; do not interpret flat curves as invariance |
| Coarsening to reader grid can preserve most utility | `relayout.json` | Retract any-coarsening-destroys-information-needed-by-task statement |
| Low-rank grid experiment lacks the same collapse | `relayout_k8.json` | Keep full rank interaction; no universal knee |
| Whole-number ratio hypothesis not established | Dense grid residuals | Keep as exploratory failed hypothesis |
| Factor-two residual is not zero | New video-bootstrap interval | Retire “alignment stops mattering”; equivalence needs margin |
| Hedging benefit refuted under contractive fitted dynamics | Old draft status table | Keep negative result and exact predictor description |
| Claimed FRAME superiority to per-consumer optimal threshold retracted | Old draft status table | Do not revive from an updated point estimate |
| Per-task crossing thresholds unresolved | Small aggregate replay grid | No smooth-fit rescue without model checking and support |
| Shared-host throughput lacks complete writes | `mp_store.py` | Rerun true serving; retain best-of-five only as historical diagnostic |
| Same zero-offset replay has different success rates | `libero_10tasks.json` | Audit reset/controller/RNG determinism before policy work |
| GPU microjoule energy not resolved by source sampler | `reindex_cost.py` | Retain as unreliable legacy estimate; no measured-energy headline |
| Real closed-loop world model not integrated | Local dependencies and source code | Feedback 1 remains open |
| Historical SAPIEN3/Unity renderer blockers | `sapien_w.py` comments | Historical report only; not freshly reproduced on current host |

Operational errors, failed pilot seeds, timeouts and OOMs must be logged alongside successful runs. Failed episodes cannot be excluded by method-dependent quality filters. An infrastructure failure policy must be frozen before comparisons; report attempted and evaluated episode counts separately.

## Server extension: preserved failures and exclusions

- Native Cosmos official Torch installation fails on the available glibc 2.17 runtime. Direct module import also fails on missing dependencies; no model checkpoint was loaded. Docker denies socket access on the A6000 node. `artifacts/raw/server/server_preflight.json` contains the actual command output.
- The available `nvprof` reports that it cannot profile this GPU architecture. Device traffic, cache misses and transactions remain unavailable. RAPL and NVML cumulative energy are separate measured domains.
- GPU layout version 1 gave D a fused adapter while F materialized its adapters. This is retained as an implementation ablation. Version 2 gives F the same fused capability before interpreting physical layout.
- Version-1 GPU energy job 4475 recorded hashes from script files updated during its execution. Its manifest therefore does not identify the loaded implementation correctly. This run is **excluded from final energy analysis** and retained in `artifacts/raw/server_v1/energy_separate.json`. Version-2 energy was rerun from an immutable script directory. CPU timing's recorded hash matches the preserved version-1 source; no corrected hash is silently substituted.
- Pointwise latency intervals are exploratory. Eleven timing blocks do not support a broad confirmatory family with fine exact-test p-value resolution. Non-significance is not equivalence.
- No learned-model robot videos, task-success tables or E2E energy outcomes were produced. The only new video is a labeled visualization of actual held-out cached feature fields and layout restoration.

## Pipeline illustration and deployment corrections

Two generated diagram iterations contained invalid dataflow: coupled fidelity/granularity, mandatory canonical materialization for fused access, or a memory-sourced reobservation branch. They are excluded from the authoritative project page. The page uses the editable audited pipeline and explicit step table. The conceptual animation is separately labeled.

Cosmos deployment retained failures for missing dependencies, initial non-idempotent patching, missing RMSNorm initialization, gated tokenizer access, EGL rendering and OSMesa library discovery. All final port edits are regenerated from the immutable upstream checkout and syntax-checked. The public Wan tokenizer variant passes model loading and sample inference; equivalence with NVIDIA's tokenizer remains unresolved. No failed episode or failed setup is counted as a successful comparative experiment.


## Learned memory sanity limitations and observed failures

Job 4495 retains all three stale-memory failures and the Spatial TTL / TTL-inverse failures. The TTL/inverse trajectories are exactly equal even when unsuccessful. Its memory-byte field is a payload-plus-inverse accounting boundary; Python variables retain additional temporary arrays, so this field must not be presented as peak or total memory. Fixed arm order and per-action RNG reset limit timing/generalization interpretations.

The two generated conceptual images contain incorrect causal arrows and are excluded from the authoritative pipeline. The editable SVG is the maintained method figure. Its tensor icons were moved out of text regions after browser inspection.

## Population-control launch failure — jobs 4512–4514

The first population-control submissions failed before model loading or episode execution. Their batch launch omitted the renderer library path used by successful job 4496, so PyOpenGL could not bind an OSMesa GL implementation and raised `AttributeError: 'NoneType' object has no attribute 'glGetError'`. Attempted jobs are retained in the execution record; they contribute zero evaluated episodes and zero scientific outcomes. Corrected smoke job 4519 completed before the 360-episode controls were resubmitted. Jobs 4523–4525 and analysis job 4535 then completed with exit code 0; this successful rerun does not remove the original failure record.

Auxiliary node qualification also failed for the registered deployment: `sjtu_beta` exposes an NVIDIA driver too old for the CUDA 12.4 PyTorch runtime; `sjtualpha` loads CUDA but its Quadro RTX 5000 has no available kernel for the model's bfloat16 scaled-dot-product attention; the `sms-cfd` allocation cannot initialize NVML. These nodes are excluded from the population run. Results from a modified precision or attention backend would define a different systems deployment and cannot be mixed into the A6000 timing/energy comparison.
