import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tags from '../tags';
import Container from '@material-ui/core/Container';
import Social from '../social';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Cover from '../cover';
import './blog.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: 'space-between',
      padding: theme.spacing(3, 2),
    //   zIndex: 3,
      position: 'relative',
    //   marginTop: '20px'
    },
    fluid: {
        minHeight: '360px',
        height: 'auto',
        maxHeight: '60vh',
        width: '100%',
        position: 'relative'
    },
    title: {
        fontSize: theme.typography.h4.fontSize,
        padding: theme.spacing(1),
    },
    subtitle: {
        fontSize: theme.typography.h6.fontSize,
        padding: theme.spacing(1),
        color: theme.typography.h5.color,
    },
    avatar: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        width: '3rem',
        height: '3rem',
        fontSize: '2rem'
    },
    authorContainer: {
        margin: theme.spacing(2),
    },
    timeContainer: {
        width: 'auto',
    },
    time: {
        fontSize: theme.typography.subtitle2.fontSize,
        display: 'flex',
        alignItems: 'center'
    },
    timeIcon: {
        fontSize: theme.typography.subtitle2.fontSize,
        marginRight: theme.spacing(1)
        // padding: theme.spacing(0.5),
    },
    author: {
        fontSize: '0.7rem'
    },
    card: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4)
    },
    content: {
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
    },
  }),
);

const Blog = (props) => {
    const classes = useStyles(props);
    const {node} = props;
    const tags = node.frontmatter.tags;
    const showSocial = node.frontmatter.socials !== null && node.frontmatter.socials !== false;

    return (
        <Paper elevation={0} className={classes.root}>
            <Container maxWidth="md">
                <Typography variant='h1' className={classes.title}>{node.frontmatter.title}</Typography>
                <Typography variant='h2' className={classes.subtitle}>{node.frontmatter.description}</Typography>
            </Container>
            <Container maxWidth="md">
                {/* <Grid container spacing={2} alignItems="center" justify="flex-start" className={classes.authorContainer}>
                    <Grid item>
                        <Avatar alt={node.frontmatter.author} className={classes.avatar} >{node.frontmatter.author.charAt(0)}</Avatar>
                    </Grid>
                    <Grid item>
                        <Grid direction="column" container spacing={1} justify="center" alignItems="flex-start" className={classes.timeContainer}>
                            <Typography variant='body1' className={classes.author}>{node.frontmatter.author}</Typography>
                            <div className={classes.time}>
                                <Time className={classes.timeIcon} />
                                <Typography variant='body2' className={classes.author}>{node.frontmatter.time} min read</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid> */}
                <Card className={classes.card}  elevation={0}>
                    <CardHeader
                        avatar={
                            <Avatar alt={node.frontmatter.author} className={classes.avatar} >{node.frontmatter.author.charAt(0)}</Avatar>
                        }
                        title={node.frontmatter.author}
                        subheader={`☕ ${node.timeToRead} min read`}
                    />
                </Card>
            </Container>
            {/* <Container maxWidth="md">
                    <Cover parallax={false} cover={node.frontmatter.page_cover}/>
            </Container> */}
            <br/><br/>
            <Container maxWidth="md">
                {
                // tslint:disable:react-no-dangerous-html
                <div className={classes.content} dangerouslySetInnerHTML={{ __html: node.html }} />
                // tslint:enable:react-no-dangerous-html
                }
            </Container>
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

export default Blog;