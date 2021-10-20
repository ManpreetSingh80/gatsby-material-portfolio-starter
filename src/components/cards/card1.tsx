import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { Link as GatsbyLink } from 'gatsby';
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
        },
        // imgCard: {
        //     height: 'inherit',
        //     width: '100%',
        //     marginBottom: 0,
        //     position: 'absolute !important',
        //     zIndex: 1,
        //     borderRadius: "calc(.25rem - 1px)",
        //     // boxShadow: '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
        // },
        card: {
            // maxWidth: 345,
            paddingBottom: theme.spacing(2),
            position: 'relative',
            '&:hover $shadow': {
                transform: 'scale(0.96)',
                transition: 'transform .4s',
            },
            '&:hover $title': {
                opacity: 1,
                transform: 'translateY(-20px)',
                transition: 'opacity .4s, transform .4s',
            }
        },
        media: {
            height: (props: {height: number}) => `${props.height}px`,
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
        }
    }),
);

export default (props: any) => {
    const {title, thumbnail, description, height = 220, link = "/about", showDescription = true} = props;
    // const params = 
    const classes = useStyles(props);
    return (
        <GatsbyLink to={link} title={title}>
            <Card className={classes.card} square={true} elevation={0} raised={true}>
                <CardActionArea>
                    <div className={classes.media}>
                        
                        {/* <img src={url} className={classes.imgCard} alt={title} /> */}
                        <Thumbnail cover={thumbnail} className='imgCard'/>
                        {/* <div style={{backgroundImage: `url(${url})`}} className={classes.shadow} /> */}
                        <Thumbnail cover={thumbnail} className={classes.shadow}/>
                    </div>
                    <Hidden smDown>
                        <Typography className={classes.title} variant="subtitle2">
                            {title}
                        </Typography>
                    </Hidden>
                    <Hidden mdUp>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="subtitle2">
                                {title}
                            </Typography>
                            {showDescription && (<Typography variant="body2" color="textSecondary" component="p">
                                {description}
                            </Typography>)}
                        </CardContent>
                    </Hidden>
                </CardActionArea>
            </Card>
        </GatsbyLink>
    )
}
