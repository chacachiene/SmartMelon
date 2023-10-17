import React from "react"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashBoard from "pages/Dashboard"
import Login from "pages/Login"
import SetUp from "pages/Setup"
import Visualize from "pages/Visualize"
import LayOut from "component/Layout"

import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "theme"
import "./index.css"

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
            <Route path="/setup" element={<SetUp />} />
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
