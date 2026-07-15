# Memory Technique: Context Budgeting & Architectural State Verification Gates

## Connection to Other Agents
This memory practice directly governs how I interact with my repository analysis and feature-planning agents (such as `agents/analyze-repo.md`). It ensures that whenever an agent is asked to write code or analyze code for the Canvas Study Stream feature, it is operating on verified, current structural reality rather than stale repository layouts.

## Procedure (Prompts / File Rituals)
To maintain a strict context budget and prevent the LLM from hallucinating outdated file paths, the following ritual is performed at the start and end of every development session:

1. **Session Initialization (Long-Term Memory Injection):**
   Every prompt session must begin by providing the agent with the current `agents/memory-practice.md` (this file) and the latest git tree layout of the feature directory.
   * *Prompt Prefix:* "You are an expert software engineer working on a fork of Canvas LMS. Read the current architecture state below before answering. Do not assume files exist unless listed here."

2. **Session Termination (State Update):**
   At the end of a session, the agent is required to output a summarized log of what changed, which is appended to the Evidence section below.

## Purge / Refresh / Last Verified
* **Re-grounding Trigger:** A full context purge and re-grounding are strictly required after any `git pull upstream` or `git merge`.
* **Last Verified Architectural State:** May 28, 2026.
* **Purge Condition:** If the AI agent hallucinates a file path or references a component that was refactored, the entire session chat history is wiped, and a fresh session is started using only the raw file contents currently in VS Code.

## Failure Modes and Mitigations
* **Failure Mode 1: Over-Retention / Token Bloat.** The chat history becomes too long, causing the agent to ignore recent system instructions or run up high API costs.
  * *Mitigation:* Explicitly use a "summarize and clear" prompt every 5 turns, forcing the agent to compress the current state into 3 bullet points, then opening a brand-new chat tab.
* **Failure Mode 2: Stale Architectural Trust.** Trusting that the agent remembers a layout from a previous day's session when local files have changed.
  * *Mitigation:* Always pipe the output of `git status` and a directory tree map (`tree -I "node_modules|vendor"`) into the very first prompt of a new day.

## Evidence Excerpt
*Actual prompt/response interaction with AI agent managing context budget:*

**User Prompt:**
> "We are starting a session on the Canvas Study Stream integration. Based on our verification gate rule, here is the current status of my workspace: [Output of git status showing modified development docker-compose files]. Do not hallucinate paths outside of this scope. Acknowledge understanding and summarize our current architectural anchor."
>
**Agent Response:**
> "Acknowledged. I am locked into your local brownfield environment. Current anchor: AWS EC2 instance running a Canvas LMS fork. Modified files: docker-compose configuration for asset compilation. Standing by for specific sub-system commands; I will not reference out-of-scope upstream layouts."
