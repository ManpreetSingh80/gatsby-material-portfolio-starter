const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const moment = require("moment");
const siteConfig = require("./config/SiteConfig");

const kebabCase = (v) => v.toLowerCase().replace(/[^a-zA-Z0-9 -]/g, '').replace(/\s+/g, '-')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    createNodeField({ node, name: "type", value: parsedFilePath.dir ? parsedFilePath.dir : 'page' });

    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }
    

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({
          node,
          name: "date",
          value: date.toISOString()
        });
      }
    }
    
    createNodeField({ node, name: "slug", value: slug });
  }
}

function getCategories(list) {
  const p = {};
  list.filter(l => l.frontmatter.category).forEach((item) => {
      if(!p[item.frontmatter.category]) {
        p[item.frontmatter.category] = [];
      }

      const link = `${item.fields.type !== 'page' ? `/${item.fields.type}` : ''}${item.fields.slug}`;
        p[item.frontmatter.category].push({
        title: item.frontmatter.title,
        thumbnail: item.frontmatter.thumbnail,
        description: item.frontmatter.description,
        link: link,
        showDescription: false
      });
  })
  return Object.keys(p).map((product) => ({title: product, link: `/tagged/${kebabCase(product)}`, children: p[product]}))
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  
  const postPage = path.resolve("src/templates/post.tsx");
  const blogPage = path.resolve("src/templates/blog.tsx");
  const tagPage = path.resolve("src/templates/tag.tsx");
  // const categoryPage = path.resolve("src/templates/category.jsx");

  const markdownQueryResult = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              timeToRead
              fields {
                slug
                type
              }
              frontmatter {
                title
                tags
                category
                date
                tags
                thumbnail
                suggestion
              }
            }
          }
        }
      }
    `
  );

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;
  const categories = getCategories(postsEdges.map((e) => e.node));

  postsEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    const dateB = moment(
      postB.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  const postTypes = {};
  const pages = [];

  postsEdges.forEach((edge, index) => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach(tag => {
        tagSet.add(tag);
      });
    }

    if (!postTypes[edge.node.fields.type]) {
      postTypes[edge.node.fields.type] = [];
    }
    if (edge.node.frontmatter.suggestion !== false) {
      postTypes[edge.node.fields.type].push(edge);
    } else {
      pages.push(edge);
    }
    

    // if (edge.node.frontmatter.category) {
    //   categorySet.add(edge.node.frontmatter.category);
    // }
    
  });

  Object.keys(postTypes).forEach((type) => {
    postTypes[type].forEach((edge, index) => {
      const suggestions = [];
      if (index > 1) {
        suggestions.push(...(postTypes[type].slice(index-2, index)));
        suggestions.push(...(postTypes[type].slice(index+1, index+2)))
      } else {
        suggestions.push(...(postTypes[type].slice(0, index)));
        suggestions.push(...(postTypes[type].slice(index+1, index + 1 + (3-suggestions.length))));
      }

      const path = `${type !== 'page' ? type : ''}${edge.node.fields.slug}`;
      createPage({
        path: path,
        component: type === 'blog' ? blogPage : postPage,
        context: {
          slug: edge.node.fields.slug,
          suggestions,
          categories
        }
      });
    });
  });

  pages.forEach(page => {
    createPage({
      path: page.node.fields.slug,
      component: postPage,
      context: {
        slug: page.node.fields.slug,
        suggestions: [],
        categories
      }
    });
  })
  

  tagSet.forEach(tag => {
    createPage({
      path: `/tagged/${kebabCase(tag)}/`,
      component: tagPage,
      context: {
        tag,
        categories
      }
    });
  });
  // categorySet.forEach(category => {
  //   createPage({
  //     path: `/categories/${_.kebabCase(category)}/`,
  //     component: categoryPage,
  //     context: {
  //       category
  //     }
  //   });
  // });

}
