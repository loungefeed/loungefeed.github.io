import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const errors = [];

function fail(message) {
  errors.push(message);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = walk(root);
const htmlFiles = files.filter(file => extname(file) === ".html");

for (const file of files) {
  if (extname(file).toLowerCase() === ".md") {
    fail(`internal Markdown document is present in the public site: ${relative(root, file)}`);
  }
}

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const attributePattern = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;
  for (const match of html.matchAll(attributePattern)) {
    const reference = match[1].trim();
    if (!reference || reference.startsWith("#") || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;
    const pathOnly = reference.split("#", 1)[0].split("?", 1)[0];
    if (!pathOnly) continue;
    const target = resolve(dirname(file), decodeURIComponent(pathOnly));
    if (!target.startsWith(`${root}/`) && target !== root) {
      fail(`${relative(root, file)} references a path outside the public site: ${reference}`);
    } else if (!existsSync(target) || !statSync(target).isFile()) {
      fail(`${relative(root, file)} has a broken local reference: ${reference}`);
    }
  }
}

const home = readFileSync(join(root, "index.html"), "utf8");
const host = readFileSync(join(root, "host.html"), "utf8");
for (const source of ["Twitter", "Bluesky", "Reddit", "Mastodon", "Telegram", "Pinterest"]) {
  if (!home.includes(`>${source}<`)) fail(`home page is missing the ${source} source chip`);
}
if (/href=["']#pinterest["']/i.test(home) || /id=["']pinterest["']/i.test(home)) {
  fail("home page must not contain a dedicated Pinterest spotlight");
}
if (!home.includes('href="host.html"')) fail("home page does not link to the Host page");
if (!host.includes('fetch("host-downloads.json"')) fail("Host page is not connected to release metadata");
if (!host.includes("Required for live feeds")) fail("Host requirement is not explicit");
for (const screenshot of ["tv-post-detail.png", "tv-translation.jpg", "mac-host.png", "iphone-host.png"]) {
  if (!existsSync(join(root, "assets", "screens", screenshot))) fail(`required product screenshot is missing: ${screenshot}`);
}

if (errors.length) {
  for (const error of errors) console.error(`error: ${error}`);
  process.exit(1);
}

console.log(`Public-site validation passed (${htmlFiles.length} HTML pages, ${files.length} published files).`);
