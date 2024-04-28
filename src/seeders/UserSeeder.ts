import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserFactory } from "../api/users/user.factory";

export class UserSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const userFactory = new UserFactory(em);
        const users = userFactory.make(5);
        await em.persistAndFlush(users);
    }
}
