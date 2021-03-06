import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '5px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Subcommittee(props) {
    const color = useSelector((state) => state.colorReducer.color);
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.subcommittee.begin_date} - {props.subcommittee.end_date}
                </Typography>
                <Typography variant="h5" component="h2" style={{ color: color }}>
                    {props.subcommittee.code} - {props.subcommittee.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Title: {props.subcommittee.title}, Rank In Party: {props.subcommittee.rank_in_party}
                </Typography>
                <Typography variant="body2" component="p">
                    Side: {props.subcommittee.side}
                </Typography>
            </CardContent>
        </Card>
    );
}

