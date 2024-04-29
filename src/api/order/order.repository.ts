import { Order as OrderEntity } from './order.entity';
import { DI } from '../../database';

export const orderRepository = {
    createOrder: async (order: OrderEntity): Promise<OrderEntity> => {
        DI.em.assign(order, order);
        await DI.em.persistAndFlush(order);
        return order;
    }
}