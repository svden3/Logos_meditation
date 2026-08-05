import Link from "next/link";
import type { ContentNode } from "@/lib/content";

function nodeHref(slug: string[]) {
  return "/" + slug.map(encodeURIComponent).join("/");
}

function TreeNode({ node }: { node: ContentNode }) {
  if (node.isFile) {
    return (
      <li>
        <Link
          href={nodeHref(node.slug)}
          className="block truncate rounded px-2 py-1 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          {node.name}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <details className="group" open={node.slug.length <= 1}>
        <summary className="cursor-pointer list-none rounded px-2 py-1 text-sm font-medium text-neutral-900 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800">
          <span className="mr-1 inline-block transition-transform group-open:rotate-90">
            ▸
          </span>
          {node.name}
        </summary>
        <ul className="ml-3 border-l border-neutral-200 pl-2 dark:border-neutral-800">
          {node.children.map((child) => (
            <TreeNode key={child.path} node={child} />
          ))}
        </ul>
      </details>
    </li>
  );
}

export function Tree({ nodes }: { nodes: ContentNode[] }) {
  return (
    <ul className="space-y-0.5">
      {nodes.map((node) => (
        <TreeNode key={node.path} node={node} />
      ))}
    </ul>
  );
}
