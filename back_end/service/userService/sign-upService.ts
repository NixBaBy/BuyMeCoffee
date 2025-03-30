import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function signUp({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
  if (!email) {
    return new Response(
      JSON.stringify({ message: "Email оруулна уу", error: true }),
      {
        status: 404,
      }
    );
  }
  if (!password) {
    return new Response(
      JSON.stringify({ message: "password оруулна уу", error: true }),
      {
        status: 404,
      }
    );
  }
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: password,
      username: username,
    },
  });
  console.log(newUser);
  return new Response(
    JSON.stringify({ message: "Амжилттай бүртгэгдлээ", newUser }),
    {
      status: 200,
    }
  );
}
