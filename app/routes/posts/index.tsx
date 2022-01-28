import { useLoaderData, Link } from "remix";
import { getPosts } from "../../posts.server";
import type { Post } from "../../posts.server";
import { Box, Heading, Text, Tag } from "@chakra-ui/react";

export const loader = getPosts;

export const meta: MetaFunction = ({ parentsData }) => {
  return {
    title: `Posts | ${parentsData.root.appName}`
  };
};

export default function Posts() {
  const posts: Post[] = useLoaderData();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
    <Heading w="100%" my="10">Posts</Heading>
      {
        posts.map((post: Post) => (
            <Box
              key={post.slug}
              w="100%"
              display="flex"
              flexDirection="column"
              boxShadow="lg"
              p="4"
              borderRadius="lg"
              style={{ transition: ".5s ease all"}}
              _hover={{ boxShadow: "xl", transition: "1s ease all" }}
            >
              <Link to={`./${post.slug}`}>
                <Box display="flex" my="1">
                  {
                    (post?.frontMatter?.tags ?? []).map((tag: string) => (
                      <Tag key={tag} size="sm" mr="2" borderRadius="lg">{tag}</Tag>
                    ))
                  }
                </Box>
                <Heading size="xl">{post.frontMatter.meta.title}</Heading>
                <Text fontSize="xs" color="gray.500">{post.frontMatter.date}</Text>
              </Link>
            </Box>
        ))
      }
    </Box>
  );
};
