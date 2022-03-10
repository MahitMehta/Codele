const siteUrl = "https://codle.mahitm.com";

/** 
 * @type {import('next-sitemap').IConfig} 
 * */
const nextSiteMapConfig = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", allow: "/" }
        ]
    },
    exclude: [],
}

module.exports = nextSiteMapConfig;