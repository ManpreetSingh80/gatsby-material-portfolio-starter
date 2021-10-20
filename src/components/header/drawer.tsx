import * as React from "react";
import Drawer from '@material-ui/core/Drawer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SideMenu from './side-menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      fontSize: '0.5rem',
    },
    logo: {
      marginRight: theme.spacing(0),
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
      }
  }),
);


export default (props) => {
    const {open, toggleDrawer, list, title} = props;
    const classes = useStyles(props);

    return (
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
          <SideMenu list={list} title={title} />
      </Drawer>
    )
}