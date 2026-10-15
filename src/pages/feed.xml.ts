import { getCollection } from 'astro:content';

const siteUrl = 'https://syncdoth.github.io';
const escapeXml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

export async function GET() {
  const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const items = posts.map((post) => {
    const url = `${siteUrl}/blog/${post.data.pubDate.getFullYear()}/${post.id}/`;
    return `
      <item>
        <title>${escapeXml(post.data.title)}</title>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <description>${escapeXml(post.data.description)}</description>
        <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Sync.Rev · Sehyun Choi</title>
    <link>${siteUrl}/blog/</link>
    <description>Notes and essays by Sehyun Choi.</description>
    <language>en</language>${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
