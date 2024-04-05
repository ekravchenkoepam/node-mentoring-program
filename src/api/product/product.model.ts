import { Schema, model } from 'mongoose';
import { Product } from '../../types';

const productSchema = new Schema<Product>({
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

const ProductModel = model<Product>('Product', productSchema);

export default ProductModel;
