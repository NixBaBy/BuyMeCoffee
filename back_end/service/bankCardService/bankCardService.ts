import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function createBankCard({
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

  return new Response(
    JSON.stringify({ message: "Амжилттай бүртгэгдлээ", newBankCard }),
    {
      status: 200,
    }
  );
}

export async function changeBankCard({
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
  try {
    const updatedBankCard = await prisma.bankcard.update({
      where: { userId: userId },
      data: {
        country: country,
        firstname: firstname,
        lastname: lastname,
        cardNumber: cardNumber,
        expiryDate: new Date(expiryDate),
        cvc: cvc,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Нууц үг амжилттай солигдлоо",
        updatedBankCard,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Хэрэглэгч олдсонгүй эсвэл шинэчлэх боломжгүй",
        error: true,
      }),
      { status: 404 }
    );
  }
}
