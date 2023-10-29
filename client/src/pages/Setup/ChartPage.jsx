import React from "react"
import { BarChart } from "@mui/x-charts/BarChart"
import { Helmet } from "react-helmet"
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material"
import { LineChart } from "@mui/x-charts"
import styled from "@emotion/styled"
import { Cached } from "@mui/icons-material"
const ChartPage = ({ Namepage }) => {
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
              {Namepage === "Temperature Status" && (
                <LineChart
                  series={[
                    { curve: "linear", data: [0, 5, 2, 6, 3, 9.3] },
                    { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
                  ]}
                  style={{ width: "100%" }}
                  height={300}
                />
              )}
              {Namepage === "Lighting Status" && (
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                      area: true,
                    },
                  ]}
                  style={{ width: "100%" }}
                  height={300}
                />
              )}

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                marginBottom={"10px"}
              >
                <Item>
                  <h3>Status: Normal</h3>
                </Item>
                <Item
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    spacing: "5px",
                  }}
                >
                  <h3>Current: 80%</h3>
                  <Button>
                    <Cached fontSize="large" />
                  </Button>
                </Item>
              </Stack>
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
