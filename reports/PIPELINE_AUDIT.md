# FRAME pipeline verification

The previous conceptual illustration was not logically complete. It is excluded as an authoritative method figure until the corrections below are reflected in the diagram and implementation. The revised formulation is `THEORY_REVISED.md`.

| Step | Required input and output | Correction / invariant | Current evidence |
|---|---|---|---|
| Sensor acquisition | Permitted sensor request → timestamped RGB/proprioception | New observations require an explicit gate; scoring truth cannot reach the selector | Gated fresh/stale/TTL wrapper executed in 12 paired sanity episodes; calibrated selector remains open |
| Encoding | Documented model input → compatible representation | DINO features cannot replace Cosmos RGB input without a tested adapter | Cached-reader path reproduced; documented RGB/proprioception path executed with the public Wan variant |
| Representation | Encoded payload → e,g choice | Fidelity and granularity are independent axes; discarded detail cannot be recovered by choosing a finer label | Cached grid/rank studies; full factorial open |
| Write | Payload + layout transform → record and metadata | Count actual mapping bytes; capture time differs from write time | A–G measured |
| Contract selection | Policy-visible state → calibrated feasibility estimate | True loss and ground truth are evaluation-only; confidence bounds require calibration | Selector calibration open |
| Direct access | Compatible stored layout → consumer | Directness is consumer-specific | Measured |
| Materializing inverse | Permuted payload + valid map → canonical tensor | Exact indexing recovery precedes profiling | Measured |
| Fused indirect access | Payload + map → consumer output | Full canonical allocation is optional and must not be drawn as mandatory | GPU fused and CPU tiled paths measured |
| Return | Valid resident record → decoded input | Retain field age and prediction provenance | Isolated read path measured |
| Imagine | Stored state + executed actions → time-aligned forecast | Proposed actions are not executed history; target horizon must match | Joint learned actions/futures executed; memory imagination using executed history remains unimplemented |
| Reobserve | Sensor gate → newly acquired field | The source is the environment, not memory | Explicit refresh rule executed in the synchronous sanity study; latency-aware path open |
| Model | Compatible input → proposed actions, predicted future, optional value | Same weights/decoder across arms; future prediction is not a measurement | Public-tokenizer variant executed finite actions and future predictions in simulator |
| Actuation | Proposed chunk → actual executed actions | Log clipping, interruption and termination; permit method-specific trajectories | Every proposed and applied action logged; fresh/stale diverge at action 17 in all three tested states |
| Scoring | Simulator outcome + complete trace → task/system metrics | Separate scorer; latency-aware physics and synchronous protocol reported separately | Official done, steps, per-call and episode wall times recorded; calibrated FRAME comparison and latency-aware scoring open |

## Claims that must remain separate

- Exact inverse recovery is a mathematical identity with numerical checks. It does not prove a robot task advantage.
- A lossy map cannot invert all inputs. It can still preserve everything needed by a specific task.
- A task-loss estimator can drive a selector. It cannot provide an unconditional true-loss guarantee.
- A predicted future can support memory. Its validity depends on actual actions, horizon and model error.
- Shared canonical and permuted stores can both use fused adapters. Fair comparisons control that capability.

## Acceptance decision

The pipeline is a coherent proposed architecture after these corrections. Its complete runtime correctness and claimed task/resource improvement remain unverified. Model loading, a conceptual animation and additional video panels cannot close that evidence gap.
