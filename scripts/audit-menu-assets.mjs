import fs from "node:fs";

const baseUrl = process.env.MENU_AUDIT_BASE_URL || "http://localhost:3000";
const assetRegistry = fs.readFileSync("client/src/lib/assets.ts", "utf8");
const urls = [...assetRegistry.matchAll(/\d+:\s+"(\/manus-storage\/menu-card-[^"]+)"/g)].map(
  match => match[1],
);

if (urls.length !== 68 || new Set(urls).size !== 68) {
  throw new Error(`Expected 68 unique menu-card URLs; found ${urls.length} entries / ${new Set(urls).size} unique.`);
}

const results = await Promise.all(
  urls.map(async url => {
    const response = await fetch(`${baseUrl}${url}`);
    const bytes = response.ok ? (await response.arrayBuffer()).byteLength : 0;
    return { url, status: response.status, contentType: response.headers.get("content-type"), bytes };
  }),
);

const failures = results.filter(result => result.status !== 200 || !result.contentType?.startsWith("image/") || result.bytes < 10_000);
const report = [
  "# Menu Image Asset Audit",
  "",
  `- Base URL: ${baseUrl}`,
  `- Total individual assets: ${results.length}`,
  `- Passing assets: ${results.length - failures.length}`,
  `- Failed assets: ${failures.length}`,
  "",
  "| Asset | HTTP | Type | Bytes | Status |",
  "|---|---:|---|---:|---|",
  ...results.map(result => `| ${result.url} | ${result.status} | ${result.contentType ?? "—"} | ${result.bytes} | ${failures.includes(result) ? "FAIL" : "PASS"} |`),
].join("\n");

fs.writeFileSync("MENU_IMAGE_ASSET_AUDIT.md", report);

if (failures.length) {
  console.error(report);
  process.exit(1);
}

console.log(`PASS: ${results.length} individual menu images returned a valid image response larger than 10 KB.`);
