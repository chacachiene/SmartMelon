import React from "react"
import { BarChart } from "@mui/x-charts/BarChart"
import { Helmet } from "react-helmet"
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material"
import { LineChart } from "@mui/x-charts"
import styled from "@emotion/styled"
const BaseChart = () => {
  return (
    <>
      <Container>
        <Typography variant="h3" sx={{ marginBottom: "10px", marginTop: "10px" }}>
          DeviceManagement
        </Typography>
        <Paper>
          <Grid container>
            <Grid item xs={10}>
              <LineChart
                series={[
                  { curve: "linear", data: [0, 5, 2, 6, 3, 9.3] },
                  { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
                ]}
                style={{ width: "100%" }}
                height={300}
              />
              <Stack direction="row" justifyContent="center" alignItems="center">
                <Item>
                  <h3>Status: Normal</h3>
                </Item>
                <Item>
                  <h3>Current: 80%</h3>
                </Item>
              </Stack>
            </Grid>

            <Grid item xs={2}>
              <ButtonContainer>
                <CustomButton color="success" variant="contained">
                  Buoc 1
                </CustomButton>
              </ButtonContainer>

              <ButtonContainer>
                <CustomButton color="success" variant="contained">
                  Buoc 1
                </CustomButton>
              </ButtonContainer>
              <ButtonContainer>
                <CustomButton color="success" variant="contained">
                  Buoc 1
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
  width: 100px;
  height: 40px;
`
const ButtonContainer = styled(Box)`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default BaseChart
