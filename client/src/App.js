import React from "react"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashBoard from "pages/Dashboard"
import LayOut from "component/Layout"

import Login from "pages/Login"
import SetUp from "pages/Setup"
import Visualize from "pages/Visualize"
import Threshold from "pages/Threshold"

import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "theme"
import "./index.css"

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
                  <Route path="/setup" element={<SetUp />} />
                  <Route path="/visualize" element={<Visualize />} />
                  <Route path="/threshold" element={<Threshold />} />
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
