"use server";

import { redirect } from "next/navigation";
import { ContactSchema } from "../_validations/contact";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";

type ActionState = {
  success: boolean;
  errors: {
    name?: string[];
    email?: string[];
  };
  serverError?: string;
};

export async function submitContactForm(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  // バリデーション
  const validationResult = ContactSchema.safeParse({ name, email });
  if (!validationResult.success) {
    const properties = z.treeifyError(validationResult.error).properties;
    console.log("サーバー側でエラー", properties);
    return {
      success: false,
      errors: {
        name: properties?.name?.errors,
        email: properties?.email?.errors,
      },
    };
  }

  // DB
  const existingRecord = await prisma.contact.findUnique({
    where: { email: email },
  });

  if (existingRecord) {
    return {
      success: false,
      errors: {
        name: [],
        email: ["このメールアドレスはすでに登録されています"],
      },
    };
  }

  await prisma.contact
    .create({
      data: { name, email },
    })
    .catch((error) => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          // ユニーク制約違反
          console.log("このメールアドレスはすでに登録されています");
        }
      }
    });

  console.log("送信されたデータ：", { name, email });
  redirect("/contacts/complete");
}
