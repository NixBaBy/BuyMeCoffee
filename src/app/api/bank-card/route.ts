import { bankCard } from "../../../../back_end/service/bankCardService";

export async function POST(req: Request) {
  const body = await req.json();
  return await bankCard({
    country: body.country,
    firstname: body.firstname,
    lastname: body.lastname,
    cardNumber: body.cardNumber,
    expiryDate: body.expiryDate,
    userId: body.userId,
    cvc: body.cvc,
  });
}
