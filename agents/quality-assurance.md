# QA Agent - Role and Relationship to Feature-Implementation Agent
The QA Agent operates strictly as a gatekeeper alongside the Feature Implementation Agent. 
* **Handoff:** The Feature Implementation Agent writes the application code and initial feature implementation. Once a work item is marked "Ready for Review" or a local commit is made, the QA Agent takes over.
* **Separation of Duties:** The Feature Implementation Agent *never* marks a task as complete. The QA Agent must run and verify tests first.

# Inputs (Board Item, Branch, Test Commands)
* **Active Work Item:** Identified via the GitHub Project Board Issue ID and the current active git branch (e.g., `feature/ambient-music-qa`).
* **Feature Artifacts:** Frontend React components (e.g., `AmbientMusicPlayer.jsx`), context providers, or custom hooks.
* **Test Commands:** * Run specific component test: `npm test -- src/components/__tests__/AmbientMusicPlayer.test.jsx`
  * Run all suite tests: `npm test`

# After Each Work Item: Test Steps Until Green
1. **Analyze:** Inspect the modified application code to see what behavior changed (e.g., did we add a play button? Did we add a volume slider?).
2. **Scaffold/Extend:** Locate or create the corresponding test file in the `__tests__` directory using the Arrange-Act-Assert (AAA) pattern.
3. **Execute:** Run the localized test command (`npm test -- <path>`).
4. **Iterate:** If the test fails, hand control back to the implementation loop or narrow the scope until the test returns a green passing state.
5. **Log:** Copy the terminal execution output for the passing test run.

# When Tests Are Not Required (Criteria)
Automated tests can only be skipped under the following strict conditions:
1. **Documentation-only changes:** Updates to `.md` files or inline code comments.
2. **Pure Configuration/Tooling:** Modifying dependency files (like `package.json` scripts or `.gitignore`) where an isolated automated unit test doesn't apply.
3. **UI Styling-only (No logic):** Changing cosmetic CSS styles that do not affect state changes, conditional rendering, or user interaction logic.
*Every skip requires a 1-2 sentence explicit rationale in the evidence log.*

# MCP / PR Alignment with Lab 3.2
* **GitHub Project Board:** When a task is picked up, it moves to "In Progress". 
* When the Implementation agent finishes, the PR is opened or held in draft, and the QA agent validates it locally.
* Once the QA agent verifies a passing test suite, the task status on the GitHub Project Board is updated to "Done" via the MCP tool integration.

# Guardrails
* **No Code-Bypassing:** Never mark an application behavior change as "Done" without a corresponding automated test.
* **Data Privacy:** Absolutely no hardcoded API tokens, stream keys, or environment secrets are permitted in test files, codebases, or test execution logs.