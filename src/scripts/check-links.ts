import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

interface LinkCheckResult {
  url: string;
  source: string;
  status: "ok" | "broken" | "error";
  statusCode?: number;
}

function extractUrls(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s"')>]+/g;
  return [...new Set(text.match(urlRegex) ?? [])];
}

async function checkUrl(url: string): Promise<number | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(timeout);
    return response.status;
  } catch {
    return null;
  }
}

export async function checkAllLinks(): Promise<LinkCheckResult[]> {
  const results: LinkCheckResult[] = [];
  const mdxFiles: string[] = [];

  function collectFiles(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        collectFiles(fullPath);
      } else if (entry.name.endsWith(".mdx")) {
        mdxFiles.push(fullPath);
      }
    }
  }

  collectFiles(CONTENT_DIR);

  for (const filePath of mdxFiles) {
    const content = fs.readFileSync(filePath, "utf-8");
    const urls = extractUrls(content);
    const relativePath = path.relative(CONTENT_DIR, filePath);

    for (const url of urls) {
      const statusCode = await checkUrl(url);
      results.push({
        url,
        source: relativePath,
        status: statusCode && statusCode < 400 ? "ok" : statusCode === null ? "error" : "broken",
        statusCode: statusCode ?? undefined,
      });
    }
  }

  return results;
}

checkAllLinks()
  .then((results) => {
    const broken = results.filter((r) => r.status !== "ok");
    console.log(`\nChecked ${results.length} links:`);
    console.log(`  OK: ${results.filter((r) => r.status === "ok").length}`);
    console.log(
      `  Broken: ${broken.filter((r) => r.status === "broken").length}`
    );
    console.log(
      `  Errors: ${broken.filter((r) => r.status === "error").length}`
    );

    for (const b of broken) {
      console.log(`  [${b.status}] ${b.url} (${b.source})`);
    }

    process.exit(broken.length > 0 ? 1 : 0);
  })
  .catch((err) => {
    console.error("Link check failed:", err);
    process.exit(1);
  });
