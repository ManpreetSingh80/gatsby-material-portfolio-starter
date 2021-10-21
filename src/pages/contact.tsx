import * as React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet";
import SEO from "../components/SEO";
import * as config from '../../config/SiteConfig.js';
import Cover from '../components/cover';
import Container from '@material-ui/core/Container';
import PostLayout from '../components/layouts/post-layout';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ContactPage from '../components/contact';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    coverContainer: {
        padding: 0,
        marginTop: 0,
        marginBottom: 0
    }
  }),
);

const kebabCase = (v) => v.toLowerCase().replace(/[^a-zA-Z0-9 -]/g, '').replace(/\s+/g, '-')

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

export default (props) => {
  const {data} = props;
  const classes = useStyles(props);
  const list = data.allMarkdownRemark.edges.map((e: any) => e.node);
  const categories = getCategories(list);
  const title = `Contact | ${config.siteTitle}`;
  const cover = 'landing-bg.jpg';
  const contactData = {name: config.siteTitle, description: config.siteDescription,
     image: config.siteLogo, postPath: props.path, title};
  return (
      <PostLayout categories={categories}>
        <Helmet>
          <title>{title}</title>
          <link rel="canonical" href={`${config.siteUrl}${props.path}`} />
        </Helmet>
        <SEO pageTitle={title} postPath={props.path}/>
        <Container className={classes.coverContainer}>
            <Cover cover={cover} />
        </Container>
        <Container className='MuiPaper-root'>
            <ContactPage {...contactData}/>
        </Container>
      </PostLayout>
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