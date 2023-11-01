import axios from "axios"
import React, { useEffect } from "react"
import { Box, useMediaQuery } from "@mui/material"
import SetTimer from "./SetTimer"
import SetButton from "./SetButton"
import { setPumpButton, setLightButton } from "state/button_time"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { publish } from "database/mqtt.js"
import ThresHold from "component/ThresholdForm"
import sensorAPI from "database/http/sensorAPI"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
//get the value of the light and pump
import { getLastValue } from "database/http/getAdaData"
import client from "database/mqtt.js"

function SetUp() {
  const dispatch = useDispatch()
  const pumpButton = useSelector((state) => state.button.pumpButton)
  const lightButton = useSelector((state) => state.button.lightButton)

  client.on("message", (topic, message, packet) => {
    console.log("received message " + topic + ": " + message);
    const lastSlashIndex = topic.toString().lastIndexOf("/")
    const name = topic.toString().substring(lastSlashIndex + 1)
    if (name === "pump-button") {
      dispatch(setPumpButton(parseInt(message)));

    } else if (name === "led-button") {
      dispatch(setLightButton(parseInt(message)));
    }
  });


  useEffect(() => {
    const fetchData = async () => {
      const pumpStatus = await getLastValue("pump-button")
      dispatch(setPumpButton(parseInt(pumpStatus)))
      const lightStatus = await getLastValue("led-button")
      dispatch(setLightButton(parseInt(lightStatus)))
    }
    fetchData()
  }, [])

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <h1>Set Up Page</h1>
        <p>This is the set up page.</p>
        <SetButton type="pump" value={pumpButton} func={setPumpButton} />
        <SetTimer type="pump" value="0" />

        <SetButton type="light" value={lightButton} func={setLightButton} />
        <SetTimer type="light" value="0" />
      </LocalizationProvider>
    </div>
  )
}

export default SetUp
