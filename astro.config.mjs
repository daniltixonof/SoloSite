import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://daniltixonof.github.io',
  base: '/SoloSite',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' }
});
