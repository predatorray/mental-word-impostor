import React, {useMemo} from "react";
import {Box, Typography} from "@mui/material";
import WordCloud from "./WordCloud";
import {useT} from "./i18n/useLangContext";

export default function Introduction() {
  const t = useT();
  const words = t('words');
  const offset = useMemo(() => Math.floor(Math.random() * (words.length - 15)), [words.length]);
  const randomPickedWords = t('words').slice(offset, offset + 15);
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minWidth: 400,
      textAlign: "center",
      gap: 2,
    }}>
      <Typography variant="h1" sx={{
        fontSize: 30,
        fontWeight: 900,
      }}
      >
        {t('project_name')}
      </Typography>
      <Typography variant="body2" sx={{
        fontSize: 14,
        color: 'text.secondary',
        maxWidth: {
          xs: '90vw',
          sm: 400,
        },
        mb: 4,
      }}>
        {t('project_description')}
      </Typography>
      <WordCloud words={randomPickedWords} sx={{
        display: { xs: 'none', sm: 'none', md: 'flex' },
      }}/>
    </Box>
  )
}