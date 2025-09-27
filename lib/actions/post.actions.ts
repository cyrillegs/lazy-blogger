"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const createPost = async (formData: {
  title: string;
  body: string;
  image: string;
  subject: string;
}) => {
  const { userId: author } = await auth();
  console.log("formData", formData);
  console.log({ ...formData, author });
  const supabase = createSupabaseClient();

  // 规范化：trim 文本；image 为空字符串时存为 null
  const normalized = {
    title: formData.title?.trim() ?? "",
    body: formData.body?.trim() ?? "",
    subject:
      typeof formData.subject === "string" && formData.subject.trim() === ""
        ? null
        : formData.subject,
    image:
      typeof formData.image === "string" && formData.image.trim() === ""
        ? null
        : formData.image,
  };

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...normalized, author })
    .select();

  // console.log("data1", data);

  if (error || !data)
    throw new Error(error?.message || "Failed to create a companion");

  return data[0];
};

export const getAllPosts = async ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("posts").select();

  // sort
  query = query.order("created_at", { ascending: false });

  // page and limit
  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: posts, error } = await query;

  if (error) throw new Error(error.message);

  return posts;
};

export const getPost = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("posts").select().eq("id", id);

  if (error) return console.log(error);

  return data[0];
};