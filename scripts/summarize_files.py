import json

with open("file_index.json") as f:
    files = json.load(f)

summaries = {}

for file in files:
    summaries[file] = "Short summary placeholder"

with open("summary_index.json", "w") as f:
    json.dump(summaries, f, indent=2)
