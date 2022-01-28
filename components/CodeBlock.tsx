import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import { Box, Text } from "@chakra-ui/react";
import { duotoneDark as theme } from "react-syntax-highlighter/dist/cjs/styles/prism"
import chroma from "chroma-js";

type Prop = {
  code: string,
  language: string,
  filename?: string
}

export default function CodeBlock({code, language, filename}: Prop) {
  const backgroundColor: string = theme?.['code[class*="language-"]']?.background ?? "#000";

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
        background={chroma(backgroundColor).darken(.25).hex()}
        borderTopRadius="lg"
        columnGap="4"
      >
        <Text color="whiteAlpha.700">{language.toUpperCase()}</Text>
        {filename && <Text color="whiteAlpha.900" fontSize="xs">{filename}</Text>}
      </Box>
      <ReactSyntaxHighlighter language={language} style={theme} showLineNumbers>
        {code}
      </ReactSyntaxHighlighter>
    </Box>
  )
}
