import json

f = open("acolyte.easelS.json", "r")
o = json.loads(f.read())
for i, fn in enumerate(o):
    # print(fn)
    open(f"./fns/{i}_{fn['name']}.easelS", "w").write(fn['code'])