import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: null,
  mode: "light",
  notification: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setNotification: (state, action) => {
      state.notification = action.payload
    },
  },
})

export const { setMode, setLogin, setLogout, setNotification } = authSlice.actions
export default authSlice.reducer
