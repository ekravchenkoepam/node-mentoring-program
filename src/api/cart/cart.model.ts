import { Schema, model } from 'mongoose';
import { Cart } from '../../types';

const cartSchema = new Schema<Cart>({
    id: {
        type: String,
        required: false,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    isDeleted: {
        type: Boolean,
        required: true
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }]
});

const Cart = model<Cart>('Cart', cartSchema);

export default Cart;
