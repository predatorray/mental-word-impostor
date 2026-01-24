import React from "react";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {t} from "./i18n/translations";

export default function WordCard(props: {
  word?: string;
}) {
  const rotateDegree = Math.random() * 2 - 1;
  return (
    <Card elevation={8} sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: 300,
      backgroundColor: 'primary',
      borderRadius: 4,
    }} style={{ transform: `rotate(${rotateDegree}deg)` }}>
      <CardActionArea sx={{
        width: '100%',
        height: '100%',
        '.word': {
          display: 'none',
        },
        '&:hover .word': {
          display: 'initial',
        },
        '&:hover .hint': {
          display: 'none'
        },
      }}>
        <CardContent>
          {
            props.word ? (
              <Typography className="word" component="div" variant="h1" fontFamily="monospace" sx={{
                color: 'primary',
                fontSize: 40,
                fontWeight: 700,
                wordWrap: 'break-word',
              }}>
                {props.word}
              </Typography>
            ) : (
              <>
                <Typography className="word impostor" component="div" variant="h1" fontFamily="monospace" sx={{
                  color: 'gray',
                  fontSize: 30,
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}>
                  {t('you_are_the_impostor')}
                  <Typography component="div" variant="caption" sx={{ mt: 2 }}>
                    <div dangerouslySetInnerHTML={{ __html: t('impostor_hint') }} />
                  </Typography>
                </Typography>
              </>

            )
          }

          <Typography className="hint" variant="caption" gutterBottom sx={{
            fontSize: 14,
            fontStyle: 'italic',
          }}>
            {t('hover_to_reveal')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}