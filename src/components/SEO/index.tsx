import * as React from 'react';
import Helmet from "react-helmet";
import urljoin from "url-join";
import config from "../../../config/SiteConfig";

const SEO = (props) => {
    const { postNode, postPath = '', postSEO, pageTitle } = props;
    let title;
    let description;
    let image;
    let postURL;
    if (postSEO) {
      const postMeta = postNode.frontmatter;
      ({ title } = postMeta);
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt;
      image = `/img/${postMeta.thumbnail}`;
      postURL = urljoin(config.siteUrl, config.pathPrefix, postPath);
    } else {
      title = pageTitle || config.siteTitle;
      description = config.siteDescription;
      image = config.siteLogo;
    }
    image = urljoin(config.siteUrl, config.pathPrefix, image);
    const blogURL = urljoin(config.siteUrl, config.pathPrefix, postPath);
    const schemaOrgJSONLD: any = [
      {
        // tslint:disable-next-line: no-http-string
        "@context": "http://schema.org",
        "@type": "Organization",
        url: blogURL,
        sameAs: config.userLinks.map(l => l.link),
        name: title,
        logo: config.siteUrl + config.siteLogo,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : ""
      }
    ];
    if (postSEO) {
      schemaOrgJSONLD.push([{
            // tslint:disable-next-line: no-http-string
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": postURL,
                name: title,
                image
              }
            }
          ]
        },
        {
          // tslint:disable-next-line: no-http-string
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          url: blogURL,
          name: title,
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
          headline: title,
          image: {
            "@type": "ImageObject",
            url: image
          },
          description
        }
      ]);
    }
    return (
        <Helmet>
            {/* General tags */}
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <link rel="icon" href="img/favicon.png" type="image/png" />
            <meta name="description" content={description} />
            <meta name="image" content={image} />

            {/* Schema.org tags */}
            <script type="application/ld+json">
                {JSON.stringify(schemaOrgJSONLD)}
            </script>

            {/* OpenGraph tags */}
            <meta property="og:url" content={`${postSEO ? postURL : blogURL}`}/>
            {postSEO ? <meta property="og:type" content="article" /> : <meta property="og:type" content="website" />}
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content={config.siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="fb:app_id" content={`${config.siteFBAppID ? config.siteFBAppID : ""}`}/>

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={`${config.userTwitter ? config.userTwitter : ""}`}/>
            <meta name="twitter:site" content={`${config.userTwitter ? config.userTwitter : ""}`} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}

export default SEO;