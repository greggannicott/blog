export function getAllPosts() {
  return Object.values(import.meta.glob('../pages/posts/*.md', { eager: true }))
    .filter(post => !post.file.endsWith("feedback.md"))
    .sort((a, b) => new Date(b.frontmatter.pubDate) - new Date(a.frontmatter.pubDate));
}

export function getPublishedPosts() {
  const posts = getAllPosts();
  if (import.meta.env.DEV) {
    return posts;
  }
  return posts.filter(p => p.frontmatter.published);
}