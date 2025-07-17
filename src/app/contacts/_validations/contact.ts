import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(3, { error: "名前は3文字以上で入力して下さい" })
    .max(20, "名前は20文字以上で入力して下さい"),
  email: z
    .email("正しいメールアドレス形式で入力して下さい")
    .min(1, "メールアドレスは必須です"),
});

export type ContactType = z.infer<typeof ContactSchema>;

export type ContactErrorType = z.core.$ZodError<typeof ContactSchema>;
export type ContactErrorsType = {
  name?: { errors: string[] };
  email?: { errors: string[] };
};
