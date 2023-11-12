import React from "react"
import { Grid, Typography, Slider } from "@mui/material"
import { Formik, Form, Field } from "formik"
import { useState } from "react"
import Proptype from "prop-types"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import AlarmRoundedIcon from "@mui/icons-material/AlarmRounded"

import FormikFieldDateTimePicker from "component/FormikFieldDateTimePicker/FormikFieldDateTimePicker"
import { publish } from "database/mqtt/mqtt"
import { style } from "@mui/system"
import { Box } from "@mui/system"

const initialValues = {
  from: "2023-10-30T14:00:000.00",
  to: "2023-10-31T14:05:000.00",
  level: 50,
}

const mb = { marginBottom: 8 }

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 25,
    label: "1",
  },
  {
    value: 50,
    label: "2",
  },
  {
    value: 75,
    label: "3",
  },
  {
    value: 100,
    label: "4",
  },
]

function valuetext(value) {
  return `${value}°C`
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value)
}

const SetTimer = (props) => {
  const [sliderValue, setSliderValue] = useState(initialValues.level)

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue)
  }

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values)
    console.log(sliderValue)
    let fromTime = values.from.slice(0, -7)
    let toTime = values.to.slice(0, -7)

    if (toTime < fromTime) {
      console.log("Invalid time range")
      alert("End time must be greater than or equal to start time")
    } else {
      if (props.type === "pump") {
        publish(
          "pump-time",
          fromTime.toString() + "_" + toTime.toString() + "*" + sliderValue.toString(),
        )
      } else if (props.type === "light") {
        publish(
          "led-time",
          fromTime.toString() + "_" + toTime.toString() + "*" + sliderValue.toString(),
        )
      } else {
        console.log("error")
      }
      alert("Time range set")
    }
  }

  let Color1 = "#FDFFA0"
  let Color2 = "#E6F7FF"
  if (props.type === "pump") {
    Color1 = "#B3E0FF"
    Color2 = "#E6F7FF"
  }

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      borderRadius: "10px",
      padding: "5px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      width: "300ox", // Change the width to your desired size
      height: "50%",
      background: `linear-gradient(to bottom, ${Color1}, ${Color2})`,
    }}
  > 
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ values, errors }) => (
        <Form style={{ margin: 16, width: "500px" }}>
          <Grid container spacing={0}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom style={{ marginBottom: 'your-value', fontSize: 20, fontWeight: 'bold' }}>
                  Setting time for {props.type}
                </Typography> 
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                name="from"
                component={FormikFieldDateTimePicker}
                inputVariant="outlined"
                label="Start"
                helperText="No timezone specified"
                clearable
              />
            </Grid>
            <Grid item xs={12} sm={6} pl={3}>
              <Field
                name="to"
                component={FormikFieldDateTimePicker}
                inputVariant="outlined"
                label="End"
                helperText="No timezone specified"
                clearable
              />
            </Grid>
          </Grid>

          {/* <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <pre>{JSON.stringify({ errors, values }, null, 2)}</pre>
            </Grid>
          </Grid> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              height: "100px", // Optionally, set the height for vertical centering
            }}
          >
            <AlarmRoundedIcon style={{ width: "50px", height: "50px" }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Slider
              name="level"
              aria-label="Restricted values"
              defaultValue={0}
              value={sliderValue}
              onChange={handleSliderChange}
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              step={25}
              valueLabelDisplay="auto"
              marks={marks}
              style={{ width: '85%' }} // Adjust the width as needed
            />
          </div>

          <Stack Stack spacing={2} direction="row">
            <Button type='reset' variant="contained" >
              Reset
            </Button>
            <Button type='submit' variant="contained" color="success" size="large" >
              Submit
            </Button>
            
          </Stack>
        </Form>
      )}
    </Formik>
    </Box>
  )
}

SetTimer.propTypes = {
  type: Proptype.string,
  value: Proptype.number,
}
SetTimer.defaultProps = {
  type: "pump",
  value: 0,
}

export default SetTimer
