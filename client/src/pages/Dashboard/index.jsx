import { Box, Grid, Paper, Typography, Button, Container } from "@mui/material"
import React from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setHumiSensor, setLightSensor, setTempSensor, setMoisSensor } from "state/sensor"
import client from "database/mqtt/mqtt.js"
import { useEffect } from "react"
import { getLastValue } from "database/http/getAdaData"
import { useNavigate } from "react-router-dom"
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import ThermostatIcon from '@mui/icons-material/Thermostat';

function DashBoard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      try {
        // Fetch data for "temp-humi"
        const temp_humi = await getLastValue("temp-humi");
        if (temp_humi) {
          const [temp, humi] = temp_humi.toString().split(":");
          dispatch(setTempSensor(parseFloat(temp)));
          dispatch(setHumiSensor(parseFloat(humi)));
        }
  
        // Fetch data for "soil-moisture"
        const moisData = await getLastValue("soil-moisture");
        if (moisData) {
          console.log("mois is: ", parseInt(moisData));
          dispatch(setMoisSensor(parseInt(moisData)));
        }
  
        // Fetch data for "light-sensor"
        const lightData = await getLastValue("light-sensor");
        if (lightData) {
          dispatch(setLightSensor(lightData));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
<>
<Container>
<Typography variant="h6" sx={{ marginBottom: "10px", marginTop: "10px", fontSize:"30px" }}>
  Overview 
</Typography>
  <Grid
  container
  spacing={2}
  justifyContent="top"
  alignItems="top"
  style={{ height: '36vh', marginTop: '40px'}}>
    <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            textAlign: "top",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'top',
            alignItems: 'top',
            width: '100%',
            height: '100%',
            borderRadius: '12px',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} container justifyContent="center" flexDirection="column" alignItems="center">
              <Button
                component={Paper}
                onClick={() => navigate("/visualization/light")}
                sx={{
                  p: 2,
                  textAlign: "center",
                  width: '80%',
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '15px',
                  backgroundColor: '#F0F8FF'
                }}
              >
                <WbIncandescentIcon style={{ fontSize: 50, marginBottom: '12px', color: 'yellow', marginRight: '10px' }} />
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', fontSize: '30px' }}>
                  {light} Lux
                </Typography>
              </Button>
              <Typography variant="h6" style={{ textAlign: 'center', marginTop: '10px' }}>
                Light
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3} container justifyContent="center" flexDirection="column" alignItems="center">
              <Button
                component={Paper}
                onClick={() => navigate("/visualization/moisture")}
                sx={{
                  p: 2,
                  textAlign: "center",
                  width: '80%',
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '15px',
                  backgroundColor: '#F0F8FF'
                }}
              >
                <WaterDropIcon style={{ fontSize: 50, marginBottom: '12px', color: '#D2B48C', marginRight: '10px' }} />
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', fontSize: '30px' }}>
                  {mois} %
                </Typography>
              </Button>
              <Typography variant="h6" style={{ textAlign: 'center', marginTop: '10px' }}>
                Moisture
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3} container justifyContent="center" flexDirection="column" alignItems="center">
              <Button
                component={Paper}
                onClick={() => navigate("/visualization/humidity")}
                sx={{
                  p: 2,
                  textAlign: "center",
                  width: '80%',
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '15px',
                  backgroundColor: '#F0F8FF'
                }}
              >
                <WaterDropIcon style={{ fontSize: 50, marginBottom: '12px', marginRight: '10px' }} />
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', fontSize: '30px' }}>
                  {humi} %
                </Typography>
              </Button>
              <Typography variant="h6" style={{ textAlign: 'center', marginTop: '10px' }}>
                Humidity
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3} container justifyContent="center" flexDirection="column" alignItems="center">
              <Button
                component={Paper}
                onClick={() => navigate("/visualization/temp")}
                sx={{
                  p: 2,
                  textAlign: "center",
                  width: '80%',
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '15px',
                  backgroundColor: '#F0F8FF'
                }}
              >
                <ThermostatIcon style={{ fontSize: 50, marginBottom: '12px', color: '#FFA500', marginRight: '10px' }} />
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', fontSize: '30px' }}>
                  {temp} &deg;C
                </Typography>
              </Button>
              <Typography variant="h6" style={{ textAlign: 'center', marginTop: '10px' }}>
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
  style={{ height: '24vh', marginTop: '10px'}}>
      <Paper sx={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        height: '100%',
        borderRadius: '16px',}}>
  <Grid container spacing={2}>
    <Grid item xs={6} container justifyContent="center" alignItems="center">
    <Button
      component={Paper}
      onClick={() => navigate("/dashboard")}
      sx={{
        p: 2,
        textAlign: "center",
        width: '80%',
        height: '100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
        backgroundColor: '#F0F8FF',
        borderRadius: '16px',
      }}
    >
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', fontSize: '17px', color: 'black' }}>
        Garden Sections
      </Typography>
    </Button>
    </Grid>
    <Grid item xs={6} container justifyContent="center" alignItems="center">
    <Button
      component={Paper}
      onClick={() => navigate("/history")}
      sx={{
        p: 2,
        textAlign: "center",
        width: '80%',
        height: '100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
        backgroundColor: '#F0F8FF',
        borderRadius: '16px',
      }}
    >
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', fontSize: '17px', color: 'black' }}>
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
