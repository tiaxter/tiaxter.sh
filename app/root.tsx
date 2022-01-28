import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction, LoaderFunction } from "remix";

import { ChakraProvider, Box, ColorModeScript, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
});

export const loader: LoaderFunction = () => {
  return {
    appName: process.env.APP_NAME,
    githubName: process.env.GITHUB_NAME,
  };
}

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider>
          <Box
            id="app"
            display="flex"
            flexDirection="column"
            minH="100vh"
            h="100vh"
          >
              <ColorModeScript initialColorMode={theme.config.initialColorMode} />
              <Navbar githubName={data.githubName} />
              <Box w="100%" h="100%" py="5" display="flex" justifyContent="center">
                <Box maxW={{ xl: "5xl", lg: "4xl", md: "3xl", sm: "md" }} w="100%">
                  <Outlet />
                </Box>
              </Box>
          </Box>
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
