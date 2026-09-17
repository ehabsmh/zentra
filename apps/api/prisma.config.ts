import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, env } from "prisma/config";

if (!process.env.DATABASE_URL) {
  const match = readFileSync(resolve(process.cwd(), ".env"), "utf8").match(
    /^DATABASE_URL=(.*)$/m,
  );

  if (match) {
    process.env.DATABASE_URL = match[1].trim().replace(/^["']|["']$/g, "");
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
