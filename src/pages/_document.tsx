import { Html, Head, Main, NextScript } from "next/document";
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

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div
          style={{
            backgroundColor: theme.colors.brand[900],
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            color: theme.colors.brand[100],
          }}
        >
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
