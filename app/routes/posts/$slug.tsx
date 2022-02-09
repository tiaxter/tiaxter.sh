import BlogPost from '~/components/BlogPost';
import { Box } from '@chakra-ui/react';
import { useLoaderData } from 'remix';
import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix';
import { getPostData } from '~/posts.server';

export const loader: LoaderFunction = async ({ params }) => {
  try {
    return await getPostData(params.slug);
  } catch (e) {
    // If post not found load 404 page
    throw new Response('Not Found', {
      status: 404,
    });
  }
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/firacode/5.2.0/fira_code.min.css',
    },
  ];
};

export const meta: MetaFunction = ({ data, parentsData }) => {
  return {
    title: `${data?.frontmatter?.meta?.title ?? ''} | ${
      parentsData.root.appName
    }`,
  };
};

export default function PostSlug() {
  const { code, frontmatter }: any = useLoaderData();

  return (
    <Box pb="5">
      <BlogPost code={code} frontmatter={frontmatter} />
    </Box>
  );
}
