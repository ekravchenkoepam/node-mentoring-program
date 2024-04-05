import { userRepository } from './user.repository';
import { Body } from '../../types';

export const userService = {
    createUser: (body: Body) => {
        const user = userRepository.create(body);
        const data = {
            user,
            links: {
                self: `/api/users/${user.id}`,
                hobbies: `/api/users/${user.id}/hobbies`
            }
        }
    
        return data;
    },
    
    getAllUsers: () => {
        const users = userRepository.getAll();
        const data = users.map(user => ({
            ...user,
            links: {
                self: `/api/users/${user.id}`,
                hobbies: `/api/users/${user.id}/hobbies`
            }
        }));
    
        return data;
    },

    deleteUserById: (userId: string) => {
        const result = userRepository.delete(userId);
        const data = {
            success: true
        }

        if (!result) {
            return null;
        }

        return data;
    },

    getUserHobbies: (userId: string) => {
        const hobbies = userRepository.getUserHobbies(userId);
        const data = {
            hobbies,
            links: {
                self: `/api/users/${userId}/hobbies`,
                user: `/api/users/${userId}`
            }
        }

        return data;
    },

    updateUserHobby: (userId: string, body: Body) => {
        const user = userRepository.updateUserHobby(userId, body.hobby);
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