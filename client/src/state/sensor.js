import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  light: 0,
  humi: 0,
  temp: 0,
  mois: 0,
}

export const sensorReducer = createSlice({
  name: "sensor",
  initialState,
  reducers: {
    setLightSensor: (state, action) => {
      state.light = action.payload
    },
    setHumiSensor: (state, action) => {
      state.humi = action.payload
    },
    setTempSensor: (state, action) => {
      state.temp = action.payload
    },
    setMoisSensor: (state, action) => {
      state.mois = action.payload
    },
  },
})

export const { setHumiSensor, setLightSensor, setMoisSensor, setTempSensor } = sensorReducer.actions
export default sensorReducer.reducer
