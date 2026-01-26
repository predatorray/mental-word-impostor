import QRCode from "react-qr-code";
import React from "react";

export default function QrCodeInvitation(props: {
  size?: number;
}) {
  return (
    <QRCode value="http://localhost:3000/" {...props} />
  );
}
