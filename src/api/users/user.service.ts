import { IncomingMessage, ServerResponse } from 'http';
import { userRepository } from "./user.repository"
import { parseRequestBody } from "../../parser";

const sendJSONResponse = (res: ServerResponse, statusCode: number, data: any) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
};

const createUser = async (req: IncomingMessage, res: ServerResponse, userId?: string) => {
    try {
        const body = await parseRequestBody(req);
        const newUser = userRepository.create(body);

        sendJSONResponse(res, 201, newUser);
    } catch (error) {
        sendJSONResponse(res, 500, { error: 'Failed to create user' });
    }
}

const getAllUsers = (req: IncomingMessage, res: ServerResponse, userId?: string) => {
    try {
        let users = userRepository.getAll();
        users = users.map(user => ({
            ...user,
            links: {
                hobbies: `/api/users/${user.id}/hobbies`
            }
        }));

        res.setHeader('Cache-Control', 'public, max-age=3600');
        sendJSONResponse(res, 200, users);
    } catch (error) {
        sendJSONResponse(res, 500, { error: 'Failed to retrieve users' });
    }
}

const deleteUserById = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    try {
        const deletedUser = userRepository.delete(userId);

        sendJSONResponse(res, 200, deletedUser);
    } catch (e) {
        sendJSONResponse(res, 404, { error: 'User not found' });
    }
}

const getUserHobbies = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    try {
        const hobbies = userRepository.getUserHobbies(userId);
        const response = {
            hobbies,
            links: {
                self: `/api/users/${userId}`
            }
        }

        res.setHeader('Cache-Control', 'private, max-age=3600');
        sendJSONResponse(res, 200, response);
    } catch (e) {
        sendJSONResponse(res, 404, { error: 'User not found' });
    }
}

const updateUserHobby = async (req: IncomingMessage, res: ServerResponse, userId: string) => {
    try {
        const body = await parseRequestBody(req);
        const updatedHobbies = userRepository.updateUserHobby(userId, body.hobby);

        sendJSONResponse(res, 200, updatedHobbies);
    } catch (e) {
        sendJSONResponse(res, 404, { error: 'User not found' });
    }
}

export {
    createUser,
    getAllUsers,
    deleteUserById,
    getUserHobbies,
    updateUserHobby
}