import { cartRepository } from "./cart.repository";
import { productRepository } from "../product/product.repository";
import { Cart } from "../../types";

const getTotal = (cart: Cart) => {
    const total = cart.items.reduce((sum: number, { product, count }) => sum + (product.price * count), 0);

    return total;
}

export const cartService = {
    getOrCreateCart: (userId: string, productId: string) => {
        if (!cartRepository.getCart().id) {
            const product = productRepository.getOneById(productId);
        
            cartRepository.createCart(userId);
            cartRepository.updateCart(product);
        }

        const cart = cartRepository.getCart();
        const total = getTotal(cart);
        const data = {
            cart,
            total
        }

        return data;
    },

    updateCart: (productId: string, count: number) => {
        const product = productRepository.getOneById(productId);
        const cart = cartRepository.updateCart(product, count);
        const total = getTotal(cart);

        const data = {
            cart,
            total
        }

        return data;
    },

    removeCart: () => {
        cartRepository.removeCart();

        return {
            success: true
        }
    },

    createOrder: () => {
        const cart = {...cartRepository.getCart()}
        const total = getTotal(cart);

        const data = {
            order: {
                ...cart,
                payment: {
                    type: "paypal",
                    address: "London",
                    creditCard: "1234-1234-1234-1234"
                },
                delivery: {
                    type: "post",
                    address: "London"
                },
                comments: "",
                status: "created",
                total
            },
            error: null
        }

        return data;
    }
}