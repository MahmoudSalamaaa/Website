const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const pages = ['index','portfolio','projects','experience','architecture','leadership','technologies','governance','contact','flagship-cases','architecture-map'];
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m => [m[1], m[2].replaceAll('&amp;', '&')]));
const failures = [];
for (const page of pages) {
  const file = page + '.html', html = read(file);
  const fail = message => failures.push(file + ': ' + message);
  if ([...html.matchAll(/<h1\b/gi)].length !== 1) fail('Expected one h1');
  if (!html.includes('site-enhancements.css')) fail('Missing shared accessibility styles');
  if (!html.includes('property="og:image"')) fail('Missing social preview');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (ids.length !== new Set(ids).size) fail('Duplicate IDs');
  for (const match of html.matchAll(/<(?:a|link|script|img)\b[^>]*>/gi)) {
    const a = attrs(match[0]);
    const value = a.href || a.src;
    if (!value || /^(https?:|mailto:|tel:|data:|\/\/)/.test(value)) continue;
    const url = new URL(value, 'https://local.test/' + file);
    const target = decodeURIComponent(url.pathname).slice(1) || 'index.html';
    if (!fs.existsSync(path.join(root, target))) { fail('Missing local target ' + value); continue; }
    if (url.hash && target.endsWith('.html')) {
      const fragment = decodeURIComponent(url.hash.slice(1));
      if (!read(target).includes('id="' + fragment + '"')) fail('Missing fragment ' + value);
    }
    if (match[0].startsWith('<img') && !Object.hasOwn(a, 'alt')) fail('Image missing alt: ' + value);
  }
}
assert.deepEqual(failures, [], failures.join('\n'));
console.log('Integrity passed for ' + pages.length + ' public content pages: local references, anchors, headings, image alt attributes, shared styles and social previews.');
