import React from "react";
import {Container, Divider, Link, Stack, Typography} from "@mui/material";
import {useT} from "./i18n/useLangContext";

export const Footer = () => {
  const t = useT();
  return (
    <Container component="footer" maxWidth="sm" sx={{ py: 1, height: 72 }}>
      <Typography variant="h5" component="div" sx={{
        flexGrow: 1,
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 600,
        mb: 1
      }}>
        <Link underline="hover" href="/" sx={{
          color: 'black',
        }}>{t('project_name')}</Link>
      </Typography>

      <Stack direction="row"
             spacing={1}
             divider={<Divider orientation="vertical" variant="middle" flexItem />}
             sx={{
               justifyContent: 'center',
               fontSize: 10,
               textTransform: 'uppercase',
             }}
      >
        <Link underline="hover" color="textSecondary" href="/">
          {t('author')}
        </Link>
        <Link underline="hover" color="textSecondary" href="/">
          {t('license')}
        </Link>
      </Stack>
    </Container>
  );
};
