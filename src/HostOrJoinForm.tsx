import * as React from 'react';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import BasicTabs from "./BasicTabs";
import {useT} from "./i18n/useLangContext";
import {Button, TextField} from "@mui/material";
import PlayerAvatar from "./PlayerAvatar";
import {useCallback, useMemo} from "react";
import genRandomPlayerName from "./util/genRandomPlayerName";
import {useNavigate} from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

function HostTab(props: {
  playerName: string;
  playerNameForAvatar: string;
  changePlayerName: (name: string) => void;
  feelsLucky: () => void;
}) {
  const t = useT();
  const navigate = useNavigate();

  const {
    playerName,
    playerNameForAvatar,
    changePlayerName,
    feelsLucky,
  } = props;

  const [impostorsText, setImpostorsText] = React.useState('1');
  const impostors = useMemo(() => Number(impostorsText), [impostorsText]);

  return (
    <Box>
      <Box
        component="form"
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
          justifyContent: 'space-between',
          height: '100%',
          pt: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <PlayerAvatar
            player={playerNameForAvatar}
            width={100}
            height={100}
            onClick={feelsLucky}
            sx={{
              my: 1,
              'cursor': 'pointer',
            }}
          />
        </Box>
        <TextField
          name="playerName"
          type="text"
          required
          autoFocus
          fullWidth
          variant="outlined"
          color={playerName ? 'primary' : 'error'}
          label={t('form_label_player_name')}
          value={playerName}
          onChange={(e) => changePlayerName(e.target.value)}
        />
        <TextField
          name="impostors"
          type="number"
          slotProps={{
            htmlInput: {
              min: 1,
            },
          }}
          defaultValue={1}
          autoComplete="number"
          required
          fullWidth
          variant="outlined"
          color={impostors > 0 ? 'primary' : 'error'}
          label={t('form_label_number_of_impostors')}
          value={impostorsText}
          onChange={(e) => setImpostorsText(e.target.value)}
          helperText={t('min_players_hint')(impostors)}
        />
        <Button variant="contained" onClick={() => navigate('/play')}>{t('host')}</Button>
      </Box>
    </Box>
  );
}

function JoinTab(props: {
  playerName: string;
  playerNameForAvatar: string;
  changePlayerName: (name: string) => void;
  feelsLucky: () => void;
}) {
  const {
    playerName,
    playerNameForAvatar,
    changePlayerName,
    feelsLucky,
  } = props;
  const t = useT();
  return (
    <Box>
      <Box
        component="form"
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
          justifyContent: 'space-between',
          height: '100%',
          pt: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <PlayerAvatar
            player={playerNameForAvatar}
            width={100}
            height={100}
            onClick={feelsLucky}
            sx={{
              my: 1,
              'cursor': 'pointer',
            }}
          />
        </Box>
        <TextField
          name="playerName"
          type="text"
          required
          autoFocus
          fullWidth
          variant="outlined"
          color={playerName ? 'primary' : 'error'}
          label={t('form_label_player_name')}
          value={playerName}
          onChange={(e) => changePlayerName(e.target.value)}
        />
        <Button variant="contained">{t('join')}</Button>
      </Box>
    </Box>
  )
}

export default function HostOrJoinForm() {
  const t = useT();

  const [playerName, setPlayerName] = React.useState(genRandomPlayerName());
  const [avatarSalt, setAvatarSalt] = React.useState('');
  const changePlayerName = useCallback((name: string) => {
    setPlayerName(name);
    setAvatarSalt('');
  }, []);
  const playerNameForAvatar = useMemo(() => playerName + avatarSalt, [playerName, avatarSalt]);
  const feelsLucky = useCallback(() => {
    setPlayerName(genRandomPlayerName());
    setAvatarSalt('');
  }, []);

  return (
    <Card elevation={8} variant="outlined" sx={{
      borderRadius: 4,
      py: 0,
    }}>
      <BasicTabs
        tabs={[
          {
            label: t('host'),
            content: (
              <HostTab
                playerName={playerName}
                playerNameForAvatar={playerNameForAvatar}
                changePlayerName={changePlayerName}
                feelsLucky={feelsLucky}
              />
            )
          },
          {
            label: t('join'),
            content: (
              <JoinTab
                playerName={playerName}
                playerNameForAvatar={playerNameForAvatar}
                changePlayerName={changePlayerName}
                feelsLucky={feelsLucky}/>
            )
          },
        ]}
      />
    </Card>
  );
}
