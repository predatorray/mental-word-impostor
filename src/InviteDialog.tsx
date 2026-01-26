import React from 'react';
import {Dialog, DialogContent} from "@mui/material";
import QrCodeInvitation from "./QrCodeInvitation";

export default function InviteDialog(props: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.onClose()}
      sx={{
        backdropFilter: 'blur(10px)',
      }}
    >
      <DialogContent>
        <QrCodeInvitation/>
      </DialogContent>
    </Dialog>
  )
}