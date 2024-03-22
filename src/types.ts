import { type } from "os";

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