import React from "react";
import RipplingAvatar from "./RipplingAvatar";
import multiavatar from "@multiavatar/multiavatar";
import {Avatar, AvatarProps, Badge} from "@mui/material";
import PendingIcon from '@mui/icons-material/Pending';

interface PlayerAvatarProps extends AvatarProps {
  player: string;
  status?: 'active' | 'inactive';
  width?: number;
  height?: number;
}

export default function PlayerAvatar(props: PlayerAvatarProps) {
  const {
    player,
    status,
    width: propWidth,
    height: propHeight,
    ...avatarProps
  } = props;
  const width = propWidth ?? 50;
  const height = propHeight ?? 50;
  const svgCode = multiavatar(player);
  if (status === 'active') {
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
          alt={player}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`}
          {...avatarProps}
          sx={{ width, height, ...avatarProps.sx }}
        />
      </Badge>
    );
  } else if (status === 'inactive') {
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<PendingIcon sx={{ color: 'white', width: 16, height: 16 }}/>}
      >
        <Avatar
          alt={player}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`}
          {...avatarProps}
          sx={{ width, height, ...avatarProps.sx }}
        />
      </Badge>
    );
  } else {
    return (
      <Avatar
        alt={player}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`}
        {...avatarProps}
        sx={{ width, height, ...avatarProps.sx }}
      />
    );
  }
}
