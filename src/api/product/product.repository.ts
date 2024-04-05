import { Product } from "../../types";
import productsDb from "./productsDB";

const products = productsDb;

export const productRepository = {
    getAll: (): Product[] => {
        return products;
    },

    getOneById: (id: string): Product => {
        const product = products.find((product) => product.id === id);

        if (!product) {
            throw new Error(`Product with id: ${id} is not found`);
        }
        
        return product;
    }
}