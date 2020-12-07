import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    // width: 300,
    padding: '15px',
  },
  button: {
    position: 'relative',
    right: '0',
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function Dates(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([1850, 1950]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={classes.root}>
      <Typography id="date-slider" gutterBottom>
        Date range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="date-slider"
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        min={1850}
        max={1950}
      />
      <Button className={classes.button} onClick={() => props.setDate(value)} variant="contained">Set Date Range</Button>
    </div>
  );
}
