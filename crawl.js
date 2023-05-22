const { JSDOM } = require('jsdom')

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
                console.log(`failed parsing url: ${err.message}`)
            }
        } else {
            // absolute url
            try {
                const urlObject = new URL(`${linkTag.href}`);
                urls.push(linkTag.href)
            } catch (err) {
                console.log(`failed parsing url: ${err.message}`)
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
    normalizeURL,
    getURLsfromHTML
}