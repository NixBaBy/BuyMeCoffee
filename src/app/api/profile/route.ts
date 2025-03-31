import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/server/queryService";
export async function POST(req: Request): Promise<Response> {
  try {
    const { name, about, avatarImage, socialMediaURL } = await req.json();

    const createProfilequery = `INSERT INTO "Profile" ("name", "about", "avatarImage", "socialMediaURL") VALUES ($1, $2, $3, $4) RETURNING *;`;

    const newProfile = await runQuery(createProfilequery, [
      name,
      about,
      avatarImage,
      socialMediaURL,
    ]);
    return new NextResponse(
      JSON.stringify({ message: "Amjilttai profile uuslee", newProfile }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "server алдаа гарлаа" }), {
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
    return new NextResponse(JSON.stringify({ error: "server aldaa garlaa" }), {
      status: 500,
    });
  }
}
