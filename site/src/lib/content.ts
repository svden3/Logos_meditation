import fs from "fs";
import path from "path";
import matter from "gray-matter";

const VAULT_ROOT = path.join(process.cwd(), "content");

const EXCLUDED_DIRS = new Set(["node_modules", ".git", ".next", ".DS_Store"]);

export type ContentNode = {
  name: string;
  slug: string[];
  path: string;
  isFile: boolean;
  children: ContentNode[];
};

function walk(dir: string, slug: string[]): ContentNode[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const nodes: ContentNode[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (EXCLUDED_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    const childSlug = [...slug, entry.name];

    if (entry.isDirectory()) {
      const children = walk(fullPath, childSlug);
      if (children.length > 0) {
        nodes.push({
          name: entry.name,
          slug: childSlug,
          path: fullPath,
          isFile: false,
          children,
        });
      }
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      // Keep the .md extension in the slug (not just the display name) so a
      // file can never collide with a same-named sibling directory's route.
      nodes.push({
        name: entry.name.replace(/\.md$/i, ""),
        slug: childSlug,
        path: fullPath,
        isFile: true,
        children: [],
      });
    }
  }

  nodes.sort((a, b) => {
    if (a.isFile !== b.isFile) return a.isFile ? 1 : -1;
    return a.name.localeCompare(b.name, undefined, { numeric: true });
  });

  return nodes;
}

export function getContentTree(): ContentNode[] {
  return walk(VAULT_ROOT, []);
}

function findNode(nodes: ContentNode[], slug: string[]): ContentNode | null {
  if (slug.length === 0) return null;
  const [head, ...rest] = slug;
  const match = nodes.find((n) => n.slug.at(-1) === head);
  if (!match) return null;
  if (rest.length === 0) return match;
  if (match.isFile) return null;
  return findNode(match.children, rest);
}

export function getNodeBySlug(slug: string[]): ContentNode | null {
  return findNode(getContentTree(), slug);
}

export function getAllFileSlugs(): string[][] {
  const slugs: string[][] = [];
  const collect = (nodes: ContentNode[]) => {
    for (const n of nodes) {
      if (n.isFile) slugs.push(n.slug);
      else collect(n.children);
    }
  };
  collect(getContentTree());
  return slugs;
}

export function readMarkdownFile(node: ContentNode): {
  content: string;
  data: Record<string, unknown>;
} {
  const raw = fs.readFileSync(node.path, "utf-8");
  const { content, data } = matter(raw);
  return { content, data };
}
