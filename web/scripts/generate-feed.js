const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDir = path.join(__dirname, "../content/blog");
const outDir = path.join(__dirname, "../public");

if (!fs.existsSync(postsDir)) {
  console.log("No blog posts found.");
  process.exit(0);
}

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
const posts = files
  .map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDir, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(content);
    return {
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? "",
      published: data.published ?? false,
    };
  })
  .filter((p) => p.published)
  .sort((a, b) => (a.date > b.date ? -1 : 1));

const siteUrl = "https://snapbackapp.com";

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Snapback Blog</title>
    <description>Tips, updates, and stories about Snapback for Mac.</description>
    <link>${siteUrl}/blog</link>
    <language>en-us</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

fs.writeFileSync(path.join(outDir, "feed.xml"), xml);
console.log(`RSS feed generated with ${posts.length} posts.`);
