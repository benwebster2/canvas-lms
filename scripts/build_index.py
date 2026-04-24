import os
import json

repo_path = "."

file_index = []

for root, dirs, files in os.walk(repo_path):
    for file in files:
        path = os.path.join(root, file)
        file_index.append(path)

with open("file_index.json", "w") as f:
    json.dump(file_index, f, indent=2)
