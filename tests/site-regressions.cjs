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

for (const reduced of [false, true]) {
  const buttons = [];
  let scroll;
  const rail = { clientWidth: 300, scrollWidth: 900, scrollLeft: 0, addEventListener() {}, scrollBy(value) { scroll = value; } };
  const shell = { querySelector: selector => selector === '.mobile-primary-rail' ? rail : null, appendChild: btn => buttons.push(btn) };
  const document = { querySelector: () => shell, createElement: () => ({ setAttribute() {}, addEventListener(type, fn) { this[type] = fn; } }) };
  vm.runInNewContext(read('mobile-rail-controls.js'), { document, window: { matchMedia: () => ({ matches: reduced }), addEventListener() {} }, requestAnimationFrame: fn => fn() });
  assert.equal(buttons[0].disabled, true);
  assert.equal(buttons[1].disabled, false);
  buttons[1].click();
  assert.equal(scroll.behavior, reduced ? 'auto' : 'smooth');
  assert(scroll.left > 0);
}
console.log('Site regression checks passed: stale script, legacy links, nested 404, Escape focus, and reduced-motion navigation.');
