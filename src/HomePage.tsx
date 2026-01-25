import {Stack} from "@mui/material";
import React from "react";
import HostOrJoinForm from "./HostOrJoinForm";
import LanguagePreferenceButton from "./LanguagePreferenceButton";
import GlobalButtons from "./GlobalButtons";
import Introduction from "./Introduction";

export default function HomePage() {
  return (
    <>
      <GlobalButtons>
        <LanguagePreferenceButton/>
      </GlobalButtons>
      <Stack
        direction="column"
        component="main"
        sx={{
          height: '100dvh',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <Introduction/>
            <HostOrJoinForm/>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
