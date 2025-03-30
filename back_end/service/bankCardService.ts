import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function bankCard({
  country,
  firstname,
  lastname,
  cardNumber,
  expiryDate,
  userId,
  cvc,
}: {
  country: string;
  firstname: string;
  lastname: string;
  cardNumber: string;
  expiryDate: string;
  userId: number;
  cvc: string;
}) {
  console.log("Expiry date: ", expiryDate);
  const newBankCard = await prisma.bankcard.create({
    data: {
      country: country,
      firstname: firstname,
      lastname: lastname,
      cardNumber: cardNumber,
      expiryDate: new Date(expiryDate),
      userId: userId,
      cvc: cvc,
    },
  });
  console.log(newBankCard);
  return new Response(
    JSON.stringify({ message: "Амжилттай бүртгэгдлээ", newBankCard }),
    {
      status: 200,
    }
  );
}
