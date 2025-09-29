import { getPost } from "@/lib/actions/post.actions";
// import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}
const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    redirect("/");
  }

  return (
    <main className="w-full min-h-screen px-4 pt-8 pb-20">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6 text-sm">
          <Link
            href="/"
            className="text-indigo-600 underline-offset-4 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="mb-6 text-center">
          {post.subject ? (
            <span className="mb-3 inline-block rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[12px] font-medium text-indigo-700">
              {post.subject}
            </span>
          ) : null}
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            {post.title}
          </h1>
        </div>

        {typeof post?.image === "string" && post.image.trim() !== "" ? (
          <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={post.image}
                alt={"post image"}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : null}

        {post.body ? (
          <article className="prose prose-zinc max-w-none leading-7">
            <p className="whitespace-pre-wrap">{post.body}</p>
          </article>
        ) : (
          <p className="text-sm text-gray-500">No content.</p>
        )}
      </div>
    </main>
  );
};

export default Page;