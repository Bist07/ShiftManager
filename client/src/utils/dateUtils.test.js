import { getDatesBetween } from './dateUtils';

describe('getDatesBetween', () => {
    test('should return dates for a single week with no frequency specified', () => {
        const startDate = '2025-01-01'; // Wednesday
        const result = getDatesBetween(startDate, '', '', [1, 3, 5]); // Mon, Wed, Fri
        const expected = [
            '2025-01-01', // Wednesday
            '2025-01-03', // Friday
        ];
        expect(result).toEqual(expected);
    });

    test('should handle empty days array by defaulting to start date day', () => {
        const startDate = '2025-01-01'; // Wednesday
        const endDate = '2025-01-07';   // Tuesday
        const result = getDatesBetween(startDate, endDate, '', []);
        const expected = [
            '2025-01-01', // Start date itself
        ];
        expect(result).toEqual(expected);
    });

    test('should calculate dates with a frequency of 7 days', () => {
        const startDate = '2025-01-01'; // Wednesday
        const endDate = '2025-01-31';   // End of the month
        const result = getDatesBetween(startDate, endDate, 7, [1, 3]); // Mon, Wed
        const expected = [
            '2025-01-01', // Wed
            '2025-01-06', // Mon
            '2025-01-08', // Wed
            '2025-01-13', // Mon
            '2025-01-15', // Wed
            '2025-01-20', // Mon
            '2025-01-22', // Wed
            '2025-01-27', // Mon
            '2025-01-29', // Wed
        ];
        expect(result).toEqual(expected);
    });

    test('should calculate dates without an endDate, defaulting to week end', () => {
        const startDate = '2025-01-01'; // Wednesday
        const result = getDatesBetween(startDate, '', '', [1, 3]); // Mon, Wed
        const expected = [
            '2025-01-01', // Wed
        ];
        expect(result).toEqual(expected);
    });

    test('should handle invalid inputs gracefully', () => {
        const startDate = '2025-01-01'; // Wednesday
        expect(() => getDatesBetween(null, '2025-01-07', '', [1, 3])).toThrow();
        expect(() => getDatesBetween(startDate, '2025-01-07', '', null)).toThrow();
        expect(() => getDatesBetween(startDate, 'invalid-date', '', [1, 3])).toThrow();
    });

    test('should return an empty array if no valid dates are found', () => {
        const startDate = '2025-01-01'; // Wednesday
        const endDate = '2025-01-07';   // Tuesday
        const result = getDatesBetween(startDate, endDate, '', [2]); // Only Tuesday
        const expected = [];
        expect(result).toEqual(expected);
    });

    test('should correctly handle frequency that spans multiple weeks', () => {
        const startDate = '2025-01-01'; // Wednesday
        const endDate = '2025-01-20';   // Monday
        const result = getDatesBetween(startDate, endDate, 14, [1, 3]); // Mon, Wed
        const expected = [
            '2025-01-01', // Wed
            '2025-01-06', // Mon
            '2025-01-15', // Wed (14 days later)
            '2025-01-20', // Mon
        ];
        expect(result).toEqual(expected);
    });
});
