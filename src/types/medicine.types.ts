import { IReview } from "./review.types";

export type TMedicineStatus = "APPROVED" | "PENDING" | "REJECTED";
export interface IActiveIngredients {
  main: string;
  strength: string;
  inactive: string[];
}

export interface IMedicine {
  id: string;
  name: string;
  description?: string;
  price: number | string;
  stock?: number;
  manufacturer?: string;
  image?: string;
  category: {
    id: number | string;
    name: string;
  };
  categoryId?: string;
  sellerId?: string;
  originalPrice?: number | string;
  reviews: IReview[];
  dosage?: string;
  sideEffects?: string;
  expiryDate?: string;
  batchNumber?: string;
  prescriptionRequired?: boolean;
  activeIngredients?: IActiveIngredients;
  status?: TMedicineStatus;
}
