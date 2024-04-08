import { User, UserExtended } from '../../types';
import UserModel from './user.model';

export const userRepository = {
    create: async (user: User): Promise<UserExtended> => {
        const newUser = new UserModel(user);
        await newUser.save();

        return newUser;
    },

    delete: async (id: string): Promise<UserExtended | null> => {
        return await UserModel.findByIdAndDelete(id);
    },

    getAll: async (): Promise<UserExtended[]> => {
        return await UserModel.find().lean();
    },

    getOneById: async (id: string): Promise<UserExtended> => {
        const user = await UserModel.findById(id)

        if (!user) {
            throw new Error(`User with id: ${id} is not found`);
        }
        
        return user;
    },

    getUserHobbies: async (id: string): Promise<string[]> => {
        const user = await userRepository.getOneById(id);

        return user.hobbies;
    },

    updateUserHobby: async (id: string, newHobby: string): Promise<UserExtended | null> => {
        const updatedUser = await UserModel.findByIdAndUpdate(id,
            { $addToSet: { hobbies: newHobby } },
            { new: true }
        );

        return updatedUser;
    }
};