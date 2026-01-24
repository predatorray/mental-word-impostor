import React from 'react';
import {Dialog, DialogContent} from "@mui/material";
import QRCode from "react-qr-code";

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
        <QRCode value="http://localhost:3000/" />
      </DialogContent>
    </Dialog>
  )
}