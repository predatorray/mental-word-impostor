import React from "react";
import {Container, ContainerProps, Divider, Link, Stack, Typography} from "@mui/material";
import {useT} from "./i18n/useLangContext";
import {StringKey} from "./i18n/translations.type";

const FOOTER_LINKS: Partial<Record<StringKey, string>> = {
  author: 'https://github.com/predatorray',
  license: 'https://github.com/predatorray/mental-word-impostor/blob/main/LICENSE'
};

export const Footer = (props: {
  hideProjectName?: boolean;
} & ContainerProps) => {
  const { hideProjectName, ...containerProps } = props;
  const t = useT();
  return (
    <Container component="footer" maxWidth="sm" {...containerProps} sx={{ py: 1, ...containerProps.sx }}>
      {
        !hideProjectName && <Typography variant="h5" component="div" sx={{
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
      }

      <Stack direction="row"
             spacing={1}
             divider={<Divider orientation="vertical" variant="middle" flexItem />}
             sx={{
               justifyContent: 'center',
               fontSize: 10,
               textTransform: 'uppercase',
             }}
      >
        {
          (Object.entries(FOOTER_LINKS) as [StringKey, string][]).map(([stringKey, href], index) => (
            <Link key={index} underline="hover" color="textSecondary" href={href} target="_blank" rel="noreferrer">
              {t(stringKey)}
            </Link>
          ))
        }
      </Stack>
    </Container>
  );
};
