import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tags from '../tags';
import Container from '@material-ui/core/Container';
import Social from '../social';
import Divider from '@material-ui/core/Divider';
import './index.scss';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: 'space-between',
      padding: theme.spacing(3, 2),
      zIndex: 3,
      position: 'relative',
      marginTop: '-60px'
    },
    fluid: {
        minHeight: '360px',
        height: 'auto',
        maxHeight: '60vh',
        width: '100%',
        position: 'relative'
    },
    pageContent: {
      maxWidth: '100%',
      '& blockquote': {
        color: 'slategrey',
      },
      '& img': {
          width: '100%',
          boxShadow: 'none !important',
      },
      '& a': {
          color: '#2e9fff',
      },
      '& > h1, > h2, > h3, > h4, > h5, > h6': {
          marginTop: '20px',
          marginBottom: '20px !important',
      },
      '& l1': {
          marginTop: '15px',
      },
      '& table': {
          width: '100%',
          maxWidth: '100%',
          marginBottom: '20px',
      },
      '& table > thead > tr > th, table > tbody > tr > th, table > tfoot > tr > th': {
          textAlign: 'left',
      },
      '& table > thead > tr > th, table > thead > tr > td, table > tbody > tr > th, table > tbody > tr > td, table > tfoot > tr > th, table > tfoot > tr > td': {
          padding: '10px',
          lineHeight: 1.429,
      },
      '& table > thead > tr > th': {
          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
          fontWeight: 700,
      },
      '& table > tbody + tbody': {
          borderTop: '2px solid rgba(0, 0, 0, 0.12)'
      },
      '& table > tbody > tr > td': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      }
    }
  }),
);

const Product = (props) => {
    const classes = useStyles(props);
    const {node} = props;
    const tags = node.frontmatter.tags;
    const showSocial = node.frontmatter.socials !== undefined && node.frontmatter.socials !== false;

    return (
        <Paper elevation={0} className={classes.root}>
            <br/>
            {
            // tslint:disable:react-no-dangerous-html
            <div className={`${classes.pageContent} 'pageContent`} dangerouslySetInnerHTML={{ __html: node.html }} />
            // tslint:enable:react-no-dangerous-html
            }
            
            {tags && (<><br/>
              <Container>
                  <Tags tags={tags}/>
              </Container>
            <br/></>)}
            
            <Divider light/>
            
            {showSocial && (<><br/><Container>
                <Social postNode={node} postPath={node.fields.slug}/>
            </Container></>)}
        </Paper>
    );
}

export default Product;