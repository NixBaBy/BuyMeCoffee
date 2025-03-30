import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers() {
  const users = await prisma.user.findMany(); // Бүх хэрэглэгчийг авах
  return users;
}
