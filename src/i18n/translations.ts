import {
  ArrayKey,
  FunctionKey,
  StringKey,
  SupportedLanguages,
  supportLanguage,
  Translations
} from "./translations.type";
import en_US from "./locales/en_US";
import zh_CN from "./locales/zh_CN";
import zh_TW from "./locales/zh_TW";
import {getLanguagePreference} from "./LocalLanguagePreference";

const TranslationsPerLang: Record<SupportedLanguages, Translations> = {
  'en': en_US,
  'en-US': en_US,
  'zh': zh_CN,
  'zh-CN': zh_CN,
  'zh-Hans': zh_CN,
  'zh-Hans-CN': zh_CN,
  'zh-TW': zh_TW,
  'zh-Hant-TW': zh_TW,
};

export const DEFAULT_LOCALE: SupportedLanguages = (() => {
  // 1. If there is a "lang" query parameter, use it
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam) {
    const maybeSupported = supportLanguage(langParam);
    if (maybeSupported) {
      return maybeSupported;
    }
  }

  // 2. Then, user preference
  const langPreferred = getLanguagePreference();
  if (langPreferred) {
    const supportedLanguagePreferred = supportLanguage(langPreferred);
    if (supportedLanguagePreferred) {
      return supportedLanguagePreferred;
    }
  }

  // 3. Then, use browser's preference
  const browserLanguages = navigator.languages || [navigator.language];
  for (const lang of browserLanguages) {
    const maybeSupported = supportLanguage(lang);
    if (maybeSupported) {
      return maybeSupported;
    }
    // Try matching the base language (e.g., 'en' from 'en-US')
    const baseLang = lang.split('-')[0];
    const maybeBaseSupported = supportLanguage(baseLang);
    if (maybeBaseSupported) {
      return maybeBaseSupported;
    }
  }

  // 4. Otherwise, use english
  return 'en';
})();

export function t(key: StringKey, locale?: SupportedLanguages): string;
export function t<K extends FunctionKey>(key: K, locale?: SupportedLanguages): Translations[K];
export function t<K extends ArrayKey>(key: K, locale?: SupportedLanguages): Translations[K];
export function t(key: keyof Translations, locale?: SupportedLanguages) {
  const targetLocale = locale ?? DEFAULT_LOCALE;
  const translations = TranslationsPerLang[targetLocale];
  return translations[key];
}
