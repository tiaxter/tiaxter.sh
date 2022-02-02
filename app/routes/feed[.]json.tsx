import type { LoaderFunction } from 'remix';
import { generateFeed } from '../posts.server';

export const loader: LoaderFunction = async () => {
  const jsonFeed = (await generateFeed()).json1();

  return new Response(jsonFeed);
};
