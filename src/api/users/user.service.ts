import { userRepository } from './user.repository';
import { Body } from '../../types';

export const userService = {
    createUser: async (body: Body) => {
        const user = await userRepository.create(body);

        const data = {
            user,
            links: {
                self: `/api/users/${user.id}`,
                hobbies: `/api/users/${user.id}/hobbies`
            }
        }
    
        return data;
    },
    
    getAllUsers: async () => {
        const users = await userRepository.getAll();
        const data = users.map(user => ({
            user: {
                ...user,
            },
            links: {
                self: `/api/users/${user.id}`,
                hobbies: `/api/users/${user.id}/hobbies`
            }
        }));
    
        return data;
    },

    deleteUserById: async (userId: string) => {
        await userRepository.delete(userId);
        const data = {
            success: true
        }

        return data;
    },

    getUserHobbies: async (userId: string) => {
        const hobbies = await userRepository.getUserHobbies(userId);
        const data = {
            hobbies,
            links: {
                self: `/api/users/${userId}/hobbies`,
                user: `/api/users/${userId}`
            }
        }

        return data;
    },

    updateUserHobby: async (userId: string, hobby: string) => {
        const user = await userRepository.updateUserHobby(userId, hobby);
        const data = {
            user,
            links: {
                self: `/api/users/${userId}`,
                hobbies: `/api/users/${userId}/hobbies`
            }
        }

        return data;
    }
}