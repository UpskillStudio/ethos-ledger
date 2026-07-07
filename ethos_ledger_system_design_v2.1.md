# System Design Document: Ethos Ledger

**Mission:** To build a Sovereign Wealth Co-Pilot that democratizes family-office-level financial engineering while maintaining zero-knowledge privacy over the user's absolute financial data.

**Document Version:** 2.1 **Status:** Architectural Blueprint

---

## 1\. Product Thesis

The wealth management industry is bifurcated. At the top, family offices deliver bespoke tax engineering, estate structuring, and multi-generational planning to households with $30M+ in investable assets. At the bottom, roboadvisors offer index allocation and automatic rebalancing for a 0.25% AUM fee. Between these poles sits a vast middle — high earners, dual-income professionals, equity-compensated employees, and first-generation wealth builders — who pay 1% AUM fees for advice that is often generic, conflicted, and computationally trivial.

Ethos Ledger collapses this gap. It treats financial planning as a deterministic engineering problem (math, tax code, statistics) augmented by an LLM acting strictly as a semantic interface. The user's financial reality never leaves a hardened privacy boundary; the LLM only ever reasons about tokenized abstractions and public tax code.

The result: family-office-grade strategy at software margins, with a cryptographic guarantee that no third party — including Ethos Ledger itself, in production — can reconstruct the user's balance sheet.

---

## 2\. Functional Requirements

### 2.1 Core Capabilities

**Lifecycle Event Detection & Traversal.** The system tracks user progression through life stages (Birth, Education, Career Start, High Earner, Family Formation, Peak Earnings, Pre-Retirement, Retirement/FIRE, Legacy) and triggers appropriate strategy modules. Transitions are driven by deterministic `LifeEvent` records, not inference.

**Zero-Leakage Local Reasoning.** All raw PII and exact financial figures are tokenized into semantic abstractions (e.g., `$247,500 W-2` → `[INCOME_TIER_HIGH_EARNER_FED_BRACKET_32]`) within a hardened privacy boundary before any external LLM invocation. The tokenization map never leaves the boundary.

**Modular Strategy Execution.** Isolated, independently versioned reasoning modules cover Tax Optimization, Real Estate, Estate Planning, Cash Flow, Education Funding, Investment Allocation, Insurance Adequacy, Equity Compensation, Debt Structuring, Charitable Giving, Business Entity Structuring, Eldercare Planning, and Digital Asset Management.

**Probabilistic Forecasting.** Monte Carlo simulations forecast portfolio outcomes across configurable market regimes (Bull, Bear, Average, Stagflation, Lost Decade) with sequence-of-returns risk modeling. Default 10,000 paths over horizons up to 60 years.

**Agentic Task Execution.** The system can navigate external web portals to assist with account creation, document retrieval, and form preparation — with reversibility classification and mandatory human approval gates for any transactional action.

**Voice-Native Fiduciary Interface.** Low-latency conversational interface for check-ins, scenario exploration, and proactive coaching.

### 2.2 Lifecycle Event Coverage

The system handles both the planned trajectory and the unplanned events that dominate real financial outcomes:

- **Planned:** marriage, dependents, home purchase, career changes, retirement, business formation, business sale  
- **Unplanned:** job loss, divorce, disability, inheritance, death of spouse, healthcare events, international relocation, aging parent care

### 2.3 Multi-Party Support

- Spouse co-access with configurable visibility scopes  
- Beneficiary designations and estate graph  
- Fiduciary delegate roles (trusted parties for elderly parents, minors, incapacity scenarios)  
- Read-only advisor access for CPAs and estate attorneys

### 2.4 Explainability & Auditability

Every recommendation surfaces its reasoning chain, source citations from the regulatory corpus, and the assumptions behind any projection. Every agentic action is logged immutably with full payload, timestamp, and approval chain.

---

## 3\. Non-Functional Requirements

### 3.1 Privacy & Security

- All core reasoning runs in distroless, signed container images with SBOM attestation  
- Zero PII or exact financial figures cross the privacy boundary to any external service  
- AES-256 at rest, TLS 1.3 in transit, envelope encryption for the tokenization vault  
- HSM-backed key management with per-user data encryption keys  
- MFA mandatory; hardware key support; biometric on mobile; device trust enrollment  
- Annual third-party penetration testing; continuous secret scanning and SAST/DAST in CI

### 3.2 Regulatory & Compliance

- Registered Investment Adviser (RIA) status with the SEC or relevant state authorities, depending on AUM  
- SOC 2 Type II within 12 months of GA  
- GLBA, CCPA, GDPR (for any EU users), and state privacy law compliance  
- Form ADV disclosures and fiduciary duty acknowledgment in onboarding  
- Books-and-records retention per Investment Advisers Act of 1940 (Rule 204-2)  
- Clear delineation between "advice" (regulated) and "education" (unregulated) in every output

### 3.3 Reliability

- 99.9% uptime SLA for the dashboard and API  
- 99.5% for voice interface (latency-sensitive, lower stringency)  
- RTO: 1 hour. RPO: 5 minutes for transactional data, 1 hour for derived state  
- Multi-region active-passive failover; quarterly DR drills

### 3.4 Performance

- Dashboard interactive in under 2 seconds (p95)  
- Voice round-trip latency under 500ms (p95)  
- Strategy evaluation under 3 seconds for typical portfolios  
- Monte Carlo simulation (10,000 paths, 50-year horizon) under 30 seconds

### 3.5 Data Sovereignty

- Financial math is deterministic and runs on owned infrastructure; LLMs are never the source of truth for numerical computation  
- Full data export available to users at any time (JSON \+ CSV)  
- Right to deletion honored within 30 days, subject to regulatory retention requirements

### 3.6 Accessibility

- WCAG 2.2 AA compliance across web and mobile  
- Screen reader support; keyboard-only navigation; voice as a first-class accessibility surface  
- Plain-language toggle for all financial outputs

---

## 4\. Core Data Model

### 4.1 Identity & Profile

**UserTwin** — the root entity. `twin_id`, `current_life_node`, `risk_tolerance_score (1-10)`, `tax_efficiency_index`, `state_of_residence`, `filing_status`, `created_at`, `last_evaluated_at`

**TaxProfile** — jurisdictional context. `filing_status`, `state`, `dependents`, `prior_year_agi`, `carryforward_losses`, `amt_status`, `estimated_payments_schedule`, `qualified_business_income_eligibility`

**ConsentRecord** — granular permissions. `scope` (e.g., `READ_BROKERAGE`, `EXECUTE_AGENTIC_ACTIONS`), `granted_at`, `expires_at`, `revocation_log`

### 4.2 Financial State

**FinancialGraph** — the encrypted memory state. `assets_hashed`, `liabilities_hashed`, `cash_flow_delta`, `insurance_coverage_map`, `last_reconciliation_at`

**Asset & Liability** — typed instances. Subtypes include `BrokerageAccount`, `RetirementAccount`, `RealEstateHolding`, `EquityGrant`, `AlternativeAsset`, `CashEquivalent`, `DebtInstrument`, `InsurancePolicy`, `BusinessInterest`, `DigitalAssetWallet`. Each carries cost basis, acquisition date, beneficiary designations, and tax treatment.

**EquityGrant** — first-class entity for equity-comp users. `grant_type` (RSU/ISO/NSO/ESPP), `grant_date`, `vest_schedule`, `strike_price`, `fmv_history`, `83b_election_status`, `qsbs_eligibility`

**BusinessInterest** — first-class entity for business owners. `entity_type` (LLC/S-Corp/C-Corp/Partnership/Sole Prop), `formation_date`, `ownership_percentage`, `qsbs_eligibility`, `basis`, `qbi_eligibility`, `retirement_plan_attached`

**DigitalAssetWallet** — first-class entity for crypto holders. `custody_type` (self-custody/exchange/qualified custodian), `chain`, `cost_basis_lots`, `staking_status`, `defi_position_inventory`, `seed_phrase_inheritance_status`

**LifeEvent** — typed event log driving node transitions. `event_type`, `effective_date`, `payload`, `triggered_modules`, `user_acknowledged_at`

### 4.3 Strategy & Execution

**StrategyModule** — blueprint for a financial play. `module_id`, `version`, `trigger_conditions`, `required_inputs`, `associated_risks`, `regulatory_citations`, `reversibility_class`

**SimulationTask** — parameters for the compute layer. `time_horizon_years`, `starting_principal`, `contribution_schedule`, `portfolio_allocation`, `market_regime_distribution`, `withdrawal_strategy`, `tax_drag_model`

**ScenarioSnapshot** — saved what-if projections. `baseline_state`, `perturbations`, `simulation_results`, `created_at`, `comparison_anchors`

**AgenticIntent** — payload for web automation. `target_url`, `action_type`, `payload_data`, `reversibility_class`, `human_approval_required`, `approval_token`

**AuditLogEntry** — immutable execution record. `actor` (user/system/agent), `action`, `payload_hash`, `outcome`, `timestamp`, `signature`

### 4.4 Estate & Beneficiary

**EstateGraph** — the inheritance topology. `beneficiary_designations`, `trust_structures`, `tod_pod_assignments`, `executor_designations`, `digital_asset_inventory`

---

## 5\. API Surface

All client traffic is mediated by WunderGraph, which composes internal microservices, third-party data feeds (Plaid, brokerage APIs, IRS data), and the regulatory corpus into a unified GraphQL/TypeScript schema.

### 5.1 Identity & Onboarding

- `POST /v1/auth/session` — MFA-gated session establishment  
- `POST /v1/twin/initialize` — creates the Financial Digital Twin  
- `POST /v1/consent/grant` and `POST /v1/consent/revoke` — granular permissioning

### 5.2 State & Strategy

- `GET /v1/twin/state` — returns the current UserTwin and active life node  
- `POST /v1/events/lifeevent` — records a typed life event, triggers re-evaluation  
- `GET /v1/strategy/evaluate` — runs all eligible StrategyModules, returns ranked recommendations  
- `GET /v1/strategy/{module_id}/explain` — returns reasoning chain and citations

### 5.3 Compute

- `POST /v1/compute/montecarlo` — dispatches simulation to Akash; returns async job ID  
- `GET /v1/compute/job/{id}` — polls job status and returns results  
- `POST /v1/scenarios/compare` — diffs two ScenarioSnapshots

### 5.4 LLM Interface (Behind Privacy Boundary)

- `POST /v1/llm/semantic-parse` — internal-only; sends tokenized prompt to LLM  
- `POST /v1/llm/cite` — retrieves grounded citation from the Ghost vector corpus

### 5.5 Agentic Execution

- `POST /v1/agent/dispatch` — queues an AgenticIntent for execution  
- `POST /v1/agent/{intent_id}/approve` — human approval gate  
- `POST /v1/agent/{intent_id}/rollback` — reversal for reversible actions

### 5.6 Webhooks & Real-Time

- Outbound webhooks for vest events, deposit detection, market threshold crossings, deadline approaches  
- WebSocket channel for dashboard live updates

### 5.7 Data Portability

- `GET /v1/export/full` — user-initiated full data export  
- `POST /v1/account/delete` — right-to-deletion request, subject to regulatory holds

---

## 6\. Architecture

┌──────────────────────────────────────────────────────────────────┐

│                         CLIENT LAYER                             │

│   Web Dashboard (Next.js)    Mobile (React Native)    Voice (Vapi)│

└───────────────────────────────┬──────────────────────────────────┘

                                │ TLS 1.3

┌───────────────────────────────▼──────────────────────────────────┐

│                    EDGE & API GATEWAY                            │

│   CloudFront CDN  →  WAF  →  WunderGraph (unified GraphQL)       │

│   Cognito (auth, MFA, device trust)                              │

└───────────────────────────────┬──────────────────────────────────┘

                                │

┌───────────────────────────────▼──────────────────────────────────┐

│                      ORCHESTRATION LAYER                         │

│   Step Functions (multi-step flows)  ·  EventBridge (event bus)  │

│   Lambda (stateless strategy modules)                            │

└───────────────────────────────┬──────────────────────────────────┘

                                │

┌═══════════════════════════════▼══════════════════════════════════┐

║              ZERO-LEAKAGE PRIVACY BOUNDARY                       ║

║              (Chainguard distroless \+ signed)                    ║

║                                                                  ║

║   ┌────────────────────────────────────────────────────────┐    ║

║   │           LOCAL REASONING ENGINE                       │    ║

║   │   • Evaluates UserTwin against StrategyModules         │    ║

║   │   • Performs all financial math deterministically      │    ║

║   │   • Tokenizes PII before any external invocation       │    ║

║   └─────────────────────┬──────────────────────────────────┘    ║

║                         │                                        ║

║   ┌─────────────────────▼──────────────────────────────────┐    ║

║   │           TOKENIZATION VAULT                           │    ║

║   │   • Holds PII ↔ semantic-token mapping                 │    ║

║   │   • KMS-backed envelope encryption                     │    ║

║   │   • Per-user DEKs; mapping never leaves boundary       │    ║

║   └────────────────────────────────────────────────────────┘    ║

└═══════════════════════════════╤══════════════════════════════════┘

                                │ Tokenized prompts only

                                ▼

┌──────────────────────────────────────────────────────────────────┐

│                       INTELLIGENCE LAYER                         │

│   AWS Bedrock (Claude for reasoning, Titan for embeddings)       │

│   Bedrock Guardrails (defense-in-depth PII filter)               │

│   Ghost / TigerData (vector corpus: IRS pubs, state tax codes,   │

│                      SEC filings, case law, finance research)    │

└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐

│                    DATA & MEMORY LAYER                           │

│   Redis Enterprise:                                              │

│     • Streams (LifeEvent log)                                    │

│     • Vector (user history semantic search)                      │

│     • TimeSeries (net worth, portfolio drift)                    │

│     • Pub/Sub (real-time dashboard)                              │

│   Aurora PostgreSQL (transactional state, encrypted at rest)     │

│   S3 \+ Glacier (immutable audit log, compliance retention)       │

│   Nexla (ingestion: Plaid, brokerage feeds, payroll, IRS, market)│

└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐

│                  EXECUTION & COMPUTE LAYER                       │

│   Akash Network (Monte Carlo, backtests, portfolio optimization) │

│   Tinyfish (web automation, read-only by default,                │

│             human-gated for transactional actions)               │

└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐

│                       OBSERVABILITY                              │

│   OpenTelemetry → CloudWatch \+ Prometheus \+ Grafana              │

│   Sentry (errors)  ·  SIEM (security events)                     │

│   Bedrock invocation logs  ·  Agent action ledger                │

└──────────────────────────────────────────────────────────────────┘

### 6.1 Sponsor & Component Justification

**AWS** is the enterprise backbone. Bedrock provides frontier model access with VPC isolation; Bedrock Guardrails act as a defense-in-depth PII filter behind the primary tokenization layer. KMS underpins the tokenization vault. Step Functions orchestrate the multi-step flows that life events trigger. S3 with Object Lock and Glacier Deep Archive provides the WORM audit log required by Investment Advisers Act recordkeeping rules.

**Akash** offloads embarrassingly parallel simulation workloads. Running 10,000-path Monte Carlo simulations across the user base on hyperscaler GPUs would be cost-prohibitive; Akash's decentralized GPU marketplace enables backtests and portfolio optimization at a fraction of the cost while keeping the workload itself purely numerical (no PII leaves the privacy boundary; only tokenized portfolio compositions are sent).

**Redis** is the agent's working memory substrate. Streams provide an append-only LifeEvent log; Vector enables semantic recall over the user's own history; TimeSeries powers net-worth tracking and drift detection; Pub/Sub drives live dashboard updates. The tokenization map cache lives here, with values KMS-encrypted at rest.

**Nexla** is the data normalization layer. It ingests and harmonizes brokerage statements, Plaid feeds, payroll data, IRS publication updates, ETF expense ratio changes, and mortgage rate feeds into the canonical FinancialGraph schema — turning the data-janitorial work that breaks most fintechs into managed pipelines.

**Ghost (TigerData)** is the citation engine. It hosts the vectorized regulatory corpus — IRS publications, state tax codes, SEC filings, court rulings on trust structures, and the foundational personal finance literature (Trinity Study, Bogleheads canon, academic papers on safe withdrawal rates). Every recommendation the system surfaces is grounded in a Ghost-retrieved citation, satisfying the explainability requirement and providing the regulatory paper trail an RIA needs.

**WunderGraph** is the connectivity glue. It composes the internal microservice surface plus dozens of third-party APIs (Plaid, Vanguard, Schwab, IRS data feeds) into a single typed GraphQL schema. Each StrategyModule is implemented as a typed WunderGraph operation, giving the agent a uniform action surface and centralizing auth, rate-limiting, and request logging.

**Vapi** powers the conversational interface. The product thesis is that wealth management requires both deep-work sessions (dashboard, scenario modeling) and ambient coaching (verbal check-ins during a commute, hands-free what-if exploration). Vapi's sub-500ms latency makes the latter feel like talking to an advisor rather than a chatbot.

**Tinyfish** handles the long tail of "the brokerage doesn't have an API." Account opening, document retrieval, beneficiary updates, and form pre-filling are all handled through browser automation. The system enforces strict reversibility classification: read-only and pre-fill actions can execute autonomously, while any state-changing transaction requires explicit human approval through a dedicated mobile push notification with biometric confirmation.

**Chainguard** secures the supply chain. Every container in the privacy boundary — the Local Reasoning Engine, the Tokenization Vault, the StrategyModule runtimes — runs on Chainguard distroless images with signed SBOMs and continuous CVE patching. This is the load-bearing claim behind "zero-leakage": a hardened, minimal-attack-surface runtime where arbitrary code execution is structurally difficult.

---

## 7\. The Privacy Boundary in Detail

The privacy boundary is the architectural keystone. It is a network-isolated VPC with no outbound internet access except through an egress proxy that enforces an allowlist (Bedrock endpoints, Ghost endpoints, Akash gateway). Inbound traffic is restricted to authenticated requests from the orchestration layer.

Inside the boundary:

1. The Local Reasoning Engine receives a user query plus the user's encrypted FinancialGraph reference.  
2. It retrieves the FinancialGraph from Aurora, decrypts with the per-user DEK fetched from KMS, and loads the in-memory representation.  
3. It performs all deterministic computation locally — tax calculations, allocation drift, contribution headroom, withdrawal sequencing.  
4. If the query requires LLM assistance (e.g., "explain why this strategy applies to me"), the engine invokes the Tokenization Vault to transform the prompt: dollar amounts become tier abstractions, account numbers become opaque IDs, employer names become industry codes, and dates become relative offsets.  
5. The tokenized prompt is sent to Bedrock. Bedrock Guardrails provide a second-layer PII filter as defense-in-depth (catching any tokenization miss).  
6. The LLM response — containing only references to tokens — is detokenized inside the boundary before being returned to the user.

The tokenization map for a given session is held in Redis with a short TTL, encrypted with a session-specific key derived from the user's DEK. The map is never persisted in plaintext and never traverses the boundary.

### 7.1 Threat Model

The system defends against:

- **Curious LLM provider:** sees only tokenized prompts; cannot reconstruct dollar amounts or identities  
- **Breached LLM provider:** even with full prompt logs, the adversary obtains semantic abstractions of generic financial situations  
- **Compromised orchestration layer:** lacks the KMS permissions to decrypt FinancialGraphs; can only route requests  
- **Insider at Ethos Ledger:** production access requires break-glass procedures with cryptographic audit; per-user DEKs prevent broad data access  
- **Prompt injection through web content:** Tinyfish-retrieved page content is treated as untrusted data, never as instructions; agent actions require pre-declared intents  
- **Re-identification through aggregation:** tokenization tiers are coarse enough that the combination of tokens for any user matches thousands of others in the population

The system does *not* defend against a nation-state adversary with KMS root access, a compromised user device with active malware, or a user who voluntarily discloses their plaintext financials elsewhere.

---

## 8\. Strategy Modules

Each module is independently versioned, regulatorily cited, and reversibility-classified.

**Tax Optimization** — bracket management, Roth conversion ladders, tax-loss harvesting, asset location optimization, AMT planning, QBI deduction, charitable bunching, DAF strategies.

**Investment Allocation** — risk-adjusted portfolio construction, Boglehead three-fund baseline with optional factor tilts, rebalancing thresholds, glidepath management.

**Equity Compensation** — RSU sell-to-cover vs. hold simulation, ISO exercise timing with AMT modeling, ESPP optimization, 83(b) election guidance, QSBS qualification tracking, 10b5-1 plan structuring.

**Retirement Account Strategy** — 401(k) match capture, Backdoor Roth, Mega Backdoor Roth, Solo 401(k) for self-employed, SEP-IRA, HSA triple-tax optimization, Social Security claiming optimization, Medicare/IRMAA planning, RMD sequencing.

**Real Estate** — rent vs. buy analysis with full carrying-cost modeling, mortgage refinance triggers, HELOC optimization, house-hacking and rental property analysis, 1031 exchange planning, depreciation recapture modeling.

**Education Funding** — 529 plan optimization, Coverdell ESA, UTMA/UGMA tradeoffs, financial aid impact modeling, education tax credits, student loan strategies (PSLF, IDR, refinance).

**Insurance Adequacy** — term life sizing via human capital method, disability income protection, umbrella liability, long-term care planning, health insurance optimization including HSA-eligible high-deductible plans.

**Estate Planning** — revocable living trust setup, beneficiary designation audit, TOD/POD optimization, gift tax annual exclusion, generation-skipping considerations, digital asset inventory, healthcare directives.

**Cash Flow & Debt** — emergency fund sizing by zip code and dependents, debt avalanche vs. snowball, mortgage paydown vs. invest analysis, sinking funds for predictable expenses.

**Charitable Giving** — donor-advised fund setup, qualified charitable distributions from IRAs, appreciated stock donation, charitable remainder trusts for high-net-worth users.

**Business Entity Structuring** — entity selection (LLC vs. S-Corp vs. C-Corp), QSBS qualification engineering, owner retirement plan selection (Solo 401(k), SEP-IRA, defined benefit), reasonable compensation analysis, QBI deduction optimization, Section 1202 holding period tracking.

**Eldercare Planning** — long-term care funding strategies, Medicaid eligibility and 5-year look-back planning, gifting strategies within annual exclusion limits, irrevocable trust structures (MAPT, irrevocable life insurance trusts), filial responsibility law exposure by state.

**Digital Asset Management** — cost basis tracking across chains and lots, wash-sale rule analysis (and the current absence thereof for crypto), tax-loss harvesting opportunities, staking and DeFi income classification, self-custody vs. qualified custodian tradeoffs, seed phrase inheritance protocols.

---

## 9\. Key User Flows

### 9.1 Onboarding & Twin Initialization

The user authenticates with MFA, accepts the fiduciary disclosure and Form ADV, and grants initial consent scopes. Nexla pipelines pull authorized data feeds (Plaid for bank/brokerage, payroll integration for income). The Local Reasoning Engine constructs the initial FinancialGraph, computes the appropriate `current_life_node`, and runs the full StrategyModule evaluation suite. Within minutes the user has a personalized dashboard with prioritized recommendations, each grounded in a Ghost-retrieved regulatory citation.

### 9.2 The Newborn Optimization

Trigger: the user records a `LifeEvent` of type `DEPENDENT_ADDED`. EventBridge dispatches to the Birth strategy modules. The system identifies the 18+ year time horizon advantage and proposes a Custodial Roth IRA (if the dependent will have earned income), a 529 plan with state tax deduction analysis, beneficiary updates across all existing accounts, and a Revocable Living Trust if the user lacks one. Akash runs a side-by-side simulation of the 529 funded at the state-deduction maximum versus a UTMA brokerage account, accounting for financial aid impact. Upon user approval, Tinyfish drafts the 529 application at the user's preferred provider, leaving final submission to the user.

### 9.3 First-Generation Wealth Builder

Trigger: onboarding indicates zero generational wealth, low liquidity, and modest income. The engine suppresses aggressive investment modules and prioritizes the Security Foundation sequence: emergency fund, employer 401(k) match capture (free money before any other investing), then high-deductible health plan with HSA, then Roth IRA, then back-fill 401(k). The roadmap is strictly chronological. Nexla monitors the checking account; Vapi delivers a verbal milestone celebration when the emergency fund hits 100%.

### 9.4 Career Start & Equity Compensation

Trigger: a `LifeEvent` of type `JOB_CHANGE` with equity compensation flagged. The user uploads or links their offer letter and grant documents. The Equity Compensation module parses vest schedules, computes expected after-tax proceeds under sell-to-cover vs. hold scenarios, and flags concentration risk thresholds. A 10b5-1 plan structure is proposed if the user is a covered employee. Akash runs a 10,000-path simulation showing the distribution of outcomes for each strategy.

### 9.5 High Earner Transition

Trigger: trailing twelve-month income crosses the top federal bracket threshold. The system shifts the user from accumulation-focused to tax-efficiency-and-protection focused. It quantifies the explicit cost of any AUM-fee advisor relationships against a flat-fee fiduciary alternative. It enables Backdoor Roth and Mega Backdoor Roth modules if the employer plan permits. It evaluates LLC formation for asset segregation if the user holds rental property or operates a side business. It proposes umbrella liability coverage sized to net worth.

### 9.6 Education Funding Decision

Trigger: the user requests strategies for a dependent's education. The system pulls current 529 limits and state tax treatment from Ghost, regional real estate appreciation data from Nexla, and dispatches a multi-scenario simulation to Akash. The output is a comparative analysis: maxing a 529 in age-based index funds versus a house-hacked rental near a target university (with rental income offsets, depreciation benefits, and projected equity), versus a hybrid approach. Each path includes downside scenarios, not just expected values.

### 9.7 Job Loss & Severance Optimization

Trigger: `LifeEvent` of type `EMPLOYMENT_TERMINATED`, often surfaced automatically when Nexla detects the cessation of regular payroll deposits. The system immediately runs the Job Loss runbook in priority order. First, severance tax timing analysis: the engine models lump-sum versus salary-continuation receipt across calendar-year boundaries to identify bracket-arbitrage opportunities, including whether to defer signing bonuses or accelerate deductions into the high-income year. Second, health coverage continuity: COBRA's 18-month bridge is compared against ACA marketplace premiums net of advance premium tax credits (which the user may now qualify for at lower income), with explicit attention to maintaining HSA-eligible coverage so the existing HSA can continue to receive contributions. Third, the 401(k) rollover decision: leave-in-place versus rollover-to-IRA versus rollover-to-new-employer, with a Net Unrealized Appreciation analysis if the account holds appreciated employer stock (NUA can convert ordinary income to long-term capital gains, sometimes saving tens of thousands but only available on a one-shot lump-sum distribution). Fourth, runway calculation: the emergency fund is recomputed against the new burn rate, unemployment insurance eligibility is checked by state, and a deliberate spend-down sequence is proposed (taxable accounts before retirement accounts, except where Roth contribution withdrawals make sense). Vapi proactively checks in weekly during the unemployment period; Tinyfish can pre-fill state unemployment applications and COBRA election forms, leaving submission to the user.

### 9.8 Inheritance & Windfall

Trigger: `LifeEvent` of type `WINDFALL_RECEIVED`, with subtypes for inheritance, lawsuit settlement, lottery, or other lump sum. The system executes the windfall protocol designed to defeat the documented behavioral pitfalls of sudden wealth. Step one is decision deferral: the funds are parked in Treasury bills or a high-yield money market account for a configurable cooling-off period (default 90 days), with the system actively suppressing any investment recommendations during this window. Step two is structural analysis specific to inheritance: the engine verifies step-up in basis on inherited taxable assets (resetting cost basis to date-of-death fair market value, often eliminating decades of embedded gains), applies the SECURE Act's 10-year rule to inherited non-spouse retirement accounts (the stretch IRA is dead for most beneficiaries; the engine models distribution sequencing across the 10-year window to minimize lifetime tax drag), and identifies whether the estate triggered federal or state estate tax filing. Step three is integration planning: the windfall is deployed against the user's existing latent graph in priority order — emergency fund top-off, high-interest debt elimination, retirement account maxing for the year, 529 contributions, then taxable brokerage deployment via dollar-cost-averaging over 6-12 months to mitigate lump-sum-at-the-top regret. For inheritances above estate tax exemption thresholds, the engine recommends consultation with the user's estate attorney before any deployment, with a Ghost-retrieved citation packet prepared for that meeting.

### 9.9 Divorce

Trigger: `LifeEvent` of type `DIVORCE_INITIATED`. This flow is treated with extra care — the system explicitly notes that it complements rather than replaces the user's family law attorney, and outputs are framed as preparation materials rather than legal advice. The engine first establishes the marital estate inventory: it segregates separate property (premarital assets, inheritances received individually) from community/marital property using state-specific rules (community property states versus equitable distribution states have materially different defaults). It then models the Qualified Domestic Relations Order requirements for splitting retirement accounts: a QDRO is the only mechanism that allows pre-retirement-age division of qualified plans without triggering the 10% early withdrawal penalty, and its drafting precision matters enormously. The engine generates a QDRO checklist for the user's attorney covering plan-specific procedures, survivor benefit elections, and the choice between shared-payment and separate-interest approaches. Filing status implications are surfaced immediately: the year-of-divorce filing decision (joint final return versus married-filing-separately), the head-of-household qualification rules for the custodial parent, and the dependency exemption allocation. Asset division modeling runs through Akash to show the long-term wealth trajectory under several proposed splits — a 50/50 split of nominal value can be wildly inequitable when one side gets the house (with embedded transaction costs and concentration risk) and the other gets liquid retirement assets (with embedded tax liability). Beneficiary designation updates across all accounts are flagged as urgent post-decree action items, and Tinyfish can pre-fill the change-of-beneficiary forms once the decree is final.

### 9.10 Starting a Business

Trigger: `LifeEvent` of type `BUSINESS_FORMED` or user-initiated request. The Business Entity Structuring module runs the full formation analysis. Entity selection compares LLC (default for solo operators with liability protection and pass-through taxation), S-Corp election (which can reduce self-employment tax once profit exceeds reasonable compensation, typically meaningful around $80K+ net income), C-Corp (rarely correct for small businesses but the only path to QSBS treatment under Section 1202), and partnership structures for multi-owner cases. State of formation is analyzed against operating state — Delaware and Wyoming are popular but often add complexity without benefit for single-state operators. QSBS engineering is a distinct workstream: if the business has plausible exit potential, C-Corp formation must happen before any meaningful value accrues to start the five-year holding period clock for the Section 1202 exclusion, which can shield up to $10M (or 10x basis) of gain from federal tax. The engine surfaces this tradeoff explicitly because most founders default to LLC and forfeit QSBS irreversibly. Retirement plan selection follows: Solo 401(k) for owner-only businesses (highest contribution limits, Roth option, loan provisions), SEP-IRA for simplicity, SIMPLE IRA for very small employee counts, defined benefit plans for high-income late-career owners who can shelter $200K+ annually. The QBI deduction (Section 199A, providing up to 20% deduction on qualified business income) is modeled with attention to the specified service trade or business limitations and the W-2 wage and UBIA tests above income thresholds. Tinyfish can pre-fill state formation documents, EIN applications, and S-Corp election Form 2553, leaving signature and submission to the user.

### 9.11 Selling a Business / Liquidity Event

Trigger: `LifeEvent` of type `BUSINESS_SALE_PENDING` or `LIQUIDITY_EVENT`. This flow front-loads pre-transaction planning where the leverage is highest, then transitions to post-transaction deployment. Pre-transaction, QSBS exclusion analysis is paramount: if the business is C-Corp stock held for at least five years, Section 1202 may exclude up to $10M or 10x basis from federal tax, and stacking strategies (gifting QSBS stock to non-grantor trusts in different states, multiplying the per-taxpayer exclusion) can extend this dramatically — but these structures must be in place before a definitive sale agreement. Charitable Remainder Trusts (CRT) are modeled for owners with charitable intent: contributing appreciated stock to a CRT before sale eliminates the embedded capital gain at the trust level, provides an immediate charitable deduction, and generates a lifetime income stream, with the remainder going to charity. Opportunity Zone deployment is analyzed for capital gains the user wants to defer: investing recognized gains into a Qualified Opportunity Fund within 180 days defers the original gain to 2026 (current law) and provides step-up benefits for the OZ investment held 10+ years. Installment sale structures are modeled where the buyer permits, spreading recognition across multiple tax years to manage bracket exposure. Post-transaction, the proceeds run through a windfall protocol similar to Section 9.8 but with a structural overlay: the user has likely transitioned from active business owner to investor overnight, requiring construction of an investment policy statement, tax-aware asset location across newly-funded accounts, and often a deliberate transition to a flat-fee fiduciary relationship rather than the AUM-fee advisors who will aggressively pitch the newly liquid client. The engine also flags state residency planning windows: a pre-sale move from a high-income-tax state to a no-income-tax state, properly executed with documented domicile change, can save seven figures on a large transaction — but only if structured well in advance of the sale.

### 9.12 Aging Parents

Trigger: `LifeEvent` of type `PARENT_CARE_INITIATED` or user-added family member with appropriate role. The Eldercare Planning module addresses one of the most under-served and emotionally fraught areas of personal finance, explicitly recognizing that the user is often planning for someone else's resources rather than their own. Long-term care funding analysis compares the available options: traditional LTC insurance (now expensive and often unavailable above certain ages), hybrid life-LTC policies (which return a death benefit if care is never needed), self-funding from a dedicated portfolio sleeve, and the Medicaid pathway. The Medicaid analysis is the most consequential: Medicaid pays for the majority of nursing home care in the United States but requires asset spend-down to state-specific thresholds, and the 5-year look-back period scrutinizes asset transfers made in the 60 months prior to application — uncompensated transfers within that window create disqualification penalty periods. The engine models gifting strategies that work within these constraints: annual exclusion gifts (currently $18,000 per recipient) are not look-back-exempt under Medicaid rules even though they are gift-tax-exempt, so naive gifting plans can backfire. Irrevocable trust structures are analyzed where appropriate: Medicaid Asset Protection Trusts can shield assets from the spend-down requirement, but only if funded outside the look-back window. Spousal protections are modeled (Community Spouse Resource Allowance prevents the at-home spouse from being impoverished by the institutionalized spouse's care). Filial responsibility law exposure is surfaced for users in the roughly 30 states where adult children can theoretically be held liable for indigent parents' care costs, with state-specific risk assessment. Powers of attorney (financial and healthcare) and HIPAA authorizations are flagged as foundational documents that must exist before incapacity. Tinyfish can pre-fill VA Aid and Attendance applications for veteran parents and Medicaid pre-screening forms.

### 9.13 Healthcare Event

Trigger: `LifeEvent` of type `HEALTH_DIAGNOSIS`, `DISABILITY_ONSET`, or `SIGNIFICANT_MEDICAL_EXPENSE`. The Healthcare Event flow handles both acute episodes and chronic transitions. For disability onset, the system runs the disability claim workflow: Social Security Disability Insurance eligibility analysis (the work-credits test and the medically-determinable-impairment standard, with the typical multi-year approval timeline), private long-term disability claim preparation if the user holds individual or employer-sponsored coverage (with attention to the own-occupation versus any-occupation distinction that often determines benefit duration), and ABLE account evaluation for users with disabilities meeting the onset-before-26 criterion (ABLE accounts allow tax-advantaged savings without disqualifying the holder from means-tested benefits). HSA drawdown sequencing is a distinct optimization: the HSA is the most tax-advantaged account in the U.S. tax code (deductible going in, tax-free growth, tax-free out for qualified medical expenses), and the engine models when to actually use HSA funds versus when to pay current medical expenses out-of-pocket and let the HSA continue compounding while preserving receipts for tax-free reimbursement decades later. For significant ongoing medical expenses, the engine models the medical expense itemized deduction (deductible above 7.5% of AGI), the impact of medical expenses on state-level deductions, and bracket-management strategies like Roth conversion suppression in high-medical-expense years. If the user becomes Medicare-eligible, IRMAA bracket management becomes central: Medicare Part B and D premiums are income-tested with cliff effects, and a single dollar of additional MAGI can cost thousands in higher premiums for the year. For terminal or end-of-life situations, the engine surfaces palliative-care financial planning, hospice benefit analysis, and the urgency of estate document review with appropriate gentleness in tone.

### 9.14 Crypto / Digital Asset Integration

Trigger: user adds a `DigitalAssetWallet` or links an exchange account. The Digital Asset Management module treats crypto as a first-class asset class while being explicit about its distinct tax treatment, custody risks, and concentration concerns. Cost basis tracking is the foundational layer: the engine reconstructs lot-by-lot basis across the user's transaction history, supporting FIFO, LIFO, HIFO, and specific-identification accounting methods (specific-identification typically minimizes tax but requires meticulous documentation). Cross-chain tracking handles the common case of assets moved across networks, where naive tools lose basis continuity. Tax-loss harvesting in crypto is uniquely powerful because the wash-sale rule does not currently apply to crypto under prevailing IRS guidance — a user can sell a position at a loss and immediately repurchase it, harvesting the loss without altering economic exposure (the engine flags that this treatment is subject to legislative change and conditions recommendations on current law). Staking and DeFi income classification is handled with appropriate nuance: staking rewards are generally ordinary income at receipt fair market value (with the receipt-versus-control debate noted), liquidity-pool income mixes ordinary income and capital gains, and lending protocols generate interest income — each requiring distinct cost basis treatment for the resulting positions. Self-custody risk analysis is surfaced explicitly: the engine warns when concentration in self-custodied assets exceeds the user's demonstrated operational security capacity, and recommends qualified custodians or multi-signature arrangements above thresholds. Seed phrase inheritance is treated as an estate planning gap: digital assets in self-custody die with the holder unless explicit succession protocols exist (Shamir secret sharing, dead-man-switch services, trusted-party multisig arrangements), and the engine integrates this into the EstateGraph rather than treating it as a separate concern. NFTs and other illiquid digital assets receive appropriate skepticism in net worth calculations, with mark-to-market valuations heavily discounted for liquidity.

### 9.15 FIRE Trajectory Tracking

Trigger: the user selects a FIRE variant (Lean, Coast, Barista, Fat). The engine constructs the target latent graph for the chosen variant — Coast FIRE requires hitting a coast number by a coast age and then merely covering expenses; Barista FIRE assumes part-time income and employer health benefits. The Safe Withdrawal Rate is recomputed monthly using current valuations rather than the static 4% rule, incorporating Shiller CAPE-based adjustments and bond yield context. Vapi delivers monthly verbal updates on the delta between current net worth and the FIRE threshold, with sensitivity analysis ("a 10% market correction would extend your timeline by 14 months").

### 9.16 Pre-Retirement & Drawdown Sequencing

Trigger: user reaches a configurable threshold of the target FIRE number, or age 55+. The system shifts from accumulation to drawdown engineering: Roth conversion ladder analysis during the gap years before Social Security, optimal Social Security claiming age based on health and spousal benefits, Medicare and IRMAA bracket management, withdrawal sequencing across taxable/traditional/Roth accounts to minimize lifetime tax drag, and RMD planning.

### 9.17 Estate & Legacy Planning

Trigger: net worth crosses estate-planning thresholds, or `LifeEvent` of type `ESTATE_REVIEW_REQUESTED`. The system audits beneficiary designations across all accounts, identifies gaps in the EstateGraph (missing healthcare directives, outdated trust beneficiaries), evaluates the need for an irrevocable trust based on estate tax exposure, and structures charitable giving for both impact and tax efficiency. The output includes a packet ready for the user's estate attorney rather than attempting to replace legal counsel.

---

## 10\. Observability & Quality

Every LLM invocation logs the tokenized prompt, model version, latency, and detokenized response into the audit ledger. Every agentic action logs the full intent, approval chain, execution result, and reversibility status. Every strategy recommendation logs the inputs, the module version, and the citation set used.

A continuous evaluation harness replays a benchmark set of synthetic UserTwins through the strategy engine on every deploy, asserting that recommendations remain consistent and regressions are caught before production. Tax calculation modules are validated against published IRS examples and a corpus of CPA-reviewed test cases.

User-facing metrics include realized tax savings (vs. a no-optimization baseline), portfolio drift from target allocation, fee savings vs. industry-average AUM costs, and progress against user-declared goals.

---

## 11\. Out of Scope (Initial Release)

- Direct execution of trades (the system advises and prepares; users execute through their existing brokerages)  
- Cryptocurrency self-custody management beyond cost basis tracking and inheritance protocols  
- International tax planning beyond US expat basics  
- Active portfolio management or market timing  
- Individual security selection beyond index funds and tax-loss harvesting pairs  
- Replacement for licensed professionals on legal documents, complex tax filings, or insurance underwriting

The system explicitly positions itself as augmenting, not replacing, the user's CPA and estate attorney for the workstreams that genuinely require them.

---

## 12\. Open Questions for Resolution

The regulatory pathway — RIA registration scope, state-by-state notice filings, and the precise line between regulated advice and unregulated education — requires legal counsel before launch. The liability model for agentic actions (specifically, what happens when Tinyfish submits a form incorrectly) needs an insurance partner and a clear user agreement. The pricing model — flat subscription, tiered by complexity, or hybrid with optional human-CFP escalation — affects both the regulatory posture and the target user persona and should be settled before the first marketing dollar is spent.  
