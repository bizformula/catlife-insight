import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const rootDirectory = process.cwd();

const postsDirectory = path.join(
  rootDirectory,
  "content",
  "posts",
);

const outputDirectory = path.join(
  rootDirectory,
  "generated",
);

const outputFile = path.join(
  outputDirectory,
  "posts.json",
);

const fileNames = fs
  .readdirSync(postsDirectory)
  .filter((fileName) => fileName.endsWith(".md"))
  .sort();

const posts = fileNames.map((fileName) => {
  const slug = fileName.replace(/\.md$/, "");

  const filePath = path.join(
    postsDirectory,
    fileName,
  );

  const rawFile = fs.readFileSync(
    filePath,
    "utf8",
  );

  const { data, content } = matter(rawFile);

  return {
    slug,
    content,
    readingTime: readingTime(content).text,
    title: data.title ?? "Untitled",
    date: data.date ?? "1970-01-01",
    category: data.category ?? "nutrition-guide",
    description: data.description ?? "",
    thumbnail:
      data.thumbnail?.trim() || "/next.svg",
  };
});

fs.mkdirSync(outputDirectory, {
  recursive: true,
});

fs.writeFileSync(
  outputFile,
  `${JSON.stringify(posts, null, 2)}\n`,
  "utf8",
);

console.log(
  `Generated ${posts.length} posts -> generated/posts.json`,
);