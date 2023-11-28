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
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import styled from "@emotion/styled";
import { Cached } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const ChartPage = ({ Namepage, data }) => {
  const [dataSuccess, setDataSuccess] = useState(false);
  const [dataSeries, setDataSeries] = useState(
    Array.from({ length: 24 }, (_, index) => null)
  );
  const [dataSeries1, setDataSeries1] = useState(
    Array.from({ length: 24 }, (_, index) => null)
  );
  const dataAxis = Array.from({ length: 24 }, (_, index) => index);
  const [selectedDate, setSelectedDate] = useState(
    dayjs("2023-10-29T15:07:15Z")
  );

  const [tempPredict, setTempPredict] = useState([])


  //////////////////// PREDICT DATA ///////////////////////
  const temp =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  useEffect(() => {
    // Assuming you have data to send
      const dataToSend = {
        data: temp,
      };
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
          console.log("result from python: ", result);
          setTempPredict(result.result);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });
    }, []);
    //////////////////////////////////////////////////////////


  useEffect(() => {
    if (selectedDate) {
      const selectedDay = dayjs(selectedDate).format("DD/MM/YYYY");

      setDataSeries1(Array.from({ length: 24 }, (_, index) => null));
      data.forEach((item) => {
        const date = dayjs(item.created_at).format("DD/MM/YYYY");
        if (date === selectedDay) {
          const hour = dayjs(item.created_at).format("H");
          dataSeries1[hour - 7] = Number(item.value);
        }
      });

      if (dataSeries1[0] === null) dataSeries1[0] = 60;
      for (let i = 1; i < 24; i++) {
        if (dataSeries1[i] === null) dataSeries1[i] = dataSeries1[i - 1];
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
                      area: true,
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
                      <h3>Status: Normal</h3>
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
                      <h3>Current: 80%</h3>
                      <Button>
                        <Cached fontSize="large" />
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={2}>
                <ButtonContainer>
                  <CustomButton color="success" variant="contained">
                    History
                  </CustomButton>
                </ButtonContainer>

                <ButtonContainer>
                  <CustomButton color="success" variant="contained">
                    Threshold Setting
                  </CustomButton>
                </ButtonContainer>
                <ButtonContainer>
                  <CustomButton color="success" variant="contained">
                    Device Setting
                  </CustomButton>
                </ButtonContainer>
                <ButtonContainer>
                  <CustomButton color="error" variant="contained">
                    Return
                  </CustomButton>
                </ButtonContainer>
              </Grid>
            </Grid>
          </Paper>
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
