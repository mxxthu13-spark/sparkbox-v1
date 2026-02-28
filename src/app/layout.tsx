import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SparkBox - 闪念盒子",
  description: "捕捉每一个闪念，记录美好想法",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
