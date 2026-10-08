import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://catlife.happy-insight.com";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getStringField(
  post: unknown,
  key: string,
  fallback = "",
) {
  if (
    typeof post === "object" &&
    post !== null &&
    key in post
  ) {
    const value = (post as Record<string, unknown>)[key];

    if (typeof value === "string") {
      return value;
    }
  }

  return fallback;
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .slice(0, 30)
    .map((post) => {
      const slug = getStringField(post, "slug");
      const title = getStringField(
        post,
        "title",
        "Catlife Insight",
      );
      const description =
        getStringField(post, "description") ||
        getStringField(post, "excerpt") ||
        "고양이의 먹거리와 건강, 생활에 관한 정보를 정리합니다.";
      const date = getStringField(post, "date");

      const url = `${SITE_URL}/blog/${slug}`;

      const pubDate = date
        ? new Date(date).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${escapeXml(pubDate)}</pubDate>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Catlife Insight</title>
    <link>${SITE_URL}</link>
    <description>고양이의 먹거리와 건강, 생활에 관한 정보를 정리합니다.</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
