import type { LoaderFunction } from 'remix';
import { generateFeed } from '../posts.server';

export const loader: LoaderFunction = async () => {
  const rssFeed = (await generateFeed()).rss2();

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'utf-8',
    },
  });
};
