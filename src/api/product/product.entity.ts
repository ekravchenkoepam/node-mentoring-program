import {
    Entity,
    Property,
    PrimaryKey,
    ManyToOne
} from '@mikro-orm/core';
import { Cart } from '../cart/cart.entity';

@Entity()
export class Product {
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property()
    description!: string;

    @Property()
    price!: number;
}