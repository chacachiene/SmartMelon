import React from "react"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashBoard from "pages/Dashboard"
import Login from "pages/Login"
import SetUp from "pages/Setup/ThresholdGeneralSetting"
import Visualize from "pages/Visualize"
import LayOut from "component/Layout"

import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "theme"
import "./index.css"
import ThresholdGeneralSetting from "pages/Setup/ThresholdGeneralSetting"
import ChartPage from "pages/Setup/ChartPage"
import EnergyManagement from "pages/Setup/EnergyManagement"

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
        <Routes>
          <Route element={<LayOut />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/setup" element={<ThresholdGeneralSetting />} />
              <Route path="/energy-management" element={<EnergyManagement />} >
                <Route path="/energy-management/threshold-general-setting" element={<ThresholdGeneralSetting />} />
                <Route path="/energy-management/temperature-status" element={<ChartPage Namepage={"Temperature Status"} />} />
                <Route path="/energy-management/lighting-status" element={<ChartPage Namepage={"Lighting Status"} />} />
                <Route path="/energy-management/humidity-status" element={<ChartPage />} />
                <Route path="/energy-management/soil-moisture-status" element={<ChartPage />} />
                <Route path="/energy-management/threshold-general-setting" element={<ChartPage />} />
              </Route>

            <Route path="/visualize" element={<Visualize />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}
export default App
