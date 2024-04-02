import { Schema, model } from 'mongoose';
import { Product } from '../../types';

const productSchema = new Schema<Product>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = model<Product>('Product', productSchema);

export default Product;
