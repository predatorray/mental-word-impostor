import {IconButton} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import LanguageMenu from "./i18n/LanguageMenu";
import React from "react";
import useMenuState from "./util/useMenuState";

export default function LanguagePreferenceButton() {
  const {
    anchorEl,
    open,
    handleClick,
    handleClose,
  } = useMenuState();
  return (
    <>
      <IconButton
        id="language-menu-button"
        size="large"
        color="inherit"
        aria-controls={open ? 'language-menu-button' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <LanguageIcon />
      </IconButton>
      <LanguageMenu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        arioLabelledBy='language-menu-button'
      />
    </>
  )
}