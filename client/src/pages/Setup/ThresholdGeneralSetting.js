import { useState } from "react";
import { useLocation, Outlet } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Container, Typography, Paper, Grid, styled, Box, Button, IconButton } from "@mui/material"
import { Remove, Add, WaterDropOutlined, TungstenOutlined, DeviceThermostatOutlined, Adjust } from "@mui/icons-material";



const ThresholdGeneralSetting = () => {
    const [sensor, setSensor] = useState("Soll Moisure Sensor")
    const [selectedSquare, setSelectedSquare] = useState(1);
    const [upper, setUpper] = useState(0)
    const [lower, setLower] = useState(0)
    const handleSquareClick = (square, nameSensor) => {
        setSelectedSquare(square);
        setSensor(nameSensor)
    };

    const handlerSubmit = () => {
        console.log(upper, lower)
    }



    return (
        <Container>
            <Typography variant="h3" sx={{ marginBottom: "30px", marginTop: "10px", width: "100%" }}>
                Energy Management/ Threshold General Setting
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={7} xl={7}>
                    <Paper>
                        <Grid container spacing={2} >
                            <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Square
                                    selected={selectedSquare === 1}
                                    onClick={() => handleSquareClick(1, "Soll Moisure Sensor")}
                                >
                                    <h3>Soll Moisure Sensor</h3>
                                    <WaterDropOutlined color='warning' style={{ fontSize: '120px' }} />

                                </Square>
                            </Grid>
                            <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Square
                                    selected={selectedSquare === 2}
                                    onClick={() => handleSquareClick(2, "Ligthning Sensor")}
                                >
                                    <h3>Ligthning Sensor</h3>
                                    <TungstenOutlined color='warning' style={{ fontSize: '120px' }} />
                                </Square>
                            </Grid>
                            <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Square
                                    selected={selectedSquare === 3}
                                    onClick={() => handleSquareClick(3, "Humidity Sensor")}
                                    style={{ marginBottom: "30px" }}
                                >
                                    <h3>Humidity Sensor</h3>
                                    <WaterDropOutlined color='primary' style={{ fontSize: '120px' }} />
                                </Square>
                            </Grid>
                            <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Square
                                    selected={selectedSquare === 4}
                                    onClick={() => handleSquareClick(4, "Temperature Sensor")}
                                    style={{ marginBottom: "30px" }}
                                >
                                    <h3>Temperature Sensor</h3>
                                    <DeviceThermostatOutlined color='error' style={{ fontSize: '120px' }} />
                                </Square>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={5} xl={5}>
                    <Paper>
                        <Grid container spacing={3}>
                            <Grid item xs={12} xl={12} xm={12} style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <h4 sx={{ color: "red" }}>{sensor}</h4>
                            </Grid>
                            <Grid item xs={4} xl={4} xm={4} style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                <Typography fontWeight={'bold'}>Uper Threshhold: </Typography>
                            </Grid>
                            <Grid item xs={8} xl={8} xm={8} >

                                <div style={{ width: "100%", }}>
                                    <ToggleButtonGroup
                                        color="primary"

                                        exclusive
                                        aria-label="Platform"
                                    >
                                        <ToggleButton value="web" onClick={() => {
                                            if (upper > 0) setUpper(upper - 1)
                                        }}><Remove /></ToggleButton>
                                        <ToggleButton value="ios" style={{ width: "100px" }}>{upper}</ToggleButton>
                                        <ToggleButton value="ios " onClick={() => setUpper(upper + 1)}><Add /></ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </Grid>
                            <Grid item xs={4} xl={4} xm={4} style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                <Typography fontWeight={'bold'}>Lower Threshhold: </Typography>
                            </Grid>
                            <Grid item xs={8} xl={8} xm={8} >

                                <ToggleButtonGroup
                                    color="primary"

                                    exclusive
                                    aria-label="Platform"
                                >
                                    <ToggleButton value="web" onClick={() => {
                                        if (lower > 0) setLower(lower - 1)
                                    }}><Remove /></ToggleButton>
                                    <ToggleButton value="ios" style={{ width: "100px" }}>{lower}</ToggleButton>
                                    <ToggleButton value="ios " onClick={() => setLower(lower + 1)}><Add /></ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>

                            <Grid item xs={12} xl={12} xm={12} style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button variant="contained" style={{ marginBottom: "20px" }} onClick={() => handlerSubmit()}>Save</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>

        </Container >

    )

}
const Square = styled(Box)`
  height: 200px;
  width: 200px;
  background-color: ${({ selected }) => (selected ? "green" : "white")};
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
`;
export default ThresholdGeneralSetting