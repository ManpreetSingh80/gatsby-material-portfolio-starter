import * as React from "react";
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    RedditShareButton,
    FacebookShareCount,
    RedditShareCount,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    RedditIcon
  } from "react-share";
import urljoin from "url-join";
import config from '../../../config/SiteConfig.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    chip: {
        // margin: theme.spacing(1),
    },
    shareButton: {
        cursor: 'pointer',
        '&:hover:not(:active)': {
            opacity: 0.75,
        }
    }
  }),
);


const Social = (props: any) => {
    const {postNode, postPath} = props;
    const post = postNode.frontmatter;
    const classes = useStyles(props);
    const theme = useTheme();
    const url = urljoin(config.siteUrl, config.pathPrefix, postPath);
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const iconSize = mobile ? 32 : 36;
    const filter = count => (count > 0 ? count : "");
    const renderShareCount = count => (
      <div className="share-count">{filter(count)}</div>
    );

    return (
        <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item>
                <RedditShareButton url={url} title={post.title} className={classes.shareButton}>
                    <RedditIcon round size={iconSize} />
                    <RedditShareCount url={url}>
                        {count => renderShareCount(count)}
                    </RedditShareCount>
                </RedditShareButton>
            </Grid>
            <Grid item>
                <TwitterShareButton url={url} title={post.title} className={classes.shareButton}>
                    <TwitterIcon round size={iconSize} />
                </TwitterShareButton>
            </Grid>
            <Grid item>
                <FacebookShareButton url={url} quote={postNode.excerpt} className={classes.shareButton}>
                    <FacebookIcon round size={iconSize} />
                    <FacebookShareCount url={url}>
                        {count => renderShareCount(count)}
                    </FacebookShareCount>
                </FacebookShareButton>
            </Grid>
            <Grid item>
                <LinkedinShareButton url={url} quote={post.title} className={classes.shareButton}>
                    <LinkedinIcon round size={iconSize} />
                </LinkedinShareButton>
            </Grid>
        </Grid>
    );
}

export default Social;