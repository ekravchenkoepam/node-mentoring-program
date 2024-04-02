import User from './user.model';
import usersDb from './usersDB';

export const seedUsers = async () => {
    try {
        await User.collection.drop();

        await User.insertMany(usersDb);
        console.log('Users seeded successfully');
    } catch (error) {
        console.error('Error seeding users:', (error as Error).message);
    }
}
