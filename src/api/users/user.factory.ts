import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { User } from './user.entity';

let hashedPassword = '';

(async () => {
    hashedPassword = await bcrypt.hash(faker.internet.password(), 10);
})();

export class UserFactory extends Factory<User> {
    model = User;

    definition(): Partial<User> {
        return {
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            email: faker.internet.email(),
            role: faker.person.jobType(),
            password: hashedPassword
        };
    }
}