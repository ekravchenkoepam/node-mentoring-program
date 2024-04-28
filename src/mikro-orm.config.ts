import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} from './config';

import { User } from './api/users/user.entity';
import { Hobby } from './api/hobby/hobby.entity';
import { Product }from './api/product/product.entity';
import { Cart } from './api/cart/cart.entity';

export default defineConfig({
    user: DB_USER,
    password: DB_PASSWORD,
    dbName: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    entities: [User, Hobby, Product, Cart],
    driver: PostgreSqlDriver,
    extensions: [Migrator, SeedManager],
    allowGlobalContext: true,
    migrations: {
        path: './dist/migrations',
        pathTs: './src/migrations',
        tableName: 'migrations',
        disableForeignKeys: false
    },
    seeder: {
        path: './dist/seeders',
        pathTs: './src/seeders',
        defaultSeeder: 'DatabaseSeeder',
        glob: '!(*.d).{js,ts}',
        emit: 'ts',
    },
});