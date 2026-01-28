import {Box, Button, InputAdornment, TextField} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import React, {useCallback, useState} from "react";
import {useT} from "./i18n/useLangContext";
import useTimeout from "./util/useTimeout";

export default function ShareLink() {
  const t = useT();

  const link = 'http://localhost:3000';

  const [copied, setCopied] = useState<boolean | null>(null);
  useTimeout(useCallback(() => {
    if (copied !== null) {
      setCopied(null);
    }
  }, [copied]), 1000);

  const copy = () => {
    if (!navigator.clipboard) {
      setCopied(false);
    } else {
      navigator.clipboard.writeText(link)
        .then(() => setCopied(true))
        .catch(() => setCopied(false));
    }
  };

  return (
    <Box sx={{
      px: 3,
      py: {
        xs: 1,
        sm: 1,
        md: 3,
      },
      display: 'flex',
      flexDirection: {
        xs: 'row',
        sm: 'row',
        md: 'column',
      },
      gap: 2,
    }}>
      <TextField
        label={t('label-share-link')}
        value={link}
        variant="standard"
        fullWidth
        slotProps={{
          input: {
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <LinkIcon />
              </InputAdornment>
            ),
          },
          inputLabel: {
            sx: {
              display: {
                xs: 'none',
                sm: 'none',
                md: 'block',
              },
            },
          },
        }}
        sx={{
          flexGrow: 2,
        }}
      />
      <Button
        variant="outlined"
        fullWidth
        onClick={copy}
        sx={{
          flexGrow: 1,
          width: {
            xs: '30%',
            sm: '30%',
            md: '100%',
          },
          my: {
            xs: 2,
            sm: 2,
            md: 'auto',
          },
        }}>
        {
          copied === null
            ? t('copy')
            : copied ? <CheckIcon/> : <CloseIcon/>
        }</Button>
    </Box>
  )
}