const details = document.querySelectorAll("table[aria-label='details']");

const aFuncLookup = new Map([
  ["implied", "implied"],
  ["accumulator", "AAccumulator"],
  ["immediate", "AImmediate"],

  ["zeropage", "AZeropage"],
  ["zeropage,X", "AZeropage(X)"],
  ["zeropage,Y", "AZeropage(Y)"],

  ["absolute", "AAbsolute"],
  ["absolute,X", "AAbsolute(X)"],
  ["absolute,Y", "AAbsolute(Y)"],
  ["indirect", "AIndirect"],
  ["(indirect,X)", "AIndirectX"],
  ["(indirect),Y", "AIndirectY"],

  ["relative", "ARelative"],
]);
let results = []
for (const detail of details) {
  const rows = [...detail.children[0].children];
  const instruction = detail.parentElement.previousElementSibling.innerText;
  let result = "";
  for (const i in rows) {
    const row = rows[i];
    if (i == 0) continue;
    const addressingName = row.children[0].innerText;
    const aFunc = aFuncLookup.get(addressingName);
    if (!aFunc) console.log("invalid addressor", detail, row);
    const opCodeHex = row.children[2].innerText;
    const opCode = parseInt(opCodeHex, 16);
    result += `    else if op == ${opCode
      .toString()
      .padEnd(3, " ")} /* 0x${opCodeHex.padStart(
      2,
      "0"
    )} */ { `;
    if (aFunc === "implied") {
        result += `${instruction} }\n`;
    } else {
        result += `${instruction}(${aFunc}) }\n`;
    }
  }
  results.push(result);
}
console.log(results.join("\n"));
