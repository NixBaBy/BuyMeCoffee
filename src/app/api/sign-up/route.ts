import { signUp } from "../../../../back_end/service/userService/sign-upService";

export async function POST(req: Request) {
  const body = await req.json();
  return await signUp({
    email: body.email,
    password: body.password,
    username: body.username,
  });
}
