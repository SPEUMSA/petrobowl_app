import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <div
        style={{
          backgroundColor: theme.colors.brand[900],
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          color: theme.colors.brand[100],
        }}
      >
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}
