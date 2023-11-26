import React, { useEffect } from "react"
import { useState } from "react"
import { BarChart } from "@mui/x-charts/BarChart"
import { Helmet } from "react-helmet"
import { Box, Button, Container, Grid, Paper, Stack, Typography, TextField } from "@mui/material"
import { LineChart } from "@mui/x-charts"
import styled from "@emotion/styled"
import { Cached } from "@mui/icons-material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
const data = [
  {
    value: "60",
    created_at: "2023-10-29T00:07:15Z",
  },
  {
    value: "40",
    created_at: "2023-10-29T15:07:15Z",
  },

  {
    value: "50",
    created_at: "2023-10-29T14:07:15Z",
  },

  {
    value: "20",
    created_at: "2023-10-29T16:07:15Z",
  },

  {
    value: "60",
    created_at: "2023-10-29T04:07:15Z",
  },
]
const ChartPage = ({ Namepage }) => {
  const [dataSeries, setDataSeries] = useState(Array.from({ length: 24 }, (_, index) => null))
  const [dataSeries1, setDataSeries1] = useState(Array.from({ length: 24 }, (_, index) => null))
  const dataAxis = Array.from({ length: 24 }, (_, index) => index)
  const [selectedDate, setSelectedDate] = useState(dayjs("2023-10-29T15:07:15Z"))

  // useEffect(() => {
  //   if (selectedDate) {
  //     const selectedDay = dayjs(selectedDate).format("DD/MM/YYYY")

  //     setDataSeries1(Array.from({ length: 24 }, (_, index) => null))
  //     data.forEach((item) => {
  //       const date = dayjs(item.created_at).format("DD/MM/YYYY")
  //       if (date === selectedDay) {
  //         const hour = dayjs(item.created_at).format("H")
  //         dataSeries1[hour - 7] = Number(item.value)
  //       }
  //     })
  //   }
  // }, [selectedDate])
  useEffect(() => {
    if (selectedDate) {
      const selectedDay = dayjs(selectedDate).format("DD/MM/YYYY")

      setDataSeries1(Array.from({ length: 24 }, (_, index) => null))
      data.forEach((item) => {
        const date = dayjs(item.created_at).format("DD/MM/YYYY")
        if (date === selectedDay) {
          const hour = dayjs(item.created_at).format("H")
          dataSeries1[hour - 7] = Number(item.value)
        }
      })

      // Gán dataSeries1 vào một mảng tạm thời
      const tempDataSeries = [...dataSeries1]
      setDataSeries(tempDataSeries)
    }
  }, [selectedDate])

  // ...

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  // useEffect(() => {
  //   setDataSeries(dataSeries1)
  // }, [dataSeries1])
  // useEffect(() => {
  //   console.log("dataseries12312312", dataSeries)
  // }, [dataSeries])
  return (
    <>
      <Container>
        <Typography variant="h3" sx={{ marginBottom: "10px", marginTop: "10px" }}>
          Energy Management/
          {Namepage}
        </Typography>
        <Paper>
          <Grid container>
            <Grid item xs={10}>
              <LineChart
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
                style={{ width: "100%" }}
                height={300}
              />
              <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={selectedDate} onChange={handleDateChange} />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h3>Status: Normal</h3>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
  )
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))
const CustomButton = styled(Button)`
  width: 150px;
  height: 50px;
`
const ButtonContainer = styled(Box)`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default ChartPage
