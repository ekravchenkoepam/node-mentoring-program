import { Product } from "../../types";
import { productRepository } from "./product.repository";

export const productService = {
    getAll: (): Product[] => {
        return productRepository.getAll();
    },

    getOneById: (id: string): Product => {
        return productRepository.getOneById(id);
    }
}