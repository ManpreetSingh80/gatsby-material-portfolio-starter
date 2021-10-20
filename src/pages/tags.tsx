import * as React from "react"
import { graphql } from "gatsby"
import HomeLayout from '../components/layouts/home-layout';
import ProductContainer from '../components/product-container/container';
import Card from '../components/cards/card3';
import Helmet from "react-helmet";
import SEO from "../components/SEO";
import * as config from '../../config/SiteConfig.js';

const kebabCase = (v) => v.toLowerCase().replace(/[^a-zA-Z0-9 -]/g, '').replace(/\s+/g, '-')


function getCards(list) {
  const p = {};
  list.forEach((item) => {
    if(!p[item.frontmatter.category]) {
      p[item.frontmatter.category] = [];
    }
    const link = `${item.fields.type !== 'page' ? `/${item.fields.type}` : ''}${item.fields.slug}`;
    p[item.frontmatter.category].push({
      title: item.frontmatter.title,
      thumbnail: item.frontmatter.thumbnail,
      description: item.frontmatter.description,
      link: link,
      tags: item.frontmatter.tags,
      showTags: true,
      showDescription: true
    });
  })
  return Object.keys(p).map((product) => ({title: product, cards: p[product]}));
}

function getCategories(list) {
  const p = {};
  list.forEach((item) => {
    if(!p[item.frontmatter.category]) {
      p[item.frontmatter.category] = [];
    }

    const link = `${item.fields.type !== 'page' ? `/${item.fields.type}` : ''}${item.fields.slug}`;
    p[item.frontmatter.category].push({
      title: item.frontmatter.title,
      thumbnail: item.frontmatter.thumbnail,
      description: item.frontmatter.description,
      link: link,
      showDescription: true
    });
  })
  return Object.keys(p).map((product) => ({title: product, link: `/tagged/${kebabCase(product)}`, children: p[product]}))
}

function getTags(list) {
  const tags = {};
  list.forEach((item) => {
    item.frontmatter.tags.forEach((tag) => {
      if (!tags[tag]) {
        tags[tag] = [];
      }

      const link = `${item.fields.type !== 'page' ? `/${item.fields.type}` : ''}${item.fields.slug}`;
      tags[tag].push({
        title: item.frontmatter.title,
        thumbnail: item.frontmatter.thumbnail,
        description: item.frontmatter.description,
        link: link,
        tags: item.frontmatter.tags,
        showTags: false,
        showDescription: true
      });
    });
  });
  return Object.keys(tags).map((tag) => ({title: tag, cards: tags[tag]}));
}

export default (props) => {
  const {data} = props;

  const list = data.allMarkdownRemark.edges.map((e: any) => e.node);
  const cards = getTags(list);
  const categories = getCategories(list);
  const title = `Tags | ${config.siteTitle}`;
  return (
    <>
      <HomeLayout categories={categories}>
          <Helmet>
            <title>{title}</title>
            <link rel="canonical" href={`${config.siteUrl}${props.path}`} />
          </Helmet>
          <SEO pageTitle={title} postPath={props.path}/>
        <br/><br/>
          {cards.map((card) => (<ProductContainer key={card.title} Card={Card} {...card} />))}
      </HomeLayout>
    </>
  );
}
  
export const query = graphql`
  query {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC},
      filter: {frontmatter: {category: {ne: null}}}
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            description
            date
            tags
            category
            thumbnail
          }
          fields {
            slug
            type
          }
          excerpt
        }
      }
    }
  }
`