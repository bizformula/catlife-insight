// Markdown conversion, TOC extraction, and heading-id alignment.
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import type { TocItem } from "@/types/post";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w가-힣\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const toc: TocItem[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)/);
    const h3Match = line.match(/^###\s+(.+)/);

    if (h2Match) {
      const text = h2Match[1].trim();
      toc.push({ id: slugify(text), text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].trim();
      toc.push({ id: slugify(text), text, level: 3 });
    }
  }

  return toc;
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return processed.toString();
}

export function injectHeadingIds(html: string, toc: TocItem[]): string {
  let transformed = html;
  for (const item of toc) {
    const tag = item.level === 2 ? "h2" : "h3";
    const pattern = new RegExp(`<${tag}>${escapeRegExp(item.text)}<\\/${tag}>`);
    transformed = transformed.replace(pattern, `<${tag} id="${item.id}">${item.text}</${tag}>`);
  }
  return transformed;
}

export function splitForMiddleAd(markdown: string): [string, string] {
  const lines = markdown.split("\n");
  const midpoint = Math.floor(lines.length / 2);
  let splitIndex = midpoint;

  for (let i = midpoint; i < lines.length; i += 1) {
    if (lines[i].startsWith("## ")) {
      splitIndex = i;
      break;
    }
  }

  return [lines.slice(0, splitIndex).join("\n"), lines.slice(splitIndex).join("\n")];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
