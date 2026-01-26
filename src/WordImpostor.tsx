import {Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import Lobby from "./Lobby";
import {Menu} from "./Menu";
import GameTable from "./GameTable";
import {Footer} from "./Footer";
import {HashRouter as Router} from "react-router";
import React, {useEffect} from "react";
import {useT} from "./i18n/useLangContext";

export default function WordImpostor() {
  const t = useT();
  useEffect(() => {
    document.title = t('project_name');
  }, [t]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <HomePage/>
          </>
        }/>
        <Route path="/lobby" element={
          <>
            <Lobby/>
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
  );
}
