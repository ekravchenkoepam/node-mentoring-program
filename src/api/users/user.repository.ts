import { DI } from '../../database';
import { User } from '../../types';
import { User as UserEntity } from './user.entity';
import { Hobby as HobbyEntity } from '../hobby/hobby.entity';
import { Collection } from '@mikro-orm/core';

export const userRepository = {
    create: async (user: User): Promise<UserEntity> => {
        const {
            email,
            password,
            role,
            name,
            surname,

        } = user;
        const newUser = new UserEntity(
            email,
            password,
            role,
            name,
            surname,
        );
        await DI.em.persistAndFlush(newUser);
        return newUser;
    },

    delete: async (id: string): Promise<void> => {
        const user = await userRepository.getOneById(id);
        await DI.em.nativeDelete(HobbyEntity, { user });
        await DI.em.removeAndFlush(user);
    },

    getAll: async (): Promise<UserEntity[]> => {
        return await DI.users.find({}, { populate: ['hobbies'] })
    },

    getOneById: async (id: string): Promise<UserEntity> => {
        const user = await DI.users.findOne(Number(id), { populate: ['hobbies'] })

        if (!user) {
            throw new Error(`User with id: ${id} is not found`);
        }
        
        return user;
    },

    getUserByEmail: async (email: string): Promise<UserEntity> => {
        const user = await DI.users.findOne({ email });

        if (!user) {
            throw new Error(`User matching search conditions is not found`);
        }
        
        return user;
    },

    getUserHobbies: async (id: string): Promise<Collection<HobbyEntity, object>> => {
        const user = await userRepository.getOneById(id);

        return user.hobbies;
    },

    updateUserHobby: async (id: string, newHobby: string): Promise<UserEntity> => {
        const user = await userRepository.getOneById(id);

        if (!user.hobbies.getItems().some(hobby => hobby.name === newHobby)) {
            const hobby = new HobbyEntity(
                newHobby,
                user
            );
            user.hobbies.add(hobby);
    
            await DI.em.persistAndFlush(user);
        }

        return user;
    }
};