import { Request, Response } from 'express';
import { cartService } from './cart.service';
import { RequestCustom } from '../../types';

const getOrCreateCart = async (req: RequestCustom, res: Response) => {
    try {
        const { id: userId } = req.user!;
        const { productId } = req.query;

        if (!userId) {
            throw new Error("User ID is invalid");
        }

        const data = await cartService.getOrCreateCart(userId, productId as string)
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

const updateCart = async (req: RequestCustom, res: Response) => {
    try {
        const { 
            cartId,
            productId,
            count
        } = req.body;

        const data = await cartService.updateCart(cartId, productId as string, count as number)
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

const removeCart = async (req: RequestCustom, res: Response) => {
    try {
        const { cartId } = req.body;
        const data = await cartService.removeCart(cartId)
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
    getOrCreateCart,
    updateCart,
    removeCart
}