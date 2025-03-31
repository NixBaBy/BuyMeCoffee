import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/server/queryService";

export async function POST(req: Request): Promise<Response> {
  try {
    const { country, firstName, lastName, cardNumber, expiryDate } =
      await req.json();

    const createBankCard = `INSERT INTO "BankCard" ("country","firstName", "lastName", "cardNumber", "expiryDate") VALUES ($1, $2, $3, $4 , $5) RETURNING *;`;
    const newBankCard = await runQuery(createBankCard, [
      country,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
    ]);
    return new NextResponse(
      JSON.stringify({ messega: "amjilttai bankCard uuslee", newBankCard }),
      { status: 201 }
    );
  } catch (err) {
    console.log("failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "server алдаа гарлаа" }), {
      status: 500,
    });
  }
}

export async function PUT(req: Request): Promise<Response> {
  try {
    const { country, firstName, lastName, cardNumber, expiryDate, id } =
      await req.json();

    const changedBankCard = `
      UPDATE "BankCard"
      SET "country" = $1, "firstName" = $2, "lastName" = $3, "cardNumber" = $4, "expiryDate" = $5
      WHERE "id" = $6
      RETURNING *;
    `;

    const updatedBankCard = await runQuery(changedBankCard, [
      country,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      id,
    ]);

    if (updatedBankCard.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "bankcard oldsongui" }),
        { status: 404 }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "amjilttai bankcard soligdloo" }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "server aldaa garlaa" }),
      { status: 500 }
    );
  }
}
