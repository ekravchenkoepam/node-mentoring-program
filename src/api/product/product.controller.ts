import { Request, Response } from 'express';
import { productService } from './product.service';

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getAll();
        const response = {
            data: products,
            error: null
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 
            data: null,
            error: {
                "message": "Internal Server error"
            }
        });
    }
};

const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await productService.getOneById(req.params.id);
        const response = {
            data: product,
            error: null
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 
            data: null,
            error: 'Failed to retrieve products'
        });
    }
};

export {
    getAllProducts,
    getProductById,
}