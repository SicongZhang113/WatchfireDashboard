import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
        <div>
            <Title>Recent Prediction</Title>
            <Typography component="p" variant="h4">
                388
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on 01 March, 2020
            </Typography>
            <Typography color = "textSecondary" variant={"subtitle1"}>
                Model : 2219 (Includes T/T)
            </Typography>
        </div>
        <br></br>
        <br></br>
        <br></br>
      <div>
        <Link color="primary" href="/vis" >
          View More
        </Link>
      </div>
    </React.Fragment>
  );
}
