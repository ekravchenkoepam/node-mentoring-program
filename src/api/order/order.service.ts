import { orderRepository } from "./order.repository";
import { cartRepository } from "../cart/cart.repository";
import { getTotal } from "../cart/cart.service";
import { Order } from "./order.entity";

export const orderService = {
    createOrder: async (clientId: string) => {
        const cart = await cartRepository.getCart(clientId);

        if (cart && cart.user) {
            const payment = {
                type: "paypal",
                address: "London",
                creditCard: "1234-1234-1234-1234"
            }

            const delivery = {
                type: "post",
                address: "London"
            }
            
            const total = getTotal(cart)
    
            const newOrder = new Order(
                cart.user,
                cart,
                cart.items.toArray(),
                payment,
                delivery,
                [],
                total
            ); 
    
            const order = await orderRepository.createOrder(newOrder);
    
            return order;
        }
    }
}
