import { profile } from "../../../../back_end/service/profileService";

export async function POST(req: Request) {
  const body = await req.json();
  return await profile({
    avatarImage: body.avatarImage,
    name: body.name,
    about: body.about,
    socialMediaURL: body.socialMediaURL,
    userId: body.userId,
  });
}
