import axios from "axios";
import {
  ProductsResponse,
  ProductResponse,
  OrderResponse,
} from "../types/Response.types";
import { Order } from "../types/Order.types";

const BASE_URL = "https://www.bortakvall.se/api/v2";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const get = async <T>(endpoint: string) => {
  const response = await instance.get<T>(endpoint);
  return response.data;
};

export const getAllProducts = async () => {
  return get<ProductsResponse>(`/products`);
};

export const getProduct = (id: number) => {
  return get<ProductResponse>(`/products/${id}`);
};

const post = async <Req, Res>(endpoint: string, data: Req) => {
  const response = await instance.post<Res>(endpoint, data);
  return response.data;
};

export const postOrder = (order: Order) => {
  return post<Order, OrderResponse>(`/users/51/orders`, order);
};
