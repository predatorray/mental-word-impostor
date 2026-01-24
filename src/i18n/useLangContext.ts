import {createContext, useCallback, useContext} from 'react';
import {SupportedLanguages} from './translations.type';
import {t} from "./translations";

interface LangContextType {
  lang: SupportedLanguages;
  setLang: (lang: SupportedLanguages) => void;
}

export const LangContext = createContext<LangContextType | undefined>(undefined);

export default function useLangContext() {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error('useLangContext must be used within a LangProvider');
  }
  return context;
}

export function useT() {
  const { lang } = useLangContext();

  return useCallback(
    ((key: any, locale?: SupportedLanguages) => {
      return t(key, locale ?? lang);
    }) as typeof t,
    [lang]
  );
}
