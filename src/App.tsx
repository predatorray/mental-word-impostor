import React, {useMemo, useState} from 'react';
import { LangContext } from "./i18n/useLangContext";
import {DEFAULT_LOCALE} from "./i18n/translations";
import {SupportedLanguages} from "./i18n/translations.type";
import {CssBaseline} from "@mui/material";
import WordImpostor from "./WordImpostor";

function App() {
  const [lang, setLang] = useState<SupportedLanguages>(DEFAULT_LOCALE);
  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LangContext.Provider value={value}>
      <CssBaseline enableColorScheme />
      <WordImpostor/>
    </LangContext.Provider>
  );
}

export default App;
