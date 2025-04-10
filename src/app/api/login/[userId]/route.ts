import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "../../../../../utils/server/queryService";
import { profileType, userType } from "../../../../../utils/types";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Missing user ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const getUserQuery = `SELECT * FROM "public"."user" WHERE id = $1;`;
    const users: userType[] = await runQuery(getUserQuery, [userId]);

    if (!users || users.length === 0) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    let userWithProfile = users[0];

    if (userWithProfile.profile) {
      const getProfileQuery = `SELECT * FROM "Profile" WHERE id = $1`;
      const profile: profileType[] = await runQuery(getProfileQuery, [
        userWithProfile.profile,
      ]);
      userWithProfile = { ...userWithProfile, profile: profile[0] };
    }

    return new NextResponse(JSON.stringify({ user: userWithProfile }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
