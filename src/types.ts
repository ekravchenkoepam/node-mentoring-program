import { Request } from "express";

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
    id: string;
    name: string;
    surname: string;
    email: string;
}

export type UserExtended = User & {
    id: string;
    hobbies: string[];
}

export type Body = User & {
    hobby: string
}

export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
}

export type Cart = {
    id?: string;
    userId: string | null;
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

export type Order = {
    id: string;
    userId: string;
    cartId: string;
    items: CartItem[];
    payment: PaymentInfo;
    delivery: DeliveryInfo;
    comments: string;
    status: OrderStatus;
    total: number;
};

export interface RequestCustom extends Request {
    user?: UserExtended;
    productId?: string;
    count?: number;
}