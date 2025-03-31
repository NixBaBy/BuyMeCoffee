import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/server/queryService";

export async function PUT(req: Request): Promise<Response> {
  try {
    const { email, password } = await req.json();

    const changePassword = `
      UPDATE "user"
      SET "password" = $2
      WHERE "email" = $1
      RETURNING *;
    `;

    const updatedUser = await runQuery(changePassword, [email, password]);

    if (updatedUser.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Хэрэглэгч олдсонгүй" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Амжилттай password солигдлоо", updatedUser }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Server алдаа гарлаа" }), {
      status: 500,
    });
  }
}
