import {
  Box,
  Image,
  Button,
  Link as ChakraLink,
  useColorMode,
} from '@chakra-ui/react';
import { Link } from 'remix';
import { GitHubLogoIcon, SunIcon, MoonIcon } from '@radix-ui/react-icons';

export default function Navbar({ githubName }: any) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      w="100%"
      h="5em"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box h="50%" className="rythm-bass">
        <Link to="/">
          <Image borderRadius="full" boxShadow="lg" src="/logo.jpg" h="100%" />
        </Link>
      </Box>

      <Box display="flex" columnGap="5" className="rythm-bass">
        <Button variant="link" to="/" as={Link}>
          Home
        </Button>
        <Button variant="link" to="/posts" as={Link}>
          Post
        </Button>
        <Button
          variant="ghost"
          href={`https://www.github.com/${githubName}`}
          size="sm"
          as={ChakraLink}
        >
          <GitHubLogoIcon />
        </Button>
        <Button size="sm" onClick={toggleColorMode}>
          {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Box>
    </Box>
  );
}
