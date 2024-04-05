import { Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const data = userService.createUser(body);
        const response = {
            data
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ 
            data: null,
            error: 'Failed to create user'
        });
    }
};

const getAllUsers = (req: Request, res: Response) => {
    try {
        const data = userService.getAllUsers();
        
        const response = {
            data,
            error: null
        };

        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 
            data: null,
            error: 'Failed to retrieve users'
        });
    }
};

const deleteUserById = (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const data = userService.deleteUserById(userId);
        const response = {
            data,
            error: null
        };

        res.status(200).json(response);
    } catch (e) {
        res.status(404).json({ 
            data: null,
            error: `User with id ${req.params.userId} doesn't exist`
        });
    }
};

const getUserHobbies = (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const data = userService.getUserHobbies(userId);
        const response = {
            data,
            error: null
        };

        res.setHeader('Cache-Control', 'private, max-age=3600');
        res.status(200).json(response);
    } catch (e) {
        res.status(404).json({ 
            data: null,
            error: `User with id ${req.params.userId} doesn't exist`
        });
    }
};

const updateUserHobby = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const body = req.body;
        const data = userService.updateUserHobby(userId, body.hobby);
        const response = {
            data,
            error: null
        };

        res.status(200).json(response);
    } catch (e) {
        res.status(404).json({ 
            data: null,
            error: `User with id ${req.params.userId} doesn't exist`
        });
    }
};

export {
    createUser,
    getAllUsers,
    deleteUserById,
    getUserHobbies,
    updateUserHobby
}