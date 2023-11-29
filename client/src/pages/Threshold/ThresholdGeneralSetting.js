import { useEffect, useState } from "react"
import { useLocation, Outlet } from "react-router-dom"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { Container, Typography, Paper, Grid, styled, Box, Button } from "@mui/material"
import { WaterDropOutlined, TungstenOutlined, DeviceThermostatOutlined } from "@mui/icons-material"
import QuantityInput from "component/ThresholdInput"
import Swal from "sweetalert2";

import { useSelector, useDispatch } from "react-redux"
import { createHistory } from "pages/History/getDataHistory.js"

const ThresholdGeneralSetting = ({submitOnDb}) => {
  const [sensor, setSensor] = useState("Soll Moisure Sensor")
  const [selectedSquare, setSelectedSquare] = useState(1)
  const [upper, setUpper] = useState(0)
  const [lower, setLower] = useState(0)
  const lightThreshold = useSelector((state) => state.threshold.light)
  const moisThreshold = useSelector((state) => state.threshold.mois)
  const tempThreshold = useSelector((state) => state.threshold.temp)
  const humiThreshold = useSelector((state) => state.threshold.humi)
  const user = useSelector((state) => state.auth.user)
  const handleSquareClick = (square, nameSensor) => {
    setSelectedSquare(square)
    setSensor(nameSensor)
  }

  const handlerSubmit = () => {
    let datastring
    if (selectedSquare === 1) {
      datastring="Soil Moisure"
    } else if (selectedSquare === 2) {
      datastring="Lightning"
    }
    else if (selectedSquare === 3) {
      datastring="Humidity"
    }
    else if (selectedSquare === 4) {
      datastring="Temparature"
    }


    Swal.fire({
      title: "Are you sure?   ",
      text: `You accept about to submit ${datastring} threshold. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(upper, lower)
      console.log(selectedSquare)
      var value = upper.toString() + ':' + lower.toString()
      if (selectedSquare === 1) {
        submitOnDb("M" + value)
      } else if (selectedSquare === 2) {
        submitOnDb("L" + value)
      }
      else if (selectedSquare === 3) {
        submitOnDb("H" + value)
      }
      else if (selectedSquare === 4) {
        submitOnDb("T" + value)
      }
        Swal.fire({
          title: "Submitted!",
          text: `${datastring} threshold has been submitted.`,
          icon: "success",
        });
        var who= user.firstName + " " + user.lastName;
        var message = datastring + " threshold has been set between " + lower.toString() + " and " + upper.toString() + " by "+who+ "."
        var offset = +7;
        const history = {
          description: message,
          time: new Date( new Date().getTime() + offset * 3600 * 1000).toISOString().replace( / GMT$/, "" )
        };
        createHistory(history);
      }
    });
  };

  const handleClickUpper = (v) => {
    setUpper(v)
  }
  const handleClickLower = (v) => {
    setLower(v)
  }
  useEffect(() => {
    if (selectedSquare === 1) {
      setUpper(parseInt(moisThreshold[0]))
      setLower(parseInt(moisThreshold[1]))
    } else if (selectedSquare === 2) {
      setUpper(parseInt(lightThreshold[0]))
      setLower(parseInt(lightThreshold[1]))
    }
    else if (selectedSquare === 3) {
      setUpper(parseInt(humiThreshold[0]))
      setLower(parseInt(humiThreshold[1]))
    }
    else if (selectedSquare === 4) {
      setUpper(parseInt(tempThreshold[0]))
      setLower(parseInt(tempThreshold[1]))
    }
  } , [selectedSquare])

  return (
    <Container>
      <Typography variant="h3" sx={{ marginBottom: "30px", marginTop: "10px", width: "100%" }}>
        Energy Management/ Threshold General Setting
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={7} xl={7}>
          <Paper>
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <Square
                  selected={selectedSquare === 1}
                  onClick={() => handleSquareClick(1, "Soll Moisure Sensor")}
                >
                  <h3>Soll Moisure Sensor</h3>
                  <WaterDropOutlined color="warning" style={{ fontSize: "120px" }} />
                </Square>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <Square
                  selected={selectedSquare === 2}
                  onClick={() => handleSquareClick(2, "Ligthning Sensor")}
                >
                  <h3>Ligthning Sensor </h3>
                  <TungstenOutlined color="warning" style={{ fontSize: "120px" }} />
                </Square>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <Square
                  selected={selectedSquare === 3}
                  onClick={() => handleSquareClick(3, "Humidity Sensor")}
                  style={{ marginBottom: "30px" }}
                >
                  <h3>Humidity Sensor</h3>
                  <WaterDropOutlined color="primary" style={{ fontSize: "120px" }} />
                </Square>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <Square
                  selected={selectedSquare === 4}
                  onClick={() => handleSquareClick(4, "Temperature Sensor")}
                  style={{ marginBottom: "30px" }}
                >
                  <h3>Temperature Sensor</h3>
                  <DeviceThermostatOutlined color="error" style={{ fontSize: "120px" }} />
                </Square>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={5} xl={5}>
          <Paper>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                xl={12}
                xm={12}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4 sx={{ color: "red" }}>{sensor}</h4>
              </Grid>
              <Grid
                item
                xs={4}
                xl={4}
                xm={4}
                style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
              >
                <Typography fontWeight={"bold"}>Upper Threshhold: </Typography>
              </Grid>
              <Grid item xs={8} xl={8} xm={8}>
                <Grid container spacing={2} alignItems="center">
                  <div style={{ width: "100%" }}>
                    <QuantityInput prop={handleClickUpper} valueDef={upper}  />
                  </div>
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
                xl={4}
                xm={4}
                style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
              >
                <Typography fontWeight={"bold"}>Lower Threshhold: </Typography>
              </Grid>
              <Grid item xs={8} xl={8} xm={8}>
                <Grid container spacing={2} alignItems="center">
                  <div style={{ width: "100%" }}>
                    <QuantityInput prop={handleClickLower} valueDef={lower}/>
                  </div>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                xl={12}
                xm={12}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  style={{ marginBottom: "20px" }}
                  onClick={() => handlerSubmit()}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
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
`
export default ThresholdGeneralSetting
