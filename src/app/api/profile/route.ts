import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/server/queryService";

export async function GET(req: Request): Promise<Response> {
  try {
    const query = `
      SELECT 
        u.id AS user_id, 
        u.email, 
        jsonb_build_object(
          'id', p.id,
          'name', p."name",
          'about', p."about",
          'avatarImage', p."avatarImage",
          'socialMediaURL', p."socialMediaURL"
        ) AS profile
      FROM "user" u
      LEFT JOIN "Profile" p ON u.id = p."user_id";
    `;

    const usersWithProfiles = await runQuery(query);

    return new NextResponse(JSON.stringify(usersWithProfiles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "server алдаа гарлаа!" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { name, about, avatarImage, socialMediaURL, user_id } =
      await req.json();

    const createProfilequery = `INSERT INTO "Profile" ("name", "about", "avatarImage", "socialMediaURL" , "user_id") VALUES ($1, $2, $3, $4 , $5) RETURNING *;`;

    const newProfile = await runQuery(createProfilequery, [
      name,
      about,
      avatarImage,
      socialMediaURL,
      user_id,
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
