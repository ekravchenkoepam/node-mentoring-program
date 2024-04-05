import express from 'express'
import { PORT } from './config';
import userRouter from './api/users/user.router';
import productRouter from './api/product/product.router';
import cartRouter from './api/cart/cart.router';

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/profile/cart', cartRouter);

app.listen({ port: PORT}, () => {
    console.log(`Server is running on port ${PORT}`);
});