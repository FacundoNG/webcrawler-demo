const { normalizeURL, getURLsfromHTML } = require('./crawl')
const { test, expect } = require('@jest/globals')

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

//  getURLsFromHTML

test('getURLsFromHTML absolute urls', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="https://digitalocean.com/blog"
                DigitalOcean Blog
            </a>
        </body>
    <html>
    `
    const inputBaseURL = 'https://digitalocean.com/blog'
    const actualOutput = getURLsfromHTML(inputHTML, inputBaseURL);
    const expectedOutput = ['https://digitalocean.com/blog'];

    expect(actualOutput).toEqual(expectedOutput);
});


test('getURLsFromHTML relative urls', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="/blog/"
                DigitalOcean Blog
            </a>
        </body>
    <html>
    `
    const inputBaseURL = 'https://digitalocean.com'
    const actualOutput = getURLsfromHTML(inputHTML, inputBaseURL);
    const expectedOutput = ['https://digitalocean.com/blog/'];

    expect(actualOutput).toEqual(expectedOutput);
});

test('getURLsFromHTML get multiple urls', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="/blog/"
                DigitalOcean Blog
            </a>
            <a href="/login/"
                DigitalOcean Support
            </a>
            <a href="https://digitalocean.com/support/"
                DigitalOcean Support
            </a>
        </body>
    <html>
    `
    const inputBaseURL = 'https://digitalocean.com'
    const actualOutput = getURLsfromHTML(inputHTML, inputBaseURL);
    const expectedOutput = [
        'https://digitalocean.com/blog/',
        'https://digitalocean.com/login/',
        'https://digitalocean.com/support/'
    ];

    expect(actualOutput).toEqual(expectedOutput);
});

test('getURLsFromHTML invalid URL', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="counter"
                Add 1
            </a>
        </body>
    <html>
    `
    const inputBaseURL = 'https://digitalocean.com'
    const actualOutput = getURLsfromHTML(inputHTML, inputBaseURL);
    const expectedOutput = [];

    expect(actualOutput).toEqual(expectedOutput);
});