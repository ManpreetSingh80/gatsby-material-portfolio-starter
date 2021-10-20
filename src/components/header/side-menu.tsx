import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Link from '../Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      fontSize: '0.5rem',
    },
    logo: {
      margin: 0,
      marginRight: theme.spacing(2),
      width: 'auto',
      height: '1rem',
    },
    menuButton: {
        marginRight: theme.spacing(2),
      },
    title: {
      flexGrow: 1,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    listText: {
      fontSize: '0.5rem'
    },
    listIcon: {
      fontSize: '1rem',
      color: theme.palette.primary.main,
    },
    listSubHeader: {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      display: 'flex',
      alignItems: 'center',
    },
    noIconDivider: {
      marginRight: '72px',
    }
  }),
);

const MenuListItem = (props) => {
    const {item, classes} = props;
    return (
        <ListItem button className={classes.nested}>
            {item.icon && (<ListItemIcon className={classes.listIcon}>{item.icon}</ListItemIcon>)}
            <ListItemText primary={item.title} primaryTypographyProps={{variant: 'caption'}}/>
        </ListItem>
    )
}

const LinkedMenu = (props) => {
    const {item} = props;
    return (<Link to={item.link} color="inherit"><MenuListItem {...props}/> </Link>)
}

const Logo = (props) => <img alt="logo" {...props} src="/img/logo.png" />;

export default (props) => {
    const {list, title} = props;
    const classes = useStyles(props);
    const [listState, listToggle] = React.useState(list.map(i => false));

    const toggleList = (index) => () => {
      listToggle([...listState.slice(0, index), !listState[index], ...listState.slice(index + 1)]);
    };

    return (
      <div className={classes.list} role="presentation">
        <List
          component="nav"
          aria-labelledby="nested-list-subheader" 
          subheader={
          <ListSubheader className={classes.listSubHeader} component="div" id="nested-list-subheader">
            <Logo className={classes.logo} /> {title}
          </ListSubheader>
          }
          className={classes.root}
        >
          <Divider />
          {list.map((item, itemIndex) => item.children ? (
            <div key={itemIndex}>
              <ListItem  button onClick={toggleList(itemIndex)}>
                {item.icon && (<ListItemIcon>{item.icon}</ListItemIcon>)}
                <ListItemText primary={item.title} primaryTypographyProps={{variant: 'caption'}}/>
                {listState[itemIndex] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={listState[itemIndex]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child, childIndex) => (
                    <>
                      <Divider variant="middle" component="li" />
                      <LinkedMenu key={childIndex} item={child} index={childIndex} classes={classes} />
                      
                    </>
                ))}
                </List>
              </Collapse>
              <Divider />
            </div>
          ) : item.icon ? (<LinkedMenu key={itemIndex} item={item} classes={classes} />) : (
            <>
              <LinkedMenu key={itemIndex} item={item} classes={classes} />
              <Divider className={classes.noIconDivider}/>
            </>
          )
          )}
        </List>
      </div>
    )
}