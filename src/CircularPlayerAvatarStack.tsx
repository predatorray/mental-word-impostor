import PlayerAvatar from "./PlayerAvatar";
import CircularAvatarStack from "./CircularAvatarStack";
import React from "react";

export default function CircularPlayerAvatarStack(props: {
  players: string[];
  activePlayer: string[];
  onClick?: () => void;
}) {
  return (
    <CircularAvatarStack
      onClick={props.onClick}
    >
      {
        props.players.map((player, index) => (
          <PlayerAvatar key={index} player={player} status={props.activePlayer.includes(player) ? 'active' : 'inactive'} />
        ))
      }
    </CircularAvatarStack>
  );
}
