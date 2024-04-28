import {
    Entity,
    PrimaryKey,
    Property,
    ManyToOne,
    OneToMany,
    Collection
} from '@mikro-orm/postgresql';
import { User } from '../users/user.entity';
import { CartItem } from './cartItem.entity';

@Entity()
export class Cart {
    @PrimaryKey()
    id!: number;

    @Property({ type: 'boolean' })
    isDeleted: boolean = false;

    @ManyToOne(() => User)
    user?: User;

    @OneToMany(() => CartItem, item => item.product)
    items = new Collection<CartItem>(this);

    constructor(isDeleted: boolean = false, user: User, items: CartItem[]) {
        this.user = user;
        this.isDeleted = isDeleted;
        if (items) {
            items.forEach(item => this.items.add(item));
        }
    }
}
