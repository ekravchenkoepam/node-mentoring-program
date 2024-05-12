import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { User } from '../api/users/user.entity';
import { userRepository } from '../api/users/user.repository';
interface RequestCustom extends Request {
    user?: User;
}

export const authenticateUser = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const userId = req.headers['x-user-id'];
    const user = await userRepository.getOneById(userId as string);

    if (!userId) {
        return res.status(401).json({
            data: null,
            error: {
                message: "User is not authorized"
            }
        });
    }

    if (!user) {
        return res.status(403).json({
            data: null,
            error: {
                message: "You must be authorized user"
            }
        });
    }

    req.user = user;
    next();
}

export const authenticateToken = (req: RequestCustom, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send("Token is required");
    }
    
    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== 'Bearer') {
        return res.status(403).send("Invalid Token");
    }

    try {
        const user = jwt.verify(token, JWT_SECRET!) as User;

        req.user = user;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    next();
};

export const authorizeAdmin = (req: RequestCustom, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user && user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admin role required' });

    }

    next();
};
