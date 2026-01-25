import {Badge, IconButton} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import QrCode2Icon from "@mui/icons-material/QrCode2";

import PartyDialog from "./PartyDialog";
import InviteDialog from "./InviteDialog";

import React, {useState} from "react";
import LanguagePreferenceButton from "./LanguagePreferenceButton";
import GlobalButtons from "./GlobalButtons";

export const Menu = () => {
  const [showsPartyDialog, setShowsPartyDialog] = useState(false);
  const [showsInviteDialog, setShowsInviteDialog] = useState(false);
  return (
    <>
      <GlobalButtons>
        <IconButton size="large" color="inherit" onClick={() => setShowsPartyDialog(true)}>
          <Badge badgeContent={4} color="primary">
            <PeopleIcon/>
          </Badge>
        </IconButton>
        <PartyDialog
          open={showsPartyDialog}
          onClose={() => setShowsPartyDialog(false)}
          players={[
            {
              id: '1',
              name: 'Player 1',
              active: true,
            },
            {
              id: '2',
              name: 'Player 2',
              active: true,
            },
            {
              id: '3',
              name: 'Player 3',
              active: true,
            },
            {
              id: '4',
              name: 'Player 4',
            },
            {
              id: '5',
              name: 'Player 5',
            },
          ]}
        />

        <IconButton size="large" color="inherit" onClick={() => setShowsInviteDialog(true)}>
          <QrCode2Icon />
        </IconButton>
        <InviteDialog open={showsInviteDialog} onClose={() => setShowsInviteDialog(false)}/>

        <LanguagePreferenceButton/>
      </GlobalButtons>
    </>
  );
}