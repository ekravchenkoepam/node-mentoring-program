import {
    Entity,
    PrimaryKey,
    Property,
    Enum,
    ManyToOne,
    Collection,
    Embeddable,
    Embedded
} from '@mikro-orm/core';
import { Cart } from '../cart/cart.entity';
import { CartItem } from '../cart/cartItem.entity';
import { User } from '../users/user.entity';

enum OrderStatus {
    CREATED = 'created',
    COMPLETED = 'completed',
}

@Embeddable()
class Payment {
    @Property()
    type!: string;

    @Property({ nullable: true })
    address?: string;

    @Property({ nullable: true })
    creditCard?: string;
}

@Embeddable()
class Delivery {
    @Property()
    type!: string;

    @Property()
    address!: string;
}

@Entity()
export class Order {
    @PrimaryKey()
    id!: string;

    @ManyToOne()
    user!: User;

    @ManyToOne()
    cart!: Cart;

    @Property()
    items = new Collection<CartItem>(this);

    @Embedded(() => Payment)
    payment!: Payment;

    @Embedded(() => Delivery)
    delivery!: Delivery;

    @Property({ nullable: true })
    comments?: string[];

    @Enum()
    status: OrderStatus = OrderStatus.CREATED;

    @Property()
    total!: number;

    constructor(
        user: User,
        cart: Cart,
        items: CartItem[],
        payment: Payment,
        delivery: Delivery,
        comments: string[],
        total: number,
        status: OrderStatus = OrderStatus.CREATED
    ) {
        this.user = user;
        this.cart = cart;
        this.items = new Collection<CartItem>(this, items);
        this.payment = payment;
        this.delivery = delivery;
        this.comments = comments;
        this.total = total;
        this.status = status;
    }
}