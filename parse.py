import re
from pathlib import Path

acolyte = open("acolyte.easel")

sections = re.split(r"(\[\[.+\]\])", acolyte.read())


i = 0;
while i < len(sections):
    part = sections[i]
    if part.startswith("[[") and part.endswith("]]"):
        f = open(Path('./acolyte', part.strip("[[").strip("]]")), "w+")
        f.write(sections[i + 1].strip());
        i += 1;
    i += 1;