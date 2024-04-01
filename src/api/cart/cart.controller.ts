import { Request, Response } from 'express';
import Joi from 'joi';
import { cartService } from './cart.service';
import { RequestCustom } from '../../types';

const schema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().required()
});

const getCart = (req: RequestCustom, res: Response) => {
    try {
        const { id: userId } = req.user!;
        const { productId } = req.query;
        const data = cartService.getOrCreateCart(userId, productId as string)
        const response = {
            data,
            error: null
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 
            data: null,
            error: {
                message: "Internal Server error"
            }
        });
    }
};

const updateCart = (req: RequestCustom, res: Response) => {
    try {
        const { 
            productId,
            count
        } = req;
        const data = cartService.updateCart(productId as string, count as number)
        const response = {
            data,
            error: null
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 
            data: null,
            error: {
                message: "Internal Server error"
            }
        });
    }
};

const removeCart = (req: RequestCustom, res: Response) => {
    try {
        const data = cartService.removeCart()
        const response = {
            data,
            error: null
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 
            data: null,
            error: {
                message: "Internal Server error"
            }
        });
    }
};

const createOrder = (req: Request, res: Response) => {
    try {
        const data = cartService.createOrder()
        const response = {
            data,
            error: null
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 
            data: null,
            error: {
                message: "Internal Server error"
            }
        });
    }
};

export {
    getCart,
    updateCart,
    removeCart,
    createOrder,
}