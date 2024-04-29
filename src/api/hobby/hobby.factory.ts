import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Hobby } from './hobby.entity';

export class HobbyFactory extends Factory<Hobby> {
    model = Hobby;

    definition(): Partial<Hobby> {
        return {
            name: faker.lorem.word(),
        };
    }
}