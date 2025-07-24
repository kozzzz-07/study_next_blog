"use server";

import { auth } from "@/auth";
import { saveImage } from "../_utils/image";
import { PostSchema } from "../_valiidations/post";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function createPost(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  // フォームの情報取得
  const title = (formData.get("title") as string) ?? "";
  const content = (formData.get("content") as string) ?? "";
  const topImageInput = formData.get("topImage");
  const topImage = topImageInput instanceof File ? topImageInput : null;

  // バリデーション
  const validationResult = PostSchema.safeParse({ title, content, topImage });
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 画像保存
  const imageUrl = topImage ? await saveImage(topImage) : null;
  if (topImage && !imageUrl) {
    return { success: false, errors: { image: ["画像の保存に失敗しました"] } };
  }

  // DB保存
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }
  await prisma.post.create({
    data: {
      title,
      content,
      topImage: imageUrl,
      published: true,
      authorId: userId,
    },
  });

  redirect("/dashboard");
}
