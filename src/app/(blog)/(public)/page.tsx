import PostCard from "../_components/post/PostCard";
import { getPosts, searchPosts } from "../_prisma/post";

type SearchParams = {
  search?: string;
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = (await searchParams).search || "";

  const posts = query ? await searchPosts(query) : await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
