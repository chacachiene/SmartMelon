import React from "react";
import PropTypes from "prop-types";
import { toDate } from "date-fns-tz";
import { DateTimePicker }  from '@mui/x-date-pickers';

const componentTypes = {
  datetime: DateTimePicker,
};

const isoDateRegExp = /^(\d{1,})-?(\d{2})?-?(\d{2})T?(\d{2})?:?(\d{2})?:?(\d{2})?\.?(\d{3})?(Z|[+-]\d{2}:\d{2})?/;
const timeRegExp = /^(\d{2}):(\d{2}):?(\d{2})?\.?(\d{3})?/;

const getDateForPicker = (str) => {
  if (isoDateRegExp.test(str)) {
    return toDate(str);
  } else if (timeRegExp.test(str)) {
    const date = new Date();
    const utcDateISOString = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    ).toISOString();
    return toDate(
      utcDateISOString.substring(0, utcDateISOString.indexOf("T") + 1) + str
    );
  }
  return null;
};

const FormikFieldDateTimePicker = ({
  field,
  form,
  type,
  ...restProps
}) => {
  const CustomTag = componentTypes[type];
  const currentError = form.errors[field.name];



  const handleChange = date => {
    if (date === null) {
      form.setFieldValue(field.name, null, true);
      return;
    }

    let storedValue;
      const utcDateIsoString = new Date(
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds()
        )
      ).toISOString();

      if (isoDateRegExp.test(field.value)) {
        storedValue = utcDateIsoString.substring(0, utcDateIsoString.indexOf("Z"));
      } else {
        storedValue = utcDateIsoString.substring(
          utcDateIsoString.indexOf("T") + 1,
          utcDateIsoString.indexOf("Z")
        );
      }
    
    form.setFieldValue(field.name, storedValue, true);
  };

  const handleBlur = e => {
    field.onBlur(e);
  };
  const pickerValue = getDateForPicker(field.value);
  return (
    <CustomTag
      name={field.name}
      value={pickerValue}
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(_, error) => form.setFieldError(field.name, error)}
      onChange={handleChange}
      onBlur={handleBlur}
      {...restProps}
    />
  );
};

FormikFieldDateTimePicker.propTypes = {
  field: PropTypes.shape().isRequired,
  form: PropTypes.shape().isRequired,
  type: PropTypes.oneOf(["datetime", "date", "time"]),
};

FormikFieldDateTimePicker.defaultProps = {
  type: "datetime",
};

export default FormikFieldDateTimePicker;
