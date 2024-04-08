import UserModel from './user.model';
import usersDb from './usersDB';

export const seedUsers = async () => {
    try {
        await UserModel.collection.drop();
        await UserModel.insertMany(usersDb);
        
        console.log('Users seeded successfully');
    } catch (error) {
        console.error('Error seeding users:', (error as Error).message);
    }
}
