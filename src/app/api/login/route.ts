import { changePassword } from "../../../../back_end/service/userService/change-passwordService";
import { checkUser } from "../../../../back_end/service/userService/signInService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      sentdonations: true,
      receivedDonations: true,
      profile: true,
      bankcard: true,
    },
  });
  return users;
}

export async function GET() {
  const users = await getUsers();
  return new Response(JSON.stringify({ data: users }), { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  return await checkUser({
    username: body.email,
    password: body.password,
  });
}

export async function PUT(req: Request) {
  const body = await req.json();
  return await changePassword({
    email: body.email,
    password: body.password,
  });
}
