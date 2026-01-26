import {ButtonGroup} from "@mui/material";

export default function GlobalButtons(props: {
  children?: React.ReactNode;
}) {
  return (
    <ButtonGroup variant="text" aria-label="Global Buttons" sx={{
      position: {
        xs: 'initial',
        sm: 'fixed',
      },
      display: {
        xs: 'flex',
      },
      flexDirection: 'row-reverse',
      mr: {
        xs: 2,
        sm: 'initial',
      },
      top: {
        xs: 'initial',
        sm: 16
      },
      right: {
        xs: 'initial',
        sm: 16
      },
      zIndex: {
        xs: 'initial',
        sm: 1201
      },
      textAlign: {
        xs: 'right',
        sm: 'initial',
      }
    }}>
      {props.children}
    </ButtonGroup>
  )
}