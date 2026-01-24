import {Avatar, keyframes, styled} from "@mui/material";

const ripple = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.4);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const RipplingAvatar = styled(Avatar)(() => ({
  animation: `${ripple} ${1 + Math.random()}s infinite ease-in-out`,
  animationDelay: `${Math.random()}s`,
}))

export default RipplingAvatar;
