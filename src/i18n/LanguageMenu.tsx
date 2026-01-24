import React from 'react';
import {ListItemIcon, ListItemText, MenuList, MenuItem, Typography, Menu, MenuProps} from "@mui/material";
import CountryFlag from "./CountryFlag";
import {SupportedLanguages} from "./translations.type";
import useLangContext from "./useLangContext";
import {t} from "./translations";

const langs: { [K in SupportedLanguages]?: { code: string } } = {
  'en-US': {
    code: 'US',
  },
  'zh-CN': {
    code: 'CN',
  },
  'zh-TW': {
    code: 'TW',
  },
};

export default function LanguageMenu(props: {
  id: MenuProps['id'],
  anchorEl: MenuProps['anchorEl'],
  open: MenuProps['open'],
  onClose: MenuProps['onClose'],
  arioLabelledBy?: string,
}) {
  const { lang: currentLang, setLang } = useLangContext();

  return (
    <Menu
      id={props.id}
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.onClose}
      slotProps={{
        list: {
          'aria-labelledby': props.arioLabelledBy,
        },
      }}
    >
      <MenuList>
        { Object.entries(langs).map(([lang, { code }]) => (
          <MenuItem
            key={lang}
            selected={lang === currentLang}
            onClick={() => {
              setLang(lang as SupportedLanguages);
              props.onClose?.({}, 'backdropClick');
            }}
          >
            <ListItemIcon>
              <CountryFlag code={code}/>
            </ListItemIcon>
            <ListItemText sx={{ mr: 2 }}>{t('lang', lang as SupportedLanguages)}</ListItemText>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {lang}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}