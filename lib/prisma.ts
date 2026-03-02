import { PrismaClient } from "@prisma/client";

// When using Prisma CLI / Migrate the connection URL is defined in
// `prisma.config.ts` (see `datasource.url`).
//
// In application code you should pass either `adapter` or `accelerateUrl` here
// depending on your setup. A simple example using an environment variable:
//
//   const prisma = new PrismaClient({
//     // direct database connection (PostgreSQL, MySQL, etc.)
//     adapter: process.env.DATABASE_URL,
//
//     // OR when using Prisma Accelerate:
//     // accelerateUrl: process.env.PRISMA_ACCELERATE_URL,
//   });
//
// The string form is allowed for simple setups; more complex adapters can be
// provided as objects. See https://pris.ly/d/prisma7-client-config

const prisma = new PrismaClient({
  adapter: process.env.DATABASE_URL,
});

export default prisma;
