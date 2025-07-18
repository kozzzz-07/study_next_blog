import PublicHeader from "@/app/(blog)/_components/layouts/PublicHeader";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      {children}
    </>
  );
}
