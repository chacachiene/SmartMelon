import axios from "axios"
import React, { useEffect } from "react"
import { Box, useMediaQuery } from "@mui/material"
import SetTimer from "./SetTimer"
import SetButton from "./SetButton"
import { setPumpButton, setLightButton } from "state/button_time"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { publish } from "database/mqtt.js"
import ThresHold from "component/ThresHold"
import sensorAPI from "database/http/sensorAPI"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
//get the value of the light and pump

function SetUp() {
    const dispatch = useDispatch()
    const pumpButton = useSelector((state) => state.pumpButton)
    
    
  const handleThresHoldSubmit = (value, type) => {
    console.log(value)
    const sub = type + value.field1.toString() + "_" + value.field2.toString()
    console.log(sub)
    publish("threshold.threshold", sub)
  }

  const handleButtonSubmit = (value, type) => {
    console.log(value)
    const sub = type + value.field1.toString() + "_" + value.field2.toString()
    console.log(sub)
    publish("threshold.threshold", sub)
  }
  const handleTimerSubmit = (value, type) => {
    console.log(value)
    const sub = type + value.field1.toString() + "_" + value.field2.toString()
    console.log(sub)
    publish("threshold.threshold", sub)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await sensorAPI.getLastValue('button.pump-button')
        console.log(result)

        console.log(result.value)
        dispatch(setPumpButton(result.value))
    }
    fetchData()
    }, [pumpButton])

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <h1>Set Up Page</h1>
        <p>This is the set up page.</p>
        <SetButton type="pump" value={pumpButton} func={setPumpButton} />
        <SetTimer type="pump" value="0" />

        <SetButton type="light" value="0" func={setLightButton} />
        <SetTimer type="light" value="0" />
      </LocalizationProvider>
    </div>
  )
}

export default SetUp
