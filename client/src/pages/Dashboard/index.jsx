import { Box, Grid, Paper, Typography } from "@mui/material"
import React from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setHumiSensor, setLightSensor, setTempSensor, setMoisSensor } from "state/sensor"
import client from "database/mqtt"
import { useEffect } from "react"
import { getLastValue } from "database/http/getAdaData"

function DashBoard() {
  const dispatch = useDispatch()
  const temp = useSelector((state) => state.sensor.temp)
  const humi = useSelector((state) => state.sensor.humi)
  const light = useSelector((state) => state.sensor.light)
  const mois = useSelector((state) => state.sensor.mois)

  // listen when the sensor feed change value
  client.on("message", (topic, message, packet) => {
    console.log("aaaaa")
    const lastSlashIndex = topic.toString().lastIndexOf("/")
    const name = topic.toString().substring(lastSlashIndex + 1)
    console.log("name is: ", name)
    if (name === "light-sensor") {
      dispatch(setLightSensor(parseInt(message)))
    }
    if (name === "soil-moisture") {
      console.log("mois is: ", parseInt(message))
      dispatch(setMoisSensor(parseInt(message)))
    }
    if (name === "temp-humi") {
      const [temp, humi] = message.toString().split(":")
      dispatch(setTempSensor(parseFloat(temp)))
      dispatch(setHumiSensor(parseFloat(humi)))
    }
  })

  // get the last value of the sensor feed when the page is loaded
  useEffect(() => {
    const fetchData = async () => {
      const temp_humi = await getLastValue("temp-humi")
      const [temp, humi] = temp_humi.toString().split(":")
      const moisData = await getLastValue("soil-moisture")
      const lightData = await getLastValue("light-sensor")
      dispatch(setTempSensor(parseFloat(temp)))
      dispatch(setHumiSensor(parseFloat(humi)))
      dispatch(setLightSensor(lightData))
      dispatch(setMoisSensor(moisData))
    }
    fetchData()
  }, [])

  return (
    <>
      <div>
        <h1>Dashboard Page</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Light
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {light}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Moisture
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {mois}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Temperature
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {temp}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Humidity
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {humi}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default DashBoard
