import fs from 'node:fs';

const files = [
  'articles/en/from-digital-projects-to-institutional-capability/index.html',
  'articles/ar/from-digital-projects-to-institutional-capability/index.html',
  'articles/from-digital-projects-to-institutional-capability/index.html'
];

const oldTitle = 'Chief Technology & Digital Transformation Officer';
const newTitle = 'Head of the Central Administration for Information Systems & Digital Transformation';

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.error(`Missing: ${file}`);
    process.exitCode = 1;
    continue;
  }
  let html = fs.readFileSync(file, 'utf8');

  // Keep one DOCTYPE only.
  html = html.replace(/^(?:\s*<!DOCTYPE html>\s*)+/i, '<!DOCTYPE html>\n');

  // Source-level author/title consistency, including JSON-LD and visible bylines.
  html = html.split(oldTitle).join(newTitle);

  // Update article modified date only when the old published metadata is present.
  html = html.replaceAll('2026-08-01', '2026-08-19');

  fs.writeFileSync(file, html, 'utf8');
  console.log(`Normalized: ${file}`);
}
