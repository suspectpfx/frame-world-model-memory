# Server execution and model deployment gate

## Completed population-control allocation

Slurm jobs 4523 (Spatial), 4524 (Object) and 4525 (Goal) completed with exit code 0 after 03:12:38, 03:39:22 and 03:32:02 respectively. Each produced 120 complete episodes for 40 initial states × stale/TTL/TTL+inverse. Dependency-gated analysis job 4535 completed with exit code 0 and combined them with the 120 fresh episodes.

The executed population source SHA-256 is `851041b59cca827112b4a1fce013b5719656a299bb6dbe912759653b005459d5`. The analysis accepted all 480 episodes and all 120 inverse-recovery pairs. Local compact evidence is stored in `artifacts/raw/manifests/memory_population_*_manifest.json`, `artifacts/processed/memory_population_episodes.csv`, `artifacts/processed/memory_population_recovery.csv` and `artifacts/statistics/memory_population.json`. Full per-step traces and trajectory arrays remain on the server under `/home/pengfei/frame_verified_20260907/raw/memory_population_*`.

The user authorized server training and experiments on 2026-09-07. Credentials are excluded from this package. Existing project directories and environments were preserved; work lives in `/home/pengfei/frame_verified_20260907` and uses Slurm allocations.

## Population control extension — completed controls

The registered control study pairs stale retrieval, fixed-period refresh, and fixed-period refresh with inverse-permutation access on the same 40 initial states per task used by the fresh baseline. The addition completed 360 episodes; with the fresh arm, the paired control table contains 480 episodes. These controls do not implement the calibrated FRAME selector or learned imagination.

Jobs 4512–4514 failed before model loading because the batch launch omitted `/home/pengfei/frame_verified_20260907/render-lib` from `LD_LIBRARY_PATH`. MuJoCo consequently selected OSMesa without a loadable GL implementation and PyOpenGL raised `AttributeError: 'NoneType' object has no attribute 'glGetError'`. No episode from these jobs is accepted. Corrected smoke job 4519 ran one Spatial state and one TTL arm with the same renderer environment as successful job 4496. It exited 0 after a full 220-step unsuccessful episode and saved the complete trace. Population jobs 4523–4525 then completed for Spatial, Object, and Goal, and every manifest and pairwise recovery invariant passed `scripts/analyze_memory_population.py`.

Other idle nodes were tested before changing placement. `sjtu_beta` has an incompatible driver; `sjtualpha` reaches the model but its Quadro RTX 5000 cannot execute the registered bfloat16 scaled-dot-product attention kernel; `sms-cfd` denies NVML initialization. They are excluded. Changing precision or the attention backend would create a different serving deployment and would invalidate direct latency/energy comparisons with the A6000 baseline.

Analysis job 4535 completed after jobs 4523–4525. It validated the registered 40-state × 3-arm population for each fixed task, replayed JSONL/NPZ consistency checks, enforced exact TTL/inverse input hashes and executed actions, and generated fixed-task exact success intervals, paired state bootstrap intervals, raw exploratory McNemar tests, latency/energy summaries, and complete episode/recovery tables.

## What has actually run

- Job 4467: original relayout script, complete 90-sequence feature cache; 60 train / 30 test. All archived arms refit using the original protocol. New raw per-video output is available locally.
- Job 4468: train natural-layout readouts once, freeze them across natural/hidden/inverse and two prior interventions. Model weights and training-only PCA bases saved on server. This is supervised probe training, with no action-conditioned world-model claim.
- Job 4469: GPU implementation correctness and kernel compilation check.
- Jobs 4471 and 4472: randomized paired A–G deployment characterization, GPU and CPU on separate exclusive nodes. Full completion is recorded by the machine manifest, never inferred from a partially populated log.
- Job 4475: separate GPU read/write/idle cumulative-energy blocks. Job 4476: CPU RAPL counterpart after CPU timing completes.
- A second GPU layout version gives F the same fused indirect-adapter capability as D. Version 1 retains the materializing F adapter and remains an implementation ablation. The earlier pending job 4477 was cancelled before execution; immutable versioned scripts are used by its replacement. Runtime script files were briefly updated during other jobs; original sources were restored before their final manifest generation. Their recorded hashes must match the preserved version-1 snapshot; otherwise reject the run's provenance and rerun.

## Current infrastructure finding

Slurm provides an A6000 node with usable CUDA under the existing `mem` environment. Native Cosmos installation has failed: the official PyTorch 2.7 / CUDA 12.8 wheel is not available for the host's glibc 2.17 platform. Docker access is denied on the A6000 node, and Singularity/Apptainer are absent there. Additional Quadro nodes were inspected; one offers Singularity but has an older driver and Turing GPU. No supported Cosmos deployment has been established.

Official setup: [Cosmos setup](https://github.com/NVlabs/cosmos-policy/blob/main/SETUP.md), [LIBERO instructions](https://github.com/NVlabs/cosmos-policy/blob/main/LIBERO.md). Code revision is pinned in `configs/server_execution.json`. Historical preflight: at that stage no checkpoint had been downloaded or loaded. Published success and memory figures remain external references.

## Alternative-model decision

[OpenVLA-OFT](https://github.com/moojink/openvla-oft) is a strong open LIBERO action-policy baseline with published checkpoints, and is a reasonable fallback for closed-loop **policy-memory** validation on an older software stack. Its action predictions do not by themselves provide an action-conditioned future world-state predictor. Using it alone would leave the real-world-model imagination acceptance criterion open. [GR00T](https://github.com/NVIDIA/Isaac-GR00T/tree/main/examples/LIBERO) similarly provides LIBERO policy deployment. Neither is silently substituted for the Cosmos world-state pathway.

The selected world-model candidate remains Cosmos, pending a working modern runtime. A separate learned transition model paired with OpenVLA-OFT would be a new integration/training experiment, requiring independent model validation and its own pilot. No result is claimed for that unimplemented alternative.

## Training plan once the runtime is available

1. Load the pinned open pretrained checkpoint and run a single saved-observation inference. Measure model-only action, action+future and value modes separately; record precision and hashes.
2. Reproduce fresh-observation performance on the preselected pilot tasks. Validate image orientation, normalization, proprioception, chunk length and official reset/success semantics.
3. Collect **training-split** memory interventions with the frozen policy/world model. Fit consumer-specific utility/risk calibration only on train/calibration trajectories; hold test tasks and initial conditions out. Report the calibration model, loss, optimizer, seeds, budget and checkpoint validation.
4. Run the paired three-task pilot with fixed risk thresholds and equal models. A failed or saturated fresh baseline blocks scaling.
5. Only if utility calibration cannot serve the checkpoint's memory inputs, study joint fine-tuning as a separately controlled factor. All method arms use the same final checkpoint and decoder.
6. Expand to suite evaluation after the recorded pilot gates pass. A full base Cosmos reproduction is a separate resource request: official training used 64 H100s for about 48 hours. Two A6000s do not justify promising the same training schedule.

The official pretrained model allows studying memory serving without repeating foundation pretraining. Large compute use must answer a specified hypothesis; the present runtime failure prevents claiming any real-model training or closed-loop success.

## Required runtime remedy

Provide a CUDA-capable Ubuntu 22.04/24.04 GPU environment with sufficient VRAM and a compatible driver/container runtime, or a known working Cosmos environment on the accessible cluster. This is the current Phase 3 blocker. The user has been asked for such a path while independent Phase 1 work continues.

## Subsequent inference and closed-loop probe

Jobs 4482–4492 document dependency, renderer and model-inference checks. The public action weights and T5 embeddings were downloaded with primary-source hash verification. The NVIDIA tokenizer endpoint returned HTTP 403; the separately published Wan-AI VAE was acquired and labeled as a compatibility variant. Job 4492 produced actual actions and predicted future images. Job 4494 completed three preselected synchronous fresh-observation episodes with executed learned actions and machine-readable traces. These are smoke tests; they do not estimate FRAME benefit or close advisor feedback #1. See `WORLD_MODEL_FEASIBILITY.md` and `artifacts/raw/cosmos`.


## Paired learned-policy memory check — job 4495

WHAT WAS TESTED: three preselected task/state pairs × fresh, stale, TTL and TTL with inverse layout; learned Cosmos Policy actions; public Wan VAE variant; synchronous simulation.

WHAT WAS FOUND: all 12 episodes finished. Every TTL/inverse policy input hash and executed action agrees within its paired trajectory. Fresh and stale first diverge at action 17 in each task. All stale runs reach their step limit; TTL reaches the limit on Spatial and completes Object and Goal. The outcome table is generated from raw manifests.

WHAT CLAIM SURVIVES: exact inverse recovery survives the tested model input and actual action chain; memory intervention changes executed behavior.

WHAT CLAIM MUST CHANGE: these are integration checks on one state per task. They supply no calibrated FRAME superiority result, population success interval, or sensing-energy saving. The recorded memory-byte field excludes temporary arrays, model and process overhead.

WHAT REMAINS UNRESOLVED: held-out calibration, learned imagination access, full paired task/system comparison, latency-aware physics, and benchmark replication.

NEXT EXPERIMENT: job 4496 validates the fresh baseline on initial states 1–40 for each task, disjoint from the sanity state. GPU board energy uses the CUDA device UUID and remains separate from CPU and whole-system energy. Source and configuration hashes are retained.

## Fresh-observation baseline — job 4496

WHAT WAS TESTED: task 0 in LIBERO Spatial, Object, and Goal; initial-state indices 1–40; learned 16-action chunks; official success; synchronous simulation; public Wan VAE variant. The checkpoint, tokenizer, source, configuration, and inference-port hashes are retained.

WHAT WAS FOUND: all 120 episodes completed successfully. Exact within-task 95% success intervals are [0.9119, 1.0] for each 40/40 result. Median executed actions are 77.5, 139.5, and 122.0. Median gross allocated-GPU-board energy is 5.346, 6.850, and 7.218 kJ per episode for Spatial, Object, and Goal. The full episode table and state-bootstrap intervals are generated by `scripts/analyze_fresh_baseline.py`.

WHAT CLAIM SURVIVES: the compatibility deployment supplies a stable fresh-observation baseline on the three fixed tasks and the selected 40-state distributions. The page can show diverse initial states without selecting successful examples after inspection.

WHAT CLAIM MUST CHANGE: 120/120 success does not establish a FRAME gain and does not estimate comparative failure behavior. Three tasks do not support a broad suite-level generalization claim. Board energy excludes CPU, sensing hardware, and a physical robot.

WHAT REMAINS UNRESOLVED: calibrated consumer losses and thresholds, full paired memory arms, latency-aware physics, and cross-benchmark replication.

NEXT EXPERIMENT: freeze a disjoint calibration set and practical-equivalence margins, then run paired memory arms on the same evaluation states without tuning on their outcomes.
