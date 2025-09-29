import React from "react";
import { getAllPosts } from "@/lib/actions/post.actions";
import Link from "next/link";

// Force Next.js to treat this page as dynamic
export const dynamic = "force-dynamic";

interface Post {
  id: string;
  title: string;
  body?: string;
  image?: string;
  subject?: string;
}

const Page = async () => {
  const posts: Post[] = await getAllPosts({ limit: 50, page: 1 });

  return (
    <main className="w-full min-h-screen bg-gray-100">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14 py-10">
        <div className="mb-8 text-center">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-600/90 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-indigo-600 transition-colors cursor-pointer"
          >
            Create a blog
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent">
              Discover fresh ideas
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Curated posts from the community. Click in to read more.
          </p>
        </div>

        {!posts?.length ? (
          <p className="text-sm text-gray-500">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`} className="block">
                <article className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  {post.image && post.image.trim() !== "" ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={post.image}
                        alt="post image"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}

                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-700">
                        {post.subject || "general"}
                      </span>
                    </div>

                    <h2 className="line-clamp-2 text-lg font-medium tracking-tight">
                      {post.title}
                    </h2>
                    {post.body ? (
                      <p className="mt-2 h-16 line-clamp-3 text-sm text-gray-600">
                        {post.body}
                      </p>
                    ) : null}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Page;
