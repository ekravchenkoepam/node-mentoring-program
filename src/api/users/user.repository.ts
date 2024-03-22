import { User, UserExtended } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import usersDb from './usersDB';

let users = usersDb;

export const userRepository = {
    create: (user: User): UserExtended => {
        const newUser = { 
            id: uuidv4(),
            hobbies: [],
            ...user 
        };
        users.push(newUser);

        return newUser;
    },

    delete: (id: string): UserExtended => {
        const user = userRepository.getOneById(id)
        users = users.filter((u) => u.id !== user.id);

        return user;
    },

    getAll: (): UserExtended[] => {
        return users;
    },

    getOneById: (id: string): UserExtended => {
        const user = users.find((user) => user.id === id);

        if (!user) {
            throw new Error(`User with id: ${id} is not found`);
        }
        
        return user;
    },

    getUserHobbies: (id: string): string[] => {
        const user = userRepository.getOneById(id)

        return user.hobbies;
    },

    updateUserHobby: (id: string, newHobby: string): string[] => {
        const user = userRepository.getOneById(id);
        const index = users.findIndex(user => user.id === id);

        user.hobbies = [...new Set([...user.hobbies, newHobby])];
        users[index] = user;

        return user.hobbies;
    }
};