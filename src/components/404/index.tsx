import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Social from '../social';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
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
    avatarContainer: {
        marginTop: '-80px',
    },
    avatar: {
        margin: 10,
        width: '120px',
        height: '120px',
        backgroundColor: theme.palette.primary.main,
        '& img': {
            transform: 'scale(0.7)',
            marginBottom: 0
        }
    },
    title: {
        fontSize: theme.typography.h4.fontSize,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.primary.main,
    },
    subtitle: {
        fontSize: theme.typography.h6.fontSize,
        padding: theme.spacing(1),
        color: theme.typography.h5.color,
        textAlign: 'center',
    },
    glitch: {
        // fontSize: '96px',
        // letterSpacing: '-7px',
        // animation: 'glitch 1s linear infinite',
        color: theme.palette.primary.main,
    }
  }),
);

const Product = (props) => {
    const classes = useStyles(props);
    const {name, description, image, postPath, title} = props;
    const node = {frontmatter: {title}};

    return (
        <Paper elevation={24} className={classes.root}>
            <Container maxWidth="md" className={classes.avatarContainer}>
                <Grid container justify="center" alignItems="center">
                    <Avatar alt={name} src={image} className={classes.avatar} />
                </Grid>
            </Container>
            <br/>
            <Container maxWidth="md">
                <Grid container justify="center" alignItems="center" direction="column">
                    <div title="404" className={`${classes.glitch} glitch`}>404</div>
                    {/* <Typography variant='h1' color='primary' className={classes.title}>404</Typography> */}
                    <br/>
                    <Typography variant='h2' color='secondary' className={classes.subtitle}>Oops! The page you were looking for doesn't exist</Typography>
                </Grid>
            </Container>
        </Paper>
    );
}

export default Product;