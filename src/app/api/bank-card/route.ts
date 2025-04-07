import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/server/queryService";
import { BankCardType } from "../../../../utils/types";

export async function POST(req: Request): Promise<Response> {
  try {
    const {
      country,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      cvc,
      user_id,
    } = await req.json();

    const createBankCard = `INSERT INTO "BankCard" ("country","firstName", "lastName", "cardNumber", "expiryDate", "cvc","user_id") VALUES ($1, $2, $3, $4 , $5,$6,$7) RETURNING *;`;
    const newBankCard: BankCardType[] = await runQuery(createBankCard, [
      country,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      cvc,
      user_id,
    ]);

    if (!newBankCard || newBankCard.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "BankCard үүсгэхэд алдаа гарлаа!" }),
        { status: 500 }
      );
    }

    if (!user_id || isNaN(user_id)) {
      return new NextResponse(
        JSON.stringify({
          error: "user_id baihgui baina",
        }),
        { status: 400 }
      );
    }

    const bankCardId = newBankCard[0].id;
    const updateUserQuery = `
    UPDATE "user" SET "BankCard" = $1 WHERE id = $2;
  `;
    await runQuery(updateUserQuery, [bankCardId, user_id]);

    return new NextResponse(
      JSON.stringify({
        message: "amjilttai bankCard uuslee",
        newBankCard,
        bankCardId,
      }),
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
    return new NextResponse(JSON.stringify({ error: "server aldaa garlaa" }), {
      status: 500,
    });
  }
}
