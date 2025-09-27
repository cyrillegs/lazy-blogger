import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import PostForm from '@/components/PostForm';

const CreatePage = async () => {
  const { userId } = await auth();
  if ( !userId ) redirect("/sign-in");
  
  return (
    <main className='flex-1 flex flex-col justify-start items-center overflow-hidden bg-gray-100'>

    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/60 px-3 py-1 text-xs text-indigo-700 shadow-sm backdrop-blur">
          <span className='h-3 w-3 rounded-full bg-indigo-500' />
            <p className="text-xl">Create your post</p>
        </div>
        <p className="mt-2 text-sm text-zinc-600">
          Share your thoughts with an optional cover image. Make it shine ✨
        </p>
      </div>
      <div className="group relative rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-lg ring-1 ring-transparent transition-all hover:border-indigo-200 hover:ring-indigo-200/50 backdrop-blur-md">
        <PostForm />
      </div>
      <div className="mt-6 text-center text-sm">
        <Link href="/" className="text-indigo-600 underline-offset-4 hover:underline">
        ← Back to Home
        </Link>
      </div>
    </div>
    </main>
  );
};

export default CreatePage;