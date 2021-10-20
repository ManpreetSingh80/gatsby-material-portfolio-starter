import * as React from "react"
import { graphql } from "gatsby"
import PostLayout from '../components/layouts/post-layout';
import ProductContainer from '../components/product-container/container';
import Cover from '../components/cover';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Product from '../components/product';
import Disqus from '../components/Disqus';
import * as config from '../../config/SiteConfig.js';
import Helmet from "react-helmet";
import SEO from "../components/SEO";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    coverContainer: {
        padding: 0,
        marginTop: 0,
        marginBottom: 0
    }
  }),
);

export default (props) => {
    const classes = useStyles(props);
    const {data, pageContext} = props;
    const {suggestions, categories} = pageContext;
    const suggestionCards = suggestions.map((suggestion) => ({
      title: suggestion.node.frontmatter.title,
      thumbnail: suggestion.node.frontmatter.thumbnail,
      link: `${suggestion.node.fields.type !== 'page' ? `/${suggestion.node.fields.type}` : ''}${suggestion.node.fields.slug}`,
      showAuthor: false,
      showDescription: false,
      showTags: false,
      showBottom: false
    }))
    const node = data.markdownRemark;
    const post = node.frontmatter;
    const showCommments = post.comments !== null && post.comments !== false;
    const showSuggestions = post.suggestion !== null && post.suggestion !== false;

    if (!post.id) {
      post.id = node.fields.slug;
    }
    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }

    return (
        <PostLayout categories={categories}>
          <Helmet>
              <title>{post.title}</title>
              <link rel="canonical" href={`${config.siteUrl}${props.path}`} />
            </Helmet>
            <SEO postNode={node} postPath={props.path} postSEO={true}/>
                {post.page_cover && <Container className={classes.coverContainer}>
                    <Cover cover={post.page_cover} />
                </Container>}
                <Container className='MuiPaper-root'>
                    <Product node={node}/>
                </Container>
                {showSuggestions && <Container className='MuiPaper-root'>
                    <ProductContainer title='Suggestions' cards={suggestionCards}/>
                </Container>}
                {showCommments && <Container className='MuiPaper-root'>
                    <Disqus postNode={node} />
                </Container>}
        </PostLayout>
    )
}
  
export const query = graphql`
  query PagePostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        description
        page_cover
        date
        thumbnail
        category
        tags
        comments
        suggestion
        socials
      }
      fields {
        slug
        date
        type
      }
    }
  }
`;