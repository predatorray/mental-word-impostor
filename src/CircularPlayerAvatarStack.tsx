import PlayerAvatar from "./PlayerAvatar";
import CircularAvatarStack from "./CircularAvatarStack";
import React from "react";

export interface Player {
  id: string;
  name: string;
  active?: boolean;
}

export interface PlayerAvatarProps {
  players: Player[];
  onClick?: () => void;
}

export default function CircularPlayerAvatarStack(props: PlayerAvatarProps) {
  return (
    <CircularAvatarStack
      onClick={props.onClick}
    >
      {
        props.players.map(({id, name, active}, index) => (
          <PlayerAvatar
            key={index}
            playerId={id}
            status={active ? 'active' : 'inactive'}
            tooltip={name}
          />
        ))
      }
    </CircularAvatarStack>
  );
}
