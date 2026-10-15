import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const rootDirectory = process.cwd();
const postsDirectory = path.join(rootDirectory, "content", "posts");
const outputDirectory = path.join(rootDirectory, "generated");
const outputFile = path.join(outputDirectory, "posts.json");

// Keep these transformations aligned with lib/markdown.ts.
function slugify(value) {
  return value.toLowerCase().trim().replace(/[^\w\uac00-\ud7a3\s-]/g, "").replace(/\s+/g, "-");
}
function extractToc(markdown) {
  const toc = [];
  for (const line of markdown.split("\n")) {
    const h2 = line.match(/^##\s+(.+)/);
    const h3 = line.match(/^###\s+(.+)/);
    if (h2) toc.push({ id: slugify(h2[1].trim()), text: h2[1].trim(), level: 2 });
    else if (h3) toc.push({ id: slugify(h3[1].trim()), text: h3[1].trim(), level: 3 });
  }
  return toc;
}
function splitForMiddleAd(markdown) {
  const lines = markdown.split("\n");
  const midpoint = Math.floor(lines.length / 2);
  let splitIndex = midpoint;
  for (let i = midpoint; i < lines.length; i += 1) {
    if (lines[i].startsWith("## ")) { splitIndex = i; break; }
  }
  return [lines.slice(0, splitIndex).join("\n"), lines.slice(splitIndex).join("\n")];
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function injectHeadingIds(html, toc) {
  let result = html;
  for (const item of toc) {
    const tag = item.level === 2 ? "h2" : "h3";
    result = result.replace(new RegExp(`<${tag}>${escapeRegExp(item.text)}<\\/${tag}>`), `<${tag} id="${item.id}">${item.text}</${tag}>`);
  }
  return result;
}
const processor = remark().use(remarkGfm).use(remarkHtml);
const fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md")).sort();

const posts = await Promise.all(fileNames.map(async (fileName) => {
  const slug = fileName.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(postsDirectory, fileName), "utf8"));
  const toc = extractToc(content);
  const [firstPart, secondPart] = splitForMiddleAd(content);
  const [firstHtml, secondHtml] = await Promise.all([
    processor.process(firstPart),
    processor.process(secondPart),
  ]);
  return {
    slug,
    content,
    readingTime: readingTime(content).text,
    title: data.title ?? "Untitled",
    date: data.date ?? "1970-01-01",
    updated: data.updated ?? data.date ?? "1970-01-01",
    category: data.category ?? "nutrition-guide",
    description: data.description ?? "",
    thumbnail: data.thumbnail?.trim() || "/next.svg",
    // Pre-render at build time to avoid expensive remark parsing inside Workers.
    rendered: {
      toc,
      firstHtml: injectHeadingIds(firstHtml.toString(), toc),
      secondHtml: injectHeadingIds(secondHtml.toString(), toc),
    },
  };
}));

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
console.log(`Generated ${posts.length} pre-rendered posts -> generated/posts.json`);
