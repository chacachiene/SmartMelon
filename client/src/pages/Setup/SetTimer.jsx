import React from "react"
import { Grid, Typography, Slider } from "@mui/material"
import { Formik, Form, Field } from "formik"
import { useState } from "react"
import Proptype from "prop-types"

import FormikFieldDateTimePicker from "component/FormikFieldDateTimePicker/FormikFieldDateTimePicker"
import { publish } from "database/mqtt"

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
    console.log(sliderValue)
    let fromTime = values.from.slice(0, -7)
    let toTime = values.to.slice(0, -7)

    if (toTime < fromTime) {
      console.log("Invalid time range")
      alert("End time must be greater than or equal to start time")
    } else {
      if (probs.type === "pump") {
        publish("pump-time", fromTime.toString() + "_" + toTime.toString()+'*'+sliderValue.toString())
      } else if (probs.type === "light") {
        publish("led-time", fromTime.toString() + "_" + toTime.toString()+ '*' + sliderValue.toString())
      } else {
        console.log("error")
      }
      alert("Time range set")
    }
  }
  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ values, errors }) => (
        <Form style={{ margin: 16 }}>
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

          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
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
