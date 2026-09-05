import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts, getMDXBySlug, getReadingTime } from "@/lib/posts";
import Giscus from "@/components/Giscus";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import BlogVideo from "@/components/BlogVideo";
import ScrollProgress from "@/components/ScrollProgress";
import ImagePlaceholder from "@/components/BlogImagePlaceholder";

const mdxComponents = {
  Video: BlogVideo,
  ImagePlaceholder,
};

const COMPARISON_POSTS = [
  { slug: "best-mac-window-managers", pitch: "See how Snapback compares to Rectangle, Magnet, and the rest" },
  { slug: "snapback-vs-rectangle", pitch: "Already using Rectangle? Here's exactly what's different" },
] as const;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts()
    .filter((p) => p.published)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const url = `https://snapbackapp.com/blog/${slug}/`;

  return {
    title: `${post.title} | Snapback`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : [],
      images: [
        {
          url: "/assets/og-image.webp",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/assets/og-image.webp"],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const source = getMDXBySlug(slug);
  const readingTime = getReadingTime(slug);
  const url = `https://snapbackapp.com/blog/${slug}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: ["https://snapbackapp.com/assets/og-image.webp"],
    datePublished: `${post.date}T00:00:00Z`,
    dateModified: `${post.date}T00:00:00Z`,
    author: {
      "@type": "Organization",
      name: post.author || "Snapback Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Snapback",
      logo: {
        "@type": "ImageObject",
        url: "https://snapbackapp.com/assets/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://snapbackapp.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://snapbackapp.com/blog/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  const publishedPosts = getAllPosts().filter((p) => p.published);
  const currentIndex = publishedPosts.findIndex((p) => p.slug === slug);
  const otherPosts = publishedPosts.filter((p) => p.slug !== slug);
  const relatedPosts = otherPosts.length <= 3
    ? otherPosts
    : Array.from({ length: 3 }, (_, i) => otherPosts[(currentIndex + i) % otherPosts.length]);

  const comparisonLinks = COMPARISON_POSTS
    .filter((c) => c.slug !== slug)
    .map((c) => ({ ...c, post: publishedPosts.find((p) => p.slug === c.slug) }))
    .filter((c): c is typeof c & { post: NonNullable<typeof c.post> } => Boolean(c.post));

  const videoRefs = [...source.matchAll(/src="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((src) => src.endsWith(".mp4") || src.endsWith(".webm"));

  const uniqueVideoSrcs = [...new Set(videoRefs)];

  const videoSchemas = uniqueVideoSrcs.map((src) => {
    const posterSrc = src.replace(/\.(mp4|webm)$/, "-poster.webp");
    return {
      "@type": "VideoObject",
      "name": post.title,
      "description": post.description,
      "thumbnailUrl": `https://snapbackapp.com${posterSrc}`,
      "uploadDate": `${post.date}T00:00:00Z`,
      "contentUrl": `https://snapbackapp.com${src}`,
      "embedUrl": `https://snapbackapp.com${src}`,
      "publisher": {
        "@type": "Organization",
        "name": "Snapback",
        "logo": {
          "@type": "ImageObject",
          "url": "https://snapbackapp.com/assets/logo.svg",
        },
      },
    };
  });

  return (
    <>
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {videoSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": videoSchemas,
            }),
          }}
        />
      )}

      <article className="min-h-screen pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog/" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/60 truncate">{post.title}</span>
          </nav>

          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:tracking-tight
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:text-white/90 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-bg-surface prose-pre:border prose-pre:border-white/10
            prose-img:rounded-xl prose-img:border prose-img:border-white/10
            prose-table:border-collapse prose-table:w-full
            prose-th:border prose-th:border-white/10 prose-th:p-3 prose-th:bg-white/5
            prose-td:border prose-td:border-white/10 prose-td:p-3
            prose-hr:border-white/10
            prose-blockquote:border-l-primary prose-blockquote:text-white/60
            prose-strong:text-white
            prose-li:text-white/80
          ">
            <div className="flex items-center gap-3 mb-8 not-prose">
              <time className="text-white/40 text-xs font-mono">
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

            <h1>{post.title}</h1>

            <p className="text-white/50">{post.description}</p>

            <MDXRemote source={source} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>

          {comparisonLinks.length > 0 && (
            <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <h2 className="font-display text-lg tracking-tight mb-4">Still deciding on a window manager?</h2>
              <div className="space-y-3">
                {comparisonLinks.map(({ post, pitch }) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}/`}
                    className="block group"
                  >
                    <span className="text-primary text-sm font-medium group-hover:underline">
                      {post.title}
                    </span>
                    <p className="text-white/50 text-sm mt-0.5">{pitch}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedPosts.length > 0 && (
            <div className="divider mt-16 pt-12">
              <h2 className="font-display text-xl tracking-tight mb-6">More posts</h2>
              <div className="space-y-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}/`}
                    className="block group"
                  >
                    <h3 className="font-display text-lg tracking-tight group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-white/50 text-sm mt-1">{related.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="divider mt-16 pt-12">
            <h2 className="font-display text-xl tracking-tight mb-6">Comments</h2>
            <Giscus />
          </div>
        </div>
      </article>
    </>
  );
}
