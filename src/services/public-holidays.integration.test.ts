import { 
    getListOfPublicHolidays, 
    getNextPublicHolidays, 
    checkIfTodayIsPublicHoliday 
} from "./public-holidays.service";
import { SUPPORTED_COUNTRIES } from "../config";

describe("public-holidays.service", () => {
    const year = new Date().getFullYear();
    const country = SUPPORTED_COUNTRIES[0];
    
    describe('getListOfPublicHolidays', () => {
        it('returns a list of public holidays for a valid year and country', async () => {
            const holidays = await getListOfPublicHolidays(year, country);
            
            expect(holidays).not.toHaveLength(0);
        });
    
        it('should throw error if incorrect year is provided', async () => {
            const invalidYear = year + 1;
    
            expect(async () => {
                await getListOfPublicHolidays(invalidYear, country);
            }).rejects.toThrow(`Year provided not the current, received: ${invalidYear}`);
        });
    
        it('should throw error if an incorrect country is provided', () => {
            const invalidCountry = country + "S";
    
            expect(async () => {
                await getListOfPublicHolidays(year, invalidCountry);
            }).rejects.toThrow(`Country provided is not supported, received: ${invalidCountry}`);
        });
    })

    describe("checkIfTodayIsPublicHoliday", () => {

    })
    describe("getNextPublicHolidays", () => {

    })
})