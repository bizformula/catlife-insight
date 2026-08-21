import Link from "next/link";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-14">
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] px-6 pb-10 pt-6 sm:px-10 sm:pb-12 sm:pt-8">
        <p className="mb-3 text-sm font-semibold text-[#2563EB]">
          캣라이프 인사이트
        </p>

        <h1 className="mb-5 text-3xl font-bold leading-tight sm:text-4xl">
          피하고 싶은 원료를 제외하고
          <br />
          우리 고양이에게 맞는 사료를 찾아보세요.
        </h1>

        <p className="mb-8 break-keep leading-7 text-[var(--muted-foreground)] md:whitespace-nowrap">
          제품에 표시된 원재료와 영양 정보를 확인하고,
          조건에 맞는 제품을 찾거나 여러 제품을 같은 항목으로
          비교할 수 있습니다.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/finder"
            className="rounded-lg bg-[#2563EB] px-6 py-3 font-semibold !text-white"
          >
            사료 찾기
          </Link>

          <Link
            href="/compare"
            className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-6 py-3 font-semibold !text-[var(--foreground)]"
          >
            제품 비교
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold">
          주요 기능
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/finder"
            className="rounded-xl border border-[var(--border)] p-6 !text-[var(--foreground)] hover:border-[#2563EB]"
          >
            <p className="mb-2 text-sm font-semibold text-[#2563EB]">
              조건 검색
            </p>

            <h3 className="mb-3 text-xl font-bold">
              사료 찾기
            </h3>

            <p className="text-sm leading-6">
              피하고 싶은 원료와 제품 조건을 적용하여 등록된
              제품을 찾아봅니다.
            </p>
          </Link>

          <Link
            href="/compare"
            className="rounded-xl border border-[var(--border)] p-6 !text-[var(--foreground)] hover:border-[#2563EB]"
          >
            <p className="mb-2 text-sm font-semibold text-[#2563EB]">
              항목별 확인
            </p>

            <h3 className="mb-3 text-xl font-bold">
              제품 비교
            </h3>

            <p className="text-sm leading-6">
              선택한 제품의 원재료, 표시 성분과 열량을 같은
              항목으로 비교합니다.
            </p>
          </Link>

          <Link
            href="/category/ingredients"
            className="rounded-xl border border-[var(--border)] p-6 !text-[var(--foreground)] hover:border-[#2563EB]"
          >
            <p className="mb-2 text-sm font-semibold text-[#2563EB]">
              원료 정보
            </p>

            <h3 className="mb-3 text-xl font-bold">
              원료 사전
            </h3>

            <p className="text-sm leading-6">
              사료에 표시되는 원료의 명칭과 원재료 목록에서
              확인할 점을 살펴봅니다.
            </p>
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="mb-2 text-2xl font-bold">
              최근 업데이트
            </h2>

            <p className="text-sm text-[var(--muted-foreground)]">
              새로 등록된 고양이 먹거리와 생활 정보입니다.
            </p>
          </div>

          <Link
            href="/blog"
            className="shrink-0 text-sm font-semibold text-[#2563EB]"
          >
            전체 글 보기 →
          </Link>
        </div>

        <div className="space-y-4">
          {latestPosts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
            />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--border)] p-6 sm:p-8">
        <p className="mb-2 text-sm font-semibold text-[#2563EB]">
          폴라의 경험에서 시작했습니다
        </p>

        <h2 className="mb-4 text-2xl font-bold">
          사료를 고르는 어려움을 줄이고 싶었습니다.
        </h2>

        <p className="break-keep leading-7 text-[var(--muted-foreground)]">
          알레르기 항목과 건강검진 결과를 함께 살펴보며 제품의
          원재료를 일일이 확인했던 경험을 바탕으로 만들고 있습니다.
        </p>
      </section>
    </div>
  );
}