import os
import sys
from pathlib import Path


FOLDER_ORDER = ["abilities"]
MOD_NAME = sys.argv[1]

sections = []

for root, dirs, files in os.walk(f'{MOD_NAME}/'):
    for file in files:
        section_name = f"{root[len(MOD_NAME):]}/{file}".removeprefix("//").removeprefix("/")
        sections.append((section_name, open(Path(root, file), 'r').read()+"\n"))

for root, dirs, files in os.walk('acolyte/'):
    for file in files:
        section_name = f"{root[7:]}/{file}".removeprefix("//").removeprefix("/")
        if section_name in map(lambda x: x[0], sections): continue
        sections.append((section_name, open(Path(root, file), 'r').read()+"\n"))

sections.sort()

open(f'{MOD_NAME}.esc', 'w').close()
mod_file =  open(f'{MOD_NAME}.esc', 'a')
for file, section in sections:
    mod_file.write(f"[[{file}]]\n")
    mod_file.write(section)
