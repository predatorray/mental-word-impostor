import {Stack} from "@mui/material";
import React from "react";
import HostOrJoinForm from "./HostOrJoinForm";
import LanguagePreferenceButton from "./LanguagePreferenceButton";
import GlobalButtons from "./GlobalButtons";
import Introduction from "./Introduction";
import {Footer} from "./Footer";

export default function HomePage() {
  return (
    <Stack
      direction="column"
      sx={{
        minHeight: '100dvh',
      }}
    >
      <GlobalButtons>
        <LanguagePreferenceButton/>
      </GlobalButtons>
      <Stack
        direction="column"
        component="main"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: { xs: 0, sm: 0, md: 2 },
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { md: 2, lg: 12 },
              p: { xs: 0, sm: 0, md: 4 },
              m: 'auto',
            }}
          >
            <Introduction/>
            <HostOrJoinForm/>
          </Stack>
        </Stack>
      </Stack>
      <Footer hideProjectName sx={{ mb: 2 }} />
    </Stack>
  )
}
