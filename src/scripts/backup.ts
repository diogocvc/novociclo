import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT_DIR = process.cwd();
const BACKUP_DIR = path.join(ROOT_DIR, ".backups");

function getBackupPath(): string {
  const date = new Date().toISOString().split("T")[0];
  const timestamp = Date.now();
  const dirName = `content-backup-${date}-${timestamp}`;
  return path.join(BACKUP_DIR, dirName);
}

export function backupContent(targetDir?: string): string {
  const sourceDir = path.join(ROOT_DIR, "content");
  const destDir = targetDir ?? getBackupPath();

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  function copyRecursive(src: string, dest: string) {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  copyRecursive(sourceDir, destDir);
  console.log(`Backup created: ${destDir}`);
  return destDir;
}

export function listBackups(): string[] {
  if (!fs.existsSync(BACKUP_DIR)) return [];
  return fs
    .readdirSync(BACKUP_DIR)
    .filter((f) => f.startsWith("content-backup-"))
    .sort()
    .reverse();
}

export function restoreBackup(backupName: string): void {
  const backupPath = path.join(BACKUP_DIR, backupName);
  if (!fs.existsSync(backupPath)) {
    throw new Error(`Backup not found: ${backupName}`);
  }

  const contentDir = path.join(ROOT_DIR, "content");

  if (fs.existsSync(contentDir)) {
    const tempDir = path.join(ROOT_DIR, ".content-temp");
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
    fs.renameSync(contentDir, tempDir);
  }

  fs.cpSync(backupPath, contentDir, { recursive: true });
  console.log(`Restored from backup: ${backupName}`);
}

const command = process.argv[2];

switch (command) {
  case "create":
    backupContent();
    break;
  case "list":
    const backups = listBackups();
    if (backups.length === 0) {
      console.log("No backups found.");
    } else {
      console.log("Available backups:");
      backups.forEach((b) => console.log(`  ${b}`));
    }
    break;
  case "restore":
    const name = process.argv[3];
    if (!name) {
      console.error("Usage: npx tsx scripts/backup.ts restore <backup-name>");
      process.exit(1);
    }
    restoreBackup(name);
    break;
  default:
    console.log("Commands: create | list | restore <name>");
}
