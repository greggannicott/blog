import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
  return rss({
    title: "greg.gannicott.co.uk | Blog",
    description: "Posts from greg.gannicott.co.uk",
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),
    customData: `<language>en-gb</language>`,
  });
}
