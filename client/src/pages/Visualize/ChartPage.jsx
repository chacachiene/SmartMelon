import React, { useEffect } from "react";
import { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  TextField,
  CircularProgress,
  Modal,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import styled from "@emotion/styled";
import { Cached } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { blue } from "@mui/material/colors";

import { getSampleData } from "./getSampleData";
import { useNavigate } from "react-router-dom";

const ChartPage = ({ Namepage, data, threshold, current }) => {
  const [dataSuccess, setDataSuccess] = useState(false);
  const lower = Number(threshold[0]);
  const upper = Number(threshold[1]);
  const navigate = useNavigate();
  const [dataSeries, setDataSeries] = useState(
    Array.from({ length: 24 }, (_, index) => null)
  );
  const [dataSeries1, setDataSeries1] = useState(
    Array.from({ length: 24 }, (_, index) => null)
  );
  const dataAxis = Array.from({ length: 24 }, (_, index) => index);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [tempPredict, setTempPredict] = useState(
    Array.from({ length: 24 }, (_, index) => null)
  );
  const [isShowProgress, setIsShowProgess] = useState(false);

  const [sensor, setSensor] = useState("Light");
  const today = dayjs();
  useEffect(() => {
    if (Namepage === "Temperature Status") setSensor("Temperature");
    if (Namepage === "Humidity Status") setSensor("Humidity");
    if (Namepage === "Light Status") setSensor("Light");
    if (Namepage === "Soil moiture Status") setSensor("Moiture");
  }, [Namepage]);
  const getPredict = () => {
    setIsShowProgess(true);
    var type = "";
    if (Namepage === "Temperature Status") type = "temp";
    else if (Namepage === "Humidity Status") type = "humi";

    const fetchDataYesterday = async () => {
      try {
        const temperatureValues = await getSampleData(type);
        const dataToSend = {
          data: temperatureValues,
          type: Namepage,
        };
        console.log("data to send: ", dataToSend);
        // Make a POST request using fetch
        fetch("http://localhost:8000/predict/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })
          .then((response) => response.json())
          .then((result) => {
            setIsShowProgess(false);
            console.log("result from python: ", result);
            setTempPredict(result.result);
            setIsShowProgess(false);
          })
          .catch((error) => {
            // Handle errors
            console.error("Error:", error);
            alert(error.message);
            setIsShowProgess(false);
          });
      } catch (error) {
        setIsShowProgess(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchDataYesterday();
  };

  useEffect(() => {
    if (selectedDate) {
      const selectedDay = dayjs(selectedDate).format("DD/MM/YYYY");

      setDataSeries1(Array.from({ length: 24 }, (_, index) => null));
      const today = dayjs().format("DD/MM/YYYY");
      const thisHour = dayjs().format("H");

      data.forEach((item) => {
        const date = dayjs(item.created_at).format("DD/MM/YYYY");
        if (date === selectedDay) {
          const hour = Number(dayjs(item.created_at).format("HH"));
          dataSeries1[hour] = Number(item.value);
        }
      });

      if (dataSeries1[0] === null) dataSeries1[0] = 60;
      if (today === selectedDay) {
        for (let i = 1; i <= thisHour; i++) {
          if (dataSeries1[i] === null) dataSeries1[i] = dataSeries1[i - 1];
        }
      } else {
        for (let i = 1; i < 24; i++) {
          if (dataSeries1[i] === null) dataSeries1[i] = dataSeries1[i - 1];
        }
      }

      const tempDataSeries = [...dataSeries1];
      setDataSuccess(true);
      setDataSeries(tempDataSeries);
    }
  }, [selectedDate, data]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  if (dataSuccess)
    return (
      <>
        <Container>
          <Typography
            variant="h3"
            sx={{ marginBottom: "10px", marginTop: "10px" }}
          >
            Energy Management/
            {Namepage}
          </Typography>
          <Paper>
            <Grid container style={{ padding: "10px" }}>
              <Grid item xs={12}>
                {(Namepage === "Temperature Status" ||
                  Namepage === "Humidity Status") && (
                  <Button variant="contained" onClick={getPredict}>
                    Focast
                  </Button>
                )}
              </Grid>

              <Grid item xs={10}>
                <LineChart
                  height={500}
                  xAxis={[
                    {
                      data: dataAxis,
                    },
                  ]}
                  series={[
                    {
                      data: dataSeries,
                      label: "Data Real",
                      color: "blue",
                    },
                    {
                      data: tempPredict,
                      label: "Data Predict",
                      color: "orange",
                    },
                  ]}
                />
                <Grid container>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        maxDate={today}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {current > upper && (
                        <h3 style={{ color: "red" }}>
                          Status: {sensor} Too Hight{" "}
                        </h3>
                      )}
                      {current < lower && (
                        <h3 style={{ color: "red" }}>
                          Status: {sensor} Too Low{" "}
                        </h3>
                      )}
                      {current >= lower && current <= upper && (
                        <h3>Status: {sensor} Normal</h3>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h3>Current: {current}</h3>
                      <Button>
                        <Cached fontSize="large" />
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={2}>
                <ButtonContainer>
                  <CustomButton
                    color="success"
                    variant="contained"
                    onClick={() => navigate("/history", { replace: true })}
                  >
                    History
                  </CustomButton>
                </ButtonContainer>

                <ButtonContainer>
                  <CustomButton
                    color="success"
                    variant="contained"
                    onClick={() => navigate("/setup", { replace: true })}
                  >
                    Threshold Setting
                  </CustomButton>
                </ButtonContainer>
                <ButtonContainer>
                  <CustomButton
                    color="success"
                    variant="contained"
                    onClick={() => navigate("/control", { replace: true })}
                  >
                    Device Setting
                  </CustomButton>
                </ButtonContainer>
              </Grid>
            </Grid>
          </Paper>
          <Modal
            open={isShowProgress}
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={80} />
          </Modal>
        </Container>
      </>
    );
  return <>No Data</>;
};
const BaseChart = styled(LineChart)`
  @media screen and (max-width: 768px) {
    .chart-container {
      height: 400px;
      width: 600px;
    }
  }
  @media screen and (max-width: 2000px) {
    .chart-container {
      height: 400px;
      width: 600px;
    }
  }
`;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const CustomButton = styled(Button)`
  width: 150px;
  height: 50px;
`;
const ButtonContainer = styled(Box)`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default ChartPage;
