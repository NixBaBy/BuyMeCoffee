export type userType = {
  id: number;
  email: string;
  password: string;
  username: string | null;
  donationType?: donationType[];
  profile?: profileType | null;
  BankCard?: BankCardType | null;
  createdAt: Date;
  updatedAt: Date;
};

export type donationType = {
  id: number;
  amount: number;
  specialMessage: string;
  socialMediaURLOrBuyMeCoffee: string;
  donorId: number;
  recipientId: number;
};

export type profileType = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage?: string;
  successMessage?: string;
  user_id: number;
  createdAt?: string;
  updatedAt?: string;
};

export type BankCardType = {
  id: number;
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};
