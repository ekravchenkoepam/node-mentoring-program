import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../users/user.repository';

const { JWT_SECRET = 'jwtSecret' } = process.env;

const register = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password,
            role
        } = req.body;

        const existingUser = await userRepository.getUserByEmail(email)

        if (existingUser) {
            return res.status(409).json({
                data: null,
                error: {
                    message: "User already exists"
                }
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await userRepository.create({
            email,
            password: encryptedPassword,
            role
        });

        const response = {
            data: user,
            error: null
        }

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ 
            data: null,
            error: {
                message: `Failed to create user, ${(error as Error).message}`
            }
        });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await userRepository.getUserByEmail(email)

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({
                user_id: user.id,
                email, role:
                user.role
            },
            JWT_SECRET,
            {
                expiresIn: "2h",
            }
            );

            return res.status(200).json({
                data: {
                    token
                },
                error: null
            });
        }
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
    register,
    login
}