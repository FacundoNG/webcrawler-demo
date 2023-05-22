const {normalizeURL} = require('./crawl')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://digitalocean.com/blog';
    const actualOutput = normalizeURL(input);
    const expectedOutput = 'digitalocean.com/blog';

    expect(actualOutput).toEqual(expectedOutput);
});


test('normalizeURL trailing slashes', () => {
    const input = 'https://digitalocean.com/blog/';
    const actualOutput = normalizeURL(input);
    const expectedOutput = 'digitalocean.com/blog';

    expect(actualOutput).toEqual(expectedOutput);
});

test('normalizeURL handle capitals', () => {
    const input = 'https://DigitalOcean.com/BLoG';
    const actualOutput = normalizeURL(input);
    const expectedOutput = 'digitalocean.com/blog';

    expect(actualOutput).toEqual(expectedOutput);
});

test('normalizeURL trim http protocol', () => {
    const input = 'http://digitalocean.com/blog';
    const actualOutput = normalizeURL(input);
    const expectedOutput = 'digitalocean.com/blog';

    expect(actualOutput).toEqual(expectedOutput);
});