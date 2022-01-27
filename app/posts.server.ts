import { join as pathJoin } from "path";
import { read as matterRead } from "gray-matter";
import { readdirSync as readDir, readFileSync as readFile } from "fs";
import { bundleMDX } from "mdx-bundler";

const postsPath = pathJoin(__dirname, "..", "posts");

export function getPosts(){
  const postsFiles = readDir(postsPath);

  return postsFiles
    .filter(filename => filename.includes(".mdx"))
    .map(filename => {
        const filepath = pathJoin(postsPath, filename);

        const { data: frontMatter, excerpt } = matterRead(filepath, {excerpt: true});

        return {
          frontMatter,
          slug: filename.split(".")[0],
          excerpt,
        };
     });
}

export async function getPostData(slug: string) {
  const postPath: string = pathJoin(postsPath, `${slug}.mdx`);
  const source: string = readFile(postPath, "utf8");

  const gfm = await import("remark-gfm").then(mod => mod.default);

  const { code, frontmatter } = await bundleMDX({
    source,
    xdmOptions: (options) => {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), gfm];
      // options.rehypePlugins = [...(options?.rehypePlugins ?? []), rehypePrism];

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
