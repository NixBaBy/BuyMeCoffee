import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function changePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email) {
    return new Response(
      JSON.stringify({ message: "Email оруулна уу", error: true }),
      {
        status: 400,
      }
    );
  }
  if (!password) {
    return new Response(
      JSON.stringify({ message: "Password оруулна уу", error: true }),
      {
        status: 400,
      }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { password: password },
    });

    return new Response(
      JSON.stringify({ message: "Нууц үг амжилттай солигдлоо", updatedUser }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Хэрэглэгч олдсонгүй эсвэл шинэчлэх боломжгүй",
        error: true,
      }),
      { status: 404 }
    );
  }
}
