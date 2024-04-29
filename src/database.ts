import {
    EntityManager,
    EntityRepository,
    MikroORM
} from '@mikro-orm/postgresql';
import ormConfig from './mikro-orm.config';
import { User } from './api/users/user.entity';
import { Hobby } from './api/hobby/hobby.entity';
import { Product } from './api/product/product.entity';
import { Cart } from './api/cart/cart.entity';

export let DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    users: EntityRepository<User>,
    hobbies: EntityRepository<Hobby>,
    products: EntityRepository<Product>,
    cart: EntityRepository<Cart>,
};

export const initDatabase = async (): Promise<any> => {
    try {
        const orm = await MikroORM.init(ormConfig)
        const migrator = orm.getMigrator();
        await migrator.up();

        DI.orm = orm;
        DI.em = orm.em;
        DI.users = orm.em.getRepository(User);
        DI.hobbies = orm.em.getRepository(Hobby);
        DI.cart = orm.em.getRepository(Cart);

        return orm.em.fork();
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', (error as Error).message);
    }
}
