export function getDiffs(oldObj, newObj, path = "") {
  let diffs = [];
  if (!oldObj || !newObj) return diffs;

  for (let key in oldObj) {
    if (!(key in newObj)) continue;

    const curPath = path ? `${path} > ${key}` : key;
    const oldVal = oldObj[key];
    const newVal = newObj[key];

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      for (let i = 0; i < Math.min(oldVal.length, newVal.length); i++) {
        diffs = diffs.concat(getDiffs(oldVal[i], newVal[i], `${curPath} > ${i}`));
      }
    } else if (typeof oldVal === "object" && oldVal !== null && typeof newVal === "object" && newVal !== null) {
      diffs = diffs.concat(getDiffs(oldVal, newVal, curPath));
    } else if (typeof oldVal === "string" && typeof newVal === "string") {
      if (oldVal.trim() !== newVal.trim()) {
        let label = key;

        if (path.includes("experience")) {
          const indexMatch = path.match(/experience > (\d+)/);
          const index = indexMatch ? parseInt(indexMatch[1]) : 0;
          if (key === "role") label = `Job #${index + 1} Role`;
          else if (key === "company") label = `Job #${index + 1} Company`;
          else if (key === "description") label = `Job #${index + 1} Description`;
          else label = `Experience Job #${index + 1} (${key})`;
        } else if (path.includes("sections")) {
          const indexMatch = path.match(/sections > (\d+)/);
          const index = indexMatch ? parseInt(indexMatch[1]) : 0;
          if (key === "heading") label = `Section #${index + 1} Heading`;
          else if (key === "content") label = `Section #${index + 1} Content`;
          else label = `Section #${index + 1} (${key})`;
        } else if (path.includes("education")) {
          const indexMatch = path.match(/education > (\d+)/);
          const index = indexMatch ? parseInt(indexMatch[1]) : 0;
          if (key === "school") label = `Education #${index + 1} School`;
          else if (key === "degree") label = `Education #${index + 1} Degree`;
          else if (key === "description") label = `Education #${index + 1} Details`;
          else label = `Education #${index + 1} (${key})`;
        } else {
          if (key === "name") label = "Name";
          else if (key === "title") label = "Professional Title";
          else if (key === "summary") label = "Professional Summary";
          else if (key === "abstract") label = "Abstract / Executive Summary";
          else if (key === "body") label = "Letter Body";
          else if (key === "signature") label = "Letter Signature";
          else if (key === "subject") label = "Subject Line";
        }

        diffs.push({
          path: curPath,
          label: label,
          original: oldVal,
          suggested: newVal
        });
      }
    }
  }
  return diffs;
}
