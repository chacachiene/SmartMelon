import React, { useState } from "react"
import ThresholdGeneralSetting from "./ThresholdGeneralSetting"
import { publish } from "database/mqtt/mqtt.js"
import { createHistory } from "pages/History/getDataHistory"
import { useSelector } from "react-redux"
const Threshold = () => {
  const user = useSelector((state) => state.auth.user)
  const handleSubmit = (values) => {
    publish("threshold", values)
  }

  return (
    <div>
      <ThresholdGeneralSetting submitOnDb={handleSubmit} />
    
    </div>
  )
}

export default Threshold
