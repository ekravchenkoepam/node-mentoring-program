import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

const schema: ObjectSchema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().required()
});

export const validateRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            data: null,
            error: {
                message: error.details[0].message
            }
        });
    }

    Object.assign(req, value);

    next();
};
