import React, {useMemo, useState} from 'react';
import './App.css';
import {Footer} from "./Footer";
import GameTable from "./GameTable";
import { LangContext } from "./i18n/useLangContext";
import {Menu} from "./Menu";
import {DEFAULT_LOCALE} from "./i18n/translations";
import {SupportedLanguages} from "./i18n/translations.type";

function App() {
  const [lang, setLang] = useState<SupportedLanguages>(DEFAULT_LOCALE);
  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LangContext.Provider value={value}>
      <div className="App">
        <Menu/>
        <GameTable/>
        <Footer/>
      </div>
    </LangContext.Provider>
  );
}

export default App;
