# Repository Analysis Agent

## Role
This agent analyzes a GitHub repository and produces structured summaries without loading the entire repository into context.

## Inputs
- Repository path or URL
- Existing index files (if present)

## Outputs
- Summary report
- File structure overview
- Key components and dependencies

## Index Files for Fast Lookup

The agent relies on precomputed index files instead of scanning the full repository.

### Index Files:
- file_index.json → list of all files and paths
- summary_index.json → short summaries of each folder
- symbol_index.json → functions/classes per file

### When They Are Built:
- Initially created using scripts before analysis
- Updated when repository changes

### How They Are Used:
- Agent reads index first
- Chooses only relevant files to open
- Avoids loading unnecessary files

## Context Management Strategy

### Definition of Typical Run:
A repository with ~100 files and standard structure.

### Strategy:
- Load index files first (small size)
- Only open top 5–10 relevant files
- Summarize large files instead of quoting
- Avoid reloading previously summarized files

### Token Budget:
- Index files: ~10%
- Selected files: ~20%
- Output generation: ~10%

Total: ≤ 40% of context window

### Estimation Method:
Token usage estimated based on:
- Average 500–1000 tokens per file
- Hard cap on number of files loaded

## Workflow

1. Run build_index.py
2. Run summarize_files.py
3. Agent loads index files
4. Agent selects relevant files
5. Agent generates structured output
