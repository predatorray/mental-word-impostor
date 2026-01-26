import GlobalButtons from "./GlobalButtons";
import LanguagePreferenceButton from "./LanguagePreferenceButton";
import React from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import CircularPlayerAvatarStack from "./CircularPlayerAvatarStack";
import {useT} from "./i18n/useLangContext";
import {useNavigate} from "react-router-dom";
import {Footer} from "./Footer";

export default function Lobby() {
  const t = useT();
  const navigate = useNavigate();
  const players = [
    {
      id: '1',
      name: 'Player 1',
    },
    {
      id: '2',
      name: 'Player 2',
    },
    {
      id: '3',
      name: 'Player 3',
    },
    {
      id: '4',
      name: 'Player 4',
    },
    {
      id: '5',
      name: 'Player 5',
    },
  ];
  return (
    <Stack
      direction="column"
      sx={{
        minHeight: '100dvh',
      }}
    >
      <GlobalButtons>
        <LanguagePreferenceButton/>
      </GlobalButtons>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}>
        <CircularPlayerAvatarStack
          players={players}
        />
      </Box>
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" component="div" color="textPrimary">
          {t('n_players_joined')(players.length)}
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: 4 }} onClick={() => navigate('/')}>{t('leave')}</Button>
      </Box>
      <Footer hideProjectName sx={{ mb: 2 }} />
    </Stack>
  );
}
