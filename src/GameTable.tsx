import React from "react";
import {Box, Button, Container} from "@mui/material";
import WordCard from "./WordCard";
import {t} from "./i18n/translations";

export default function GameTable() {
  const words = t('words');
  const word = words[Math.floor(Math.random() * words.length)];
  return <Container component="main" maxWidth="sm" sx={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: 'calc(100dvh - 72px)',
  }}>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 10,
      mx: 5,
    }}>
      <WordCard word={word}/>
      <Box>
        <Button variant="outlined" color="error">{t('new_game')}</Button>
      </Box>
    </Box>
  </Container>
}
