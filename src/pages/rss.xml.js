import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";

export async function GET(context) {
  const postImportResult = import.meta.glob("./**/*.md", { eager: true });
  const posts = Object.values(postImportResult);
  const filteredPosts = posts.filter(
    (post) => !post.file.endsWith("feedback.md"),
  );
  return rss({
    title: "greg.gannicott.co.uk | Blog",
    description: "Posts from greg.gannicott.co.uk",
    site: context.site,
    items: await Promise.all(
      filteredPosts.map(async (post) => ({
        link: post.url,
        content: sanitizeHtml(await post.compiledContent()),
        ...post.frontmatter,
      })),
    ),
    customData: `<language>en-gb</language>`,
  });
}
