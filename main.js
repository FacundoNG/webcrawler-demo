const { crawlPage } = require('./crawl');

async function main() {
    if (process.argv.length < 3) {
        console.error('No website provided');
        process.exit(1);
    } else if (process.argv.length < 3) {
        console.error('This program only accepts 1 arg');
        process.exit(1);
    }

    const baseURL = process.argv[2];

    console.log(`Beginning crawl of: ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});
    
    for (const page of Object.entries(pages)) {
        console.log(page);
    }
}

main();