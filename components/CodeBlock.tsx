import {
  CodeBlock as CodeSyntaxHighlighter,
  atomOneDark,
  atomOneLight,
} from 'react-code-blocks';
import {
  Box,
  Text,
  Button,
  useColorModeValue,
  useClipboard,
} from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import chroma from 'chroma-js';

type Prop = {
  code: string;
  language: string;
  filename?: string;
  highlight?: string;
};

export default function CodeBlock({
  code,
  language,
  filename,
  highlight,
}: Prop) {
  const theme: any = useColorModeValue(atomOneLight, atomOneDark);
  const textColor = useColorModeValue('black', 'whiteAlpha.900');
  const backgroundColor = theme?.backgroundColor ?? '#000';
  const { hasCopied, onCopy } = useClipboard(code);

  return (
    <Box
      display="flex"
      flexDirection="column"
      boxShadow="lg"
      borderRadius="lg"
      background={backgroundColor}
      w="100%"
      h="100%"
      my="5"
    >
      <Box
        w="100%"
        py=".25em"
        px="1em"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        background={chroma(backgroundColor).darken(0.25).hex()}
        borderTopRadius="lg"
      >
        <Box display="flex" alignItems="center" columnGap="4">
          <Text color={textColor}>{language.toUpperCase()}</Text>
          {filename && (
            <Text color={textColor} fontSize="xs">
              {filename}
            </Text>
          )}
        </Box>
        <Button variant="ghost" size="sm" onClick={onCopy}>
          {hasCopied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </Box>
      <CodeSyntaxHighlighter
        text={code}
        language={language}
        theme={theme}
        highlight={highlight ?? ''}
        showLineNumbers
        customStyle={{
          fontFamily: 'Fira Code',
          borderBottomRightRadius: '0.5rem',
          borderBottomLeftRadius: '0.5rem',
        }}
      />
    </Box>
  );
}
