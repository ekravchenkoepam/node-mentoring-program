import axios from "axios"
import { 
    getListOfPublicHolidays, 
    getNextPublicHolidays, 
    checkIfTodayIsPublicHoliday 
} from "./public-holidays.service";
import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import { shortenPublicHoliday } from '../helpers';
import { PublicHoliday } from '../types';

describe("public-holidays.service", () => {
    describe('getListOfPublicHolidays', () => {
        let year: number;
        let country: string;
        let url: string;
    
        beforeEach(() => {
            year = 2024;
            country = 'FR';
            url = `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`;
        });
    
        it('returns public holidays when API is successful', async () => {
            const mockData: PublicHoliday[] = [
                {
                    date: '2023-01-01',
                    localName: 'New Year\'s Day',
                    name: 'New Year\'s Day',
                    countryCode: 'FR',
                    fixed: true,
                    global: true,
                    counties: null,
                    launchYear: 1870,
                    types: ['National holiday']
                },
                {
                    date: '2023-04-10',
                    localName: 'Constitution Day',
                    name: 'Constitution\'s Day',
                    countryCode: 'FR',
                    fixed: true,
                    global: true,
                    counties: null,
                    launchYear: 1958,
                    types: ['National holiday']
                }
            ];
    
            const axiosGetSpy = jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });
            const publicHolidays = await getListOfPublicHolidays(year, country);
    
            expect(publicHolidays).toEqual(mockData.map(shortenPublicHoliday));
            expect(axiosGetSpy).toHaveBeenCalledWith(url);
        });
    
        it('returns an empty array when API returns an error', async () => {
            const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Mocked error')));
            const publicHolidays = await getListOfPublicHolidays(year, country);
    
            expect(publicHolidays).toEqual([]);
            expect(axiosGetSpy).toHaveBeenCalledWith(url);
        });
    });
    
    describe("checkIfTodayIsPublicHoliday", () => {
        let country: string;
        let url: string;

        beforeEach(() => {
            country = 'FR';
            url = `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`;
        });

        it("returns true when API is successful", async () => {
            const status = 200;
            const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
                status
            }))
    
            const isHoliday = await checkIfTodayIsPublicHoliday(country)
    
            expect(axiosGetSpy).toHaveBeenCalledWith(url);
            expect(isHoliday).toEqual(true)
        })

        it('returns false when API returns an error', async () => {
            const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Mocked error')));
            const isHoliday = await checkIfTodayIsPublicHoliday(country);
        
            expect(axiosGetSpy).toHaveBeenCalledWith(url);
            expect(isHoliday).toEqual(false);
        });
    })

    describe('getNextPublicHolidays', () => {
        let country: string;
        let url: string;

        beforeEach(() => {
            country = 'FR';
            url = `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`;
        });

        it('returns the public holidays when API is successful', async () => {
            const mockData: PublicHoliday[] = [
                {
                    date: '2023-01-01',
                    localName: 'New Year\'s Day',
                    name: 'New Year\'s Day',
                    countryCode: 'FR',
                    fixed: true,
                    global: true,
                    counties: null,
                    launchYear: 1870,
                    types: ['National holiday']
                },
                {
                    date: '2023-04-10',
                    localName: 'Constitution Day',
                    name: 'Constitution\'s Day',
                    countryCode: 'FR',
                    fixed: true,
                    global: true,
                    counties: null,
                    launchYear: 1958,
                    types: ['National holiday']
                }
            ];
    
            const axiosGetSpy = jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });
            const publicHolidays = await getNextPublicHolidays('FR');
    
            expect(publicHolidays).toEqual(mockData.map(shortenPublicHoliday));
            expect(axiosGetSpy).toHaveBeenCalledWith(url);
        });
    
        it('returns an empty array when API returns an error', async () => {
            const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Mocked error')));
            const publicHolidays = await getNextPublicHolidays('FR');
    
            expect(publicHolidays).toEqual([]);
            expect(axiosGetSpy).toHaveBeenCalledWith(url);
        });
    })

    afterEach(() => {
        jest.clearAllMocks();
    });
})