import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/post";
import { getCategoryName } from "@/lib/site";

type PostCardProps = {
  post: Post;
};

export default function PostCard({
  post,
}: PostCardProps) {
  const thumbnail =
    post.thumbnail?.trim() || "/next.svg";

  return (
    <article className="overflow-hidden rounded-lg border border-[var(--border)]">
      <Link href={`/blog/${post.slug}`}>
        <div className="flex aspect-video w-full items-center justify-center bg-[#f8fafc] dark:bg-[#1f2937]">
          <Image
            src={thumbnail}
            alt={`${post.title} 대표 이미지`}
            width={1200}
            height={675}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>

      <div className="p-5">
        <p className="mb-2 text-sm text-gray-500">
          {post.date}
        </p>

        <h2 className="mb-2 text-2xl font-semibold">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="mb-2 text-base">
          {post.description}
        </p>

        <Link
          href={`/category/${encodeURIComponent(post.category)}`}
          className="text-sm text-[var(--point)]"
        >
          {getCategoryName(post.category)}
        </Link>
      </div>
    </article>
  );
}