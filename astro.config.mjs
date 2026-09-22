import { defineConfig } from 'astro/config';

// Адрес сайта определяется на сборке:
// на Vercel — из его переменной, локально — localhost.
// Свой домен задаётся переменной PUBLIC_SITE_ORIGIN в настройках проекта.
const productionUrl = process.env.PUBLIC_SITE_ORIGIN
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  || 'http://localhost:4321';

export default defineConfig({
  site: productionUrl,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' }
});
