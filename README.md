## メモ
- /contacts
  - zod / prisma 素振り

## debug
1. `npx prisma migrate dev --name [name]`
2. `npx prisma db seed`
3. `npx auth secret`
   1. 初回のみ
4. `npm run dev`

## prisma
- マイグレーション（テーブル作成）
  - `npx prisma migrate dev --name [name]`
- シード実行（ダミーデータ投入）
  - `npx prisma db seed`
- データ確認
  - `npx prisma studio`
- DBリセット
  - `npx prisma migrate reset`
- 全マイグレーションファイル削除
  - `rm -rf prisma/migrations`
- db削除
  - `rm prisma/dev.db`


## docs
- https://nextjs.org/learn/dashboard-app/adding-authentication
- 