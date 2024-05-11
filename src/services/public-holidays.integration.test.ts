import { 
    getListOfPublicHolidays, 
    getNextPublicHolidays, 
    checkIfTodayIsPublicHoliday 
} from "./public-holidays.service";

const { SUPPORTED_COUNTRIES = [] } = process.env;

describe("public-holidays.service", () => {
    const year = new Date().getFullYear();
    const country = SUPPORTED_COUNTRIES[0];

    describe('getListOfPublicHolidays', () => {
        it('returns a list of public holidays for a valid year and country', async () => {
            const holidays = await getListOfPublicHolidays(year, country);
            
            expect(Array.isArray(holidays)).toBe(true);
            expect(holidays.length).toBeGreaterThan(0);
            holidays.forEach((holiday) => {
                expect(holiday).toHaveProperty('date')
                expect(holiday).toHaveProperty('localName')
                expect(holiday).toHaveProperty('date')
            });
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
        it('returns true when today is a public holiday', async () => {
            const result = await checkIfTodayIsPublicHoliday(country);

            if (result) {
                expect(result).toBeTruthy();
            }
        });
    
        it('properly handles validation errors if an incorrect country is provided', () => {
            const invalidCountry = country + "S";

            expect(async () => {
                await checkIfTodayIsPublicHoliday(invalidCountry);
            }).rejects.toThrow(`Country provided is not supported, received: ${invalidCountry}`);
        });
    })
    describe("getNextPublicHolidays", () => {
        it('returns a list of next public holidays for a valid year and country', async () => {
            const holidays = await getNextPublicHolidays(country);

            expect(Array.isArray(holidays)).toBe(true);
            expect(holidays.length).toBeGreaterThan(0);
            holidays.forEach((holiday) => {
                expect(holiday).toHaveProperty('date')
                expect(holiday).toHaveProperty('localName')
                expect(holiday).toHaveProperty('date')
            });
        });
    
        it('properly handles validation errors if an incorrect country is provided', () => {
            const invalidCountry = country + "S";

            expect(async () => {
                await getNextPublicHolidays(invalidCountry);
            }).rejects.toThrow(`Country provided is not supported, received: ${invalidCountry}`);
        });
    })
})