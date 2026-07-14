import fs from "fs";
import path from "path";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const CONTENT_DIR = path.join(process.cwd(), "content");

interface CreatePostOptions {
  date?: Date;
  titulo?: string;
  subtitulo?: string;
  resumo?: string;
  categorias?: string[];
  tags?: string[];
  referencias?: string[];
}

function getNextId(): string {
  const years = fs.readdirSync(CONTENT_DIR).filter((f) => /^\d{4}$/.test(f));
  let maxId = 0;
  for (const year of years) {
    const months = fs
      .readdirSync(path.join(CONTENT_DIR, year))
      .filter((f) => /^\d{2}$/.test(f));
    for (const month of months) {
      const files = fs
        .readdirSync(path.join(CONTENT_DIR, year, month))
        .filter((f) => f.endsWith(".mdx"));
      for (const file of files) {
        const num = parseInt(file.replace(".mdx", ""), 10);
        if (num > maxId) maxId = num;
      }
    }
  }
  return String(maxId + 1);
}

export function createPost(options: CreatePostOptions = {}): string {
  const date = options.date ?? new Date();
  const year = format(date, "yyyy");
  const month = format(date, "MM");
  const day = format(date, "dd");
  const dayDir = path.join(CONTENT_DIR, year, month);

  if (!fs.existsSync(dayDir)) {
    fs.mkdirSync(dayDir, { recursive: true });
  }

  const filePath = path.join(dayDir, `${day}.mdx`);

  if (fs.existsSync(filePath)) {
    throw new Error(`Post already exists: ${filePath}`);
  }

  const titulo = options.titulo ?? "Título do capítulo";
  const subtitulo = options.subtitulo ?? "";
  const resumo = options.resumo ?? "";
  const categorias = options.categorias ?? ["Seleção Brasileira"];
  const tags = options.tags ?? [];
  const referencias = options.referencias ?? [];
  const id = getNextId();
  const slug = `${year}/${month}/${day}`;
  const diaSemana = format(date, "EEEE", { locale: ptBR }).toUpperCase();
  const dataExtenso = format(date, "d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  const frontmatter = `---
id: "${id}"
data: "${year}-${month}-${day}"
slug: "${slug}"
titulo: "${titulo}"
${subtitulo ? `subtitulo: "${subtitulo}"` : ""}
resumo: "${resumo}"
categorias:
${categorias.map((c) => `  - "${c}"`).join("\n")}
tags:
${tags.map((t) => `  - "${t}"`).join("\n")}
referencias:
${referencias.map((r) => `  - "${r}"`).join("\n")}
noticia_destaque_id: ""
noticias_referencia_ids: []
tempo_de_leitura: 1
---

Conteúdo do capítulo referente a ${diaSemana}, ${dataExtenso}.
`;

  fs.writeFileSync(filePath, frontmatter, "utf-8");
  console.log(`Created: ${filePath}`);
  return filePath;
}

createPost({
  titulo: process.argv[2] || "Título do capítulo",
  subtitulo: process.argv[3] || "",
  resumo: process.argv[4] || "",
});
