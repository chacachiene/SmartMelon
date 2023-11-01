import axios from "axios"
import React, { useEffect } from "react"
import { Box, useMediaQuery } from "@mui/material"
import SetTimer from "./SetTimer"
import SetButton from "./SetButton"
import { setPumpButton, setLightButton } from "state/button_time"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { publish } from "database/mqtt/mqtt.js"
import ThresHold from "component/ThresholdForm"
import sensorAPI from "database/http/sensorAPI"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Stack } from "@mui/material"

//get the value of the light and pump
import { getLastValue } from "database/http/getAdaData"
import client from "database/mqtt/mqtt.js"

function Control() {
  const dispatch = useDispatch()
  const button = useSelector((state) => state.button)


  client.on("message", (topic, message, packet) => {
    const value = Number(message.toString().split(":")[0]);
    console.log("received message " + topic + ": " + message)
    const lastSlashIndex = topic.toString().lastIndexOf("/")
    const name = topic.toString().substring(lastSlashIndex + 1)
    console.log("name is: ", name)
    console.log("value is: ", value)
    if (name === "pump-button") {
      dispatch(setPumpButton(parseInt(value)))
    } else if (name === "led-button") {
      dispatch(setLightButton(parseInt(value)))
    }
  })


  useEffect(() => {
    const fetchData = async () => {
      let pumpStatus = await getLastValue("pump-button")
      const pumpVar = Number(pumpStatus.split(":")[0]);
      console.log("pumpVar: " + pumpVar)
      dispatch(setPumpButton(pumpVar))

      let lightStatus = await getLastValue("led-button")
      const lightVar = Number(lightStatus.split(":")[0]);
      dispatch(setLightButton(parseInt(lightVar)))
    }
    fetchData()
  }, [])

  const submitStatus = (type,value) => {
    if (type === "pump") {
      
      publish("pump-button", value.toString()+':1')
    } else if (type === "light") {
      dispatch(setLightButton(parseInt(value)))
      
    }
  }


  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={2}>
          <h1>Set Up Page</h1>
          <Stack spacing={10}>
            <Stack direction="row" spacing={20}>
              <SetTimer type="pump" value="0" />

              <Stack direction="row" spacing={6}>
                <SetButton type="pump" value={button.pumpButton} afunc={submitStatus} />
                <SetButton type="light" value={button.lightButton} afunc={submitStatus} />
              </Stack>
            </Stack>
            <SetTimer type="light" value="0" />
          </Stack>
        </Stack>
      </LocalizationProvider>
    </div>
  )
}

export default Control
