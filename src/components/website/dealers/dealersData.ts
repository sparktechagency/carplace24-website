// API Dealer type matching the backend response
export type Dealer = {
  _id: string;
  name: string;
  role: string;
  currentRole: string;
  email: string;
  profile: string;
  tradeLicences: string | string[];
  proofOwnerId: string;
  sallonPhoto: string;
  isUpdate: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  discount?: number;
  about?: string;
  isSubscribed: boolean;
  __v: number;
  isLocked?: boolean;
  subscribedPackage?: string;
  expiryDate?: string;
  mobileNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  dateOfBirth?: string;
  zipCode?: string;
  gender?: string;
  latitude?: number;
  longitude?: number;
};

// Legacy type for reference (can be removed later)
export type LegacyDealer = {
  id: string;
  name: string;
  logo: string;
  type: string;
  location: string;
  rating: number;
  reviews: number;
};
