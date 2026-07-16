import fs from "fs";
import path from "path";

interface Blocklist {
  urls: string[];
  keywords: string[];
}

const BLOCKLIST_PATH = path.join(process.cwd(), "src", "config", "news-blocklist.json");

function readBlocklist(): Blocklist {
  try {
    return JSON.parse(fs.readFileSync(BLOCKLIST_PATH, "utf-8")) as Blocklist;
  } catch {
    return { urls: [], keywords: [] };
  }
}

function writeBlocklist(data: Blocklist) {
  fs.writeFileSync(BLOCKLIST_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function printUsage() {
  console.log(`
Uso:
  npx tsx src/scripts/block-news.ts <url1> <url2> ...
  npx tsx src/scripts/block-news.ts --keyword <palavra> <url>

Exemplos:
  npx tsx src/scripts/block-news.ts https://ge.globo.com/futsal/...
  npx tsx src/scripts/block-news.ts --keyword botafogo
  npx tsx src/scripts/block-news.ts --keyword ferroviário https://ge.globo.com/ferroviario/...
`);
}

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help") {
  printUsage();
  process.exit(0);
}

const blocklist = readBlocklist();
let added = 0;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--keyword") {
    i++;
    if (i < args.length) {
      const kw = args[i].toLowerCase();
      if (!blocklist.keywords.includes(kw)) {
        blocklist.keywords.push(kw);
        console.log(`Palavra-chave bloqueada: "${kw}"`);
        added++;
      } else {
        console.log(`Palavra-chave já bloqueada: "${kw}"`);
      }
    }
  } else {
    const url = args[i];
    if (!blocklist.urls.includes(url)) {
      blocklist.urls.push(url);
      console.log(`URL bloqueada: ${url}`);
      added++;
    } else {
      console.log(`URL já bloqueada: ${url}`);
    }
  }
}

if (added > 0) {
  writeBlocklist(blocklist);
  console.log(`\n${added} item(ns) adicionado(s) ao blocklist.`);
} else {
  console.log("\nNenhum item novo para adicionar.");
}
