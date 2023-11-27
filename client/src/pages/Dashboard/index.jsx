import { Box, Grid, Paper, Typography } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"


function DashBoard() {

  const temp = useSelector((state) => state.sensor.temp)
  const humi = useSelector((state) => state.sensor.humi)
  const light = useSelector((state) => state.sensor.light)
  const mois = useSelector((state) => state.sensor.mois)

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
