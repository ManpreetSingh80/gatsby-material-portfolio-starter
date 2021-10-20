import * as React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card2 from '../cards/card2';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        padding: theme.spacing(3, 0, 3, 0),
        backgroundColor: theme.palette.background.paper,
    },
    grid: {
        margin: theme.spacing(2, 0, 2, 0),
    }
  }),
);

export default (props: any) => {
    const { children, title, cards, Card = Card2 } = props;
    const classes = useStyles(props);
    return (
        <Paper elevation={0}  square={true} className={classes.root}>
           {title && (<>
                <Typography variant="h6">{title}</Typography>
                <Divider />
            </>)}
            <Grid container>
                <Grid className={classes.grid} container spacing={2} justify="flex-start">
                    {cards.map((card) => (
                        <Grid item key={card.title} xs={12} sm={6} md={4}>
                            <Card {...card} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    )
}