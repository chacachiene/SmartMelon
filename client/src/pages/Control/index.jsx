import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Box, useMediaQuery } from "@mui/material"
import SetTimer from "./SetTimer"
import SetButton from "./SetButton"

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { publish } from "database/mqtt/mqtt.js"

import { Stack, Typography } from "@mui/material"
import ScheduleDataTable from "./ScheduleDataTable"

import { createHistory } from "pages/History/getDataHistory.js"

function Control() {
  const user= useSelector((state) => state.auth.user)
  const button = useSelector((state) => state.button)
  

  const submitStatus = (type,value) => {
    var message = ""
    if (type === "pump") {
      publish("pump-button", value.toString()+':1')
      if(value === 0){
        message = "Pump is turned off"
      }else{
        message = "Pump is turned on with level "+value.toString()
      }
    } else if (type === "light") {
      publish("led-button", value.toString()+':1')
      if(value === 0){
        message = "Light is turned off"
      }else{
        message = "Light is turned on with level "+value.toString()
      }
    }
    var who= user.firstName + " " + user.lastName;
    message = message + " by " + who +'.';
    var offset = +7;
    const history = {
      description: message,
      time: new Date( new Date().getTime() + offset * 3600 * 1000).toISOString().replace( / GMT$/, "" )
    };
    createHistory(history);
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
