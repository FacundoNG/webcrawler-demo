const { crawlPage } = require('./crawl');

function main() {
    if (process.argv.length < 3) {
        console.error('No website provided');
        process.exit(1);
    } else if (process.argv.length < 3) {
        console.error('This program only accepts 1 arg');
        process.exit(1);
    }

    const baseURL = process.argv[2];

    console.log(`Beginning crawl on: ${baseURL}`);
    crawlPage(baseURL);
}

main();