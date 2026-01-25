import {ButtonGroup} from "@mui/material";

export default function GlobalButtons(props: {
  children?: React.ReactNode;
}) {
  return (
    <ButtonGroup variant="text" aria-label="Global Buttons" sx={{
      position: 'fixed',
      top: 16,
      right: 16,
      zIndex: 1201,
    }}>
      {props.children}
    </ButtonGroup>
  )
}