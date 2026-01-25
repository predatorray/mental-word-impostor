import {Box, Chip} from "@mui/material";
import React from "react";

export default function WordCloud(props: {
  words: string[];
}) {
  const radiusBase = 120; // Base radius for the circle

  return (
    <Box sx={{
      position: 'relative',
      width: 400,
      height: 300,
      mt: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {props.words.map((word, index) => {
        const total = props.words.length;
        // Create a spiral/circular distribution using Fermat's spiral or similar logic
        const phi = (Math.sqrt(5) + 1) / 2; // Golden ratio
        const angle = index * 2 * Math.PI * phi;
        const radius = Math.sqrt(index / total) * radiusBase;
        
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <Chip
            key={word}
            label={word}
            variant="filled"
            size={index % 3 === 0 ? "medium" : "small"}
            sx={{
              position: 'absolute',
              transform: `translate(${x}px, ${y}px)`,
              fontSize: index % 3 === 0 ? 16 : 12,
              fontWeight: index % 3 === 0 ? 'bold' : 'normal',
              opacity: 0.6 + (index % 4) * 0.1,
              backgroundColor: 'background.paper',
              zIndex: props.words.length - index,
              transition: 'all 0.3s ease',
              '&:hover': {
                zIndex: 100,
                opacity: 1,
              }
            }}
          />
        );
      })}
    </Box>
  )
}
