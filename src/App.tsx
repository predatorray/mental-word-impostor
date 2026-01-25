import React, {useMemo, useState} from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import {Footer} from "./Footer";
import GameTable from "./GameTable";
import { LangContext } from "./i18n/useLangContext";
import {Menu} from "./Menu";
import {DEFAULT_LOCALE} from "./i18n/translations";
import {SupportedLanguages} from "./i18n/translations.type";
import {CssBaseline} from "@mui/material";
import HomePage from "./HomePage";

function App() {
  const [lang, setLang] = useState<SupportedLanguages>(DEFAULT_LOCALE);
  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LangContext.Provider value={value}>
      <CssBaseline enableColorScheme />
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <HomePage/>
            </>
          }/>
          <Route path="/play" element={
            <>
              <Menu/>
              <GameTable/>
              <Footer/>
            </>
          }/>
        </Routes>
      </Router>
    </LangContext.Provider>
  );
}

export default App;
