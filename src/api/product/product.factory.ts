import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Product } from './product.entity';

export class ProductFactory extends Factory<Product> {
    model = Product;

    definition(): Partial<Product> {
        return {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: Number(faker.commerce.price()),
        };
    }
}