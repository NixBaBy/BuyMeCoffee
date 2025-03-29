import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { email: username },
  });

  if (!user) {
    return new Response(
      JSON.stringify({ message: "Email буруу байна", error: true }),
      {
        status: 404,
      }
    );
  }

  if (user.password !== password) {
    return new Response(
      JSON.stringify({ message: "Нууц үг буруу байна", error: true }),
      {
        status: 401,
      }
    );
  }

  return new Response(
    JSON.stringify({ message: "Амжилттай нэвтэрлээ", user }),
    {
      status: 200,
    }
  );
}
