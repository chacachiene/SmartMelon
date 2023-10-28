
import React, { useState } from "react";
import client from "database/mqtt.js";
import { publish } from "database/mqtt.js";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Proptype from "prop-types";
import Switch from "@mui/material/Switch";

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 25,
    label: '1',
  },
  {
    value: 50,
    label: '2',
  },
  {
    value: 75,
    label: '3',
  },
  {
    value: 100,
    label: '4',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) ;
}

function SetButton(probs) {
  const dispatch = useDispatch();
  const but = useSelector((state) => state.pumpButton);
  
  const [sliderEnabled, setSliderEnabled] = useState(true);

  client.on("message", (topic, message, packet) => {
    console.log("received message" + topic + ": " + message);
  });

  const handleSliderChange = (event, newValue) => {
    dispatch(probs.func(newValue));
    if (probs.type === "pump") {
      publish("button.pump-button", newValue.toString());
    } else if (probs.type === "light") {
      publish("button.led-button", newValue.toString());
    }
    else{
      console.log("error");
    }
  };

  const handleToggleSlider = () => {
    if (probs.type === "pump") {
      publish("button.pump-button", "0");
    } else if (probs.type === "light") {
      publish("button.led-button", "0");
    }
    setSliderEnabled(!sliderEnabled);
  };


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <h3>{probs.type}</h3>
      <Switch
        checked={sliderEnabled}
        onChange={handleToggleSlider}
        inputProps={{ "aria-label": "toggle slider" }}
      />
      {sliderEnabled && (
        <Box sx={{ width: 300 }}>
          <Slider
            
            aria-label="Restricted values"
            defaultValue={probs.value}
            value={but}
            onChange={handleSliderChange}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            step={25}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </Box>
      )}
    </Box>
  );
}

SetButton.propTypes = {
  type: Proptype.string,
  value: Proptype.string,
  func: Proptype.func,
};
SetButton.defaultProps = {
  type: "pump",
  value: '0',
  func: () => {},
};

export default SetButton;

