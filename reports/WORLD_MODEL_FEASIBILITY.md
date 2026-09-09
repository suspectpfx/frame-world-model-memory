## Current follow-up evidence

The paired 12-episode memory sanity study completed as job 4495. TTL and TTL + inverse have exactly matching input hashes and actions in all three tested states. Fresh and stale actions diverge from action 17. Job 4496 completed a 120-episode fresh baseline: 40/40 official successes for each fixed task over initial states 1–40. Exact within-task 95% success intervals are [0.9119, 1.0]. The corresponding action-count medians are 77.5 (Spatial), 139.5 (Object), and 122.0 (Goal). Gross allocated-GPU-board energy medians are 5.346, 6.850, and 7.218 kJ per episode. These values validate the deployed baseline for the three fixed tasks; they do not measure a FRAME effect.

# Cosmos Policy feasibility and execution record

## Current verified execution

- Pinned source: `18a2accadf4e7a3531e56754102af5a24d2316da`.
- Public action-model checkpoint revision: `cb689ec0e3347c13667d70a78a3447388f5c3bb8`; SHA-256 verified against the official published pointer.
- Runtime: PyTorch 2.6.0+cu124 on RTX A6000, with an explicit inference-only compatibility port. Upstream Torch SDPA replaces Transformer Engine attention; primitive checks and complete model key/shape loading passed.
- Tokenizer: separately published Wan-AI VAE, SHA-256 `38071ab59bd94681c686fa51d75a1968f64e470262043be31f7a094e442fd981`. Identity with the restricted NVIDIA tokenizer has not been established. This is a labeled compatibility variant.
- Model loaded and produced finite 16×7 action chunks, future images and value on the official saved observation. The first call and subsequent calls are retained separately in `artifacts/raw/cosmos/cosmos_model_smoke_4492.json`; this small sample is not a latency benchmark.
- Job 4494 executed three synchronous fresh-observation episodes: preselected task 0 in Spatial, Object and Goal; initial-state index 0; model seed 195. All reached official completion. This is an integration smoke test, not a success-rate estimate or FRAME comparison.
- Rendering uses the existing OSMesa library through a project-local search path. Neither existing research environments nor simulator source was modified.

## Remaining gates

Official tokenizer equivalence; held-out consumer-loss calibration; full paired 40-state comparison across all memory arms; latency-aware physics; complete per-arm energy instrumentation; full LIBERO; RoboTwin with a compatible learned model. New foundation training has not run. The inference compatibility layer deliberately rejects unavailable training extensions.

Model loading and three successful episodes do not establish comparative task gains. Public pretrained weights allow the memory question to be studied without repeating the original large foundation training run.

## Historical preflight and failures

### Initial source assessment

Review date 2026-09-06. This is a source and hardware feasibility assessment, not a model execution result.

| Field | Finding |
|---|---|
| Repository | https://github.com/NVlabs/cosmos-policy |
| Reviewed commit | `18a2accadf4e7a3531e56754102af5a24d2316da` from git ls-remote; README, SETUP, LIBERO and evaluator snapshot saved |
| Checkpoint candidate | `nvidia/Cosmos-Policy-LIBERO-Predict2-2B`; checkpoint revision and content hash must be pinned on download |
| Model | Learned video-derived action/world-action model, predicts actions, future observations and value |
| Official prerequisites | NVIDIA GPU with CUDA; published model card lists Linux |
| Published VRAM | 6.8 GB for LIBERO base policy without model-based planning; planning peak not established here |
| Local hardware | Apple M2, 8 GB total unified memory, macOS; no NVIDIA CUDA device |
| Local dependencies | Bundled Python lacks torch, LIBERO, robosuite and SAPIEN; another local Python has torch but does not establish CUDA compatibility |
| Input | Primary and wrist RGB images plus proprioception and task text; validate against pinned code |
| Output | Action chunk, future image/proprioception, value; validate action normalization against simulator |
| Horizon | Model card specifies 16-step actions and future prediction at t+16; documented execution chunk 16 |
| API | `get_model`, `get_action`, `PolicyEvalConfig` in official quick start; full official evaluator snapshot included |
| Camera/proprio format | Official card: 224x224 RGB views, 9D proprio, 7D actions; confirm flip/JPEG and calibration in pinned code |
| Official benchmark target | Published average 98.5% across suites; not a selected-three-task or local baseline |
| Measured baseline success | NOT MEASURED |
| Measured inference latency | NOT MEASURED |
| Measured peak VRAM | NOT MEASURED |
| Local execution decision | Blocked for supported CUDA path; no large checkpoint download or training started |

The 6.8 GB number is GPU allocation for a published configuration, not a promise that an 8 GB Mac can run this model and simulator. Prefer a remote Linux NVIDIA GPU with sufficient headroom for joint future prediction, simulator rendering and instrumentation. A 16–24 GB device is a reasonable feasibility target to test, not a verified requirement. Confirm actual supported kernels and rendering before reserving a full campaign.

The official LIBERO evaluation guide describes reproduction seeds 195/196/197, deterministic mode and H100/PyTorch versions. Reproduce the matching baseline before modifying its observation flow. Copying its headline average into FRAME results is prohibited.

No available local substitute has been demonstrated to satisfy all three conditions: pretrained learned action-conditioned prediction, working LIBERO execution and feasible supported hardware. Keep Cosmos as the first remote candidate. A smaller VLA can be a policy-only ablation but does not by itself satisfy real-world-model imagination. The existing constant-velocity model remains explicitly a lightweight ablation, never a silent replacement. Choosing a final alternative is deferred until hardware availability and an actual inference test provide evidence.

For RoboTwin, the LIBERO checkpoint is not compatible by assumption. Pin a suitable bimanual pretrained world-action/policy checkpoint and evaluate a fresh baseline before memory intervention. If no appropriate checkpoint exists, disclose a new adaptation/training phase rather than counting a custom SAPIEN test as replication.

Sources: [official repository](https://github.com/NVlabs/cosmos-policy), [checkpoint model card](https://huggingface.co/nvidia/Cosmos-Policy-LIBERO-Predict2-2B), [pinned evaluation instructions](https://github.com/NVlabs/cosmos-policy/blob/18a2accadf4e7a3531e56754102af5a24d2316da/LIBERO.md).

Related-work boundary: [Mem-World](https://arxiv.org/abs/2606.18960) concerns persistent action-conditioned prediction with memory; FRAME targets representation/addressing/age/service contracts. [Tensor Seeks Layout](https://arxiv.org/abs/2608.21555) studies layout selection and conversion in compiler dataflow; FRAME adds task utility, lossy granularity and staleness. [ReflexBench](https://reflexvla.github.io/) describes decoupled simulation/control with configurable delay; adopting those semantics is not a FRAME novelty claim. [RoboTwin 2.0](https://github.com/RoboTwin-Platform/RoboTwin) is a separate task/embodiment benchmark, not synonymous with the SAPIEN engine.

## Executed server feasibility update

The previous local feasibility report is now supplemented by actual Slurm probes. See `artifacts/raw/server/server_preflight.json`: RTX A6000 with CUDA-enabled Torch 2.6 works; native official Torch 2.7 installation fails; the A6000 host has glibc 2.17 and no accessible container runtime. No checkpoint was loaded, no model inference latency was measured, and no baseline success was measured. These null outcomes must remain null in machine-readable feasibility tables.

`SERVER_EXECUTION.md` evaluates OpenVLA-OFT and GR00T as policy fallback candidates and explains why policy-only execution cannot close the world-model imagination requirement. A supported Cosmos environment is the selected next dependency. Large foundation training is not launched to work around a failed runtime preflight.
