// Единственный источник констант сайта: контакт, цены, счётчики, аналитика.
// Меняется здесь — применяется везде. Длинные тексты сюда не кладём.

export const brand = {
  name: 'SoloPreneur',
  person: 'Данил Тихонов',
  origin: 'https://solopreneur-studio.danil-tix.chatgpt.site'
};

/** Один адрес для всех призывов к действию на сайте. */
export const contact = {
  telegram: 'https://t.me/Tikhonov_D',
  handle: '@Tikhonov_D',
  sla: 'Ответ в течение рабочего дня. Первый разговор — 30 минут, бесплатно.',
  label: 'Обсудить задачу',
  labelTelegram: 'Написать в Telegram'
};

/** Деньги. Числа — источник правды, подписи собираются из них. */
export const pricing = {
  projectFrom: 80000,
  typicalRange: '150–400 тыс. ₽',
  supportFrom: 30000,
  supportNote: 'Состав работ и время реакции фиксируются в договоре.',
  extras: 'Хостинг, подписки на сервисы, комиссии платежей и расход моделей оплачиваются отдельно.'
};

export const stats = [
  { value: '[ЦИФРА: сколько проектов запущено]', label: 'проектов запущено' },
  { value: '[ЦИФРА: лет в автоматизации]', label: 'лет в автоматизации и AI' },
  { value: '[ЦИФРА: пользователей в системах]', label: 'человек работают в этих системах' }
] as const;

export const analytics = {
  // 0 = счётчик выключен. Подставьте номер из Яндекс Метрики, чтобы включить.
  metrikaId: 0,
  goal: 'contact_click'
};

/** Показывать незаполненные места. Поставьте false перед показом клиенту. */
export const flags = { showMarkers: true };

const nbsp = (s: string) => s.replace(/\s/g, ' ');
export const rub = (n: number) => nbsp(n.toLocaleString('ru-RU')) + ' ₽';
export const from = (n: number) => 'от ' + rub(n);

// Обратная совместимость: site импортируется из data/site во многих местах.
export const site = {
  name: brand.name,
  origin: brand.origin,
  telegram: contact.telegram,
  contact: contact.handle
};
