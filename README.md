# Ethos Ledger

**Mission:** To build a Sovereign Wealth Co-Pilot that democratizes family-office-level financial engineering while maintaining zero-knowledge privacy over the user's absolute financial data.

## Overview

The wealth management industry is bifurcated. Ethos Ledger collapses the gap between high-fee bespoke family offices and generic robo-advisors. It treats financial planning as a deterministic engineering problem augmented by an LLM acting strictly as a semantic interface. The user's financial reality never leaves a hardened privacy boundary.

The result: family-office-grade strategy at software margins, with a cryptographic guarantee that no third party can reconstruct the user's balance sheet.

## System Architecture

The project consists of a deeply integrated stack:
- **Client Layer:** Next.js Web Dashboard, React Native Mobile, Vapi Voice interface.
- **Privacy Boundary:** Local Reasoning Engine and Tokenization Vault running in distroless containers.
- **Intelligence Layer:** AWS Bedrock and Ghost vector corpus for grounded regulatory citations.
- **Compute Layer:** Akash Network for Monte Carlo simulations and Tinyfish for agentic web execution.

For full architectural details, see the [System Design Document](ethos_ledger_system_design_v2.1.md).

## Getting Started

### Web Dashboard

The initial phase includes the foundational Next.js Web Dashboard, built with App Router, TypeScript, and Tailwind CSS.

To run the dashboard locally:

```bash
cd web-dashboard
npm install
npm run dev
```

Navigate to `http://localhost:3000` to interact with the dashboard, and `http://localhost:3000/onboarding` for the twin initialization flow.

## License

This project is licensed under the MIT License.
