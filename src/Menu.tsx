import {Badge, ButtonGroup, IconButton} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LanguageIcon from '@mui/icons-material/Language';

import PartyDialog from "./PartyDialog";
import InviteDialog from "./InviteDialog";

import React, {useState} from "react";
import useMenuState from "./util/useMenuState";
import LanguageMenu from "./i18n/LanguageMenu";

export const Menu = () => {
  const [showsPartyDialog, setShowsPartyDialog] = useState(false);
  const [showsInviteDialog, setShowsInviteDialog] = useState(false);
  const {
    anchorEl,
    open,
    handleClick,
    handleClose,
  } = useMenuState();
  return (
    <>
      <ButtonGroup variant="text" aria-label="Basic button group" sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1201,
      }}>
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
        <IconButton size="large" color="inherit" onClick={() => setShowsPartyDialog(true)}>
          <Badge badgeContent={4} color="primary">
            <PeopleIcon/>
          </Badge>
        </IconButton>
        <IconButton size="large" color="inherit" onClick={() => setShowsInviteDialog(true)}>
          <QrCode2Icon />
        </IconButton>
      </ButtonGroup>

      <PartyDialog
        open={showsPartyDialog}
        onClose={() => setShowsPartyDialog(false)}
        joinedPlayers={["a", "b", "c", "d", "e"]}
        playingPlayers={["a", "b", "c"]}
      />
      <InviteDialog open={showsInviteDialog} onClose={() => setShowsInviteDialog(false)}/>
    </>
  );
}