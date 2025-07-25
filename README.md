## メモ
- /contacts
  - zod / prisma 素振り

## debug
1. `npx prisma migrate dev --name [name] --schema prisma/dev/schema.prisma`
2. `npx prisma db seed`
3. `npx auth secret`
   1. 初回のみ
4. `npm run dev`

## server
- supabaseのセットアップ後
1. `npx prisma migrate dev --name init --schema prisma/prod/schema.prisma`
2. `npx prisma db seed`
3. 必要に応じてクライアント再生成
   1. `npx prisma generate --schema prisma/prod/schema.prisma`

- storageを利用する場合
1. NEXT_PUBLIC_USE_SUPABASE_STORAGEをtureにする
2. SUPABASE_DOMEINを設定する
3. supabase側のストレージの設定をする

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
- https://github.com/prisma/prisma/discussions/22820
