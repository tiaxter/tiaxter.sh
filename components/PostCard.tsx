import { Box, Heading, Tag, Text } from "@chakra-ui/react";
import { Link } from "remix"

type Prop = {
  slug: string,
  title: string,
  tags?: string[],
  date: any,
  excerpt?: string,
}

export default function PostCard({ slug, title, tags, date, excerpt}: Prop) {
  return (
    <Box
      w="100%"
      display="flex"
      flexDirection="column"
      boxShadow="lg"
      p="4"
      borderRadius="lg"
      style={{ transition: ".5s ease all"}}
      _hover={{ boxShadow: "xl", transition: "1s ease all" }}
    >
      <Link to={`./${slug}`}>
        <Box display="flex" my="1">
          {
            (tags ?? []).map((tag: string) => (
              <Tag key={tag} size="sm" mr="2" borderRadius="lg">{tag}</Tag>
            ))
          }
        </Box>
        <Heading size="xl">{title}</Heading>
        <Text fontSize="xs" color="gray.500">{date}</Text>
      </Link>
    </Box>
  )
}
