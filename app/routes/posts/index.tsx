import { useLoaderData } from "remix";
import type { MetaFunction } from "remix";
import { getPosts } from "../../posts.server";
import type { Post } from "../../posts.server";
import { Box, Heading } from "@chakra-ui/react";
import PostCard from "../../../components/PostCard";

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
      <Heading w="100%" my="5">Posts</Heading>
      {
        posts.map((post: Post) => (
          <PostCard
            key={post.slug}
            slug={post.slug}
            title={post.frontMatter.meta.title}
            tags={post?.frontMatter?.tags}
            date={post.frontMatter.date}
            excerpt={post?.excerpt}
          />
        ))
      }
    </Box>
  );
};
