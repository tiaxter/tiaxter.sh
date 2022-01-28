import BlogPost from "../../../components/BlogPost";
import { Box } from "@chakra-ui/react";
import { LoaderFunction, useLoaderData } from "remix";
import type { MetaFunction } from "remix";
import {getPostData} from "~/posts.server";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    return await getPostData(params?.slug ?? "");
  } catch (e) {
    // If post not found load 404 page
    throw new Response("Not Found", {
      status: 404
    });
  }
}

export const meta: MetaFunction = ({ data, parentsData }) => {
  return { 
    title: `${data.frontmatter.meta.title} | ${parentsData.root.appName}` 
  };
};

export default function PostSlug() {
  const { code, frontMatter }: any = useLoaderData();

  return (
    <Box pb="5">
      <BlogPost code={code} frontMatter={frontMatter} />
    </Box>
  )
}
