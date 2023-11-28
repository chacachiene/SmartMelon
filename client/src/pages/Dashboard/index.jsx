import { Box, Grid, Paper, Typography, Button, Container } from "@mui/material"
import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { useNavigate } from "react-router-dom"
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import ThermostatIcon from '@mui/icons-material/Thermostat';

function DashBoard() {

  const navigate = useNavigate()
  const temp = useSelector((state) => state.sensor.temp)
  const humi = useSelector((state) => state.sensor.humi)
  const light = useSelector((state) => state.sensor.light)
  const mois = useSelector((state) => state.sensor.mois)



  return (
    <>
      <Container>
        <Typography
          variant="h6"
          sx={{ marginBottom: "10px", marginTop: "10px", fontSize: "30px" }}
        >
          Overview
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="top"
          alignItems="top"
          style={{ height: "36vh", marginTop: "40px" }}
        >
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                textAlign: "top",
                display: "flex",
                flexDirection: "column",
                justifyContent: "top",
                alignItems: "top",
                width: "100%",
                height: "100%",
                borderRadius: "12px",
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  container
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Button
                    component={Paper}
                    onClick={() => navigate("/visualize/light")}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      width: "80%",
                      height: "120px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "15px",
                      backgroundColor: "#F0F8FF",
                    }}
                  >
                    <WbIncandescentIcon
                      style={{
                        fontSize: 50,
                        marginBottom: "12px",
                        color: "yellow",
                        marginRight: "10px",
                      }}
                    />
                    <Typography
                      variant="h4"
                      gutterBottom
                      style={{ fontWeight: "bold", fontSize: "30px" }}
                    >
                      {light} Lux
                    </Typography>
                  </Button>
                  <Typography
                    variant="h6"
                    style={{ textAlign: "center", marginTop: "10px" }}
                  >
                    Light
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  container
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Button
                    component={Paper}
                    onClick={() => navigate("/visualize/soil_moiture")}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      width: "80%",
                      height: "120px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "15px",
                      backgroundColor: "#F0F8FF",
                    }}
                  >
                    <WaterDropIcon
                      style={{
                        fontSize: 50,
                        marginBottom: "12px",
                        color: "#D2B48C",
                        marginRight: "10px",
                      }}
                    />
                    <Typography
                      variant="h4"
                      gutterBottom
                      style={{ fontWeight: "bold", fontSize: "30px" }}
                    >
                      {mois} %
                    </Typography>
                  </Button>
                  <Typography
                    variant="h6"
                    style={{ textAlign: "center", marginTop: "10px" }}
                  >
                    Moisture
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  container
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Button
                    component={Paper}
                    onClick={() => navigate("/visualize/humity")}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      width: "80%",
                      height: "120px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "15px",
                      backgroundColor: "#F0F8FF",
                    }}
                  >
                    <WaterDropIcon
                      style={{
                        fontSize: 50,
                        marginBottom: "12px",
                        marginRight: "10px",
                      }}
                    />
                    <Typography
                      variant="h4"
                      gutterBottom
                      style={{ fontWeight: "bold", fontSize: "30px" }}
                    >
                      {humi} %
                    </Typography>
                  </Button>
                  <Typography
                    variant="h6"
                    style={{ textAlign: "center", marginTop: "10px" }}
                  >
                    Humidity
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  container
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Button
                    component={Paper}
                    onClick={() => navigate("/visualize/temperature")}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      width: "80%",
                      height: "120px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "15px",
                      backgroundColor: "#F0F8FF",
                    }}
                  >
                    <ThermostatIcon
                      style={{
                        fontSize: 50,
                        marginBottom: "12px",
                        color: "#FFA500",
                        marginRight: "10px",
                      }}
                    />
                    <Typography
                      variant="h4"
                      gutterBottom
                      style={{ fontWeight: "bold", fontSize: "30px" }}
                    >
                      {temp} &deg;C
                    </Typography>
                  </Button>
                  <Typography
                    variant="h6"
                    style={{ textAlign: "center", marginTop: "10px" }}
                  >
                    Temperature
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          style={{ height: "24vh", marginTop: "10px" }}
        >
          <Paper
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              height: "100%",
              borderRadius: "16px",
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  component={Paper}
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    width: "80%",
                    height: "100px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                    backgroundColor: "#F0F8FF",
                    borderRadius: "16px",
                  }}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    style={{
                      fontWeight: "bold",
                      fontSize: "17px",
                      color: "black",
                    }}
                  >
                    Garden Sections
                  </Typography>
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  component={Paper}
                  onClick={() => navigate("/history")}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    width: "80%",
                    height: "100px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                    backgroundColor: "#F0F8FF",
                    borderRadius: "16px",
                  }}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    style={{
                      fontWeight: "bold",
                      fontSize: "17px",
                      color: "black",
                    }}
                  >
                    History Details
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}; 
export default DashBoard
