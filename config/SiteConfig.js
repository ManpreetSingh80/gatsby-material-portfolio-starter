const config = {
  siteTitle: "Gatsby Material Portfolio", // Site title.
  siteTitleShort: "Gatsby Material Portfolio", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Gatsby Material Portfolio", // Alternative site title for SEO.
  siteLogo: "/img/site-logo.png", // Logo used for SEO and manifest.
  siteUrl: "https://gatsby-material-portfolio-starter.pages.dev", // Domain of your website without pathPrefix.
  contactSubmitAPI: "https://oauth.kronosdevstudio.workers.dev/contact", // url where contact form will be submitted
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  siteDescription: "A lightweight, mobile portfolio website with integrated blog for gatsby", // Website description used for RSS feeds/meta description tag.
  siteFBAppID: "", // FB Application ID for using app insights
  siteGATrackingID: "UA-210640680-1", // Tracking code ID for google analytics.
  disqusShortname: "kronosdevstudio", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  postDefaultAuthor: 'Gatsby Material Portfolio',
  dateFromFormat: "DD-MM-YYYY", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  userTwitter: "@kronosdevstudio", // Optionally renders "Follow Me" in the UserInfo segment.
  userLinks: [
    // {
    //   title: "Twitter",
    //   link: "https://twitter.com/kronosdevstudio",
    //   icon: 'FaTwitter'
    // },
    // {
    //   title: "Facebook",
    //   link: "https://facebook.com/kronosdevstudio",
    //   icon: "FaFacebookF"
    // },
    {
      title: "Github",
      link: "https://github.com/ManpreetSingh80/gatsby-material-portfolio-starter",
      icon: "FaGithub"
    },
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/manpreetsingh80",
      icon: "FaLinkedinIn"
    }
  ]
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else if (config.pathPrefix !== "") {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

module.exports = config;
