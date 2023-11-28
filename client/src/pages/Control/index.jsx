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
import { Stack, Typography } from "@mui/material"
import ScheduleDataTable from "./ScheduleDataTable"

//get the value of the light and pump
import { getLastValue } from "database/http/getAdaData"
import client from "database/mqtt/mqtt.js"

function Control() {
  const dispatch = useDispatch()
  const button = useSelector((state) => state.button)
  

  const submitStatus = (type,value) => {
    if (type === "pump") {
      publish("pump-button", value.toString()+':1')
    } else if (type === "light") {
      publish("led-button", value.toString()+':1')
    }
  }
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box style={{ padding: isSmallScreen ? "10px" : "30px" }}>
        <Stack spacing={isSmallScreen ? 2 : 6}>
          <Typography variant="h1">Set Up Page</Typography>

          <Stack direction={isSmallScreen ? "column" : "row"} spacing={isSmallScreen ? 2 : 6}>
            <Stack spacing={isSmallScreen ? 2 : 6}>
              <SetTimer type="pump" value="0" />
              <SetTimer type="light" value="0" />
            </Stack>

            <Stack spacing={isSmallScreen ? 4 : 10}>
              <Stack direction={isSmallScreen ? "column" : "row"} spacing={isSmallScreen ? 2 : 6}>
                <SetButton type="pump" value={button.pumpButton} afunc={submitStatus} />
                <SetButton type="light" value={button.lightButton} afunc={submitStatus} />
              </Stack>
              <ScheduleDataTable />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}

export default Control
