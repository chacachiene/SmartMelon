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
import ScheduleDataTable from "./ScheduleDataTable"

//get the value of the light and pump
import { getLastValue } from "database/http/getAdaData"
import client from "database/mqtt/mqtt.js"

function Control() {
  const dispatch = useDispatch()
  const button = useSelector((state) => state.button)


  // client.on("message", (topic, message, packet) => {
  //   const value = Number(message.toString().split(":")[0]);
  //   console.log("received message " + topic + ": " + message)
  //   const lastSlashIndex = topic.toString().lastIndexOf("/")
  //   const name = topic.toString().substring(lastSlashIndex + 1)
  //   console.log("name is: ", name)
  //   console.log("value is: ", value)
    
  // })


  useEffect(() => {
    const fetchData = async () => {
      try{
      let pumpStatus = await getLastValue("pump-button")
      const pumpVar = Number(pumpStatus.split(":")[0]);
      
      dispatch(setPumpButton(pumpVar))

      let lightStatus = await getLastValue("led-button")
      const lightVar = Number(lightStatus.split(":")[0]);
      dispatch(setLightButton(parseInt(lightVar)))}
      catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const submitStatus = (type,value) => {
    if (type === "pump") {
      publish("pump-button", value.toString()+':1')
    } else if (type === "light") {
      publish("led-button", value.toString()+':1')
      
    }
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box style={{ padding: '30px' }}>
        <Stack spacing={2}>
          <h1>Set Up Page</h1>
          
            <Stack direction="row" spacing={6}>
              <Stack spacing={6}>
                <SetTimer type="pump" value="0" />
                <SetTimer type="light" value="0" />         
              </Stack>
                <Stack spacing={10}>
                  <Stack direction="row" spacing={6}>
                    <SetButton type="pump" value={button.pumpButton} afunc={submitStatus} />
                    <SetButton type="light" value={button.lightButton} afunc={submitStatus} />
                  </Stack>
                  <ScheduleDataTable />
                </Stack>            
            </Stack>
          
        </Stack>
      </Box>
        
      </LocalizationProvider>
    </div>
  )
}

export default Control
