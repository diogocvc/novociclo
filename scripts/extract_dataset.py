#!/usr/bin/env python3
"""
Novo Ciclo — Extração de dataset histórico a partir do conteúdo MDX.

Gera data/dataset.json, data/daily_posts.csv e data/reference_news.csv a partir
de content/2026/*.mdx (período histórico: 05/07/2026 em diante).

O script é idempotente: cada execução sobrescreve os arquivos de dados.
Não altera nenhum arquivo em content/ e não faz nenhuma classificação
semântica ou interpretação editorial.

Classificação de período (apenas adiciona o campo `period`, sem alterar dados):
  ANC = 05/07/2026 até 10/07/2026
  DNC = 11/07/2026 em diante
"""

from __future__ import annotations

import csv
import datetime as dt
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Any

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = PROJECT_ROOT / "content"
DATA_DIR = PROJECT_ROOT / "data"
DATA_YEAR = "2026"

ANC_START = dt.date(2026, 7, 5)
ANC_END = dt.date(2026, 7, 10)
DNC_START = dt.date(2026, 7, 11)

FRONTMATTER_RE = re.compile(r"^---\r?\n(?P<fm>.*?)\r?\n---\r?\n?", re.DOTALL)

NODE_BRIDGE = r"""
const fs = require('fs');
const yaml = require('js-yaml');

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (c) => { raw += c; });
process.stdin.on('end', () => {
  const payload = JSON.parse(raw);
  const results = payload.map((item) => {
    try {
      const data = yaml.load(item.frontmatter, { schema: yaml.JSON_SCHEMA });
      return { ok: true, data: data };
    } catch (e) {
      return { ok: false, error: String((e && e.message) || e) };
    }
  });
  process.stdout.write(JSON.stringify(results));
});
"""


def collect_mdx_files() -> list[Path]:
    """Retorna todos os .mdx em content/, ordenados, limitado ao ano-alvo."""
    if not CONTENT_DIR.exists():
        return []
    files = []
    for dirpath, _dirnames, filenames in os.walk(CONTENT_DIR):
        for name in sorted(filenames):
            p = Path(dirpath) / name
            if p.suffix == ".mdx" and p.relative_to(CONTENT_DIR).parts[0] == DATA_YEAR:
                files.append(p)
    return sorted(files)


def split_frontmatter(raw: str) -> tuple[dict[str, str], str] | None:
    """Retorna (frontmatter_text, body) ou None se o frontmatter estiver ausente."""
    m = FRONTMATTER_RE.match(raw)
    if not m:
        return None
    fm_text = m.group("fm")
    body = raw[m.end():].strip()
    return fm_text, body


def parse_frontmatter_batch(entries: list[tuple[str, str]]) -> list[dict[str, Any]]:
    """Parseia frontmatter YAML via node + js-yaml (dependência do projeto).

    Retorna lista com { ok, data|error } na mesma ordem dos entries.
    """
    payload = [{"frontmatter": fm} for _path, fm in entries]
    try:
        proc = subprocess.run(
            ["node", "-e", NODE_BRIDGE],
            input=json.dumps(payload),
            capture_output=True,
            text=True,
            check=True,
            cwd=str(PROJECT_ROOT),
        )
    except (subprocess.CalledProcessError, FileNotFoundError) as exc:
        return [{"ok": False, "error": f"node/js-yaml indisponível: {exc}"}] * len(entries)

    try:
        results = json.loads(proc.stdout)
    except json.JSONDecodeError as exc:
        stderr = proc.stderr.strip()[:500]
        return [{"ok": False, "error": f"saída do node inválida: {exc} | {stderr}"}] * len(entries)

    if len(results) != len(entries):
        results = results[: len(entries)]
        results += [{"ok": False, "error": "node retornou menos itens que o esperado"}] * (
            len(entries) - len(results)
        )
    return results


def derive_date_from_path(path: Path) -> dt.date | None:
    parts = path.relative_to(CONTENT_DIR).parts
    if len(parts) == 3:
        try:
            return dt.date(int(parts[0]), int(parts[1]), int(parts[2][:2]))
        except ValueError:
            return None
    return None


def parse_post_date(data_field: Any, path: Path) -> dt.date | None:
    if isinstance(data_field, str):
        m = re.match(r"^(\d{4})-(\d{2})-(\d{2})", data_field.strip())
        if m:
            try:
                return dt.date(int(m.group(1)), int(m.group(2)), int(m.group(3)))
            except ValueError:
                pass
    return derive_date_from_path(path)


def classify_period(post_date: dt.date | None) -> str:
    if post_date is None:
        return "INDEFINIDO"
    if ANC_START <= post_date <= ANC_END:
        return "ANC"
    if post_date >= DNC_START:
        return "DNC"
    return "INDEFINIDO"


def is_map(value: Any) -> bool:
    return isinstance(value, dict)


def is_list(value: Any) -> bool:
    return isinstance(value, list)


def ensure_lists(value: Any) -> list[dict[str, Any]]:
    if is_list(value):
        return [v for v in value if is_map(v)]
    return []


def collect_news(post_fm: dict[str, Any]) -> list[tuple[str, dict[str, Any]]]:
    """Retorna [(role, news_dict), ...] com role em 'destaque' | 'referencia'."""
    items: list[tuple[str, dict[str, Any]]] = []
    if is_map(post_fm.get("noticia_destaque")):
        items.append(("destaque", post_fm["noticia_destaque"]))
    for news in ensure_lists(post_fm.get("noticias_referencia")):
        items.append(("referencia", news))
    return items


def main() -> None:
    mdx_files = collect_mdx_files()

    posts: list[dict[str, Any]] = []
    news_rows: list[dict[str, Any]] = []
    errors: list[dict[str, str]] = []
    files_not_processed: list[dict[str, str]] = []

    entries: list[tuple[str, str]] = []
    for path in mdx_files:
        raw = path.read_text(encoding="utf-8")
        parsed = split_frontmatter(raw)
        if parsed is None:
            files_not_processed.append({"file": str(path), "reason": "frontmatter ausente"})
            errors.append(
                {"file": str(path), "error": "frontmatter ausente ou mal formado"}
            )
            continue
        entries.append((str(path), parsed[0]))

    parse_results = (
        parse_frontmatter_batch(entries) if entries else []
    )

    entry_index = 0
    for path in mdx_files:
        raw = path.read_text(encoding="utf-8")
        split = split_frontmatter(raw)
        if split is None:
            continue
        _fm_text, body = split
        pm = parse_results[entry_index]
        entry_index += 1

        if not pm.get("ok"):
            files_not_processed.append(
                {"file": str(path), "reason": pm.get("error", "erro de parse")}
            )
            errors.append(
                {"file": str(path), "error": pm.get("error", "erro de parse")}
            )
            continue

        fm = pm["data"]
        if not is_map(fm):
            files_not_processed.append({"file": str(path), "reason": "frontmatter não é mapeamento"})
            errors.append({"file": str(path), "error": "frontmatter não é um mapeamento YAML"})
            continue

        post_date = parse_post_date(fm.get("data"), path)
        period = classify_period(post_date)

        post: dict[str, Any] = {
            "file": str(path.relative_to(CONTENT_DIR)),
            "date": post_date.isoformat() if post_date else None,
            "period": period,
            "frontmatter": fm,
            "body": body,
        }
        posts.append(post)

        for role, news in collect_news(fm):
            reference_index = 0
            if role == "referencia":
                refs = ensure_lists(fm.get("noticias_referencia"))
                for i, candidate in enumerate(refs):
                    if candidate is news:
                        reference_index = i + 1
                        break
            row: dict[str, Any] = {
                "file": str(path.relative_to(CONTENT_DIR)),
                "post_date": post["date"],
                "period": period,
                "role": role,
                "reference_index": reference_index,
            }
            for key, value in news.items():
                row[key] = value
            news_rows.append(row)

            if not news.get("id"):
                errors.append(
                    {"file": str(path), "error": f"notícia sem id ({role} índice {reference_index})"}
                )

    DATA_DIR.mkdir(parents=True, exist_ok=True)

    dataset_path = DATA_DIR / "dataset.json"
    daily_posts_path = DATA_DIR / "daily_posts.csv"
    reference_news_path = DATA_DIR / "reference_news.csv"

    json_text = json.dumps(posts, ensure_ascii=False, indent=2)
    dataset_path.write_text(json_text, encoding="utf-8")

    daily_fields = [
        "file",
        "date",
        "period",
        "id",
        "data",
        "slug",
        "titulo",
        "subtitulo",
        "resumo",
        "categorias",
        "tags",
        "tempo_de_leitura",
        "noticia_destaque",
        "noticias_referencia",
        "body",
    ]

    with daily_posts_path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=daily_fields)
        writer.writeheader()
        for post in posts:
            fm = post["frontmatter"]
            row = {field: fm.get(field, "") for field in [
                "id", "data", "slug", "titulo", "subtitulo", "resumo",
                "tempo_de_leitura",
            ]}
            row["file"] = post["file"]
            row["date"] = post["date"]
            row["period"] = post["period"]
            for list_field in ("categorias", "tags"):
                value = fm.get(list_field, [])
                row[list_field] = json.dumps(value, ensure_ascii=False) if is_list(value) else ""
            for json_field in ("noticia_destaque", "noticias_referencia"):
                value = fm.get(json_field)
                row[json_field] = json.dumps(value, ensure_ascii=False) if value is not None else ""
            row["body"] = post["body"]
            writer.writerow(row)

    news_fields = [
        "file",
        "post_date",
        "period",
        "role",
        "reference_index",
        "id",
        "titulo",
        "subtitulo",
        "resumo_original",
        "url",
        "thumbnail",
        "fonte",
        "data_publicacao",
        "idioma",
        "data_coleta",
    ]
    known_news_keys = set(news_fields) - {"file", "post_date", "period", "role", "reference_index"}
    extra_keys: list[str] = []
    for row in news_rows:
        for key in row:
            if key not in known_news_keys and key not in extra_keys:
                extra_keys.append(key)
    all_news_fields = news_fields + extra_keys

    with reference_news_path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=all_news_fields, extrasaction="ignore")
        writer.writeheader()
        for row in news_rows:
            row["id"] = row.get("id", "")
            row["data_publicacao"] = row.get("data_publicacao", "")
            row["data_coleta"] = row.get("data_coleta", "")
            writer.writerow(row)

    total_anc = sum(1 for p in posts if p["period"] == "ANC")
    total_dnc = sum(1 for p in posts if p["period"] == "DNC")
    total_indefinidos = sum(1 for p in posts if p["period"] == "INDEFINIDO")
    total_destaques = sum(1 for r in news_rows if r["role"] == "destaque")
    total_referencias = sum(1 for r in news_rows if r["role"] == "referencia")

    frontmatter_field_counts: dict[str, int] = {}
    for post in posts:
        for key in post["frontmatter"]:
            frontmatter_field_counts[key] = frontmatter_field_counts.get(key, 0) + 1

    news_field_counts: dict[str, int] = {}
    for row in news_rows:
        for key in row:
            news_field_counts[key] = news_field_counts.get(key, 0) + 1

    print("=" * 60)
    print("Novo Ciclo — Extrato do dataset histórico")
    print("=" * 60)
    print(f"Arquivos MDX encontrados:          {len(mdx_files)}")
    print(f"Posts extraídos:                   {len(posts)}")
    print(f"  ANC (05/07–10/07):               {total_anc}")
    print(f"  DNC (11/07 em diante):            {total_dnc}")
    print(f"  INDEFINIDO:                      {total_indefinidos}")
    print(f"Total de notícias de referência:   {total_destaques + total_referencias}")
    print(f"  noticia_destaque:                {total_destaques}")
    print(f"  noticias_referencia:             {total_referencias}")
    if files_not_processed:
        print(f"Arquivos NÃO processados:           {len(files_not_processed)}")
        for item in files_not_processed:
            print(f"  ✗ {item['file']} — {item['reason']}")
    else:
        print("Arquivos NÃO processados:           0")
    print("")
    print("Campos do frontmatter presentes (e em quantos posts):")
    for key, count in sorted(frontmatter_field_counts.items()):
        print(f"  {key}: {count}/{len(posts)}")
    print("")
    print("Campos de notícia presentes (e em quantas notícias):")
    for key, count in sorted(news_field_counts.items()):
        print(f"  {key}: {count}/{len(news_rows)}")
    print("")
    if errors:
        print("Erros / inconsistências encontrados:")
        for item in errors:
            print(f"  ✗ {item['file']} — {item['error']}")
        print(f"Total de erros: {len(errors)}")
    else:
        print("Erros / inconsistências: nenhum")
    print("")
    print("Saídas:")
    print(f"  {dataset_path}")
    print(f"  {daily_posts_path}")
    print(f"  {reference_news_path}")
    print("=" * 60)

    return 0 if not files_not_processed and not errors else 2


if __name__ == "__main__":
    sys.exit(main())