import type { Chapter } from "@/types";

export interface AgentInput {
  date: Date;
  [key: string]: unknown;
}

export interface AgentOutput {
  success: boolean;
  error?: string;
  data?: unknown;
  [key: string]: unknown;
}

export abstract class BaseAgent {
  readonly name: string;
  readonly version: string;

  constructor(name: string, version = "1.0.0") {
    this.name = name;
    this.version = version;
  }

  abstract execute(input: AgentInput): Promise<AgentOutput>;

  protected log(message: string, level: "info" | "warn" | "error" = "info") {
    const prefix = `[${this.name}]`;
    const timestamp = new Date().toISOString();

    switch (level) {
      case "error":
        console.error(`${timestamp} ${prefix} ERROR: ${message}`);
        break;
      case "warn":
        console.warn(`${timestamp} ${prefix} WARN: ${message}`);
        break;
      default:
        console.log(`${timestamp} ${prefix} ${message}`);
    }
  }
}
