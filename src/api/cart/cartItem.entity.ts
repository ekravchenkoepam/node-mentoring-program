import {
    Entity,
    PrimaryKey,
    Property,
    ManyToOne
} from '@mikro-orm/core';
import { Product } from '../product/product.entity';

@Entity()
export class CartItem {
    @PrimaryKey()
    id!: number;

    @Property()
    count!: number;

    @ManyToOne(() => Product)
    product!: Product;

    constructor(product: Product, count: number = 1) {
        this.product = product;
        this.count = count;
    }
}