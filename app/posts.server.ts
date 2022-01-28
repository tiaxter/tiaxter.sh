import { join as pathJoin } from "path";
import { read as matterRead } from "gray-matter";
import { readdirSync as readDir, readFileSync as readFile } from "fs";
import { bundleMDX } from "mdx-bundler";
import moment from "moment";
import "moment/locale/it";

moment.locale("it");

const postsPath = pathJoin(__dirname, "..", "posts");

export function getPosts(){
  const postsFiles = readDir(postsPath);

  return postsFiles
    .map(filename => {
        const filepath = pathJoin(postsPath, filename);

        const { data: frontMatter, excerpt } = matterRead(filepath, {excerpt: true});

        return {
          frontMatter: {
            ...frontMatter,
            date: moment(frontMatter.date).format("LLL"),
          },
          slug: filename.split(".")[0],
          excerpt,
        };
     });
}

// Function to read Code Block metadata
// https://github.com/Arcath/arcath.net-next/blob/main/lib/functions/prepare-mdx.ts#L5-L33
const getRehypeMdxCodeMeta = async () => {
  const {visit} = await import('unist-util-visit')

  return (options = {}) => {
    return tree => {
      visit(tree, 'element', visitor)
    }

    function visitor(node, index, parentNode) {
      if (node.tagName === 'code' && node.data && node.data.meta) {
        const blocks = node.data.meta.split(' ') as string[]

        node.properties = blocks.reduce((props, block) => {
          const [prop, value] = block.split('=')

          if (typeof value === 'undefined') {
            props.line = prop

            return props
          }

          props[prop] = value.replaceAll('"', "")

          return props
        }, node.properties)
      }
    }
  }
}

export async function getPostData(slug: string) {
  const postPath: string = pathJoin(postsPath, `${slug}.mdx`);
  const source: string = readFile(postPath, "utf8");

  const gfm = await import("remark-gfm").then(mod => mod.default);
  const rehypeMdxCodeMeta = await getRehypeMdxCodeMeta()

  const { code, frontmatter } = await bundleMDX({
    source,
    xdmOptions: (options) => {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), gfm];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeMdxCodeMeta,
      ];

      return options;
    }
  });

  return {
    slug,
    code,
    frontmatter,
  };
}

export type Post = {
  slug: string,
  frontMatter: any,
  excerpt: string,
}
