export type userType = {
  id: number;
  email: string;
  password: string;
  username: string | null;
  receivedDonations: receivedDonationsType[];
  profile: profileType | null;
  bankCard: BankCardType | null;
  createdAt: Date;
  updatedAt: Date;
};

type receivedDonationsType = {
  id: number;
  amount: number;
  specialMessage: string;
  socialMediaURLOrBuyMeCoffee: string;
  donorId: number;
};

type profileType = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

type BankCardType = {
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
