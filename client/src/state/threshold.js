import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  light: ['1','2'],
  humi: ['3','4'],
  temp: ['5','6'],
  mois: ['7','8'],
}

export const thresHoldReducer = createSlice({
  name: "threshold",
  initialState,
  reducers: {
    setLightThreshold: (state, action) => {
      state.light = action.payload
    },
    setHumiThreshold: (state, action) => {
      state.humi = action.payload
    },
    setTempThreshold: (state, action) => {
      state.temp = action.payload
    },
    setMoisThreshold: (state, action) => {
      state.mois = action.payload
    },
  },
})

export const { setLightThreshold, setHumiThreshold, setTempThreshold, setMoisThreshold } = thresHoldReducer.actions
export default thresHoldReducer.reducer