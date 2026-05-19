# Feature Implementation Agent Specification

## Inputs
- Feature Research: `agents/tasks/feature-1/implementation-research.md`
- Repo Context: `agents/analyze-repo.md` (utilizing file_index.json and summary_index.json to maintain context < 40%).

## Ordered Procedure
1. **Select Task:** Identify a foundational slice from the "Canvas Study Stream" GitHub Project board.
2. **Board Update:** Use GitHub MCP to transition the work item status to "In Progress".
3. **Branching:** Create a dedicated feature branch from the integration branch (e.g., `feature/study-stream-setup-env`).
4. **Implementation:** Code the precise requirements for that slice without scope drift.
5. **Verification:** Run target test suites (Vitest/Yarn workspace checks) and verify types.
6. **Pull Request:** Open a PR linking explicitly to the tracked issue.
7. **Complete:** Once merged, use MCP to move the project item to "Complete".

## Guardrails
- No direct pushes to protected branches.
- Absolute ban on hardcoding tokens, PATs, or secrets.
- If MCP is offline, log manually and keep the board honest.