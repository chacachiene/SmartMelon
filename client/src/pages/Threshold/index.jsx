import React, { useState } from "react"
import ThresholdGeneralSetting from "./ThresholdGeneralSetting"

import { publish } from "database/mqtt/mqtt.js"
import { useDispatch, useSelector } from "react-redux"
// import {setLghtThreshold, setMoisThreshold, setHumiThreshold, setTempThreshold} from "state/threshold"


const Threshold = () => {
  

  // const submitStatus = (type,value) => {
  //   if (type === "pump") {
      
  //     publish("pump-button", value.toString()+':1')
  //   } else if (type === "light") {
  //     dispatch(setLightButton(parseInt(value)))
      
  //   }
  // }
  const handleSubmit = (values) => {
    publish("threshold", values)
  }


  return (
    <div>
      <h1>Threshold Page</h1>
      
      
    </div>
  )
}

export default Threshold
