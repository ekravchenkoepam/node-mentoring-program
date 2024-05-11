import { PublicHoliday, PublicHolidayShort } from './types';
import {
    validateInput,
    shortenPublicHoliday
} from "./helpers";

const { SUPPORTED_COUNTRIES = [] } = process.env;

describe("helpers", () => {
    describe("validateInput", () => {
        it('returns true for valid inputs', () => {
            const country = SUPPORTED_COUNTRIES[0];
            const year = new Date().getFullYear()

            expect(validateInput({ year, country })).toBeTruthy()
        })

        it('throws an error for unsupported country', () => {
            const country = 'US';

            expect(() => validateInput({ country }))
                .toThrow(new Error(`Country provided is not supported, received: ${country}`));
        })

        it('throws an error for invalid year', () => {
            const year = 2000;

            expect(() => validateInput({ year }))
                .toThrow(new Error(`Year provided not the current, received: ${year}`));
        });
    })

    describe('shortenPublicHoliday', () => {
        it('returns the shortened holiday', () => {
            const mockHoliday: PublicHoliday = { 
                date: '2022-01-01',
                localName: 'New Year\'s Day',
                name: 'New Year\'s Day',
                countryCode: 'FR',
                fixed: true,
                global: true,
                counties: null,
                launchYear: 1870,
                types: ['National holiday']
            };
            const expectedOutput: PublicHolidayShort = { 
                date: '2022-01-01',
                localName: 'New Year\'s Day',
                name: 'New Year\'s Day',
            };

            expect(shortenPublicHoliday(mockHoliday)).toEqual(expectedOutput);
        });
    });
})
