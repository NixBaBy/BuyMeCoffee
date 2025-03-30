import { profile } from "../../../../back_end/service/profileService";
import { changeProfile } from "../../../../back_end/service/userService/change-profileService";

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
export async function PUT(req: Request) {
  const body = await req.json();
  return await changeProfile({
    name: body.name,
    about: body.about,
    URL: body.socialMediaURL,
    id: body.id,
  });
}
