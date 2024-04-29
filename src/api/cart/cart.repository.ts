import { DI } from '../../database';
import { Cart as CartEntity } from './cart.entity';
import { CartItem } from './cartItem.entity';
import { Product } from '../product/product.entity';
import { userRepository } from '../users/user.repository';

export const cartRepository = {
    getCart: async (userId: string): Promise<CartEntity | null> => {
        const user = await userRepository.getOneById(userId);
        const cart = await DI.cart.findOne({ user }, { populate: ['items.product'] });
        
        return cart;
    },

    getOrCreateCart: async (userId: string, product?: Product): Promise<CartEntity | null> => {
        let cart = await cartRepository.getCart(userId);
        const user = await userRepository.getOneById(userId);

        if (!cart && product) {
            const newCartItem = new CartItem(product, 1);
            cart = new CartEntity(false, user, [newCartItem]);
            await DI.em.persistAndFlush(cart);
        }

        return cart;
    },

    updateCart: async (cartId: string, productId: string, count: number = 1): Promise<any> => {
        const cart = await DI.cart.findOne({ id: Number(cartId) });
        if (!cart) return null;
        
        const item = cart.items.getItems().find(item => item.product.id === Number(productId));
        if (item) item.count = count;
        
        await DI.em.persistAndFlush(cart);
        return cart;
    },

    removeCart: async (cartId: string): Promise<CartEntity | null> => {
        const cart = await DI.cart.findOne({ id: Number(cartId) });
        if (!cart) return null;

        cart.items.removeAll();
        await DI.em.flush();

        return cart;
    }
}