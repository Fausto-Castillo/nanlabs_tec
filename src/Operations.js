import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";

export default function Operation(props) {
  const [sliderValue, setSliderValue] = useState(props.defaultValue);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    props.handleChangeSlider(newValue);
  };

   useEffect(() => {
     if(typeof props.defaultValue === 'string' || props.defaultValue instanceof String){
      const valueNumber = parseInt(props.defaultValue.split('=').pop())
      setSliderValue(valueNumber)
     }
     else{
      setSliderValue(props.defaultValue);
     }
 }, [props.defaultValue]);

  return (
    <Box>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <h5>{props.title}</h5>
        </Grid>
        <Grid item>
          <h6>{sliderValue}</h6>
        </Grid>
      </Grid>
      <Slider
        track={false}
        onChange={handleSliderChange}
        size="small"
        defaultValue={props.defaultValue}
        value={sliderValue}
        aria-label="Small"
        max={props.max}
        min={props.min}
      />
    </Box>
  );
}
