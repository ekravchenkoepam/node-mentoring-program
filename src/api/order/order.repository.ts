import { Order } from '../../types';
import OrderModel from './order.model';

export const orderRepository = {
    createOrder: async (order: Order): Promise<Order> => {
        const newOrder = new OrderModel(order);
        const savedOrder = await newOrder.save();

        return savedOrder;
    }
}