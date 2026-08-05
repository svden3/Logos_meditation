import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getAllFileSlugs,
  getNodeBySlug,
  readMarkdownFile,
} from "@/lib/content";

export function generateStaticParams() {
  return getAllFileSlugs().map((slug) => ({ slug }));
}

export default async function NotePage(
  props: PageProps<"/[...slug]">
) {
  const { slug } = await props.params;
  const decodedSlug = slug.map((segment) => decodeURIComponent(segment));
  const node = getNodeBySlug(decodedSlug);

  if (!node || !node.isFile) {
    notFound();
  }

  const { content } = readMarkdownFile(node);

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>{node.name}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
