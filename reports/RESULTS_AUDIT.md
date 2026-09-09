# FRAME numerical and methodological audit

## Completed paired memory-control population — jobs 4523–4525 / 4535

The population study completed 480 episodes: the existing 120 fresh-observation episodes plus 360 stale, TTL and TTL+inverse episodes. Each of the three fixed LIBERO tasks contributes 40 paired initial states per arm. Dependency-gated analysis job 4535 completed with exit code 0 after checking complete state/arm coverage, source hashes, trace lengths, action arrays, channel schedules, capture ages, proposed-versus-executed actions, finite latency vectors and GPU energy fields.

Fresh succeeded in 40/40 states for Spatial, Object and Goal. Stale succeeded in 0/40 for all three. TTL and TTL+inverse each succeeded in 2/40 Spatial, 12/40 Object and 40/40 Goal. The paired TTL/inverse records have identical model-input hash sequences and identical complete executed-action arrays in all 120 states; maximum absolute action difference is zero. This supports exact address recovery for this implementation and shows that the inverse step does not change the policy trajectory.

TTL minus fresh success-rate differences are −0.95 for Spatial (paired state-bootstrap 95% CI [−1.00, −0.875]), −0.70 for Object ([−0.825, −0.55]) and 0.00 for Goal ([0, 0]). These are exploratory fixed-task estimates. The tasks were preselected, task is not resampled, raw McNemar p-values are not corrected into a confirmatory discovery family, and the TTL rule is not a calibrated FRAME selector.

The experiment establishes a real learned-policy memory intervention and task-dependent sensitivity to stale/periodic observations. It does not establish FRAME superiority, learned imagination serving, latency-aware physics or broad LIBERO-suite generalization.

The supplied page improves the exposition and adds useful inverse controls, but does not yet substantiate the advertised world-model and Physical-AI systems claims. This audit reads the original artifacts; it does not preserve a statement merely because the draft labels it confirmed.

## Evidence provenance

The submitted DOCX has no OOXML comments or tracked changes. The two advisor comments supplied in the user request are therefore the explicit brief. The ZIP contains HTML, CSS, one SVG, seven PNG figures and two MP4 demonstrations with posters; no scripts or data. The adjacent scratch directory contains the legacy experiment code and aggregated or per-video JSON outputs. Original latent `.npz` caches and complete simulator episodes are absent from this preserved directory. Input SHA-256 manifests are under `audit_workspace/source/`.

Source snapshots allow reanalysis of saved results, not exact regeneration of encoder outputs. The matching code version, command line, cache version, environment and machine logs are not fully archived. Missing proof is represented as missing, not inferred from a polished figure.

## Normalization discrepancy resolved

`artifacts/processed/layout.csv` is authoritative for newly generated figures. For the same 30 test videos in `relayout.json`:

- The historical plotted statistic is ratio of mean losses: `mean(loss_i) / mean(prior_i)`.
- The alternative statistic is the macro average of per-video ratios: `mean(loss_i / prior_i)`.
- The hidden arm is approximately 1.073 by the former and 1.121 by the latter. The natural and recovered arms change from approximately 0.0520 to 0.0528 as well. Combining the former natural value with the latter hidden value is inconsistent.
- Neither statistic is inherently invalid. Ratio of means implicitly weights normalized video losses by baseline loss; mean of ratios weights videos equally but is unstable near a zero denominator. Report both, denominator distributions and a predefined small-denominator policy.
- The old 1.082 is reproduced from `frame_ref3.json`. `frame_ref3_dinov2.json` differs again. `frame_ref.py` uses RandomState and `relayout.py` uses default_rng; comments mention an earlier salted `hash(s)` seed. These facts prevent assigning every difference to one known cause. Resolve run identity with original commits and payload hashes rather than overwriting one result with another.

Direct PNG inspection confirms that the uploaded page's Figure 4 (`assets/fig5_reference.png`) labels the hidden arm 1.121 while Table 3 says 1.073 and both natural/recovered image labels remain 0.052. The preserved `fig_relayout.py` computes ratio of aggregate means, which would label the hidden arm 1.073. Thus the image is not fully reproducible from that saved plot-script version. Targeted Tesseract extraction and `scripts/validate_evidence.py` record the same discrepancy automatically; the raster inspection independently confirms it.

The updated bootstrap resamples the same videos jointly across numerator, denominator and arms. Paired sign-flip tests are two-sided, use a plus-one Monte Carlo correction and Holm adjustment over four explicitly listed exploratory layout contrasts. They assume exchangeability/symmetry under their null. The result does not retroactively validate an old confirmatory family.

The hidden-permutation normalized-loss interval includes 1 under both aggregation conventions. Its positive paired contrast against natural is clear, but the stronger population statement “worse than the no-memory/prior baseline” is not resolved by these intervals. A point estimate above 1 is insufficient. These are different null hypotheses and must not share the same significance claim.

## Reversible layout and bytes

`relayout.py:96–104` constructs a permutation per sequence and applies its inverse. `perseq` values for natural and recovered match exactly. This is consistent with the mathematical identity, but archived score equality is distinct from regenerating latent tensors.

The metadata value at `relayout.py:97` and `reindex_cost.py:34` is `ceil(log2(N!)/8)`, a theoretical coding bound. No rank/unrank permutation codec, packed byte stream or decode cost is implemented. PyTorch randperm/argsort indices are int64: the actual inverse array uses `8*N` bytes. Compact indices and PRNG seeds are alternative encodings with different generation/decode costs; seed storage only specifies a restricted, algorithm-versioned family and is not a uniform arbitrary-permutation encoding. Forward index, temporary arrays, shape/layout descriptor and allocator bytes must be accounted separately, with persistent versus transient scope.

`reindex_cost.py` takes one 300-operation batch after warmup, synchronizes only at the end and divides by operation count. This is batch throughput amortization. No p50/p95/p99 or independent-run CI can be reconstructed. Energy is computed from a single post-batch NVML power sample minus an idle estimate, clamped at zero, times elapsed time. The same implied dynamic power across configurations raises a sampling-resolution concern. Zero-clamped samples are not proof of zero energy. The ~600 B tier actually allocates 2304 B as float32.

The statement that preserve and reindex “cross at a read-per-write ratio” in the script header is assumed before write costs were measured. Both no-crossing and negligible-overhead outcomes are possible.

## Granularity and statistical interpretation

The source's retile operation is adaptive average pooling, not a reversible change in tiling. It must be named lossy spatial coarsening. Each arm fits a separate ridge decoder (`relayout.py:155`); the experiment combines representation and arm-specific decoding. It is not a fixed deployed consumer with only an access adapter changed. Add a fixed decoder analysis and a decoder-adapted analysis under explicitly separate protocols.

The sampled errors rise when high-rank store grids pass below reader grids 3, 4 and 6. A coarse sweep identifies intervals, not an exact discontinuity or universal task threshold. At rank 8 this pattern is not reproduced in the same way. Correlation, limited grid interventions, changing decoder fits and task-specific sufficient statistics do not support “must never be coarser” as a theorem. An infeasible spatial constraint must trigger eviction, alternative representation or re-observation, not a silent constraint violation.

The dense-grid statistic is residual above an interpolated trend through integer-ratio points in log resolution. It is not extra error above the natural representation. `fig_scale_margin.py:90` hard-codes p=0.019; no generating test is present. The theory text suggests a low-margin versus high-margin residual comparison. Reconstructing that candidate test gives the exact values in `legacy_reanalysis.json`, but cannot certify the original null/tail/seed. Grid-label permutation is also not a valid independent-video generalization test because the cells reuse the same videos.

A video-cluster bootstrap produces a positive interval for the high-margin mean residual as well as for the low-minus-high contrast. This contradicts an exact-zero reading. It does not show practical importance either: practical equivalence requires a prior tolerance and a two-one-sided-test or interval containment criterion. Two times the side resolution also means four times as many cells in 2D; state which ratio is being used.

## Consumer baselines and H1

The page says all metrics share a uniformly random same-sequence baseline. `relayout.py` instead learns a constant-input training prior. `frame_ref.py` aggregates some rows by frames whereas relayout aggregates by video. `fig_regimemap.py` has another defect: bootstrap winner selection uses raw errors while the plotted winners use normalized errors. Thus certainty marks and the plotted estimand can disagree. The 123/130 and 108/130 counts cannot be retained as confirmatory without the exact checker and a corrected paired baseline bootstrap.

The DINOv2 metric-reader pipeline is acknowledged as inconsistent between batch sizes, yet the page headlines a three-consumer regime. The correct interim scope is the supported reader pair and a clearly unresolved metric-reader arm. CLIP changes both representation and probe, and images are upsampled from a different native resolution. This is pipeline-level replication, not an isolated backbone causal intervention.

Same-sequence random frames retain identity, scene geometry and task context and may even coincide with the queried time. Add time exclusion and independent cross-sequence priors. A ranking of normalized errors across consumers also does not imply that no shared fidelity tier meets every consumer's tolerance. H1 should compare minimal feasible resource sets or consumer-by-tier interactions, not merely which task has the numerically smallest normalized loss.

## Robotics evaluation

`libero_multi.py:61–68` resets to demonstration state, changes object qpos and replays fixed demonstration actions. No policy sees memory, no learned world model is invoked and no memory decision changes the selected actions. Therefore these are demonstration robustness tests against initial-state perturbations. They are useful exploratory diagnostics and must not be presented as FRAME task success.

`libero_multi.py:95` algebraically cancels the sampled true velocity. This represents a specified noise law, not learning dynamics. Reuse of the same RNG seed does not create identical per-episode directions across channels when imagination consumes additional random draws: pre-generate exogenous randomness by seed/episode/source instead. Some zero-offset replay results differ between repeated passes. Save simulator, controller, RNG and reset state, standard done/success semantics and the exact demo identity.

The earlier `libero_channels.py` reads body ground truth into its belief, has a reobserve branch that reads truth after waiting (thus fresh at that instant), and ORs official success with a custom lift criterion. This is not a standard policy benchmark; it must be kept separate from later replay experiments.

SAPIEN 2 custom box pushing is not RoboTwin 2.0 replication. Do not label two physics engines as two standardized benchmarks. A model with no task-specific term in its belief-error formula may still yield task-dependent success through different dynamics and success regions. p=0.92 is lack of evidence for heterogeneity, not proof of equality; task/episode nesting and pairing are unavailable in aggregate-only JSON.

`e11_frontier.json` has assembled channel costs and success values, without a generator establishing complete E2E provenance. Costs use a linear latent rollout benchmark, while success uses object-offset replay. Reobservation's 8 simulator steps at 20 Hz is 400 ms, inconsistent with treating 39.76 ms sensing as that same delay. A page reference to 24 fps is another timebase. Keep all timebases and acquisition timestamps explicit.

Energy per decision divided by success probability is not energy per successful episode. Report total measured episode energy divided by successes (all-attempt cost per success), and separately conditional mean energy of successful episodes. Zero successes yields undefined/infinite ratios, not division by an arbitrary epsilon. Imagination history acquisition and model loading/amortization policy must also be charged fairly.

## Systems evaluation

`mp_store.py` prepopulates records in popularity order and freezes the index. Misses are cheap dictionary failures; the write arm only acquires a lock and calls resample. No bytes are modified or admitted, and no eviction happens. The benchmark measures a static synthetic slab with differing hit paths. It is neither a dynamic store nor a 5% true-write workload.

The five throughput samples are available and can be summarized by median and a coarse bootstrap CI. Per-run latency vectors were discarded except for the fastest-throughput run, so median-run p50/p95/p99 cannot be recovered. A shared host and sorted samples lack paired run identity. Causal attribution to GIL, host load or layout alone requires controls.

`mt_store.py` is a separate dynamic LRU experiment, but couples measured hit rates to imported per-hit errors and averages consumers. This models effective error; it is not end-to-end task distortion. Synthetic semantic means and nearest-neighbor resampling differ from the learned decoder/average pooling of the source accuracy experiment. `caps = max(capacity/shards, full_record_bytes)` can exceed a requested global cap for small capacity and many shards. This invalidates equal-capacity claims for affected configurations unless checked explicitly.

LRU, LFU, 2Q/ARC, size-aware and frequency-size eviction can be adapted to the same interface. The absence of an external system with the identical tier API is not a justification for omitting conventional baselines. Compare identical capacities, traces, reads/writes, key namespaces and consumer distributions, including actual misses and admission costs.

## Global logic and presentation

Recoverability, decoder adequacy and task utility are separate. Object crops versus scene grids also change support and discarded degrees of freedom, so equal bytes do not isolate physical addressing. Consumer models must be identical across serving arms; adaptation must be a separate factor.

The two-channel equivalent-age comparison does not select three channels without a third candidate utility model. Cost ordering alone does not make costs irrelevant: a constrained resource objective may prefer a cheaper feasible option even when it has slightly larger distortion. Scope any reduced rule to its precise objective and deployment. Latency needs to be evaluated at use time, including conversion and inference.

The old draft labels all 18 confirmatory claims significant while acknowledging a 3.8x CI-width correction. Preserve the correction and require each original hypothesis, raw p, corrected p, resampling unit and artifact. Do not take old "confirmed" labels as audit outcomes. The page's numerical-check count is arithmetic QA, not scientific validation.

## Phase 0 closure note

WHAT WAS TESTED: text/artifact consistency, layout estimands and paired per-video effects, granularity residuals, timing protocol, replay causality and systems implementation.

WHAT WAS FOUND: the numerical normalization discrepancy is resolved; metadata and energy accounting are mischaracterized; strong embodied and zero-overhead claims lack appropriate experiments.

WHAT CLAIM SURVIVES: consumer-conditioned serving is a meaningful problem, reversible mappings recover the same stored signal, and archived probes exhibit addressability and spatial-granularity sensitivity.

WHAT CLAIM MUST CHANGE: zero information, mandatory layout preservation, exact 2x rule, no-cost model, closed-loop LIBERO claim, 596x E2E energy, best-of-five primary throughput and complete-write characterization.

WHAT REMAINS UNRESOLVED: raw latent reruns, original run identity and p=0.019 test, H1 independent-prior robustness, full serving costs, action-conditioned closed-loop task effects and reliable energy.

NEXT EXPERIMENT: bounded CPU correctness smoke, then controlled deployment Phase 1 after original caches and GPU access are available. This is not permission to skip the remaining Phase 0 provenance work.


## Paired learned-policy memory check — job 4495

WHAT WAS TESTED: three preselected task/state pairs × fresh, stale, TTL and TTL with inverse layout; learned Cosmos Policy actions; public Wan VAE variant; synchronous simulation.

WHAT WAS FOUND: all 12 episodes finished. Every TTL/inverse policy input hash and executed action agrees within its paired trajectory. Fresh and stale first diverge at action 17 in each task. All stale runs reach their step limit; TTL reaches the limit on Spatial and completes Object and Goal. The outcome table is generated from raw manifests.

WHAT CLAIM SURVIVES: exact inverse recovery survives the tested model input and actual action chain; memory intervention changes executed behavior.

WHAT CLAIM MUST CHANGE: these are integration checks on one state per task. They supply no calibrated FRAME superiority result, population success interval, or sensing-energy saving. The recorded memory-byte field excludes temporary arrays, model and process overhead.

WHAT REMAINS UNRESOLVED: held-out calibration, learned imagination access, full paired task/system comparison, latency-aware physics, and benchmark replication.

NEXT EXPERIMENT: job 4496 validates the fresh baseline on initial states 1–40 for each task, disjoint from the sanity state. GPU board energy uses the CUDA device UUID and remains separate from CPU and whole-system energy. Source and configuration hashes are retained.

## Fresh-observation learned-policy baseline — job 4496

WHAT WAS TESTED: 120 new-state episodes, with 40 initial states for each of three fixed LIBERO tasks. The policy receives fresh RGB, wrist RGB, and proprioception for every 16-action decision. Success uses the official benchmark flag. Simulation is synchronous.

WHAT WAS FOUND: 120/120 official completions. Exact within-task 95% success intervals are [0.9119, 1.0]. Median actions to success are 77.5 (Spatial), 139.5 (Object), and 122.0 (Goal). Gross allocated-GPU-board energy medians are 5.346, 6.850, and 7.218 kJ per episode. All 120 rows are preserved; no best-run selection is used.

WHAT CLAIM SURVIVES: the learned policy and public Wan tokenizer variant form a stable baseline on these fixed tasks and initial-state distributions. The baseline supplies the denominator and pairing target for the next memory comparison.

WHAT CLAIM MUST CHANGE: the result is a baseline validation. It supplies no comparative FRAME effect and no population claim across LIBERO tasks. Synchronous timing cannot establish physical latency robustness.

WHAT REMAINS UNRESOLVED: the calibrated ten-arm pilot, task-level hierarchical comparison, latency-aware execution, and RoboTwin replication.

NEXT EXPERIMENT: fit the selector only on disjoint calibration tasks/states, freeze thresholds, then execute paired evaluation arms against these fresh trajectories.
