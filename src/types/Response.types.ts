import { Product } from "./Product.types";

type Response<T> = {
  status: "success" | "fail" | "error";
  data: T;
  message?: string;
};

export type ProductsResponse = Response<Product[]>;
export type ProductResponse = Response<Product>;
export type OrderResponse = Response<{ id: number }>;
