// transloco.config.js
module.exports = {
  rootTranslationsPath: 'public/i18n/',
  langs: ['en','zh','zh-TW','ja','vi','es','fr','de','pt','ru','ar','hi','id','th','tr','it','nl','pl','fil','mn','uk','ms','fa','bn','ur'],
  keysManager: {
    addMissingKeys: true,
    sort: true,
  },
  scopePathMap: {
    welcome: 'public/i18n/welcome',
    body: 'public/i18n/body',
    pin: 'public/i18n/pin',
    info: 'public/i18n/info',
  },
};