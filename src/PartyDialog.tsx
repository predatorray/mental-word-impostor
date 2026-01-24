import React from 'react';
import {Box, Button, Dialog, Typography} from "@mui/material";
import CircularPlayerAvatarStack from "./CircularPlayerAvatarStack";
import {useT} from "./i18n/useLangContext";

export default function PartyDialog(props: {
  open: boolean;
  onClose: () => void;
  joinedPlayers: string[];
  playingPlayers: string[];
}) {
  const t = useT();
  return (
    <Dialog
      open={props.open}
      onClose={() => props.onClose()}
      PaperProps={{
        sx: {
          background: 'none',
          borderRadius: 'initial',
          boxShadow: 'none',
          overflow: 'visible',
        },
      }}
      sx={{
        backdropFilter: 'blur(10px)',
      }}
    >
      <CircularPlayerAvatarStack
        onClick={() => props.onClose()}
        players={props.joinedPlayers}
        activePlayer={props.playingPlayers}
      />
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" component="div" color="primary.contrastText">
          {t('n_players_joined')(props.joinedPlayers.length)}
        </Typography>
        <Typography variant="h6" component="div" color="primary.contrastText">
          {t('n_players_playing')(props.playingPlayers.length)}
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: 4 }}>{t('leave')}</Button>
      </Box>
    </Dialog>
  )
}