import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function changeProfile({
  name,
  about,
  URL,
  id,
}: {
  name: string;
  about: string;
  URL: string;
  id: number;
}) {
  try {
    const updatedProfile = await prisma.profile.update({
      where: { id: id },
      data: { name: name, about: about, socialMediaURL: URL },
    });

    return new Response(
      JSON.stringify({
        message: "Нууц үг амжилттай солигдлоо",
        updatedProfile,
      }),
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
