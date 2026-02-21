import { IReview } from "./review.types";

export interface IMedicine {
  id: string;
  name: string;
  description?: string;
  price: number | string;
  stock?: number;
  manufacturer?: string;
  image?: string;
  category: {
    id: number;
    name: string;
  };
  originalPrice?: number | string;
  reviews: IReview[];
  dosage?: string;
  sideEffects?: string;
}
