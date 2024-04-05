import { orderRepository } from "./order.repository";
import { cartRepository } from "../cart/cart.repository";
import { getTotal } from "../cart/cart.service";
import { Order } from "../../types";

export const orderService = {
    createOrder: async (clientId: string) => {
        const cart = await cartRepository.getCart(clientId);

        if (cart) {
            const {
                _id: cartId,
                userId,
                items
            } = cart
    
            const newOrder = {
                cartId,
                userId,
                items,
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
                total: getTotal(cart)
            }
    
            const order = (await orderRepository.createOrder(newOrder as Order)).populate('items.product');

            return order;
        }
    }
}
