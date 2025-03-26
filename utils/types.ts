export type userType = {
  email: string;
  password: string;
  id: string;
  username: string;
  image: string;
  receivedDonations: {
    id: string;
    amount: string;
    specialMessage: string;
    socialMediaURLOrBuyMeCoffee: string;
    donorId: string;
  };
  createdAt: string;
  profile: {
    name: string;
    about: string;
    image: string;
    socialMediaURL: string;
    backgroundImage: string;
    successsMessage: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
  BankCard: {
    id: string;
    country: string;
    firstName: string;
    lastName: string;
    cardNumber: string;
    expiryDate: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
};
