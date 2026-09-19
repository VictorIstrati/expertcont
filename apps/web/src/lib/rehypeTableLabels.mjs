function childElements(node, tagName) {
  return (node.children ?? []).filter(
    (child) => child.type === "element" && child.tagName === tagName,
  );
}

function textOf(node) {
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(textOf).join("");
}

function labelTable(table) {
  const [thead] = childElements(table, "thead");
  const [headRow] = thead ? childElements(thead, "tr") : [];
  if (!headRow) return;

  const labels = childElements(headRow, "th").map((th) => textOf(th).trim());

  for (const tbody of childElements(table, "tbody")) {
    for (const row of childElements(tbody, "tr")) {
      childElements(row, "td").forEach((cell, index) => {
        const label = labels[index];
        if (label) cell.properties = { ...cell.properties, dataLabel: label };
      });
    }
  }
}

function walk(node) {
  if (node.type === "element" && node.tagName === "table") labelTable(node);
  for (const child of node.children ?? []) walk(child);
}

export default function rehypeTableLabels() {
  return (tree) => walk(tree);
}
