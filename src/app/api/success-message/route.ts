import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/server/queryService";

export async function POST(req: Request): Promise<Response> {
  try {
    const { successMessage, id } = await req.json();

    // const createSuccessMessage = `
    //   INSERT INTO "Profile" ("SuccessMessage", "id", "user_id")
    //   VALUES ($1, $2, $3) RETURNING *;
    // `;

    // const newProfile: profileType[] = await runQuery(createSuccessMessage, [
    //   successMessage,
    //   id,
    //   user_id,
    // ]);

    // const profileId = newProfile[0].id;

    const updateProfileQuery = `
      UPDATE "Profile" SET "successMessage" = $1 WHERE id = $2;
    `;
    await runQuery(updateProfileQuery, [successMessage, id]);

    return new NextResponse(
      JSON.stringify({
        message:
          "Амжилттай successMessage үүсгэж, хэрэглэгчийн мэдээллийг шинэчлэв!",
        profile_id: id,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Алдаа гарлаа:", error);
    return new NextResponse(
      JSON.stringify({ error: "Серверийн алдаа гарлаа!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
