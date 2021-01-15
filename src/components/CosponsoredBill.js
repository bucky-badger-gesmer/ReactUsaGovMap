import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

export default function CosponsoredBill(props) {
    console.log('cosponsored bills', props)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Introduced: {props.bill.introduced_date}
        </Typography>
        <Typography variant="h5" component="h2">
            {props.bill.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.bill.number}
        </Typography>
        <Typography variant="body2" component="p">
            {props.bill.summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={props.bill.congressdotgov_url}>Learn More</Button>
      </CardActions>
    </Card>
  );
}

