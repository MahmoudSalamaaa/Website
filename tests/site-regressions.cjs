const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

assert(!read('technologies.html').includes("search.addEventListener('input',apply)"), 'Removed search UI must not execute stale search code');
for (const name of ['flagship-cases.html', 'architecture-map.html']) {
  assert(!read(name).includes('href="/v4/'), `${name}: links must target the current site`);
}
for (const [, href] of read('404.html').matchAll(/href="([^"]+)"/g)) {
  assert(href.startsWith('/'), '404 links/assets must work from nested missing URLs');
}

// Escape closes navigation, not editorial disclosure panels, and restores focus.
for (const name of ['final-v4.js', 'deep-ux-v4.js', 'menu-focus-repair.js']) {
  const handlers = [];
  let focused = false;
  const menu = { open: true, querySelector: () => ({ focus: () => { focused = true; } }), removeAttribute() { this.open = false; } };
  const content = { open: true, removeAttribute() { this.open = false; }, querySelector: () => null };
  const document = {
    createElement: () => ({ dataset: {} }),
    head: { appendChild() {} },
    querySelector: () => null,
    querySelectorAll: selector => selector === 'details[open]' ? [menu, content] : [menu],
    addEventListener: (type, fn) => { if (type === 'keydown') handlers.push(fn); }
  };
  vm.runInNewContext(read(name), { document, window: {}, requestAnimationFrame: fn => fn() });
  handlers.forEach(fn => fn({ key: 'Escape' }));
  assert.equal(menu.open, false, `${name}: menu closes`);
  assert.equal(content.open, true, `${name}: content remains open`);
  assert.equal(focused, true, `${name}: trigger receives focus`);
}

// The retired mobile rail has been replaced by the shared quality layer.
const external = { attrs: {href: 'https://example.com', target: '_blank'}, getAttribute(k) { return this.attrs[k] || ''; }, hasAttribute(k) { return k in this.attrs; }, setAttribute(k,v) { this.attrs[k]=v; } };
const document = { readyState: 'complete', documentElement: {dataset:{}}, querySelector: () => null, querySelectorAll: s => s.startsWith('a[') ? [external] : [] };
vm.runInNewContext(read('mobile-rail-controls.js'), {document});
assert(external.attrs.rel.includes('noopener'));
assert(external.attrs.rel.includes('noreferrer'));
console.log('Site regression checks passed: stale script, legacy links, nested 404, Escape focus, external-link protection.');
