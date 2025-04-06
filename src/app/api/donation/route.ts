import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/server/queryService";
import { donationType } from "../../../../utils/types";

export async function GET(): Promise<Response> {
  try {
    const getUserQuery = `
    SELECT * 
    FROM 
      "Donation"
    INNER JOIN 
      "Profile" ON "Donation"."donorId" = "Profile"."id";
  `;

    const donation = await runQuery(getUserQuery);

    return new NextResponse(JSON.stringify({ donation }), {
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
    const {
      amount,
      specialMessage,
      specialURLOrBuyMeCoffee,
      donorId,
      recipientId,
    } = await req.json();

    const createDonation = `INSERT INTO "Donation" ("amount", "specialMessage", "specialURLOrBuyMeCoffee", "donorId", "recipientId") 
                              VALUES($1,$2,$3,$4,$5) RETURNING *;`;

    const newDonation: donationType[] = await runQuery(createDonation, [
      amount,
      specialMessage,
      specialURLOrBuyMeCoffee,
      donorId,
      recipientId,
    ]);

    let DonationId = newDonation[0].id;

    const updateDonationQuery = `
  UPDATE "user"
  SET donation = 
    CASE
      WHEN donation IS NULL THEN ARRAY[$1]::integer[]
      ELSE array_append(donation, $1::integer)
    END
  WHERE profile = $2;
`;

    const result = await runQuery(updateDonationQuery, [
      DonationId,
      recipientId,
    ]);

    return new NextResponse(
      JSON.stringify({
        message: "Амжилттай илгээлээ!",
        Donation: newDonation,
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
