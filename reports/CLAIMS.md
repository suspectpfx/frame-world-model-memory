# Claims that survive the audit

The defensible thesis is consumer-conditioned memory serving. Its contribution is the joint treatment of task utility, representation, spatial information, layout adapters and age. Neither heterogeneous task requirements nor world-model memory itself is new.

| Claim | Decision | Surviving wording |
|---|---|---|
| H1 requirements differ | PROVISIONAL | Frozen feature readers exhibit differing representation/staleness responses under specified probes and baselines. Real-policy requirements and independent-prior sensitivity remain open. |
| H2 hidden permutation and recovery | PROVISIONAL empirical; inverse algebra safe | A sequence-varying hidden permutation degrades this learned spatial readout. The stored inverse arm has identical archived per-video scores. This is addressability failure, not proof of destroyed information. |
| Hidden permutation is worse than prior | NOT_SUPPORTED as a resolved population claim | Its point estimate exceeds 1 but the paired video-bootstrap interval includes 1. The degradation versus natural is a different, supported archived contrast. |
| H3 preserve versus reindex | NOT_SUPPORTED by legacy experiment | Both are valid choices; their storage, write and read operating points must be measured. No universal crossing is established. |
| H4 closed-loop Pareto improvement | NOT_SUPPORTED | Existing LIBERO perturbation replay does not measure a learned memory-conditioned policy. |
| More bytes cannot recover alignment | REVISE | The tested object-centered family fails to recover the scene readout across tested capacity. Cropping/pooling changes information, so this does not establish a universal layout theorem. |
| Any coarsening destroys utility | CONTRADICTED | Coarsening may preserve the reader's sufficient information. Losslessness of the representation and adequacy for a task are different properties. |
| Reader grid is a universal hard threshold | REVISE | The sampled higher-rank readout errors rise below the reader's grid. Exact thresholds and low-rank generalization are unresolved. |
| 2x eliminates alignment cost | CONTRADICTED as exact-zero statement | The interpolation residual is much smaller above the post-hoc margin; not zero, not equivalence, not a hard requirement. |
| 104 B measured metadata | CONTRADICTED | 104 B is a theoretical fixed-length permutation coding bound; implemented int64 inverse indices occupy 1152 B for 144 cells. |
| Inverse costs 9.7 us and 0.0017 mJ | PROVISIONAL timing; NOT_SUPPORTED energy precision | A stored batch-average timing exists; no independent repeated latency distribution or integrated energy samples exist. |
| 596x robot energy saving | RETRACTED for E2E claim | A ratio of separately assembled microbenchmark estimates exists; it is not a closed-loop energy frontier. |
| FRAME costs no throughput | NOT_SUPPORTED | A frozen-slab synthetic benchmark has a favorable point estimate; best-of-five selection and incomplete writes prevent a full systems claim. |
| No cost model needed | RETRACTED globally | Any simplification is local to a deployment, objective and channel pair. Layout conversion and capacity costs remain. |
| Same-sequence random frame is zero information | RETRACTED | Call it a within-sequence time-shuffled baseline. Scene and task context remain. |
| p=0.92 proves tasks identical | RETRACTED | Failure to reject heterogeneity at small n does not establish equal task sensitivity. |
| Low parallel efficiency caused by other users | NOT_SUPPORTED causally | Shared-host interference is plausible; a controlled idle-host comparison is missing. |

All old negative results stay in `FAILURES.md`. The machine-readable registry preserves exact original prose and source locations, including obsolete and contradicted claims. `CONFIRMED` on a new arithmetic audit claim means its explicitly bounded table-level statement was regenerated; it does not promote the original scientific claim.

All analyses of existing data in this package are retrospective/exploratory. H1–H4 are future confirmatory families only after endpoints, practical margins, task selection and analysis code are locked before new results are inspected.


## Paired learned-policy memory check — job 4495

WHAT WAS TESTED: three preselected task/state pairs × fresh, stale, TTL and TTL with inverse layout; learned Cosmos Policy actions; public Wan VAE variant; synchronous simulation.

WHAT WAS FOUND: all 12 episodes finished. Every TTL/inverse policy input hash and executed action agrees within its paired trajectory. Fresh and stale first diverge at action 17 in each task. All stale runs reach their step limit; TTL reaches the limit on Spatial and completes Object and Goal. The outcome table is generated from raw manifests.

WHAT CLAIM SURVIVES: exact inverse recovery survives the tested model input and actual action chain; memory intervention changes executed behavior.

WHAT CLAIM MUST CHANGE: these are integration checks on one state per task. They supply no calibrated FRAME superiority result, population success interval, or sensing-energy saving. The recorded memory-byte field excludes temporary arrays, model and process overhead.

WHAT REMAINS UNRESOLVED: held-out calibration, learned imagination access, full paired task/system comparison, latency-aware physics, and benchmark replication.

NEXT EXPERIMENT: job 4496 validates the fresh baseline on initial states 1–40 for each task, disjoint from the sanity state. GPU board energy uses the CUDA device UUID and remains separate from CPU and whole-system energy. Source and configuration hashes are retained.

## Fresh-observation deployment baseline — job 4496

WHAT WAS TESTED: 120 learned-policy episodes covering 40 new initial states in each of three fixed LIBERO tasks, with fresh observations, official simulator success, executed-action counts, inference latency, wall time and UUID-matched cumulative GPU-board energy.

WHAT WAS FOUND: all 120 episodes completed. The exact 95% within-task success interval is [0.9119, 1.0] for each 40/40 task result. Median executed actions are 77.5, 139.5 and 122.0 for Spatial, Object and Goal. Median gross allocated-GPU-board energy is 5.346, 6.850 and 7.218 kJ per episode, respectively.

WHAT CLAIM SURVIVES: this policy and deployment form a stable fresh-observation baseline on the tested task-state sets.

WHAT CLAIM MUST CHANGE: the result supplies no comparative FRAME effect, broad suite generalization, latency-aware Physical-AI claim or end-to-end robot energy estimate.

WHAT REMAINS UNRESOLVED: H4 remains NOT_SUPPORTED until the calibrated paired memory study is complete; official Cosmos tokenizer identity, learned imagination, latency-aware execution and cross-engine replication remain open.

NEXT EXPERIMENT: run the frozen paired memory protocol on the same 120 state-task units, preserving all failures and reporting task as the higher-level generalization unit.
