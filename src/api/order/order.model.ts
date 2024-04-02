import { Schema, model } from "mongoose";
import { Order } from "../../types";

const orderSchema = new Schema<Order>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    cartId: {
        type: String,
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

const Order = model<Order>('Cart', orderSchema);

export default Order;