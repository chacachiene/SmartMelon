import { Box, Grid, Paper, Typography, Button } from "@mui/material"
import React from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setHumiSensor, setLightSensor, setTempSensor, setMoisSensor } from "state/sensor"
import client from "database/mqtt"
import { useEffect } from "react"
import { getLastValue } from "database/http/getAdaData"
import { useNavigate } from "react-router-dom"

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px' }}>
          <h1 style={{ margin: 10 }}>Dashboard</h1>
      </div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ height: '70vh', marginRight: '100px' }}
      >
      <Grid item xs={12} sm={6} md={3}>
          <Button
            component={Paper} // Use Paper as the button component
            onClick={() => navigate("/visualization/light")}
            sx={{
              p: 2,
              textAlign: "center",
              width: '100%',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
              {light} Lux
            </Typography>
          </Button>
          <Typography variant="h6" style={{ textAlign: 'center', marginTop: '10px' }}>
            Light
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Button
            component={Paper} // Use Paper as the button component
            onClick={() => navigate("/visualization/light")}
            sx={{
              p: 2,
              textAlign: "center",
              width: '100%',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
              {mois} %
            </Typography>
          </Button>
          <Typography variant="h6" style={{ textAlign: 'center', marginTop: '10px' }}>
            Moisture
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button
            component={Paper} // Use Paper as the button component
            onClick={() => navigate("/visualization/light")}
            sx={{
              p: 2,
              textAlign: "center",
              width: '100%',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
              {humi} %
            </Typography>
          </Button>
          <Typography variant="h6" style={{ textAlign: 'center', marginTop: '10px' }}>
            Humidity
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button
            component={Paper} // Use Paper as the button component
            onClick={() => navigate("/visualization/light")}
            sx={{
              p: 2,
              textAlign: "center",
              width: '100%',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
              {temp} &deg;C
            </Typography>
          </Button>
          <Typography variant="h6" style={{ textAlign: 'center', marginTop: '10px' }}>
            Temperature
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
export default DashBoard
