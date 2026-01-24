import en_US from "./locales/en_US";

export const SUPPORTED_LANGUAGES = [
  'en',
  'en-US',
  'zh',
  'zh-CN',
  'zh-Hans',
  'zh-Hans-CN',
  'zh-TW',
  'zh-Hant-TW',
] as const;

export type SupportedLanguages = typeof SUPPORTED_LANGUAGES[number];

export function supportLanguage(lang: string): SupportedLanguages | undefined {
  if ((SUPPORTED_LANGUAGES as readonly string[]).includes(lang)) {
    return lang as SupportedLanguages;
  }
}

type TranslationSchema<T> = T extends (...args: infer A) => any
  ? (...args: A) => string
  // 1. Functions
  : T extends readonly any[]
    // 2. Tuples/Arrays
    ? { [K in keyof T]: string }
    : T extends object
      // 3. Recurse Objects
      ? { readonly [K in keyof T]: TranslationSchema<T[K]> }
      // 4. Leaf Strings
      : string;

export type Translations = TranslationSchema<typeof en_US>;

export type StringKey = {
  [K in keyof Translations]: Translations[K] extends string ? K : never
}[keyof Translations];

export type FunctionKey = {
  [K in keyof Translations]: Translations[K] extends Function ? K : never
}[keyof Translations];

export type ArrayKey = {
  [K in keyof Translations]: Translations[K] extends readonly any[] ? K : never
}[keyof Translations];
