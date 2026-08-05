import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Tree } from "@/components/Tree";
import { getContentTree } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Logos Meditation",
  description: "Bible study notes, reading notes, and sermons.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const tree = getContentTree();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <div className="mx-auto flex min-h-screen max-w-6xl">
          <aside className="sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto border-r border-neutral-200 p-4 md:block dark:border-neutral-800">
            <Link href="/" className="mb-4 block text-lg font-semibold">
              Logos Meditation
            </Link>
            <Tree nodes={tree} />
          </aside>
          <main className="min-w-0 flex-1 p-6 md:p-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
