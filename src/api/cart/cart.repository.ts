import { v4 as uuidv4 } from 'uuid';
import cartDb from "./cartDB";
import { Product } from '../../types';

let cart = cartDb;

export const cartRepository = {
    getCart: () => {
        return cart;
    },

    createCart: (userId: string) => {
        const newCart = {
            id: uuidv4(),
            userId,
            isDeleted: false,
            items: []
        }

        cart = newCart;

        return cart;
    },

    updateCart: (product: Product, count: number = 1) => {
        const index = cart.items.findIndex(item => item.product.id === product.id);
        const newProduct = {
            product,
            count
        }

        if (index !== -1) {
            cart.items[index].count = count;
        } else {
            cart.items.push(newProduct);
        }

        return cart;
    },

    removeCart: () => {
        cart = cartDb;
    }
}