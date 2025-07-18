import { PrismaClient } from "@/generated/prisma";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // クリーンアップ
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 12);

  // ダミー画像
  const dummyImages = [
    "https://picsum.photos/seed/post1/600/400",
    "https://picsum.photos/seed/post2/600/400",
  ];

  // ユーザー作成
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "test user",
      password: hashedPassword,
      posts: {
        create: [
          {
            title: "初めてのブログ投稿",
            content: "これは最初のブログ投稿です。",
            topImage: dummyImages[0],
          },
          {
            title: "2つ目のブログ投稿",
            content: "これは2つ目のブログ投稿です。",
            topImage: dummyImages[1],
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
