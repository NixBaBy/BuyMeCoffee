import {
  changeBankCard,
  createBankCard,
} from "../../../../back_end/service/bankCardService/bankCardService";

export async function POST(req: Request) {
  const body = await req.json();
  return await createBankCard({
    country: body.country,
    firstname: body.firstname,
    lastname: body.lastname,
    cardNumber: body.cardNumber,
    expiryDate: body.expiryDate,
    userId: body.userId,
    cvc: body.cvc,
  });
}

export async function PUT(req: Request) {
  const body = await req.json();
  return await changeBankCard({
    country: body.country,
    firstname: body.firstname,
    lastname: body.lastname,
    cardNumber: body.cardNumber,
    expiryDate: body.expiryDate,
    userId: body.userId,
    cvc: body.cvc,
  });
}
