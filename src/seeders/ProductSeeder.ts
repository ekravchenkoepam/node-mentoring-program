import { Seeder } from '@mikro-orm/seeder';
import { ProductFactory } from '../api/product/product.factory';
import type { EntityManager } from '@mikro-orm/core';

export class ProductSeeder extends Seeder {
    run(em: EntityManager): Promise<void> {
        const productFactory = new ProductFactory(em);
        const products = productFactory.make(10);
        return em.persistAndFlush(products);
    }
}