import { Product as ProductEntity } from "./product.entity";
import { DI } from "../../database";

export const productRepository = {
    getAll: async (): Promise<ProductEntity[]> => {
        return await DI.products.find({})
    },

    getOneById: async (id: string): Promise<ProductEntity> => {
        const product = await DI.products.findOne(Number(id))

        if (!product) {
            throw new Error(`Product with id: ${id} is not found`);
        }
        
        return product;
    }
}