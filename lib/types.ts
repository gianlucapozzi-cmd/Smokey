import type { ProductInterestId, StoreId } from "./constants";

export type RatingValue = 1 | 2 | 3 | 4 | 5;

export type ConsentRecord = {
  accepted: boolean;
  timestamp: string;
  text: string;
};

export type CommunityPayload = {
  source: "sosmoke-community-landing";
  submittedAt: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    store: StoreId;
  };
  interests: ProductInterestId[];
  interestNote: string;
  consents: {
    privacy: ConsentRecord;
    marketing: ConsentRecord;
  };
  feedback: {
    service: RatingValue | null;
    welcome: RatingValue | null;
    expertise: RatingValue | null;
    improvement: string;
    productRequest: string;
  };
};
