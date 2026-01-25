import React from 'react';
import {Box, Button, Dialog, Typography} from "@mui/material";
import CircularPlayerAvatarStack from "./CircularPlayerAvatarStack";
import {useT} from "./i18n/useLangContext";
import {useNavigate} from "react-router-dom";

export interface Player {
  id: string;
  name: string;
  active?: boolean;
}

export default function PartyDialog(props: {
  open: boolean;
  onClose: () => void;
  players: Player[];
}) {
  const t = useT();
  const navigate = useNavigate();
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
        players={props.players}
      />
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" component="div" color="primary.contrastText">
          {t('n_players_joined')(props.players.length)}
        </Typography>
        <Typography variant="h6" component="div" color="primary.contrastText">
          {t('n_players_playing')(props.players.filter(({active}) => !!active).length)}
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: 4 }} onClick={() => navigate('/')}>{t('leave')}</Button>
      </Box>
    </Dialog>
  )
}