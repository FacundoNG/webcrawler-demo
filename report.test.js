const { sortPages } = require('./report')
const { test, expect } = require('@jest/globals')

test('sortPages sort 3 pages', () => {
    const input = {
        'https://testsite.com': 10,
        'https://testsite.com/support': 2,
        'https://testsite.com/blog': 7,
    };

    const actualOutput = sortPages(input);

    const expectedOutput = [
        ['https://testsite.com', 10],
        ['https://testsite.com/blog', 7],
        ['https://testsite.com/support', 2],
    ];

    expect(actualOutput).toEqual(expectedOutput);
});


test('sortPages sort 5 pages', () => {
    const input = {
        'https://testsite.com/1': 1,
        'https://testsite.com/2': 502,
        'https://testsite.com/3': 23,
        'https://testsite.com/4': 40,
        'https://testsite.com/5': 8,
    };

    const actualOutput = sortPages(input);

    const expectedOutput = [
        ['https://testsite.com/2', 502],
        ['https://testsite.com/4', 40],
        ['https://testsite.com/3', 23],
        ['https://testsite.com/5', 8],
        ['https://testsite.com/1', 1],
    ];

    expect(actualOutput).toEqual(expectedOutput);
});
