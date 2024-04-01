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
        const user = userRepository.create(body);
        const response = {
            data: {
                user,
                links: {
                    self: `/api/users/${user.id}`,
                    hobbies: `/api/users/${user.id}/hobbies`
                }
            },
            error: null
        }

        sendJSONResponse(res, 201, response);
    } catch (error) {
        sendJSONResponse(res, 500, { 
            data: null,
            error: 'Failed to create user'
        });
    }
}

const getAllUsers = (req: IncomingMessage, res: ServerResponse, userId?: string) => {
    try {
        let users = userRepository.getAll();
        users = users.map(user => ({
            ...user,
            links: {
                self: `/api/users/${user.id}`,
                hobbies: `/api/users/${user.id}/hobbies`
            }
        }));
        const response = {
            data: users,
            error: null
        }

        res.setHeader('Cache-Control', 'public, max-age=3600');
        sendJSONResponse(res, 200, response);
    } catch (error) {
        sendJSONResponse(res, 500, { 
            data: null,
            error: 'Failed to retrieve users'
        });
    }
}

const deleteUserById = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    try {
        userRepository.delete(userId);
        const response = {
            data: {
                success: true
            },
            error: null
        }

        sendJSONResponse(res, 200, response);
    } catch (e) {
        sendJSONResponse(res, 404, { 
            data: null,
            error: `User with id ${userId} doesn't exist`
        });
    }
}

const getUserHobbies = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    try {
        const hobbies = userRepository.getUserHobbies(userId);
        const response = {
            data: {
                hobbies,
                links: {
                    self: `/api/users/${userId}/hobbies`,
                    user: `/api/users/${userId}`
                }
            },
            error: null
        }

        res.setHeader('Cache-Control', 'private, max-age=3600');
        sendJSONResponse(res, 200, response);
    } catch (e) {
        sendJSONResponse(res, 404, { 
            data: null,
            error: `User with id ${userId} doesn't exist`
        });
    }
}

const updateUserHobby = async (req: IncomingMessage, res: ServerResponse, userId: string) => {
    try {
        const body = await parseRequestBody(req);
        const user = userRepository.updateUserHobby(userId, body.hobby);
        const response = {
            data: {
                user,
                links: {
                    self: `/api/users/${userId}`,
                    hobbies: `/api/users/${userId}/hobbies`
                }
            },
            error: null
        }

        sendJSONResponse(res, 200, response);
    } catch (e) {
        sendJSONResponse(res, 404, { 
            data: null,
            error: `User with id ${userId} doesn't exist`
        });
    }
}

export {
    createUser,
    getAllUsers,
    deleteUserById,
    getUserHobbies,
    updateUserHobby
}