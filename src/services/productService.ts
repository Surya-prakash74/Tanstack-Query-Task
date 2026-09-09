import type { ProductsResponse } from "../types/product";

const PRODUCTS_API = "https://dummyjson.com/products";

export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(PRODUCTS_API);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<ProductsResponse>;
}