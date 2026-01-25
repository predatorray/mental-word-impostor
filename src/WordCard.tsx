import React, {useMemo, useState} from "react";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useT} from "./i18n/useLangContext";

export default function WordCard(props: {
  word?: string;
}) {
  const t = useT();
  const rotateDegree = useMemo(() => Math.random() * 2 - 1, []);

  const [revealed, setRevealed] = useState(false);
  const handleShow = () => setRevealed(true);
  const handleHide = () => setRevealed(false);

  return (
    <Card elevation={8} sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: 300,
      backgroundColor: 'primary',
      borderRadius: 4,
    }} style={{ transform: `rotate(${rotateDegree}deg)` }}>
      <CardActionArea
        onMouseDown={handleShow}
        onMouseUp={handleHide}
        onMouseLeave={handleHide}
        onTouchStart={handleShow}
        onTouchEnd={handleHide}
        sx={{
          width: '100%',
          height: '100%',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        <CardContent>
          {
            revealed ? (
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
              )
            ) : (
              <Typography className="hint" variant="caption" gutterBottom sx={{
                fontSize: 14,
                fontStyle: 'italic',
              }}>
                {t('hover_to_reveal')}
              </Typography>
            )
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
}