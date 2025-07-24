import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string()
    .min(3, { error: "タイトルは3文字以上で入力して下さい" })
    .max(255, "タイトルは255文字以上で入力して下さい"),
  content: z.string().min(10, { error: "内容は10文字以上で入力して下さい" }),
  topImage: z.instanceof(File).nullable().optional(),
});
