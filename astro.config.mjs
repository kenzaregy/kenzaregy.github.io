// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages settings:
// - User site (repo named USERNAME.github.io): SITE = 'https://USERNAME.github.io', BASE = '/'
// - Project site (any other repo name):        SITE = 'https://USERNAME.github.io', BASE = '/REPO-NAME'
const SITE = 'https://kenzaregy.github.io';
const BASE = '/';

// Prefixes root-relative links/images inside Markdown (e.g. /images/foo.jpg uploaded
// through Pages CMS) with BASE, so they keep working on project sites.
function rehypeBasePath(base) {
  const prefix = base.replace(/\/$/, '');
  return () => (tree) => {
    if (!prefix) return;
    const walk = (node) => {
      if (node.type === 'element' && node.properties) {
        for (const attr of ['src', 'href']) {
          const value = node.properties[attr];
          if (
            typeof value === 'string' &&
            value.startsWith('/') &&
            !value.startsWith('//') &&
            !value.startsWith(`${prefix}/`)
          ) {
            node.properties[attr] = prefix + value;
          }
        }
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

export default defineConfig({
  site: SITE,
  base: BASE,
  markdown: {
    rehypePlugins: [rehypeBasePath(BASE)],
  },
});
