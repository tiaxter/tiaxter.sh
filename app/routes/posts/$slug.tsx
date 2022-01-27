import BlogPost from "../../../components/BlogPost";
import { LoaderFunction, useLoaderData } from "remix";
import {getPostData} from "~/posts.server";

export const loader: LoaderFunction = ({ params }) => {
  return getPostData(params?.slug ?? "");
}

export default function PostSlug() {
  const { code, frontMatter }: any = useLoaderData();

  return (
    <div>
      <BlogPost code={code} frontMatter={frontMatter} />
    </div>
  )
}
