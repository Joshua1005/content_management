import { PrismaClient } from "@prisma/client";
import "server-only";

const db = globalThis.prismaGlobal ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}

export { db };
