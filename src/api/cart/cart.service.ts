import { cartRepository } from "./cart.repository";
import { productRepository } from "../product/product.repository";
import { Cart } from "./cart.entity";

export const getTotal = (cart: Cart | null) => {
    if (!cart) {
        return 0;
    }

    const total = cart?.items.reduce((sum: number, { product, count }) => sum + (product.price * count), 0);

    return total;
}

export const cartService = {
    getOrCreateCart: async (userId: string, productId: string) => {
        const product = await productRepository.getOneById(productId);
        const cart = await cartRepository.getOrCreateCart(userId, product);
        const data = {
            cart,
            total: getTotal(cart)
        }

        return data;
    },

    updateCart: async (cartId: string, productId: string, count: number) => {
        const cart = await cartRepository.updateCart(cartId, productId, count);
        const data = {
            cart,
            total: getTotal(cart)
        }

        return data;
    },

    removeCart: async (cartId: string) => {
        await cartRepository.removeCart(cartId);

        return {
            success: true
        }
    }
}