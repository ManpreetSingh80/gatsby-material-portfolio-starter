import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
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
            position: 'absolute',
            transform: 'scale(0.92)',
            transition: 'transform .4s',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
        },
        // imgCard: {
        //     height: 'inherit',
        //     width: '100%',
        //     marginBottom: 0,
        //     position: 'absolute !important',
        //     zIndex: 1,
        //     borderRadius: "6px",
        //     backgroundSize: 'cover',
        //     backgroundPosition: '50% 50%',
        //     boxShadow: '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
        // },
        media: {
            width:'100%',
            zIndex: 1,
            height: (props: {height: number}) => `${props.height}px`,
            position: 'relative',
        },
        title: {
            paddingTop: theme.spacing(1),
            // paddingBottom: theme.spacing(1),
        },
        description: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
        },
        cardContent: {
            padding: theme.spacing(2),
            paddingBottom: '0 !important',
        },
        paper: {
            padding: theme.spacing(0),
            marginBottom: theme.spacing(2),
            // height: '340px',
        },
        content: {
            // position: 'relative',
            // bottom: '0',
            padding: theme.spacing(1),
            paddingBottom: 0,
        },
        link: {
            backgroundImage: 'none',
            textDecoration: 'none',
            textShadow: 'none',
            width: '100%',
        },
        listButton: {
            fontSize: '0.6rem',
            padding: 0,
            paddingRight: theme.spacing(1),
            paddingLeft: theme.spacing(1),
            color: 'inherit'
        },
        tags: {
            display: 'flex',
            justifyContent: 'flex-start',
            paddingTop: theme.spacing(2),
            flexWrap: 'wrap',
            color: theme.palette.secondary.main,
        },
        time: {
            fontSize: theme.typography.caption.fontSize,
            padding: theme.spacing(1),
            display: 'flex',
        },
        bottomIcon: {
            fontSize: theme.typography.caption.fontSize,
            margin: theme.spacing(0.5),
        },
        avatarContainer: {
            fontSize: theme.typography.caption.fontSize,
            padding: theme.spacing(1),
        },
        avatar: {
            fontSize: theme.typography.button.fontSize,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            margin: 0,
            marginRight: theme.spacing(0.5),
            display: 'inline-flex',
            width: '25px',
            height: '25px',
        }
    }),
);

const kebabCase = (v) => v.toLowerCase().replace(/[^a-zA-Z0-9 -]/g, '').replace(/\s+/g, '-')

const ListButton = (props) => {
    const {link, classes, title} = props;
    return (
        <Link to={link} underline="none" color="inherit" style={{'background': 'none'}}>
            <Button size="small" disableRipple={true} className={classes.listButton}>{title}</Button>
        </Link>
    );
}

export default (props: any) => {
    const {title, thumbnail, height = 200, tags = [], showTags = false, link = "",
     description, showDescription = true, author, showAuthor = false, showBottom = false, timeToRead= 5} = props;
    const classes = useStyles(Object.assign({}, props, {height}));
    tags.sort((a,b) => a.length - b.length)
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
                    <div className={classes.content}>
                        {showTags && <div className={classes.tags}>
                            {tags.map((tag) => 
                                (<ListButton key={tag} link={`/tagged/${kebabCase(tag)}`} color='secondary' classes={classes} title={tag} /> 
                                // <Button key={tag} size='small' disableRipple={true} color='secondary' className={classes.tag}>{tag}</Button>
                                )
                            )}
                        </div>}
                        <Typography variant="subtitle1" className={classes.title}>
                            {title}
                        </Typography>
                        {showDescription && (<Typography variant="caption" color="textSecondary" component="p" className={classes.description}>
                            {description}
                        </Typography>)}
                    </div>
                </Link>
                {showBottom && (<Grid container spacing={0} justify="space-between" alignItems="center">
                    {showAuthor ? (<div className={classes.avatarContainer}>
                        <Avatar sizes='small' alt={author} className={classes.avatar} >{author.charAt(0)}</Avatar>
                        {author}
                    </div>) : <div/>}
                
                <div className={classes.time}>
                    {/* <Time sizes='small' className={classes.bottomIcon} /> */}
                    {`☕ ${timeToRead} min read`}
                </div>
                </Grid>)}
            </Grid>
        </Paper>
    )
}
