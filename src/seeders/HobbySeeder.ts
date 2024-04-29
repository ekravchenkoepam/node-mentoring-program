import { Seeder } from '@mikro-orm/seeder';
import { HobbyFactory } from '../api/hobby/hobby.factory';
import { User } from '../api/users/user.entity';
import type { EntityManager } from '@mikro-orm/core';

export class HobbySeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const users = await em.find(User, {});

        if(users.length === 0){
            throw new Error('No users found in database. Ensure UserSeeder runs before HobbySeeder');
        }
    
        const hobbyFactory = new HobbyFactory(em);
        const hobbies = hobbyFactory.each(hobby => {
          hobby.user = users[Math.floor(Math.random() * users.length)];
        }).make(10);
    
        return await em.persistAndFlush(hobbies);
    }
}