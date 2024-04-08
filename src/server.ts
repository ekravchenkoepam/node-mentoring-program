import express from 'express'
import { PORT } from './config';
import { initDatabase } from './database';

import { seedUsers } from './api/users/user.seeder';
import { seedProducts } from './api/product/product.seeder';

import userRouter from './api/users/user.router';
import productRouter from './api/product/product.router';
import cartRouter from './api/cart/cart.router';
import orderRouter from './api/order/order.router';

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/profile/cart', cartRouter);
app.use('/api/profile/cart/checkout', orderRouter);

initDatabase().then(async () => {
    await seedUsers();
    await seedProducts();

    app.listen({ port: PORT }, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})