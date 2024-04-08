import { Schema, model } from 'mongoose';
import { Cart } from '../../types';

const cartSchema = new Schema<Cart>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
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

const CartModel = model<Cart>('Cart', cartSchema);

export default CartModel;
