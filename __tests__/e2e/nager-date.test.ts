import request from 'supertest';
import { PublicHoliday } from '../../src/types';

const {
    SUPPORTED_COUNTRIES = [],
    PUBLIC_HOLIDAYS_API_URL = ''
} = process.env;

type Country = {
    countryCode: string,
    name: string
}

describe('Date nager API', () => {
    describe('/AvailableCountries', () => {
        test('should return 200 and available countries', async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/AvailableCountries`);

            expect(status).toEqual(200);
            expect(Array.isArray(body)).toBe(true);
            expect(body.length).toBeGreaterThan(0);

            body.forEach((country: Country) => {
                expect(country).toHaveProperty('countryCode');
                expect(country).toHaveProperty('name');
            });
        });
    });
    describe('/PublicHolidays', () => {
        test('should return 200 and available countries', async () => {
            const year = new Date().getFullYear();
            const countryCode = SUPPORTED_COUNTRIES[0]
            const expectedKeys = [
                'date',
                'localName', 
                'name',
                'countryCode',
                'fixed',
                'global',
                'counties',
                'launchYear',
                'types',
            ];

            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/PublicHolidays/${year}/${countryCode}`);

            expect(status).toEqual(200);
            expect(Array.isArray(body)).toBe(true);
            expect(body.length).toBeGreaterThan(0);

            body.forEach((holiday: PublicHoliday) => {
                expectedKeys.every(key => expect(holiday).toHaveProperty(key));
            });
        });
    });
});