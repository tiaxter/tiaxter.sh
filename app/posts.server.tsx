import { join as pathJoin } from 'path';
import { read as matterRead } from 'gray-matter';
import { readdirSync as readDir, readFileSync as readFile } from 'fs';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import { Feed } from 'feed';
import { renderToString } from 'react-dom/server';
import moment from 'moment';
import 'moment/locale/it';

moment.locale('it');

const postsPath = pathJoin(__dirname, '..', 'posts');

export function getPosts() {
  const postsFiles = readDir(postsPath);

  return postsFiles
    .map((filename: string) => {
      const filepath = pathJoin(postsPath, filename);

      const { data: frontMatter } = matterRead(filepath);

      return {
        frontMatter: {
          ...frontMatter,
          date: moment(frontMatter.date).format('LL'),
          publishedAt: frontMatter.date,
        },
        slug: filename.split('.')[0],
        excerpt: frontMatter?.excerpt,
      };
    })
    .sort((prev, next) => {
      // Sort posts by date descending
      return (
        moment(next.frontMatter.publishedAt).valueOf() -
        moment(prev.frontMatter.publishedAt).valueOf()
      );
    });
}

// Function to read Code Block metadata
// https://github.com/Arcath/arcath.net-next/blob/main/lib/functions/prepare-mdx.ts#L5-L33
const getRehypeMdxCodeMeta = async () => {
  const { visit } = await import('unist-util-visit');

  return (options = {}) => {
    return (tree) => {
      visit(tree, 'element', visitor);
    };

    function visitor(node, index, parentNode) {
      if (node.tagName === 'code' && node.data && node.data.meta) {
        const blocks = node.data.meta.split(' ') as string[];

        node.properties = blocks.reduce((props, block) => {
          const [prop, value] = block.split('=');

          if (typeof value === 'undefined') {
            props.line = prop;

            return props;
          }

          props[prop] = value.replaceAll('"', '');

          return props;
        }, node.properties);
      }
    }
  };
};

export async function getPostData(slug?: string) {
  const postPath: string = pathJoin(postsPath, `${slug}.mdx`);
  const source: string = readFile(postPath, 'utf8');

  const gfm = await import('remark-gfm').then((mod) => mod.default);
  const rehypeMdxCodeMeta = await getRehypeMdxCodeMeta();

  const { code, frontmatter } = await bundleMDX({
    source,
    xdmOptions: (options) => {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), gfm];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeMdxCodeMeta,
      ];

      return options;
    },
  });

  return {
    slug,
    code,
    frontmatter: {
      ...frontmatter,
      date: moment(frontmatter.date).format('LL'),
      rawDate: frontmatter.date,
    },
  };
}

export type Post = {
  slug: string;
  frontMatter: any;
  excerpt: string;
};

export async function generateFeed() {
  const posts = await getPosts();

  const baseURL: string = 'https://tiaxter.sh';
  const author = {
    name: 'Gerardo Palmiotto',
    email: process.env.PERSONAL_EMAIL,
    link: process.env.INSTAGRAM_PROFILE,
  };

  const feed = new Feed({
    title: process.env.APP_NAME,
    description: '',
    id: baseURL,
    link: baseURL,
    language: 'it',
    image: `${baseURL}/logo.jpg`,
    favicon: `${baseURL}/favicon.ico`,
    feedLink: {
      rss2: `${baseURL}/feed.xml`,
      json1: `${baseURL}/feed.json`,
    },
    author,
  });

  for (let post of posts) {
    const postData = await getPostData(post.slug);
    const url = `${baseURL}/posts/${post.slug}`;

    const Component = getMDXComponent(postData.code);

    feed.addItem({
      title: postData.frontmatter.meta.title,
      id: url,
      link: url,
      description: postData.frontmatter.excerpt,
      content: renderToString(<Component />),
      author: [author],
      date: postData.frontmatter.rawDate,
    });
  }

  return feed;
}
