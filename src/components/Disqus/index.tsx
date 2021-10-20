import * as React from "react";
// import ReactDisqusComments from "react-disqus-comments";
import urljoin from "url-join";
import Avatar from '@material-ui/core/Avatar';
import config from "../../../config/SiteConfig.js";
import { createStyles, makeStyles, Theme, useTheme  } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import Snackbar from '@material-ui/core/Snackbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { DiscussionEmbed } from 'disqus-react'
import './index.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(2)
    },
    avatarIcon: {
        fontSize: 20
    },
    disqus: {
        width: '100%',
    },
    disqusContatiner: {
        flexDirection: 'column',
    }
  }),
);

const Disqus = (props) => {
    const { postNode } = props;
    const classes = useStyles(props);
    const [open, setOpen] = React.useState(false);
    
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [expanded, setExpanded] = React.useState(!mobile);
    if (!config.disqusShortname) {
        return null;
    }
    const post = postNode.frontmatter;
    const url = urljoin(
        config.siteUrl,
        config.pathPrefix,
        postNode.fields.slug
    );

    const notifyAboutComment = () => {
        setOpen(true);
    }

    const onSnackbarDismiss = () => {
        setOpen(false);
    }

    const onChange = () => setExpanded(!expanded);
    React.useEffect(() => {
        setExpanded(!mobile);
    }, [mobile]);
    const disqusConfig = {
        shortname: config.disqusShortname,
        config: { identifier: postNode.fields.slug, title: post.title, url: url },
    };

    return (
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} expanded={expanded} onChange={onChange}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="comments"
                id="comments"
            >
                <Avatar aria-label="comments" className={classes.avatar}>
                    <CommentIcon className={classes.avatarIcon}/>
                </Avatar>
                <Typography className={classes.title} variant='h6'>Comments</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.disqusContatiner}>
                {/* <ReactDisqusComments
                    style={{width: '100%'}}
                    shortname={config.disqusShortname}
                    identifier={postNode.fields.slug}
                    title={post.title}
                    url={url}
                    category_id={post.category_id}
                    onNewComment={notifyAboutComment}
                /> */}
                <DiscussionEmbed {...disqusConfig} />
            </ExpansionPanelDetails>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                message={<span id="message-id">New comment available!</span>}
                onClose={onSnackbarDismiss}
            />
        </ExpansionPanel>
    );
}

export default Disqus;