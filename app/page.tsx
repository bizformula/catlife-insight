// Homepage showing latest markdown posts with 70/30 layout.
import PostCard from "@/components/blog/PostCard";
import Sidebar from "@/components/layout/Sidebar";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
      <section className="space-y-6 lg:col-span-7">
        <h1 className="text-3xl font-bold">최신 포스트</h1>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
      <div className="lg:col-span-3">
        <Sidebar />
      </div>
    </div>
  );
}
