import BlogPost from "../../../components/BlogPost";
import { LoaderFunction, useLoaderData } from "remix";
import {getPostData} from "~/posts.server";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    return await getPostData(params.slug);
  } catch (e) {
    // If post not found load 404 page
    throw new Response("Not Found", {
      status: 404
    });
  }
}

export default function PostSlug() {
  const { code, frontMatter }: any = useLoaderData();

  return (
    <div>
      <BlogPost code={code} frontMatter={frontMatter} />
    </div>
  )
}
