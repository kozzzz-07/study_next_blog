import { z } from "zod";
export const registerSchema = z
  .object({
    name: z.string().min(1, "名前は必須です"),
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? "メールアドレスは必須です"
            : "メールアドレスは必須です",
      })
      .min(8, "パスワードは最低8文字必要です"),
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "パスワードは必須です"
            : "パスワードは必須です",
      })
      .min(8, "パスワードは最低8文字必要です")
      .max(32, "パスワードは最大32文字以内にしてください"),
    confirmPassword: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "確認用パスワードは必須です"
          : "確認用パスワードは必須です",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"], // エラーを表示するフィールドを指定
  });
