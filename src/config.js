module.exports = {
  markdownItOptions: {
    html: false,
    xhtmlOut: false,
    breaks: true,
    langPrefix: "language-",
    linkify: true,
    typographer: false,
    quotes: "“”‘’"
  },
  api: {
    development: {
      url: "https://api.zilif.dev"
    },
    production: {
      url: "https://api.zilif.dev"
    }
  },
  siteConfig: {
    posts: {
      type: "post",
      sortOn: "posted"
    }
  },
  meta: {
    url: "https://api.zilif.dev",
    appID: "74bffe3e-4789-4008-89be-d171f603e0cb",
    title: "ZILIF",
    subtitle: "Adventures in ZIL"
  },
  debug: false
};
