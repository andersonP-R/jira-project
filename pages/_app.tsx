import type { AppProps } from "next/app";
import "../styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "../themes";
import { UIProvide } from "../context/ui";
import { EntriesProvider } from "../context/entries";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvide>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvide>
    </EntriesProvider>
  );
}
