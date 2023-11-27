import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  light: [],
  humi: [],
  temp: [],
  mois: [],
}

export const visualizeReducer = createSlice({
  name: "button",
  initialState,
  reducers: {
    setLightVisual: (state, action) => {
      state.light = action.payload
    },
    setHumiVisual: (state, action) => {
      state.humi = action.payload
    },
    setTempVisual: (state, action) => {
      state.temp = action.payload
    },
    setMoisVisual: (state, action) => {
      state.mois = action.payload
    },
  },
})

export const { setHumiVisual, setLightVisual, setMoisVisual, setTempVisual } = visualizeReducer.actions
export default visualizeReducer.reducer
