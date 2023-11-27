import React from "react"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashBoard from "pages/Dashboard"
import LayOut from "component/Layout"

import Login from "pages/Login"
import SetUp from "pages/Threshold/ThresholdGeneralSetting"
import Control from "pages/Control"
import Visualize from "pages/Visualize"
import Threshold from "pages/Threshold"
import History from "pages/History/History"

import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "theme"
import "./index.css"
import ThresholdGeneralSetting from "pages/Threshold/ThresholdGeneralSetting"
import ChartPage from "pages/Visualize/ChartPage"

import { setLightSensor, setMoisSensor, setTempSensor, setHumiSensor } from "state/sensor"
import { useDispatch } from "react-redux"
import client from "database/mqtt/mqtt.js"
import { useEffect } from "react"
import { getLastValue, getAll } from "database/http/getAdaData"
import {
  setLightThreshold,
  setHumiThreshold,
  setTempThreshold,
  setMoisThreshold,
} from "state/threshold"
import { setLightNoti, setHumiNoti, setTempNoti, setMoisNoti, setSum } from "state/noti"

import { getNum, getNoti } from "pages/Noti/getNoti"
import { setPumpButton, setLightButton } from "state/button_time"
function App() {
  const mode = useSelector((state) => state.auth.mode)
  const user = Boolean(useSelector((state) => state.auth.user))
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  const dispatch = useDispatch()

  const light = useSelector((state) => state.sensor.light)
  const mois = useSelector((state) => state.sensor.mois)
  const temp = useSelector((state) => state.sensor.temp)
  const humi = useSelector((state) => state.sensor.humi)
  const lightThreshold = useSelector((state) => state.threshold.light)
  const moisThreshold = useSelector((state) => state.threshold.mois)
  const tempThreshold = useSelector((state) => state.threshold.temp)
  const humiThreshold = useSelector((state) => state.threshold.humi)

  client.on("message", (topic, message, packet) => {
    const lastSlashIndex = topic.toString().lastIndexOf("/")
    const name = topic.toString().substring(lastSlashIndex + 1)
    if (name === "light-sensor") {
      dispatch(setLightSensor(parseFloat(message).toFixed(2)))
    }
    if (name === "soil-moisture") {
      dispatch(setMoisSensor(parseFloat(message).toFixed(2)))
    }
    if (name === "temp-humi") {
      const [temp, humi] = message.toString().split(":")
      dispatch(setTempSensor(parseFloat(temp).toFixed(2)))
      dispatch(setHumiSensor(parseFloat(humi).toFixed(2)))
    }
    if (name === "threshold") {
      const m = message.toString()
      let value = getNum(m)
      if (m[0] == "L") {
        dispatch(setLightThreshold(value))
      } else if (m[0] == "T") {
        dispatch(setTempThreshold(value))
      } else if (m[0] == "H") {
        dispatch(setHumiThreshold(value))
      } else if (m[0] == "M") {
        dispatch(setMoisThreshold(value))
      }
    }
    if (name === "pump-button") {
      const value = Number(message.toString().split(":")[0])
      dispatch(setPumpButton(parseInt(value)))
    }
    if (name === "led-button") {
      const value = Number(message.toString().split(":")[0])
      dispatch(setLightButton(parseInt(value)))
    }
  })

  useEffect(() => {
    const fetchDataThreshold = async () => {
      try {
        let threshold = await getAll("threshold")
        let noti = getNoti(threshold)

        dispatch(setLightThreshold(noti.L))
        dispatch(setTempThreshold(noti.T))
        dispatch(setHumiThreshold(noti.H))
        dispatch(setMoisThreshold(noti.M))
      } catch (err) {
        console.log(err)
      }
    }
    const fetchDataSensor = async () => {
      try {
        const temp_humi = await getLastValue("temp-humi")
        const [temp, humi] = temp_humi.toString().split(":")
        const moisData = await getLastValue("soil-moisture")
        const lightData = await getLastValue("light-sensor")

        dispatch(setTempSensor(parseFloat(temp).toFixed(2)))
        dispatch(setHumiSensor(parseFloat(humi).toFixed(2)))
        dispatch(setLightSensor(parseFloat(lightData).toFixed(2)))
        dispatch(setMoisSensor(parseFloat(moisData).toFixed(2)))
      } catch (err) {
        console.log(err)
      }
    }

    fetchDataThreshold()
    fetchDataSensor()
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {user ? (
        <Routes>
          <Route element={<LayOut />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/history" element={<History />} />
            <Route path="/control" element={<Control />} />
            <Route path="/setup" element={<ThresholdGeneralSetting />} />
            <Route path="/visualize" element={<Visualize />} />
                <Route path="/visualize/threshold-general-setting" element={<ThresholdGeneralSetting />} />
                <Route path="/visualize/temperature-status" element={<ChartPage Namepage={"Temperature Status"} />} />
                <Route path="/visualize/lighting-status" element={<ChartPage Namepage={"Lighting Status"} />} />
                <Route path="/visualize/humidity-status" element={<ChartPage />} />
                <Route path="/visualize/soil-moisture-status" element={<ChartPage />} />
            </Route>
        </Routes>
        ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}
export default App
