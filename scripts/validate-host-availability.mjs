import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const submissionMode = process.argv.includes("--submission");
const metadata = JSON.parse(readFileSync(join(root, "host-downloads.json"), "utf8"));
const hostPage = readFileSync(join(root, "host.html"), "utf8");
const homePage = readFileSync(join(root, "index.html"), "utf8");

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

if (metadata.schemaVersion !== 1) fail("unsupported Host download metadata schema");
if (!hostPage.includes('fetch("host-downloads.json"')) fail("Host page is not connected to release metadata");
if (!/required for live feeds/i.test(hostPage)) fail("Host requirement is not explicit");
if (!homePage.includes('href="host.html"')) fail("the product home page does not link to Host downloads");

for (const [name, value] of [["macOS", metadata.macOS], ["iPhone", metadata.iPhone]]) {
  if (!value || !["preparing", "available"].includes(value.status)) fail(`${name} has invalid availability`);
}
if (metadata.macOS.architecture !== "Apple silicon only") {
  fail("Mac Host download metadata must explicitly say Apple silicon only");
}
if (!hostPage.includes("Apple silicon only")) {
  fail("Mac Host download page must explicitly say Apple silicon only");
}

if (submissionMode) {
  if (metadata.submissionReady !== true) fail("Host availability is not marked ready for Apple TV submission");
  if (metadata.macOS.status !== "available") fail("Mac Host is not publicly available");
  if (!/^\d+\.\d+\.\d+$/.test(metadata.macOS.version || "")) fail("Mac Host version is invalid");
  if (!/^https:\/\/.+\.dmg(?:\?.*)?$/.test(metadata.macOS.downloadURL || "")) fail("Mac Host HTTPS DMG URL is invalid");
  if (!/^[a-f0-9]{64}$/i.test(metadata.macOS.sha256 || "")) fail("Mac Host SHA-256 is missing");
  if (!metadata.macOS.minimumSystemVersion) fail("Mac Host minimum macOS version is missing");
  if (metadata.iPhone.status !== "available") fail("iPhone Host is not publicly available");
  if (!/^\d+\.\d+(?:\.\d+)?$/.test(metadata.iPhone.version || "")) fail("iPhone Host version is invalid");
  if (!/^https:\/\/apps\.apple\.com\//.test(metadata.iPhone.appStoreURL || "")) fail("iPhone App Store URL is invalid");
}

console.log(submissionMode
  ? "Both LoungeFeed Hosts are publicly available for Apple TV submission."
  : "Host download-page preparation validation passed.");
