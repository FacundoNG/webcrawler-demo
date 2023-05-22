const { normalizeURL, getURLsfromHTML } = require('./crawl')
const { test, expect } = require('@jest/globals')

test('normalizeURL: strip https protocol', () => {
    const input = 'https://testsite.com/blog';
    const actualOutput = normalizeURL(input);
    const expectedOutput = 'testsite.com/blog';

    expect(actualOutput).toEqual(expectedOutput);
});

test('normalizeURL: strip http protocol', () => {
    const input = 'http://testsite.com/blog';
    const actualOutput = normalizeURL(input);
    const expectedOutput = 'testsite.com/blog';

    expect(actualOutput).toEqual(expectedOutput);
});

test('normalizeURL: remove trailing slashes', () => {
    const input = 'https://testsite.com/blog/';
    const actualOutput = normalizeURL(input);
    const expectedOutput = 'testsite.com/blog';

    expect(actualOutput).toEqual(expectedOutput);
});

test('normalizeURL: lowercase capitals', () => {
    const input = 'https://tEsTSIte.com/BLoG';
    const actualOutput = normalizeURL(input);
    const expectedOutput = 'testsite.com/blog';

    expect(actualOutput).toEqual(expectedOutput);
});



//  getURLsFromHTML

test('getURLsFromHTML: get absolute urls', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="https://testsite.com/blog"
                TestSite Blog
            </a>
        </body>
    <html>
    `
    const inputBaseURL = 'https://testsite.com/blog'
    const actualOutput = getURLsfromHTML(inputHTML, inputBaseURL);
    const expectedOutput = ['https://testsite.com/blog'];

    expect(actualOutput).toEqual(expectedOutput);
});


test('getURLsFromHTML: get relative urls', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="/blog/"
                TestSite Blog
            </a>
        </body>
    <html>
    `
    const inputBaseURL = 'https://testsite.com'
    const actualOutput = getURLsfromHTML(inputHTML, inputBaseURL);
    const expectedOutput = ['https://testsite.com/blog/'];

    expect(actualOutput).toEqual(expectedOutput);
});

test('getURLsFromHTML: get multiple urls', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="/blog/"
                TestSite Blog
            </a>
            <a href="/login/"
                TestSite Support
            </a>
            <a href="https://testsite.com/support/"
                TestSite Support
            </a>
        </body>
    <html>
    `
    const inputBaseURL = 'https://testsite.com'
    const actualOutput = getURLsfromHTML(inputHTML, inputBaseURL);
    const expectedOutput = [
        'https://testsite.com/blog/',
        'https://testsite.com/login/',
        'https://testsite.com/support/'
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
    const inputBaseURL = 'https://testsite.com'
    const actualOutput = getURLsfromHTML(inputHTML, inputBaseURL);
    const expectedOutput = [];

    expect(actualOutput).toEqual(expectedOutput);
});