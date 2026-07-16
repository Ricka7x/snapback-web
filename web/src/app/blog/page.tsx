import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getReadingTime } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Mac Window Management Tips & Updates | Snapback Blog",
  description: "Tips, updates, and practical guides on Mac window management, workspace organization, multi-monitor setups, and productivity from the Snapback team.",
  alternates: {
    canonical: '/blog',
    types: {
      "application/rss+xml": "https://snapbackapp.com/feed.xml",
    },
  },
  openGraph: {
    url: "/blog",
    title: "Mac Window Management Tips & Updates | Snapback Blog",
    description: "Tips, updates, and practical guides on Mac window management, workspace organization, multi-monitor setups, and productivity from the Snapback team.",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts().filter((p) => p.published);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:font-display prose-headings:tracking-tight
          prose-a:no-underline
          prose-strong:text-white
        ">
          <h1>Blog</h1>
          <p className="text-white/50">Mac window management tips, updates, and guides from the Snapback team.</p>

          {posts.length === 0 ? (
            <p className="text-white/40">No posts yet. Check back soon.</p>
          ) : (
            <div className="space-y-12 mt-12">
              {posts.map((post) => {
                const readingTime = getReadingTime(post.slug);
                return (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.slug}`} className="block no-underline">
                      <div className="flex items-center gap-3 mb-3">
                        <time className="text-white/30 text-sm font-mono">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                        <span className="text-white/15 text-xs">·</span>
                        <span className="text-white/40 text-xs font-mono bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5">
                          {readingTime} min read
                        </span>
                      </div>
                      <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-white group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-white/50 text-lg mt-2">{post.description}</p>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
