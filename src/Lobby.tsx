import GlobalButtons from "./GlobalButtons";
import LanguagePreferenceButton from "./LanguagePreferenceButton";
import React from "react";
import {Box, Button, Card, Divider, Stack, Typography} from "@mui/material";
import CircularPlayerAvatarStack from "./CircularPlayerAvatarStack";
import {useT} from "./i18n/useLangContext";
import {useNavigate} from "react-router-dom";
import {Footer} from "./Footer";
import QrCodeInvitation from "./QrCodeInvitation";
import ShareLink from "./ShareLink";

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
      justifyContent="space-between"
      sx={{
        minHeight: '100dvh',
      }}
    >
      <GlobalButtons>
        <LanguagePreferenceButton/>
      </GlobalButtons>

      <Stack
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{
          justifyContent: 'center',
          gap: { xs: 6, sm: 12 },
          p: 2,
          mx: 'auto',
          flexGrow: 1,
        }}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 5, sm: 5, md: 10, lg: 12 },
            p: { xs: 2, sm: 4 },
            m: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box>
            <Box sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'flex',
              },
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
              mb: 6,
            }}>
              <CircularPlayerAvatarStack
                players={players}
              />
            </Box>
            <Box sx={{
              textAlign: 'center',
            }}>
              <Typography variant="h6" component="div" color="textPrimary">
                {t('n_players_joined')(players.length)}
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => navigate('/play')}>{t('start')}</Button>
            </Box>
          </Box>

          <Box>
            <Card elevation={8} variant="outlined" sx={{
              borderRadius: 4,
              py: 0,
            }}>
              <Box sx={{
                p: 3,
              }}>
                <QrCodeInvitation size={256}/>
              </Box>
            </Card>
            <Divider sx={{ px: 1, my: 1, textTransform: 'uppercase' }}>
              <Typography variant="caption" color="textSecondary">{t('divider-or')}</Typography>
            </Divider>

            <Card elevation={8} variant="outlined" sx={{
              borderRadius: 4,
              py: 0,
            }}>
              <ShareLink/>
            </Card>
          </Box>
        </Stack>
      </Stack>
      <Footer hideProjectName sx={{ mb: 2 }} />
    </Stack>
  );
}
