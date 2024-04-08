import { Product } from "../../types";
import { productRepository } from "./product.repository";

export const productService = {
    getAll: async (): Promise<Product[]> => {
        return await productRepository.getAll();
    },

    getOneById: async(id: string): Promise<Product> => {
        return await productRepository.getOneById(id);
    }
}