import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function profile({
  avatarImage,
  name,
  about,
  socialMediaURL,
  userId,
}: {
  avatarImage: string;
  name: string;
  about: string;
  socialMediaURL: string;
  userId: number;
}) {
  const newProfile = await prisma.profile.create({
    data: {
      avatarImage: avatarImage,
      name: name,
      about: about,
      socialMediaURL: socialMediaURL,
      userId: userId,
    },
  });
  console.log(newProfile);
  return new Response(
    JSON.stringify({ message: "Амжилттай бүртгэгдлээ", newProfile }),
    {
      status: 200,
    }
  );
}
