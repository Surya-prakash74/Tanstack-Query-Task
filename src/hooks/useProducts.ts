import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";

export const productsQueryKey = ["products"] as const;

export function useProducts() {
  return useQuery({
    queryKey: productsQueryKey,
    queryFn: getProducts,
  });
}