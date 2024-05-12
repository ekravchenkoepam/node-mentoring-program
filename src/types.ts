import { Request } from "express";
import { Document, Types } from 'mongoose';

export type PublicHoliday = {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties: string[] | null;
    launchYear: number | null;
    types: string[];
};

export type PublicHolidayShort = Pick<PublicHoliday, 'name' | 'date' | 'localName'>;

export type LongWeekend = {
    startDate: string;
    endDate: string;
    dayCount: number;
    needBridgeDay: boolean;
};

export type User = {
    name?: string;
    surname?: string;
    email: string;
    password: string;
    role: string;
    hobbies?: string[];
}

export type UserExtended = User & {
    id?: string;
    hobbies: string[];
}

export type Body = User & {
    hobby: string
}

export type Product = Document & {
    _id?: Types.ObjectId;
    title: string;
    description: string;
    price: number;
}

export type Cart = Document & {
    _id?: Types.ObjectId;
    userId?: Types.ObjectId;
    isDeleted: boolean;
    items: CartItem[];
}

export type CartItem = {
    product: Product;
    count: number
}

type PaymentInfo = {
    type: string;
    address?: string;
    creditCard?: string;
};

type DeliveryInfo = {
    type: string;
    address: string;
};

type OrderStatus = 'created' | 'completed';

export type Order = Document & {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    cartId: Types.ObjectId;
    items: CartItem[];
    payment: PaymentInfo;
    delivery: DeliveryInfo;
    comments: string;
    status: OrderStatus;
    total: number;
};

export interface RequestCustom extends Request {
    user?: UserExtended;
    productId?: Types.ObjectId;
    count?: number;
}