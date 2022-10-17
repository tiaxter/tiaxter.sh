import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';

import {
  ChakraProvider,
  Box,
  Text,
  Image,
  Divider,
  ColorModeScript,
  extendTheme,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';

// Theme management with Chakra
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
});

// Read env variables
export const loader: LoaderFunction = () => {
  return {
    appName: process.env.APP_NAME,
    githubName: process.env.GITHUB_NAME,
  };
};

export const meta: MetaFunction = () => {
  return { title: 'Remix App' };
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
            w="100%"
            px="10"
          >
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Navbar githubName={data.githubName} />
            <Box w="100%" h="100%">
              <Box
                maxW={{ xl: '5xl', lg: '4xl', md: '3xl', sm: 'xl' }}
                h="100%"
                py="5"
                mx="auto"
              >
                <Outlet />
              </Box>
            </Box>
          </Box>
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <script>const global = globalThis;</script>
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider>
          <Box
            w="100%"
            h="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              className="rythm-bass"
              src="/error.png"
              objectFit="contain"
              boxSize="150px"
              my="10"
            />
            <Box display="flex" columnGap="5" className="rythm-bass">
              <Text fontSize="2xl">{caught.status}</Text>
              <Divider orientation="vertical" />
              <Text fontSize="2xl">{caught.statusText.toUpperCase()}</Text>
            </Box>
          </Box>
        </ChakraProvider>
        <Scripts />
      </body>
    </html>
  );
}
