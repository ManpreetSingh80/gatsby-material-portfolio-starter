import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Thumbnail from '../thumbnail';
import './card.scss';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        shadow: {
            top: '12px',
            left: '6px',
            width: 'calc(100% - 12px)',
            filter: 'blur(6px)',
            height: (props: {height: number}) => `calc(${props.height}px)`,
            zIndex: 0,
            opacity: 1,
            position: "absolute",
            transform: 'scale(0.92)',
            transition: 'transform .4s',
            backgroundSize: 'cover',
        },
        // imgCard: {
        //     height: 'inherit',
        //     width: '100%',
        //     marginBottom: 0,
        //     position: 'absolute !important',
        //     zIndex: 1,
        //     borderRadius: "calc(.25rem - 1px)",
        // },
        media: {
            width:'100%',
            zIndex: 1,
            height: (props: {height: number}) => `${props.height}px`,
            position: 'relative',
            [theme.breakpoints.down('sm')]: {
                transform: 'translateY(-10px)',
            },
            [theme.breakpoints.up('md')]: {
                transform: 'translateY(50px)',
            },
            transition: 'transform .4s',
        },
        title: {
            top: 'auto',
            left: 0,
            right: 0,
            bottom: '-20px',
            zIndex: 1,
            padding: theme.spacing(1),
            position: 'absolute',
            color: 'hsl(0, 0%, 100%)',
            textAlign: 'center',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity .4s, transform .4s',
        },
        cardContent: {
            padding: theme.spacing(2),
            paddingBottom: '0 !important',
        },
        paper: {
            padding: theme.spacing(0),
            height: (props: {height: number}) => `${props.height + 120}px`,
            '&:hover $media': {
                transform: 'translateY(-10px)',
                transition: 'transform .4s',
            },
            '&:hover $content': {
                transform: 'translateY(-10px)',
                backgroundColor: '#0000',
                color: theme.palette.text.primary,
                transition: 'backgroundColor color transform 1000ms',
            }
        },
        content: {
            position: "relative",
            bottom: '-15px',
            padding: theme.spacing(2),
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.text.primary,
            zIndex: 1,
            [theme.breakpoints.down('sm')]: {
                color: theme.palette.text.primary,
                backgroundColor: '#0000',
                transform: 'translateY(-0px)',
            },
            [theme.breakpoints.up('md')]: {
                color: '#e6e6e6',
                backgroundColor: '#0009',
                opacity: 0.97,
                transform: (props: any) => `translateY(-${props.showDescription ? 50 : 10}px)`,
                transition: 'backgroundColor color transform 1000ms',
            },
        },
        link: {
            backgroundImage: 'none',
            textDecoration: 'none',
            textShadow: 'none',
            width: '100%',
        },
        colorTransform: {
            color: 'inherit'
        }
    }),
);

export default (props: any) => {
    const {title, thumbnail, height = 220, link = "/about", showDescription = true, description} = props;
    const classes = useStyles(Object.assign({}, props, {height, showDescription}));
    return (
        <Paper elevation={0} className={classes.paper}>
            <Grid container>
                <Link to={link} underline="none" color="inherit" className={classes.link}>
                    <div className={classes.media}>
                        {/* <img src={url} className={classes.imgCard} alt={title} /> */}
                        <Thumbnail cover={thumbnail} className='imgCard'/>
                        {/* <div style={{backgroundImage: `url(${url})`}} className={classes.shadow} /> */}
                        <Thumbnail cover={thumbnail} className={classes.shadow}/>
                    </div>
                    <Paper elevation={0} className={classes.content}>
                        <Typography variant="subtitle1" className={classes.colorTransform}>
                            {title}
                        </Typography>
                        {showDescription && (<Typography variant="caption" color="textSecondary" component="p" className={classes.colorTransform}>
                            {description}
                        </Typography>)}
                    </Paper>
                </Link>
            </Grid>
        </Paper>
    )
}
