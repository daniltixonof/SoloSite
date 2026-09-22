// Сайт публикуется на подпути (/SoloSite/), поэтому все внутренние адреса
// собираются через этот хелпер. При переезде на свой домен base станет '/',
// и ничего больше менять не придётся.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
export const u = (path: string) => base + (path.startsWith('/') ? path : '/' + path);
