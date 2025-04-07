import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/server/queryService";
import { profileType } from "../../../../utils/types";

// export async function GET(req: Request): Promise<Response> {
//   try {
//     // const usersWithProfiles = await runQuery(query);

//     return new NextResponse(JSON.stringify(usersWithProfiles), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Failed to run query:", err);
//     return new NextResponse(JSON.stringify({ error: "server алдаа гарлаа!" }), {
//       status: 500,
//     });
//   }
// }

export async function POST(req: Request): Promise<Response> {
  try {
    const { name, about, avatarImage, socialMediaURL, user_id } =
      await req.json();

    if (!user_id) {
      return new NextResponse(
        JSON.stringify({ error: "User ID шаардлагатай!" }),
        { status: 400 }
      );
    }

    const createProfileQuery = `
      INSERT INTO "Profile" ("name", "about", "avatarImage", "socialMediaURL", "user_id") 
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    const newProfile: profileType[] = await runQuery(createProfileQuery, [
      name,
      about,
      avatarImage,
      socialMediaURL,
      user_id,
    ]);

    if (!newProfile || newProfile.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Profile үүсгэхэд алдаа гарлаа!" }),
        { status: 500 }
      );
    }

    const profileId = newProfile[0].id;

    const updateUserQuery = `
      UPDATE "user" SET profile = $1 WHERE id = $2;
    `;
    await runQuery(updateUserQuery, [profileId, user_id]);

    return new NextResponse(
      JSON.stringify({
        message: "Амжилттай profile үүсгэж, хэрэглэгчийн мэдээллийг шинэчлэв!",
        profile_id: profileId,
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Сервер алдаа гарлаа" }), {
      status: 500,
    });
  }
}

export async function PUT(req: Request): Promise<Response> {
  try {
    const { name, about, avatarImage, socialMediaURL, id } = await req.json();

    const changeProfile = `
    UPDATE "Profile" 
    SET "name" = $1, "about" = $2, "avatarImage" = $3, "socialMediaURL" = $4 
    WHERE "id" = $5 
    RETURNING *;
  `;

    const updatedProfile = await runQuery(changeProfile, [
      name,
      about,
      avatarImage,
      socialMediaURL,
      id,
    ]);
    if (updatedProfile.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "profile oldsongui" }),
        { status: 404 }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "amjilttai soligdloo", updatedProfile }),
      { status: 201 }
    );
  } catch (err) {
    return new NextResponse(JSON.stringify({ err: "server aldaa garlaa" }), {
      status: 500,
    });
  }
}
