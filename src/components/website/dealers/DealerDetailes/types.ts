// Dealer Details Types

export interface DealerProfile {
  _id: string;
  name: string;
  role: string;
  email: string;
  profile: string;
  about: string;
  isSubscribed: boolean;
  mobileNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  dateOfBirth?: string;
  zipCode?: string;
}

export interface Car {
  _id: string;
  basicInformation: {
    vehicleName: string;
    brand: string;
    model: string;
    vinNo: string;
    year: number;
    productImage: string[];
    RegularPrice: number;
    OfferPrice: number;
    condition: string;
    miles: number;
    BodyType: string;
  };
  technicalInformation: {
    fuelType: string;
    driveType: string;
    transmission: string;
  };
  status: string;
  createdAt: string;
}

export interface DealerData {
  dealerProfile: DealerProfile;
  cars: Car[];
}
