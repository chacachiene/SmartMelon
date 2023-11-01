import React, { useState } from "react"
import client from "./mqtt/mqtt.js"
import { publish } from "./mqtt/mqtt.js"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 50,
    label: "1",
  },
  {
    value: 75,
    label: "2",
  },
  {
    value: 100,
    label: "3",
  },
]

function valuetext(value) {
  return `${value}°C`
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value)
}

function App() {
  const [led, setLed] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)
  const tmp = "0"

  client.on("message", (topic, message, packet) => {
    console.log("received message" + topic + ": " + message)
  })

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue)
    publish("pump", newValue.toString())
  }

  const handleClick = () => {
    publish("temp", tmp.toString())
  }

  const handleClickLight = () => {
    setLed(!led)
    var submit = "0"
    if (led == true) {
      submit = "1"
    }
    publish("led", submit)
  }

  return (
    <div className="App">
      <h1>React Aithada</h1>
      <button onClick={handleClick}>Click me </button>
      <button onClick={handleClickLight}>Led </button>
      <button onClick={handleClickLight}>Pump </button>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Restricted values"
          defaultValue={0}
          value={sliderValue}
          onChange={handleSliderChange}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={25}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </Box>
    </div>
  )
}

export default App
