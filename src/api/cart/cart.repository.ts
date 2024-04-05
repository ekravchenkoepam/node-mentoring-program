import { Cart, Product } from '../../types';
import CartModel from './cart.model';

export const cartRepository = {
    getCart: async (userId: string): Promise<Cart | null> => {
        const cart = await CartModel.findOne({ userId }).populate('items.product');
        
        return cart;
    },

    getOrCreateCart: async (userId: string, product?: Product): Promise<Cart> => {
        let cart = await cartRepository.getCart(userId);

        if (!cart) {
            const newCart = new CartModel({
                userId,
                isDeleted: false,
                items: [
                    {
                        product,
                        count: 1
                    }
                ]
            });

            cart = await newCart.save();
        }

        return cart
    },

    updateCart: async (cartId: string, productId: string, count: number = 1): Promise<any> => {
        const updatedCart = await CartModel.findOneAndUpdate(
            { _id: cartId, "items.product": productId },
            { $set: { "items.$.count": count } },
            { new: true }
        ).populate('items.product').populate('userId')

        return updatedCart;
    },

    removeCart: async (cartId: string): Promise<Cart | null> => {
        const updatedCart = await CartModel.findOneAndUpdate(
            { _id: cartId },
            { $set: { items: [] } },
            { new: true }
        )

        return updatedCart;
    }
}