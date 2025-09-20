module.exports = {
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    fallbackLng: 'ru',
  },
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
};