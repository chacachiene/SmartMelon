import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SensorDataCard from "./SensorCard";
import ActionButton from "./ActionButton";

function Dashboard() {
  const navigate = useNavigate();
  const temp = useSelector((state) => state.sensor.temp);
  const humi = useSelector((state) => state.sensor.humi);
  const light = useSelector((state) => state.sensor.light);
  const mois = useSelector((state) => state.sensor.mois);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "auto" }}>
      {/* Header */}
      <Typography variant="h6" sx={{ marginBottom: "10px", marginTop: "10px", fontSize: "30px", textAlign: "left", width: "100%" }}>
        Overview
      </Typography>

      {/* Sensor Data Cards */}
      <Grid container spacing={2} justifyContent="center" alignItems="center" 
      sx={{ marginTop: "40px", border: "1px solid #ccc", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", 
      padding: "15px", borderRadius: "10px", backgroundColor: "#f8f8f8" }}>
        <SensorDataCard
          icon={<WbIncandescentIcon style={{ fontSize: 45, marginBottom: "12px", color: "yellow", marginRight: "10px", }}/>}
          value={`${light} Lux`}
          title="Light"
          onClick={() => navigate("/visualize/light")}
        />
        <SensorDataCard
          icon={<WaterDropIcon style={{ fontSize: 45, marginBottom: "12px", color: "#C4A484", marginRight: "10px", }}/>}
          value={`${mois} %`}
          title="Moisture"
          onClick={() => navigate("/visualize/soil_moiture")}
        />
        <SensorDataCard
          icon={<WaterDropIcon style={{ fontSize: 45, marginBottom: "12px", marginRight: "10px", }}/>}
          value={`${humi} %`}
          title="Humidity"
          onClick={() => navigate("/visualize/humity")}
        />
        <SensorDataCard
          icon={<ThermostatIcon style={{ fontSize: 45, marginBottom: "12px", color: "orange", marginRight: "10px", }}/>}
          value={`${temp} °C`}
          title="Temperature"
          onClick={() => navigate("/visualize/temperature")}
        />
      </Grid>

      {/* Actions Section */}
      <Grid container spacing={2} justifyContent="center" alignItems="center" 
      sx={{ marginTop: "20px", border: "1px solid #ccc", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", 
      padding: "20px", borderRadius: "10px", backgroundColor: "#f8f8f8" }}>
        <ActionButton title="Garden Sections" onClick={() => navigate("/dashboard")} />
        <ActionButton title="History Details" onClick={() => navigate("/history")} />
      </Grid>
    </Container>
  );
}

export default Dashboard;
