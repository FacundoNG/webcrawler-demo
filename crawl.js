const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {

    const baseURLObject = new URL(baseURL);
    const currentURLObject = new URL(currentURL);

    // Return upon finding an external hostname
    if (baseURLObject.hostname !== currentURLObject.hostname) {
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);

    // Return upon crawling a repeated
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;

    console.log(`Currently crawling: ${currentURL}`);
    try {
        const response = await fetch(currentURL);

        // Exit on error codes
        if (response.status > 399) {
            console.log(`Error in fetch with status code ${response.status} on page ${currentURL}`);
            return pages;
        }

        const contentType = response.headers.get('content-type');

        // Exit on non-html responses
        if (!contentType.includes("text/html")) {
            console.log(`Non html response, content-type ${contentType} on page ${currentURL}`);
            return pages;
        }

        const htmlBody = await response.text();

        const nextURLs = getURLsfromHTML(htmlBody, baseURL);
        
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages);
        }

        return pages;

    } catch (err) {
        console.log(`Error in fetch: ${err.message}, on page: ${currentURL}`);
    }
}


function getURLsfromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);

    const linkTags = dom.window.document.querySelectorAll('a');

    for (const linkTag of linkTags) {
        if (linkTag.href.slice(0, 1) === '/') {
            // relative url
            try {
                const urlObject = new URL(`${baseURL}${linkTag.href}`);
                urls.push(`${urlObject.href}`)
            } catch (err) {
                console.log(`Failed parsing url: ${err.message}`)
            }
        } else {
            // absolute url
            try {
                const urlObject = new URL(`${linkTag.href}`);
                urls.push(linkTag.href)
            } catch (err) {
                console.log(`Failed parsing url: ${err.message}`)
            }
        }
    }

    return urls;
}

function normalizeURL(urlString) {
    const url = new URL(urlString);
    const hostPath = `${url.hostname}${url.pathname}`.toLowerCase();
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }

    return hostPath;
}


module.exports = {
    crawlPage,
    normalizeURL,
    getURLsfromHTML
}