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
import ThresholdGeneral from "pages/Threshold"
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
import { setLightVisual, setHumiVisual,setMoisVisual,setTempVisual } from "state/visualize"
import { setLightTime, setPumpTime } from "state/clock"

import { getNum, getNoti } from "pages/Noti/getNoti"
import { setPumpButton, setLightButton } from "state/button_time"
function App() {
  const mode = useSelector((state) => state.auth.mode)
  const user = Boolean(useSelector((state) => state.auth.user))
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  const dispatch = useDispatch()


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
    const fetchAllDataSensor = async () => {
      try {
        const temp_humi = await getAll("temp-humi")
        const moisData = await getAll("soil-moisture")
        const lightData = await getAll("light-sensor")
       
        const temp = [];
        const humi = [];
        const light = [];
        const mois = [];

        temp_humi.forEach((item, index) => {

          const [value1, value2] = item.value.split(':');

          temp.push({ created_at: item.created_at, value: parseFloat(value1) });
          humi.push({ created_at: item.created_at, value: parseFloat(value2) });
        });
        lightData.forEach((item, index) => {
          light.push({ created_at: item.created_at, value: parseFloat(item.value) });
        });
        moisData.forEach((item, index) => {
        
          mois.push({ created_at: item.created_at, value: parseFloat(item.value) });
        });



        // dispatch(setTempSensor(parseFloat(temp).toFixed(2)))
        // dispatch(setHumiSensor(parseFloat(humi).toFixed(2)))
        dispatch(setLightVisual(mois))
        dispatch(setMoisVisual(light))
        dispatch(setTempVisual(temp))
        dispatch(setHumiVisual(humi))
        console.log("all light", light)
        console.log("all mois", mois )
        console.log("temp ", temp )
        console.log("humi ", humi )
      } catch (err) {
        console.log(err)
      }
    }
    const separateValue = (data) => {
      return data.map((item) => {
        const [fromTo, value] = item.value.split('*');
        const [from, to] = fromTo.split('_');
        
        return {
          id: item.id,
          feed_key: item.feed_key,
          created_at: item.created_at,
          from,
          to,
          value: Number(value), // Assuming 'value' is a number, convert it to the appropriate type
        };
      });
    };
    
    const fetchAllDataClock = async () => {
      try {
        const pumpTimeData = await getAll("pump-time")
        const ledTimeData = await getAll("led-time")
        const pumpTime = [];
        const lightTime = [];
        pumpTimeData.forEach((item, index) => {
          pumpTime.push({id:item.id,feed_key:item.feed_key, created_at: item.created_at, value: (item.value) });
        });
        ledTimeData.forEach((item, index) => {
          lightTime.push({id:item.id,feed_key:item.feed_key, created_at: item.created_at, value: (item.value) });
        });

        const pumpTimeClean = separateValue(pumpTime);
        const lightTimeClean = separateValue(lightTime);
        dispatch(setLightTime(lightTimeClean))
        dispatch(setPumpTime(pumpTimeClean))
      } catch (err) {
        console.log(err)
      }
    }
    const fetchDataButton = async () => {
      try{
      let pumpStatus = await getLastValue("pump-button")
      const pumpVar = Number(pumpStatus.split(":")[0]);
      dispatch(setPumpButton(pumpVar))

      let lightStatus = await getLastValue("led-button")
      const lightVar = Number(lightStatus.split(":")[0]);
      dispatch(setLightButton(parseInt(lightVar)))}
      catch(err){
        console.log(err)
      }
    }
    fetchDataButton()
    fetchAllDataSensor()
    fetchAllDataClock()
    fetchDataSensor()
    fetchDataThreshold()

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
            <Route path="/setup" element={<ThresholdGeneral />} />
            <Route path="/visualize" element={<Visualize />} />
                
                {/* <Route path="/visualize/temperature" element={<Visualize Namepage={"Temperature Status"} />} />
                <Route path="/visualize/light" element={<Visualize Namepage={"Lighting Status"} />} />
                <Route path="/visualize/humidity-status" element={<Visualize />} />
                <Route path="/visualize/soil-moisture-status" element={<Visualize />} /> */}
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
