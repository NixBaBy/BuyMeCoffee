import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/server/queryService";

export async function POST(req: Request): Promise<Response> {
  try {
    const { username, email, password } = await req.json();

    const checkUserQuery = `SELECT * FROM "user" WHERE email = $1 OR username = $2;`;
    const existingUser = await runQuery(checkUserQuery, [email, username]);

    if (existingUser.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: "Таны оруулсан имэйл аль хэдийн бүртгэгдсэн байна.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserQuery = `
      INSERT INTO "user" (username, email, password)
      VALUES ($1, $2, $3) RETURNING *;
    `;

    const newUser = await runQuery(createUserQuery, [
      username,
      email,
      hashedPassword,
    ]);
    console.log(newUser);
    return new NextResponse(
      JSON.stringify({
        message: "Амжилттай хэрэглэгч нэмэгдлээ!",
        user: newUser,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Алдаа гарлаа:", err);
    return new NextResponse(
      JSON.stringify({ error: "Серверийн алдаа гарлаа!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
