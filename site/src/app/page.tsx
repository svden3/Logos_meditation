import { getContentTree, type ContentNode } from "@/lib/content";

function countFiles(nodes: ContentNode[]): number {
  return nodes.reduce(
    (sum, n) => sum + (n.isFile ? 1 : countFiles(n.children)),
    0
  );
}

export default function Home() {
  const tree = getContentTree();
  const fileCount = countFiles(tree);

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Logos Meditation</h1>
      <p>
        A reader for {fileCount} markdown notes across bible study, reading
        notes, and sermons. Pick a note from the sidebar to get started.
      </p>
    </div>
  );
}
