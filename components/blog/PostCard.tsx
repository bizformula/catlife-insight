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
    <article className="flex min-h-32 overflow-hidden rounded-lg border border-[var(--border)] transition-colors hover:border-[#2563EB]">
      {/* PC와 태블릿에서만 표시되는 작은 썸네일 */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative hidden w-52 shrink-0 border-r border-[var(--border)] bg-[#f8fafc] sm:block dark:bg-[#1f2937]"
      >
        <Image
          src={thumbnail}
          alt={`${post.title} 대표 이미지`}
          fill
          sizes="208px"
          className="object-contain"
        />
      </Link>

      {/* 글 정보 */}
      <div className="min-w-0 flex-1 p-4">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="text-gray-500 dark:text-gray-400">
            {post.date}
          </span>

          <Link
            href={`/category/${encodeURIComponent(post.category)}`}
            className="text-[var(--point)]"
          >
            {getCategoryName(post.category)}
          </Link>
        </div>

        <h2 className="mb-2 line-clamp-2 text-lg font-semibold leading-6 sm:text-xl">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="line-clamp-2 text-sm leading-6 text-[var(--foreground)]">
          {post.description}
        </p>
      </div>
    </article>
  );
}