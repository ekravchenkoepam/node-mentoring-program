import { Request, Response, NextFunction } from 'express';
import { UserExtended } from '../types';
import { userRepository } from '../api/users/user.repository';
interface RequestCustom extends Request {
    user?: UserExtended;
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