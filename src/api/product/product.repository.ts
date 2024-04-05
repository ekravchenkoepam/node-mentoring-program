import { Product } from "../../types";
import ProductModel from "./product.model";

export const productRepository = {
    getAll: async (): Promise<Product[]> => {
        return await ProductModel.find()
    },

    getOneById: async (id: string): Promise<Product> => {
        const product = await ProductModel.findById(id)

        if (!product) {
            throw new Error(`Product with id: ${id} is not found`);
        }
        
        return product;
    }
}