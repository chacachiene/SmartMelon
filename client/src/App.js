import React from "react"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashBoard from "pages/Dashboard"
import LayOut from "component/Layout"

import Login from "pages/Login"
import SetUp from "pages/Threshold/ThresholdGeneralSetting"
import Control from "pages/Control"
import Visualize from "pages/Visualize"
import Threshold from "pages/Threshold"

import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "theme"
import "./index.css"
import ThresholdGeneralSetting from "pages/Threshold/ThresholdGeneralSetting"
import ChartPage from "pages/Visualize/ChartPage"


function App() {
  const mode = useSelector((state) => state.auth.mode)
  const user = Boolean(useSelector((state) => state.auth.user))
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

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
                <Route path="/control" element={<Control />} />
                <Route path="/setup" element={<ThresholdGeneralSetting />} />
                <Route path="/visualize" element={<Visualize />} />
                {/* <Route path="/energy-management" element={<EnergyManagement />}>
                  <Route
                    path="/energy-management/threshold-general-setting"
                    element={<ThresholdGeneralSetting />}
                  />
                  <Route
                    path="/energy-management/temperature-status"
                    element={<ChartPage Namepage={"Temperature Status"} />}
                  />
                  <Route
                    path="/energy-management/lighting-status"
                    element={<ChartPage Namepage={"Lighting Status"} />}
                  />
                  <Route path="/energy-management/humidity-status" element={<ChartPage />} />
                  <Route path="/energy-management/soil-moisture-status" element={<ChartPage />} />
                  <Route
                    path="/energy-management/threshold-general-setting"
                    element={<ChartPage />}
                  />
                </Route> */}
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
