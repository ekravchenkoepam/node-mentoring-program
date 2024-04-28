import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserSeeder } from './UserSeeder';
import { HobbySeeder } from './HobbySeeder';
import { ProductSeeder } from './ProductSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const seeder = new UserSeeder();
    await seeder.run(em);
    
    const hobbySeeder = new HobbySeeder();
    await hobbySeeder.run(em);
    
    const productSeeder = new ProductSeeder();
    await productSeeder.run(em);

    console.log('Database seeded successfully');
  }
}
