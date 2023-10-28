import { Button } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

function DashBoard() {
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={navigate("/setup")}>text</Button>
      <h1>Hello, world!</h1>
    </div>
  )
}

export default DashBoard
