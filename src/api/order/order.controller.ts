import { Response } from 'express';
import { orderService } from './order.service';
import { RequestCustom } from '../../types';

const createOrder = async (req: RequestCustom, res: Response) => {
    try {
        const { id: userId } = req.user!;
        const data = await orderService.createOrder(userId)
        const response = {
            data,
            error: null
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 
            data: null,
            error: {
                message: `Internal Server error, ${(error as Error).message}`
            }
        });
    }
};

export {
    createOrder,
}