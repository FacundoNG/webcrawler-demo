function printReport(pages) {
    console.log("==========");
    console.log("RESULTS");
    console.log("==========");

    const sortedPages = sortPages(pages);

    for (const sortedPage of sortedPages) {
        const url = sortedPage[0];
        const hits = sortedPage[1];
        if (hits > 1) {
            console.log(`Found ${hits} links to: ${url}`)
        } else {
            console.log(`Found ${hits} link to: ${url}`);
        }

    }

    console.log("==========");
    console.log("END RESULTS");
    console.log("==========");
}

function sortPages(pages) {
    const pagesArray = Object.entries(pages);

    pagesArray.sort((a, b) => {
        return b[1] - a[1];
    })

    return pagesArray;
}

module.exports = {
    sortPages,
    printReport
}