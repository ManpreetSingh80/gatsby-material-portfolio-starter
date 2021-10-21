import * as React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme, useTheme  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import Drawer from './drawer';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import HideOnScroll from './hide-on-scroll';
import Link from '../Link';
import Dark from '@material-ui/icons/Brightness2';
import Light from '@material-ui/icons/Brightness2Outlined';
import {FaTwitter, FaFacebookF, FaLinkedinIn, FaGithub} from "react-icons/fa";
import * as config from '../../../config/SiteConfig.js';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    logo: {
      margin: 0,
      height: '30px',
    },
    menuButton: {
        color: theme.palette.primary.contrastText,
      },
    title: {
      flexGrow: 1,
      color: theme.palette.primary.contrastText,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    headerBoard: {
        height: 'auto',
        backgroundColor: theme.palette.primary.main,
    },
    headTitle: {
        color: theme.palette.primary.contrastText,
        marginLeft: theme.spacing(2),
    },
    headSubTitle: {
        color: theme.palette.primary.contrastText,
        marginLeft: theme.spacing(2),
    },
    link: {
        color: theme.palette.primary.contrastText,
        fontSize: '1.2rem',
        backgroundImage: 'none',
        paddingLeft: theme.spacing(1.5),
    },
    listButton: {
        color: theme.palette.primary.contrastText,
        background: 'none',
        display: 'inline-flex',
        paddingRight: theme.spacing(2),
        fontSize: '0.7rem'
    },
    headBottomContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '40px',
        lineHeight: '40px',
    },
    headBottomContainerLeft: {
        flex: '1 1 auto',
        overflow: 'scroll',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: 'none',
        whiteSpace: 'nowrap',
        padding: 0,
        '&::-webkit-scrollbar': { 
            display: 'none',
            backkground: 'transparent',
        },
    },
    headBottomContainerRight: {
        whiteSpace: 'nowrap',
    },
    bar: {
        color: theme.palette.primary.contrastText,
        display: 'inline-flex',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    iconButton: {
        padding: theme.spacing(1.5),
        color: theme.palette.primary.contrastText,
    }
  }),
);

// const categories = [
//     {
//         title: 'Extensions',
//         icon: undefined,
//         link: deadUrl,
//         children: [
//             {
//                 title: 'Just Monika Screen Saver',
//                 link: deadUrl
//             },
//             { title: 'Just Yuri Screen Saver', link: deadUrl}, {title: 'Just Sayori Screen Saver', link: deadUrl}]
//     },
//     {
//         title: 'Wallpaper Engine',
//         link: deadUrl,
//         children : [
//             {title: 'Just Monika', link: deadUrl }, { title: 'Just Yuri', link: deadUrl}
//         ]
//     }
// ];

// const socials = [{
//     title: 'Twitter',
//     link: 'https://www.twitter.com',
//     icon: <FaTwitter/>
// }, {
//     title: 'Facebook',
//     link: deadUrl,
//     icon: <FaFacebook/>
// }];

const icons = {
    'twitter': <FaTwitter/>,
    'facebook': <FaFacebookF/>,
    'linkedin': <FaLinkedinIn/>,
    'github': <FaGithub/>
};

const socials = config.userLinks.map(uL => ({
    title: uL.title,
    link: uL.link,
    icon: icons[Object.keys(icons).find(social => uL.link.includes(social))]
}));

const rightSection = [{title: 'Blog', link: '/blog'}, {title: 'About', link: '/about'}, {title: 'Contact', link: '/contact'}]

const Logo = (props) => <img alt="logo" {...props} src="/img/logo.png" />;

const ListButton = (props) => {
    const {link, classes, title} = props;
    return (
        <Link to={link} underline="none" color="inherit" style={{'background': 'none'}}>
            <Button size="small" className={classes.listButton}>{title}</Button>
        </Link>
    );
}

const SocialTab = (props) => {
    const {classes, toggleDrawer, socials} = props;
    const theme = useTheme();
    const {mode, toggleTheme}: any = theme.props;
    return (
        <Toolbar disableGutters={true}>
            <Link to={config.siteUrl} color="inherit" className={classes.link} >
                <IconButton edge="start" color="inherit" aria-label="Logo">
                    <Logo className={classes.logo} />
                </IconButton>
            </Link>
            <Typography variant="h6" className={classes.title} />
                <Hidden smDown>
                    <Tooltip title={'Toggle Light / Dark Theme'}>
                                <IconButton onClick={toggleTheme} color="inherit" aria-label={'Toggle Light / Dark Theme'} className={classes.iconButton}>
                                    {mode === 'light' ? <Light/> : <Dark />}
                                </IconButton>
                    </Tooltip>
                    {socials.map((social) => (
                        <Tooltip title={social.title} key={social.title}>
                            <Link to={social.link} color="inherit" className={classes.link} >
                                <IconButton color="inherit" aria-label={social.title} className={classes.iconButton}>
                                    {social.icon}
                                </IconButton>
                            </Link>
                        </Tooltip>
                    ))}
                </Hidden>
                <Hidden mdUp>
                    <Tooltip title={'Toggle Light / Dark Theme'}>
                            <IconButton onClick={toggleTheme} color="inherit" aria-label={'Toggle Light / Dark Theme'} className={classes.iconButton}>
                                {mode === 'light' ? <Light/> : <Dark />}
                            </IconButton>
                    </Tooltip>
                    <IconButton onClick={toggleDrawer} className={classes.menuButton} color="inherit" aria-label="Open drawer">
                        <MenuIcon />
                    </IconButton>
                </Hidden>
        </Toolbar>
    )
}

const HeadBoard = (props) => {
    const {classes, list, toggleDrawer, socials, rightSection} = props;
    return (
        <Paper color="primary" className={classes.headerBoard} square={true} elevation={0}>
            <Container>
                <SocialTab socials={socials} classes={classes} toggleDrawer={toggleDrawer}/>
            </Container>
                <br/>
            <Container>
                <Typography variant="h5" color="inherit" className={classes.headTitle}>{config.siteTitle}</Typography>
                <Typography variant="subtitle1" color="inherit" className={classes.headSubTitle}>{config.siteDescription}</Typography>
            </Container>
            <br/>
            <Container className={classes.headBottomContainer}>
                <div className={classes.headBottomContainerLeft}>
                    {list.map(item => <ListButton key={item.title} link={item.link} classes={classes} title={item.title} />)}
                </div>
                <div className={classes.headBottomContainerRight}>
                    <Typography className={classes.bar} variant="h6">|</Typography>
                    {rightSection.map(item => (<ListButton key={item.title} link={item.link} classes={classes} title={item.title} />))}
                </div>
            </Container>
            
        </Paper>
    )
}


const header =  (props) => {
    const {categories} = props;
    const list = [...categories, ...rightSection, ...socials];
    const classes = useStyles(props);
    const [state, setState] = React.useState(false);

    const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState(state => !state);
    };

    return (
        <div className={classes.root}>
            <HideOnScroll {...props}>
                <AppBar elevation={0}>
                    <Container>
                        <SocialTab classes={classes} socials={socials} toggleDrawer={toggleDrawer}/>
                    </Container>
                </AppBar>
            </HideOnScroll>
            <Drawer open={state} toggleDrawer={toggleDrawer} list={list} title={config.siteTitle}/>
            <HeadBoard classes={classes} rightSection={rightSection} list={categories} socials={socials} toggleDrawer={toggleDrawer}/>
        </div>
    );
}

export default header;