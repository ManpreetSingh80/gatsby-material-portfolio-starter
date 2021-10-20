import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '../Link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    chip: {
        textTransform: 'none'
    },
  }),
);

const kebabCase = (v) => v.toLowerCase().replace(/[^a-zA-Z0-9 -]/g, '').replace(/\s+/g, '-')


const Chip = (props) => {
    const {classes, label} = props;
    return (
        <Link to={`/tagged/${kebabCase(label)}`} underline="none" color="inherit" style={{'background': 'none'}}>
            <Button variant="contained" size="small" color="secondary" className={classes.chip}>{label}</Button>
        </Link>
    );
}

const Tags = (props: any) => {
    const {tags} = props;
    const classes = useStyles(props);
    return (
        <Grid container justify="center" alignItems="center" spacing={1}>
          {tags.map(value => (
            <Grid key={value} item>
              <Chip label={value} color="secondary" classes={classes} />
            </Grid>
          ))}
        </Grid>
    );
}

export default Tags;