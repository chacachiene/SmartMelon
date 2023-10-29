import React from "react"
import { Grid, Typography, Slider } from "@mui/material"
import { Formik, Form, Field } from "formik"
import { useState } from "react"
import Proptype from "prop-types"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';

import FormikFieldDateTimePicker from "component/FormikFieldDateTimePicker/FormikFieldDateTimePicker"
import { publish } from "database/mqtt"
import { style } from "@mui/system"

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

const SetTimer = (probs) => {
  const [sliderValue, setSliderValue] = useState(initialValues.level)

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue)
  }

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values)

    let fromTime = values.from.slice(0, -7)
    let toTime = values.to.slice(0, -7)

    if (toTime < fromTime) {
      console.log("Invalid time range")
      alert("End time must be greater than or equal to start time")
    } else {
      if (probs.type === "pump") {
        publish("time.pump-time", fromTime.toString() + "_" + toTime.toString())
      } else if (probs.type === "light") {
        publish("time.led-time", fromTime.toString() + "_" + toTime.toString())
      } else {
        console.log("error")
      }
      alert("Time range set")
    }
  }
  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ values, errors }) => (
        <Form style={{ margin: 16, width: '500px', }}>
          <Grid container spacing={0}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom style={mb}>
                  Setting time for {probs.type}
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',  // Center horizontally
            alignItems: 'center',      // Center vertically
            height: '100px',          // Optionally, set the height for vertical centering
          }}>
            <AlarmRoundedIcon style={{ width: '50px', height: '50px' }}/>
          </div>
          
          
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
          />

          <Stack Stack spacing={2} direction="row">
            <Button variant="contained" disabled>
              Reset
            </Button>
            <Button variant="contained" color="success" size="large">
            Submit
            </Button>
          </Stack>

          
        </Form>
      )}
    </Formik>
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
