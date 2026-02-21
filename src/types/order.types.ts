import type { IShippingAddress } from "./checkout.types";

export type TOrderStatus = "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export type TPaymentStatus = "PENDING" | "PAID" | "FAILED";

export type TPaymentMethod = "COD" | "STRIPE" | "CARD";

export interface IOrderItem {
  id: string;
  orderId: string;
  medicineId: string;
  quantity: number;
  price: string;
  createdAt: string;
  medicine: {
    name: string;
    image: string;
    manufacturer: string;
  };
}

export interface IOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  sellerId: string;
  status: TOrderStatus;
  totalAmount: string;
  shippingAddress: IShippingAddress;
  paymentStatus: TPaymentStatus;
  paymentMethod: TPaymentMethod;
  trackingNumber: string | null;
  cancelledAt: string | null;
  cancelReason: string | null;
  createdAt: string;
  updatedAt: string;
  items?: IOrderItem[];
  seller?: {
    name: string;
    email: string;
    phone: string | null;
  };
}
