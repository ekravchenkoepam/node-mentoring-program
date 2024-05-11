import express from 'express'
import 'dotenv/config'
import { initDatabase } from './database';
import { RequestContext } from '@mikro-orm/postgresql';
import { authenticateToken } from './middleware';
import { gracefulShutdown } from './gracefulShutdown';

import userRouter from './api/users/user.router';
import productRouter from './api/product/product.router';
import cartRouter from './api/cart/cart.router';
import orderRouter from './api/order/order.router';
import authRouter from './api/auth/auth.router';

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.use(authenticateToken);

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/profile/cart', cartRouter);
app.use('/api/profile/cart/checkout', orderRouter);
app.use('/api/auth', authRouter);

initDatabase().then((em) => {
    app.use((req, res, next) => RequestContext.create(em, next));

    const server = app.listen({ port: PORT }, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    gracefulShutdown(server);
})