import { Tag, useColorModeValue } from "@chakra-ui/react";

type Prop = {
  tag: string
}

export default function PostTag({ tag }: Prop) {
  const hoverBackgroundColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Tag
      key={tag}
      size="sm"
      mr="2"
      borderRadius="lg"
      _hover={{ transition: "1s all ease", backgroundColor: hoverBackgroundColor }}
      style={{ transition: ".5 all ease", userSelect: "none" }}
    >
      {tag}
    </Tag>
  )
}
