// Category page listing posts filtered by dynamic category name.
import type { Metadata } from "next";
import PostCard from "@/components/blog/PostCard";
import Sidebar from "@/components/layout/Sidebar";
import { getCategories, getPostsByCategory } from "@/lib/posts";
import { getCategoryName } from "@/lib/site";

type CategoryPageProps = {
  params: Promise<{ name: string }>;
};

export async function generateStaticParams() {
  return getCategories().map((name) => ({ name: encodeURIComponent(name) }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { name } = await params;
  const decoded = decodeURIComponent(name);

  return {
    title: `카테고리: ${getCategoryName(decoded)}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  const posts = getPostsByCategory(decoded);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
      <section className="space-y-6 lg:col-span-7">
       <header className="mb-8">
  <h1 className="mb-3 text-3xl font-bold">
    {getCategoryName(decoded)}
  </h1>

  <p className="text-[var(--muted-foreground)]">
    {decoded === "ingredients"
      ? "사료와 간식에 표시되는 원료의 이름과 확인할 점을 정리합니다."
      : `${getCategoryName(decoded)}에 관한 글을 모아봅니다.`}
  </p>
</header> 
        {posts.length === 0 ? (
          <p>해당 카테고리의 글이 없습니다.</p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </section>
      <div className="lg:col-span-3">
        <Sidebar />
      </div>
    </div>
  );
}
