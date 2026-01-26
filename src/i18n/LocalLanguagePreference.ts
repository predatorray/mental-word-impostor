const USER_LANGUAGE_LOCAL_STORAGE_KEY = 'lang';

export function setLanguagePreference(langCode?: string) {
  if (langCode) {
    localStorage.setItem(USER_LANGUAGE_LOCAL_STORAGE_KEY, langCode);
  } else {
    localStorage.removeItem(USER_LANGUAGE_LOCAL_STORAGE_KEY);
  }
}

export function getLanguagePreference() {
  return localStorage.getItem(USER_LANGUAGE_LOCAL_STORAGE_KEY);
}
