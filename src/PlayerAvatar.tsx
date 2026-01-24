import React from "react";
import RipplingAvatar from "./RipplingAvatar";
import multiavatar from "@multiavatar/multiavatar";
import {Avatar, Badge} from "@mui/material";
import PendingIcon from '@mui/icons-material/Pending';

export default function PlayerAvatar(props: {
  player: string;
  status?: 'active' | 'inactive';
}) {
  const svgCode = multiavatar(props.player);
  if (props.status === 'active') {
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px #fff`,
            '&::after': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              content: '""',
            },
          },
        }}
      >
        <RipplingAvatar
          alt={props.player}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`}
          sx={{ width: 50, height: 50 }}
        />
      </Badge>
    );
  } else if (props.status === 'inactive') {
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<PendingIcon sx={{ color: 'white', width: 16, height: 16 }}/>}
      >
        <Avatar
          alt={props.player}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`}
          sx={{ width: 50, height: 50 }}
        />
      </Badge>
    );
  } else {
    return (
      <Avatar
        alt={props.player}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`}
        sx={{ width: 50, height: 50 }}
      />
    );
  }
}
