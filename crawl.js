const { JSDOM } = require('jsdom')

async function crawlPage(currentURL) {
    console.log(`Currently crawling: ${currentURL}`);

    try {
        const response = await fetch(currentURL);

        if (response.status > 399) {
            console.error(`Error in fetch with status code ${response.status} on page ${currentURL}`);
            return;
        }

        const contentType = response.headers.get('content-type');

        if (!contentType.includes("text/html")) {
            console.error(`Non html response, content-type ${contentType} on page ${currentURL}`);
            return;
        }
        console.log(await response.text());
    } catch (err) {
        console.error(`Error in fetch: ${err.message}, on page: ${currentURL}`);
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
                console.error(`Failed parsing url: ${err.message}`)
            }
        } else {
            // absolute url
            try {
                const urlObject = new URL(`${linkTag.href}`);
                urls.push(linkTag.href)
            } catch (err) {
                console.error(`Failed parsing url: ${err.message}`)
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