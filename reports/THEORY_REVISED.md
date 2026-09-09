# FRAME: consumer-conditioned memory serving

## Scientific statement and evidence boundary

FRAME studies how to represent, address, age and serve memory under a downstream task contract. Its proposed contribution is a joint serving formulation and a runtime evaluated against that formulation. The existence of task-dependent information requirements, invertibility of permutations, and compiler layout optimization are established concepts; FRAME does not claim to introduce them.

The completed experiments establish exact reversible recovery for the tested records, fixed-reader utility recovery, and implementation-dependent CPU/GPU costs. They do not establish a task-success improvement under a learned closed-loop world model. The temporal selector and its consumer-conditioned calibration still require implementation and held-out evaluation.

## 1. Record and available information

For sensor field j, define

    r_j = (z_j, e_j, g_j, l_j, m_j, t_capture,j, t_write,j, provenance_j).

Here z is the stored payload; e specifies representation fidelity (for example precision or retained channel rank); g specifies spatial or semantic granularity; l specifies physical addressing; and m contains the decoder, shape and transform information required for interpretation. Capture time and write time have different meanings. Jointly varying rank and spatial grid cannot identify their separate effects: experiments must vary e and g independently.

A write operator forms z = P_l(Q_(e,g)(Encode(o))). The encoding must be compatible with the pretrained consumer. The current cached DINO feature experiments do not establish that DINO features can be supplied to an RGB-trained Cosmos model. The first robot integration therefore uses the model's documented RGB/proprioception interface. Latent-native serving is a separately validated interface.

The action set is restricted to representations that can actually be formed from resident records, available decoders, retained metadata and permitted sensor acquisitions. Upsampling or dequantization does not restore discarded information. Selecting a higher-quality label is not an acquisition operation.

For a predicted record, also retain its originating observations, prediction target time, model identity and conditioning action history. A prediction timestamp does not reset the age of the underlying observations. Log observation age, forecast horizon and horizon mismatch separately.

## 2. Consumer and runtime knowledge

A consumer c specifies a loss L_c, a tolerance epsilon_c, input schema, any mandatory semantic requirements, preferred layout l_c, and a deadline. A preferred layout is a performance preference; successful adaptation may satisfy the input contract. A required geometric sampling grid must be justified by the actual consumer, rather than inferred from a generic factor-two rule.

The true loss D_c is an evaluation quantity. A selector cannot inspect future outcomes or simulator ground truth. It uses a calibrated estimate or upper confidence bound U_c(q | I_t), where I_t contains only policy-visible information. Estimated feasibility U_c <= epsilon_c needs held-out calibration and explicit uncertainty assumptions. It does not by itself prove population feasibility D_c <= epsilon_c.

Calibration must use separate training/calibration trajectories, disjoint from evaluated initial conditions and, for cross-task claims, from evaluated tasks. Report coverage, failed constraints and distribution shift. Model variants receive the same pretrained weights and observation decoder.

## 3. Access operator and temporal branches

Let Recover_(l,m) restore logical indexing when the inverse is available. The direct and materializing paths may construct an explicit input tensor. A fused indirect path evaluates the consumer through indexed loads and need not construct that tensor. Its equivalence condition concerns the resulting consumer output:

    Consume_fused(z,m) = Consume(Recover_(l,m)(z))

within a declared numerical tolerance and with matching reduction semantics. A diagram must not route every fused access through mandatory canonical materialization.

Temporal access has three distinct data sources:

- Return: decode/adapt an available stored observation or valid prediction.
- Imagine: advance stored information using a learned dynamics model conditioned on the actions actually executed since its origin.
- Reobserve: open an explicit sensor gate, acquire selected fields from the environment, timestamp them, encode and optionally write them. This branch originates at the sensor, not at a memory bank.

A predicted future conditioned on proposed actions is reusable only if those conditioning actions and the intended horizon match the executed history and requested time. Otherwise recompute from valid history or acquire a new observation. The cost of a reused prediction includes its original generation under a declared amortization rule. Do not charge the same model call twice when policy and future predictions are jointly generated.

## 4. Closed-loop causal timeline

At a decision, read the record timestamps and the consumer request. Select feasible storage/access/temporal choices using policy-visible information. Obtain the model-compatible input through the chosen branch. Run the model, execute its selected action, append the actual action to the history, and advance the simulator. A new observation enters the policy only through the declared sensor rule. Ground truth remains available exclusively to the scorer and trace validator.

During latency-aware evaluation, model, adapter and sensing delay advance the physical timeline with a specified action-hold rule. Synchronous LIBERO is a separate conventional protocol. For a captured field,

    age_at_use,j = t_action - t_capture,j.

The action time includes service and queueing delay. Prediction target time and age at use must agree with the measured timeline. A model-selected action chunk and the executed chunk may differ because of interruption, clipping or termination; log both.

## 5. Evaluation objective

For a specified deployment distribution Q, define

    D_c(pi;Q) = E_Q[L_c(Y_c, f_c(Access_pi(I_t)))].

State whether L_c is an absolute prediction loss, an excess loss relative to fresh input, or an episodic task loss. These are distinct estimands. A decision-level proxy does not prove improved episode success. In a closed loop, policy pi changes the visited-state distribution, so offline comparisons are insufficient for the final task claim.

Find Pareto-minimal policies over resident bytes, action-latency distributions and measured episode energy, subject to

    D_c(pi;Q) <= epsilon_c,
    resident_bytes(t) <= capacity at every t,
    P(action_latency > deadline_c) <= alpha_c.

The implementation uses estimated feasibility, with actual violations measured during evaluation. If no candidate is feasible, log an infeasibility event and invoke a predeclared fallback; do not silently relax quality constraints. Count metadata, replicas, retained adapter results and shared model/decoder memory with an explicit amortization boundary. GPU board energy and CPU package energy are different measurement domains.

## 6. Three formal implications

**Reversible addressing.** If P is bijective and m identifies P, then P^-1 Pz=z. An identical deterministic consumer consequently returns the same output. Unknown indexing can degrade a spatial reader, but need not degrade a permutation-invariant reader. This implication is algebraic and is not claimed as a new theorem.

**Lossy aggregation.** A many-to-one transform maps at least two inputs to one record, preventing general input recovery. Task information is lost only when those indistinguishable inputs require different consumer outputs. Task-sufficient aggregation can remain useful. A hard collapse at store resolution below reader resolution and a conservative high-fidelity margin require separate empirical definitions and tests.

**Conditional reuse crossing.** With fixed per-write and per-read costs,

    C_preserve(F) - C_reindex(F) = delta_write + F*delta_read.

A candidate crossing is F* = -delta_write/delta_read only if delta_read is nonzero, F* is positive and in the supported range, and measured residuals support an affine model. Caching, fusion, batching and queueing can invalidate the model. A latency crossing alone does not imply a Pareto crossing. Unresolved differences are not evidence of equivalence.

## 7. Interpretation of the server evidence

The final GPU study gives both shared canonical storage and permuted storage fused consumer adapters. Many paired cells remain unresolved; the current evidence does not justify mandatory preservation of a preferred physical layout. Layout conversion, metadata and replication remain explicit cost choices. The public page reports exploratory pointwise intervals alongside the full corrected test family.

An equivalent-age reduction requires a calibrated monotone fresh-error curve with an identifiable inverse. It applies only to the specified subproblem and deployment. A non-crossing compute-cost curve alone does not justify removing resource costs from a constrained optimizer.

## 8. Novelty claims and required proof

1. Joint consumer-conditioned serving: test whether the joint decision expands a measured task/resource frontier relative to fixed fidelity, TTL and conventional cache policies.
2. Independent information and addressing choices: separate lossy granularity from reversible layout and compare equally optimized access paths.
3. Use-time temporal evaluation: test whether the memory policy changes actual executed actions and task outcomes when service delay affects the environment.

Items 1 and 3 remain research hypotheses. The completed evidence partially supports item 2 within the measured consumers and hardware. Full novelty and generality require the missing closed-loop and conventional serving-baseline experiments.
