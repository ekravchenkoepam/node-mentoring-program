import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

const schema: ObjectSchema = Joi.object({
    cartId: Joi.string().required(),
    productId: Joi.string().required(),
    count: Joi.number().required()
});

const user: ObjectSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
});

const createValidator = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
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


export const validateRequestBody = createValidator(schema);

export const validateUserBody = createValidator(user);
