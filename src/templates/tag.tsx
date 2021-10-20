import * as React from "react"
import { graphql } from "gatsby"
import HomeLayout from '../components/layouts/home-layout';
import ProductContainer from '../components/product-container/container';
import Card3 from '../components/cards/card3';
import * as config from '../../config/SiteConfig.js';
import Helmet from "react-helmet";
import SEO from "../components/SEO";

export default (props) => {
  const {tag, categories} = props.pageContext;
  const nodes = props.data.allMarkdownRemark.edges.map((e: any) => e.node);
  const cards = [{title: tag, cards: nodes.map((node) => ({
    title: node.frontmatter.title,
    thumbnail: node.frontmatter.thumbnail,
    description: node.frontmatter.description,
    link: `${node.fields.type !== 'page' ? `/${node.fields.type}` : ''}${node.fields.slug}`,
    showDescription: true,
    tags: node.frontmatter.tags,
    showTags: false,
    showBottom: false
  }))}];
  const title = `${tag} | ${config.siteTitle}`;
  return (
    <>
        <HomeLayout categories={categories}>
          <Helmet>
            <title>{title}</title>
            <link rel="canonical" href={`${config.siteUrl}${props.path}`} />
          </Helmet>
          <SEO pageTitle={title} postPath={props.path}/>
          <br/><br/>
            {cards.map((card) => (<ProductContainer key={card.title} Card={Card3} {...card} />))}
        </HomeLayout>
    </>
  )
}
  
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
            type
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            thumbnail
            date
            description
          }
        }
      }
    }
  }
`;