import React, {ReactNode} from 'react';
import {Box} from "@mui/material";

export default function CircularAvatarStack(props: {
  children: Iterable<ReactNode>;
  radius?: number;
  onClick?: () => void;
}) {
  const radius = props.radius ?? 100;
  return (
    <Box
      sx={{
        position: 'relative',
        width: radius * 2.5,
        height: radius * 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={props.onClick}
    >
      {
        React.Children.map(props.children, (child, index) => {
          // Calculate the angle for this specific avatar
          // Starting from index 0 at 6 o'clock (PI / 2)
          const angle = (index / React.Children.count(props.children)) * 2 * Math.PI + Math.PI / 2;

          // Calculate X and Y positions
          const x = Math.round(radius * Math.cos(angle));
          const y = Math.round(radius * Math.sin(angle));

          return (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                // Use transform to shift the avatar to its calculated position
                transform: `translate(${x}px, ${y}px)`,
                width: 50,
                height: 50
              }}
            >
              {child}
            </Box>
          );
        })
      }
    </Box>
  )
}