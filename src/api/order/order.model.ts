import { Schema, model } from "mongoose";
import { Order } from "../../types";

const orderSchema = new Schema<Order>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
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
    }],
    payment: {
        type: {
            type: String,
            required: true
        },
        address: String,
        creditCard: String
    },
    delivery: {
        type: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    comments: String,
    status: {
        type: String,
        enum: ['created', 'completed'],
        default: 'created'
    },
    total: {
        type: Number,
        required: true
    }
})

const OrderModel = model<Order>('Order', orderSchema);

export default OrderModel;