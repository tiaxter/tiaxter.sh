import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import { Box, Text, Button, useColorModeValue, useClipboard } from "@chakra-ui/react";
import { materialOceanic, materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import chroma from "chroma-js";

type Prop = {
  code: string,
  language: string,
  filename?: string
}

export default function CodeBlock({code, language, filename}: Prop) {
  const theme = useColorModeValue(materialLight, materialOceanic)
  const textColor = useColorModeValue("black", "whiteAlpha.900");
  const themeStyle: any = theme?.['code[class*="language-"]'] ?? theme?.['pre[class*="language-"]'];
  const backgroundColor = themeStyle?.background ?? themeStyle?.backgroundColor ?? "#000";
  const { hasCopied, onCopy} = useClipboard(code);

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
        py=".5em"
        px="1em"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        background={chroma(backgroundColor).darken(.25).hex()}
        borderTopRadius="lg"
      >
        <Box
          display="flex"
          alignItems="center"
          columnGap="4"
        >
          <Text color={textColor}>{language.toUpperCase()}</Text>
          {filename && <Text color={textColor} fontSize="xs">{filename}</Text>}
        </Box>
        <Button variant="ghost" size="sm" onClick={onCopy}>
          { hasCopied ? <CheckIcon/> : <CopyIcon />}
        </Button>
      </Box>
      <ReactSyntaxHighlighter language={language} style={theme} showLineNumbers>
        {code}
      </ReactSyntaxHighlighter>
    </Box>
  )
}
