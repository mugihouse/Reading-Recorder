import { PrismaClient } from "@prisma/client";

// global.prisma上にPrismaクライアントが存在すれば再利用
const prisma = global.prisma ?? new PrismaClient({ log: ["query"] });
// Production環境でない場合はglobal.prismaにオブジェクトを格納
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
