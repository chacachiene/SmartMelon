import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  light: '',
  humi: '',
  temp: '',
  mois: '',
  sum: 0,
  display: false,
}

export const notiReducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setLightNoti: (state, action) => {
      state.light = action.payload
    },
    setHumiNoti: (state, action) => {
      state.humi = action.payload
    },
    setTempNoti: (state, action) => {
      state.temp = action.payload
    },
    setMoisNoti: (state, action) => {
      state.mois = action.payload
    },
    setSum: (state, action) => {
      state.sum = action.payload
    },
    setDisplay: (state, action) => {
      state.display = action.payload
    },
  },
})

export const { setLightNoti, setHumiNoti, setTempNoti, setMoisNoti, setSum, setDisplay } = notiReducer.actions
export default notiReducer.reducer