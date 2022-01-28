import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";

import { ChakraProvider, Box } from "@chakra-ui/react";

export const loader: LoaderFunction = () => {
  return {
    appName: process.env.APP_NAME
  };
}

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
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
          <Box w="100%" mx="auto">
            <Box maxW={{ xl: "5xl", lg: "4xl", md: "3xl", sm: "md" }} mx="auto">
              <Outlet />
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
