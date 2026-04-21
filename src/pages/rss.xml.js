import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import { getPublishedPosts } from "../utils/posts";

export async function GET(context) {
  const posts = getPublishedPosts();
  return rss({
    title: "greg.gannicott.co.uk | Blog",
    description: "Posts from greg.gannicott.co.uk",
    site: context.site,
    items: await Promise.all(
      posts.map(async (post) => ({
        link: post.url,
        content: sanitizeHtml(await post.compiledContent()),
        ...post.frontmatter,
      })),
    ),
    customData: `<language>en-gb</language>`,
  });
}
