import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import PostTag from './PostTag';
import { Link } from 'remix';

type Prop = {
  slug: string;
  title: string;
  tags?: string[];
  date: any;
  excerpt?: string;
};

export default function PostCard({ slug, title, tags, date, excerpt }: Prop) {
  const boxShadow = useColorModeValue('lg', 'dark-lg');
  const boxShadowHover = useColorModeValue('xl', boxShadow);

  return (
    <Box
      as={Link}
      to={`./${slug}`}
      w="100%"
      display="flex"
      flexDirection="column"
      boxShadow={boxShadow}
      p="4"
      borderRadius="lg"
      style={{ transition: '.5s ease all' }}
      _hover={{ boxShadow: boxShadowHover, transition: '1s ease all' }}
    >
      <Box display="flex" my="1">
        {(tags ?? []).map((tag: string) => (
          <PostTag key={tag} tag={tag} />
        ))}
      </Box>
      <Heading size="xl">{title}</Heading>
      <Text fontSize="xs" color="gray.500">
        {date}
      </Text>
      {excerpt && <Text>{excerpt}...</Text>}
    </Box>
  );
}
