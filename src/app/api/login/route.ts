import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/server/queryService";
import { BankCardType, profileType, userType } from "../../../../utils/types";
import bcrypt from "bcrypt";

export async function GET(): Promise<Response> {
  try {
    const getUserQuery = `
      SELECT * FROM "public"."user" AS u
      INNER JOIN "Profile" ON u.profile = "Profile".id;
    `;

    const users: userType[] = await runQuery(getUserQuery);

    if (!users || users.length === 0) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        if (user.profile) {
          const profileQuery = `SELECT * FROM "Profile" WHERE id = $1`;
          const profile: profileType[] = await runQuery(profileQuery, [
            user.profile,
          ]);
          user.profile = profile[0];
        }

        if (user.BankCard) {
          const bankCardQuery = `SELECT * FROM "BankCard" WHERE id = $1`;
          const bankCard: BankCardType[] = await runQuery(bankCardQuery, [
            user.BankCard,
          ]);
          user.BankCard = bankCard[0];
        }

        return user;
      })
    );
    return new NextResponse(JSON.stringify({ users: updatedUsers }), {
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

export async function POST(req: Request): Promise<Response> {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ error: "Email эсвэл Password оруулна уу!" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const getUserQuery = `SELECT * FROM "user" WHERE email = $1;`;
    const users: userType[] = await runQuery(getUserQuery, [email]);

    if (!users || users.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Хэрэглэгч олдсонгүй!" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    let userData = users[0];

    if (userData.profile) {
      const getProfileQuery = `SELECT * FROM "Profile" WHERE id = $1`;
      const profile: profileType[] = await runQuery(getProfileQuery, [
        userData.profile,
      ]);
      userData = { ...userData, profile: profile[0] };
    }

    if (userData.BankCard) {
      const getBankCardQuery = `SELECT * FROM "BankCard" WHERE id = $1`;
      const BankCard: BankCardType[] = await runQuery(getBankCardQuery, [
        userData.BankCard,
      ]);
      userData = { ...userData, BankCard: BankCard[0] };
    }
    console.log("bankcaaaaaaaaaaaaaaard", userData.BankCard);

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return new NextResponse(JSON.stringify({ error: "Нууц үг буруу!" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(
      JSON.stringify({
        message: "Амжилттай нэвтэрлээ!",
        user: userData,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "server алдаа гарлаа!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
