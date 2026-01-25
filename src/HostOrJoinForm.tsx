import * as React from 'react';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import BasicTabs from "./BasicTabs";
import {useT} from "./i18n/useLangContext";

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

function HostTab() {
  return (
    <Box sx={{ height: '60dvh' }}>
    </Box>
  );
}

function JoinTab() {
  return (
    <Box sx={{ height: '60dvh' }}>
      Join a game
    </Box>
  )
}

export default function HostOrJoinForm() {
  const t = useT();
  return (
    <Card elevation={8} variant="outlined" sx={{
      borderRadius: 4,
    }}>
      <BasicTabs
        tabs={[
          { label: t('host'), content: <HostTab/> },
          { label: t('join'), content: <JoinTab/> },
        ]}
      />
    </Card>
  );
}
