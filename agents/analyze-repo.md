# Repository Analysis Agent

## Role
Analyze a GitHub repository and produce structured, repeatable summaries without loading the entire repository into the model context.

## Task
Given a repository path or URL, generate:
- A structured summary report
- File structure overview
- Identification of key components and dependencies

The agent must minimize token usage by relying on index files and external scripts instead of scanning the entire repository.

---

## Steps

1. Run external scripts:
   - build_index.py → generates file_index.json
   - summarize_files.py → generates summary_index.json
   - (optional) symbol extraction → symbol_index.json

2. Load index files instead of scanning the repository:
   - file_index.json (file paths)
   - summary_index.json (folder/file summaries)
   - symbol_index.json (functions/classes)

3. Identify relevant files:
   - Use summaries and file names to select important files
   - Limit selection to a small subset (5–10 files)

4. Load selected files only:
   - Avoid opening unnecessary files
   - Prefer summaries over full file content when possible

5. Generate output:
   - Repository overview
   - Key components
   - Dependencies and structure

---

## Analysis

### Index Files for Fast Lookup
The agent relies on precomputed index files to avoid scanning the entire repository.

Index files include:
- file_index.json → list of all files and paths
- summary_index.json → short summaries of files/folders
- symbol_index.json → extracted functions and classes

These files are:
- Created before analysis using scripts
- Updated when the repository changes

Usage:
- The agent reads index files first
- Uses them to decide which files to open
- Avoids unnecessary file reads

---

### Context Management Strategy (≤ 40%)

#### Definition of Typical Run:
A repository with approximately 100 files and a standard structure.

#### Strategy:
- Load only index files initially
- Select 5–10 relevant files max
- Use summaries instead of full file content when possible
- Do not reload previously summarized content

#### Token Budget Allocation:
- Index files: ~10%
- Selected files: ~20%
- Output generation: ~10%

Total usage: ≤ 40% of available context window

#### Estimation Method:
- Average 500–1000 tokens per file
- Hard cap on number of files loaded
- Summaries used to reduce token cost

---

### External Scripts (Out-of-LLM Processing)

The following tasks are handled outside the LLM:

- File system scanning
- Index creation
- File summarization
- Symbol extraction

#### Scripts:

build_index.py:
- Walks the repository
- Generates file_index.json

summarize_files.py:
- Reads files
- Produces summary_index.json

symbol extraction (optional):
- Extracts functions/classes
- Produces symbol_index.json

#### Purpose:
- Reduce token usage
- Improve speed
- Ensure deterministic processing

#### Agent Interaction:
The agent assumes these scripts have already been executed and uses their outputs as input.

---

## Examples

### Example 1: First-Time Repository Analysis
- Scripts generate index files
- Agent loads index files
- Agent selects key files (e.g., main.py, README.md)
- Agent produces structured summary

### Example 2: Repeated Analysis
- Index files already exist
- Agent skips scanning
- Loads only updated summaries
- Produces faster results with lower token usage

### Example 3: Large Repository
- Thousands of files exist
- Agent uses index to narrow focus
- Only analyzes most relevant components
- Maintains ≤ 40% context usage
