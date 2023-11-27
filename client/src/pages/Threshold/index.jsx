import React, { useState } from "react"
import ThresholdGeneralSetting from "./ThresholdGeneralSetting"

import { publish } from "database/mqtt/mqtt.js"
import { useDispatch, useSelector } from "react-redux"
import { setLghtThreshold, setMoisThreshold, setHumiThreshold, setTempThreshold } from "state/threshold"


const Threshold = () => {

  const handleSubmit = (values) => {
    console.log("submitting")
    console.log(values)
    publish("threshold", values)
  }


  return (
    <div>
      <ThresholdGeneralSetting submitOnDb={handleSubmit} />
    
    </div>
  )
}

export default Threshold
