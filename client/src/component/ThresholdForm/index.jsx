import React from "react"
import { Formik, Form, Field } from "formik"
import { useState } from "react"
import PropTypes from "prop-types"
import { publish } from "database/mqtt"

function ThresHold(props) {
  const [formValues, setFormValues] = useState(null)

  const handleSubmit = (values) => {
    values =  props.type+values.field1 + "_" + values.field2
    const { onSubmit } = props
    if (onSubmit) {
      onSubmit(values, props.type)
    } else {
      console.log("No onSubmit function passed to ThresHold component.")
    }
  }

  const handleReset = () => {
    setFormValues(null)
  }

  return (
    <div>
      <Formik initialValues={{ field1: 0, field2: 0 }} onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label htmlFor="field1">From: </label>
            <Field id="field1" name="field1" type="number" />

            <label htmlFor="field2">To: </label>
            <Field id="field2" name="field2" type="number" />

            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </Form>
        )}
      </Formik>
      {formValues && (
        <div>
          <h2>Form Values:</h2>
          <p>Field 1: {formValues.field1}</p>
          <p>Field 2: {formValues.field2}</p>
        </div>
      )}
    </div>
  )
}
ThresHold.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
ThresHold.defaultProps = {
  name: "Threshold",
  type: "T",
  unit: "+C",
  onSubmit: undefined,
}

export default ThresHold
