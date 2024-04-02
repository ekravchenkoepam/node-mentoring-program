import express from 'express'
import { PORT } from './config';
import { initDatabase } from './database';

import { seedUsers } from './api/users/user.seeder';
import { seedProducts } from './api/product/product.seeder';
import { seedCart } from './api/cart/cart.seeder';

import userRouter from './api/users/user.router';
import productRouter from './api/product/product.router';
import cartRouter from './api/cart/cart.router';

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/profile/cart', cartRouter);

initDatabase().then(async () => {
    await seedUsers();
    await seedProducts();
    await seedCart();

    app.listen({ port: PORT }, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})